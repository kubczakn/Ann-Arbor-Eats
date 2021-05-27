'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const when = require('when');
const client = require('./client');

// allows hopping to multiple links
const follow = require('./api/follow');

const root = '/api';
const stompClient = require('./websocket-listener')

class App extends React.Component { 

	constructor(props) {
		super(props);
		this.state = {posts: [], attributes: [], page: 1,  pageSize: 2, links: {}};
		this.updatePageSize = this.updatePageSize.bind(this);
		this.onCreate = this.onCreate.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.onUpdate = this.onUpdate.bind(this);
		this.onNavigate = this.onNavigate.bind(this);
		this.refreshCurrentPage = this.refreshCurrentPage.bind(this);
		this.refreshAndGoToLastPage = this.refreshAndGoToLastPage.bind(this);
	}

	loadFromServer(pageSize) {
		follow(client, root, [
			{rel: 'posts', params: {size: pageSize}}]
		).then(postCollection => {
			return client({
				method: 'GET',
				path: postCollection.entity._links.profile.href,
				headers: {'Accept': 'application/schema+json'}
			}).then(schema => {
				this.schema = schema.entity;
				this.links = postCollection.entity._links;
				return postCollection;
			});
		}).then(postCollection => {
			return postCollection.entity._embedded.posts.map(post =>
				client({
					method: 'GET',
					path: post._links.self.href
				})
			);
		}).then(postPromises => {
			return when.all(postPromises);
		}).done(posts => {
			this.setState({
				page: this.page,
				posts: posts,
				attributes: Object.keys(this.schema.properties),
				pageSize: pageSize,
				links: this.links
			});
		});
	}

	onCreate(newPost) {
		follow(client, root, ['posts']).done(response => {
			client({
				method: 'POST',
				path: response.entity._links.self.href,
				entity: newPost,
				headers: {'Content-Type': 'application/json'}
			})
		})
	}

	onUpdate(post, updatedPost) {
		client({
			method: 'PUT',
			path: post.entity._links.self.href,
			entity: updatedPost,
			headers: {
				'Content-Type': 'application/json',
				'If-Match': post.headers.Etag
			}
		}).done(response => {
		    // Let websocket handler update the state
		}, response => {
			if (response.status.code === 412) {
				alert('DENIED: Unable to update ' +
					post.entity._links.self.href + '. Your copy is stale.');
			}
		});
	}

	onNavigate(navUri) {
		client({
			method: 'GET',
			path: navUri
		}).then(postCollection => {
			this.links = postCollection.entity._links;
			this.page = postCollection.entity.page;

			return postCollection.entity._embedded.posts.map(post =>
				client({
					method: 'GET',
					path: post._links.self.href
				})
			);
		}).then(postPromises=> {
			return when.all(postPromises);
		}).done(posts => {
			this.setState({
				page: this.page,
				posts: posts,
				attributes: Object.keys(this.schema.properties),
				pageSize: this.state.pageSize,
				links: this.links
			});
		});
	}

	updatePageSize(pageSize) {
		if (pageSize !== this.state.pageSize) {
			this.loadFromServer(pageSize);
		}
	}

	onDelete(post) {
		client({method: 'DELETE', path: post.entity._links.self.href}).done(response =>
		{
			this.loadFromServer(this.state.pageSize);
		});
	}

	refreshAndGoToLastPage(message) {
		follow(client, root, [{
			rel: 'posts',
			params: {size: this.state.pageSize}
		}]).done(response => {
			if (response.entity._links.last !== undefined) {
				this.onNavigate(response.entity._links.last.href);
			} else {
				this.onNavigate(response.entity._links.self.href);
			}
		})
	}

	refreshCurrentPage(message) {
		follow(client, root, [{
			rel: 'posts',
			params: {
				size: this.state.pageSize,
				page: this.state.page.number
			}
		}]).then(postCollection => {
			this.links = postCollection.entity._links;
			this.page = postCollection.entity.page;

			return postCollection.entity._embedded.posts.map(post => {
				return client({
					method: 'GET',
					path: post._links.self.href
				})
			});
		}).then(postPromises => {
			return when.all(postPromises);
		}).then(posts => {
			this.setState({
				page: this.page,
				posts: posts,
				attributes: Object.keys(this.schema.properties),
				pageSize: this.state.pageSize,
				links: this.links
			});
		});
	}

	componentDidMount() { 
		this.loadFromServer(this.state.pageSize);
		// Register for WebSocket events
		stompClient.register([
			{route: '/topic/newPost', callback: this.refreshAndGoToLastPage},
			{route: '/topic/updatePost', callback: this.refreshCurrentPage},
			{route: '/topic/deletePost', callback: this.refreshCurrentPage}
		]);
	}

	render() { 
		return (
			<div>
				<CreateDialog attributes={this.state.attributes} onCreate={this.onCreate}/>
				<PostList posts={this.state.posts}
						  links={this.state.links}
						  pageSize={this.state.pageSize}
						  attributes={this.state.attributes}
						  onNavigate={this.onNavigate}
						  onDelete={this.onDelete}
                          onUpdate={this.onUpdate}
						  updatePageSize={this.updatePageSize}
				/>
			</div>
		)
	}
}

