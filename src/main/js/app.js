'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const when = require('when');

class App extends React.Component { 

	constructor(props) {
		super(props);
		this.state = {posts: [], attributes: [], page: 1,  pageSize: 2, links: {}};
		this.updatePageSize = this.updatePageSize.bind(this);
		this.onCreate = this.onCreate.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.onUpdate = this.onUpdate.bind(this);
	}

	loadFromServer(pageSize) {
		const url = "/get";
		fetch(url, {
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
				},
				credentials: 'same-origin'
			})
			.then((response) => {
				if(!response.ok) throw Error(response.statusText);
				return response.json();
			})
			.then((data) => {
				this.setState({
					posts: data
				})
			})
			.catch((err) => console.log(err));
	}

	onCreate(newPost) {
		const url = "/add";

		// fetch(url, {
		// 	body: JSON.stringify(text: newPost)
		// })
	}

	onUpdate(post, updatedPost) {
		// client({
		// 	method: 'PUT',
		// 	path: post.entity._links.self.href,
		// 	entity: updatedPost,
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 		'If-Match': post.headers.Etag
		// 	}
		// }).done(response => {
		//     // Let websocket handler update the state
		// }, response => {
		// 	if (response.status.code === 403) {
		// 		alert('ACCESS DENIED: You are not authorized to update ' +
		// 			post.entity._links.self.href);
		// 	}
		// 	if (response.status.code === 412) {
		// 		alert('DENIED: Unable to update ' +
		// 			post.entity._links.self.href + '. Your copy is stale.');
		// 	}
		// 	else {
		// 		alert("You are not authorized to update")
		// 	}
		// });
	}

	onNavigate(navUri) {
		// client({
		// 	method: 'GET',
		// 	path: navUri
		// }).then(postCollection => {
		// 	this.links = postCollection.entity._links;
		// 	this.page = postCollection.entity.page;
		//
		// 	return postCollection.entity._embedded.posts.map(post =>
		// 		client({
		// 			method: 'GET',
		// 			path: post._links.self.href
		// 		})
		// 	);
		// }).then(postPromises=> {
		// 	return when.all(postPromises);
		// }).done(posts => {
		// 	this.setState({
		// 		page: this.page,
		// 		posts: posts,
		// 		attributes: Object.keys(this.schema.properties),
		// 		pageSize: this.state.pageSize,
		// 		links: this.links
		// 	});
		// });
	}

	updatePageSize(pageSize) {
		// if (pageSize !== this.state.pageSize) {
		// 	this.loadFromServer(pageSize);
		// }
	}

	onDelete(post) {
		// client({method: 'DELETE', path: post.entity._links.self.href}).done(response =>
		// {/* Let websocket handle UI update on delete */},
		//     response => {
		//     	if (response.status.code === 403) {
		//     		alert('ACCESS DENIED: You are not authorized to delete' +
		// 			post.entity._links.self.href);
		// 		}
		// 	});
	}



	componentDidMount() { 
		this.loadFromServer(this.state.pageSize);

	}

	render() { 
		return (
			<div>
				{/*<CreateDialog attributes={this.state.attributes} onCreate={this.onCreate}/>*/}
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

// class UpdateDialog extends React.Component {
// 	constructor(props) {
// 		super(props);
// 		this.handleSubmit = this.handleSubmit.bind(this);
// 	}
//
// 	handleSubmit(e) {
// 		e.preventDefault();
// 		const updatedPost = {};
// 		this.props.attributes.forEach(attribute => {
// 			updatedPost[attribute] =
// 				ReactDOM.findDOMNode(this.refs[attribute]).value.trim();
// 		});
// 		this.props.onUpdate(this.props.post, updatedPost);
// 		window.location = '#';
// 	}
//
// 	render() {
// 		const inputs = this.props.attributes.map(attribute =>
// 			<p key={this.props.post.entity[attribute]}>
// 				<input type="text" placeholder={attribute}
// 					   defaultValue={this.props.post.entity[attribute]}
// 					   ref={attribute} className="field"/>
// 			</p>
// 		);
// 		const dialogId = "updatePost-" + this.props.post.entity._links.self.href;
// 		const isReviewer = this.props.post.entity.reviewer.name === this.props.loggedInReviewer;
// 		if (isReviewer){
// 			return ( 	<div key={this.props.post.entity._links.self.href}>
// 							<a href={"#" + dialogId}>Update</a>
// 							<div id={dialogId} className="modalDialog">
// 								<div>
// 									<a href="#" title={"Close"} className={"close"}>X</a>
// 									<h2>Update a post</h2>
// 									<form>
// 										{inputs}
// 										<button onClick={this.handleSubmit}>Update</button>
// 									</form>
// 								</div>
// 							</div>
// 						</div>
// 			);
// 		}
// 		else {
// 			return  ( <div>
// 						<a>Denied</a>
// 					</div>
// 			);
// 		}
//
// 	}
// }

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
	}

	render() {
		const posts = this.props.posts.map(post =>
			<Post key={post.id} post={post} attributes={this.props.attributes} onUpdate={this.props.onUpdate} onDelete={this.props.onDelete}/>
		);
	
		return (
			<div>
				<input ref="pageSize" defaultValue={this.props.pageSize}/>
				<table>
					<tbody>
						<tr>
							<th>Name</th>
							<th>Rating</th>
							<th>Description</th>
						</tr>
						{posts}
					</tbody>
				</table>
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
				<td>{this.props.post.name}</td>
				<td>{this.props.post.rating}</td>
				<td>{this.props.post.description}</td>
				<td>
					{/*<UpdateDialog post={this.props.post} attributes={this.props.attributes}*/}
					{/*			  onUpdate={this.props.onUpdate}/>*/}
				</td>
               	<td>
					<button onClick={this.handleDelete}>Delete</button>
				</td>
			</tr>
		)
	}
}




ReactDOM.render(
    <App url={'/'} />,
    document.getElementById('react')
)