class UpdateDialog extends React.Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		const updatedPost = {};
		this.props.attributes.forEach(attribute => {
			updatedPost[attribute] =
				ReactDOM.findDOMNode(this.refs[attribute]).value.trim();
		});
		this.props.onUpdate(this.props.post, updatedPost);
		window.location = '#';
	}

	render() {
		const inputs = this.props.attributes.map(attribute =>
			<p key={this.props.post.entity[attribute]}>
				<input type="text" placeholder={attribute}
					   defaultValue={this.props.post.entity[attribute]}
					   ref={attribute} className="field"/>
			</p>
		);
		const dialogId = "updatePost-" + this.props.post.entity._links.self.href;
		return (
			<div key={this.props.post.entity._links.self.href}>
				<a href={"#" + dialogId}>Update</a>
                <div id={dialogId} className="modalDialog">
					<div>
						<a href="#" title={"Close"} className={"close"}>X</a>
						<h2>Update a post</h2>
						<form>
							{inputs}
							<button onClick={this.handleSubmit}>Update</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

class CreateDialog extends React.Component {

	constructor(props) {
		super(props);
		this.myRef = React.createRef();
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		const newPost = {};
		this.props.attributes.forEach(attribute => {
			newPost[attribute] = ReactDOM.findDOMNode(this.refs[attribute]).value.trim();
		});
		this.props.onCreate(newPost);

		// clear out the dialog's inputs
		this.props.attributes.forEach(attribute => {
			ReactDOM.findDOMNode(this.refs[attribute]).value = '';
		});

		// Navigate away from the dialog to hide it.
		window.location = "#";
	}

	render() {
		const inputs = this.props.attributes.map(attribute =>
			<p key={attribute}>
				<input type="text" placeholder={attribute} ref={attribute} className="field"/>
			</p>
		);

		return (
			<div>
				<a href="#createPost">Create</a>

				<div id="createPost" className="modalDialog">
					<div>
						<a href="#" title="Close" className="close">X</a>

						<h2>Create new post</h2>

						<form>
							{inputs}
							<button onClick={this.handleSubmit}>Create</button>
						</form>
					</div>
				</div>
			</div>
		)
	}

}

class PostList extends React.Component{

	constructor(props) {
		super(props);
		this.myRef = React.createRef();
		this.handleNavFirst = this.handleNavFirst.bind(this);
		this.handleNavPrev = this.handleNavPrev.bind(this);
		this.handleNavNext = this.handleNavNext.bind(this);
		this.handleNavLast = this.handleNavLast.bind(this);
		this.handleInput = this.handleInput.bind(this);
	}

	handleInput(e) {
		e.preventDefault();
		// const pageSize = ReactDOM.findDOMNode(this.myRef.pageSize).value;
		const pageSize = ReactDOM.findDOMNode(this.refs.pageSize).value;
		if (/^[0-9]+$/.test(pageSize)) {
			this.props.updatePageSize(pageSize);
		} else {
			// ReactDOM.findDOMNode(this.myRef.pageSize).value =
			// 	pageSize.substring(0, pageSize.length - 1);
			ReactDOM.findDOMNode(this.refs.pageSize).value =
				pageSize.substring(0, pageSize.length - 1);
		}
	}

	handleNavFirst(e){
		e.preventDefault();
		this.props.onNavigate(this.props.links.first.href);
	}
	
	handleNavPrev(e) {
		e.preventDefault();
		this.props.onNavigate(this.props.links.prev.href);
	}
	
	handleNavNext(e) {
		e.preventDefault();
		this.props.onNavigate(this.props.links.next.href);
	}
	
	handleNavLast(e) {
		e.preventDefault();
		this.props.onNavigate(this.props.links.last.href);
	}

	render() {
		const posts = this.props.posts.map(post =>
			<Post key={post.entity._links.self.href} post={post} attributes={this.props.attributes} onUpdate={this.props.onUpdate} onDelete={this.props.onDelete}/>
		);
	
		const navLinks = [];

		if ("first" in this.props.links) {
			navLinks.push(<button key="first" onClick={this.handleNavFirst}>&lt;&lt;</button>);
		}
		if ("prev" in this.props.links) {
			navLinks.push(<button key="prev" onClick={this.handleNavPrev}>&lt;</button>);
		}
		if ("next" in this.props.links) {
			navLinks.push(<button key="next" onClick={this.handleNavNext}>&gt;</button>);
		}
		if ("last" in this.props.links) {
			navLinks.push(<button key="last" onClick={this.handleNavLast}>&gt;&gt;</button>);
		}
	
		return (
			<div>
				<input ref="pageSize" defaultValue={this.props.pageSize} onInput={this.handleInput}/>
				<table>
					<tbody>
						<tr>
							<th>Name</th>
							<th>Rating</th>
							<th>Description</th>
							<th></th>
						</tr>
						{posts}
					</tbody>
				</table>
				<div>
					{navLinks}
				</div>
			</div>
		)
	}
}

class Post extends React.Component{
	constructor(props) {
		super(props);
		this.handleDelete = this.handleDelete.bind(this);
	}

	handleDelete() {
		this.props.onDelete(this.props.post);
	}
	render() {
		return (
			<tr>
				<td>{this.props.post.entity.name}</td>
				<td>{this.props.post.entity.rating}</td>
				<td>{this.props.post.entity.description}</td>
				<td>
					<UpdateDialog post={this.props.post} attributes={this.props.attributes}
								  onUpdate={this.props.onUpdate}/>
				</td>
               	<td>
					<button onClick={this.handleDelete}>Delete</button>
				</td>
			</tr>
		)
	}
}




ReactDOM.render(
    <App />,
    document.getElementById('react')
)
