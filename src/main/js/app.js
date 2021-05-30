'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const when = require('when');

class App extends React.Component { 

	constructor(props) {
		super(props);
		this.state = {posts: {}, attributes: [], page: 1,  pageSize: 2, links: {}};
		this.updatePageSize = this.updatePageSize.bind(this);
		this.onCreate = this.onCreate.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.onUpdate = this.onUpdate.bind(this);
	}

	loadFromServer(pageSize) {
		const url = "/posts/get";
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

	onCreate(formData) {
		const url = "/posts/add";
		fetch(url, {
			method: 'POST',
			credentials: 'same-origin',
			body: formData
		})
			.then((response) =>{
				if (!response.ok) throw Error(response.statusText);
				return response.json();
			})
			.then((data) => {
				const newPosts = this.state.posts;
				newPosts[data.id] = data;
				this.setState({
					posts: newPosts,
				});
			})
			.catch((error) => console.log(error));
	}

	onUpdate(formData, id) {
		const url = `posts/${id}`;
		fetch(url, {
			method: 'PUT',
			credentials: 'same-origin',
			body: formData
		})
			.then((response) =>{
				if (!response.ok) throw Error(response.statusText);
				return response.json();
			})
			.then((data) => {
				const newPosts = this.state.posts;
				newPosts[data.id] = data;
				this.setState({
					posts: newPosts,
				});
			})
			.catch((error) => console.log(error));
	}

	onNavigate(navUri) {
	}

	updatePageSize(pageSize) {
	}

	onDelete(id) {
		const url = `/posts/delete/${id}`;
		fetch(url, {
			method: 'DELETE',
			credentials: 'same-origin',
		})
		const newPosts = this.state.posts;
		delete newPosts[id];
		this.setState({
			posts: newPosts,
		})
	}

	componentDidMount() { 
		this.loadFromServer(this.state.pageSize);
		this.setState({attributes: ['name', 'rating', 'description']});
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
		const formData = new FormData();
		this.props.attributes.forEach(attribute => {
			formData.append(attribute, ReactDOM.findDOMNode(this.refs[attribute]).value.trim());
		});
		this.props.onUpdate(formData, this.props.post.id);

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
				<a href="#updatePost">Update</a>

				<div id="updatePost" className="modalDialog">
					<div>
						<a href="#" title="Close" className="close">X</a>

						<h2>Update</h2>

						<form>
							{inputs}
							<button onClick={this.handleSubmit}>Update</button>
						</form>
					</div>
				</div>
			</div>
		)
	}
}

class CreateDialog extends React.Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		const formData = new FormData();
		this.props.attributes.forEach(attribute => {
			 formData.append(attribute, ReactDOM.findDOMNode(this.refs[attribute]).value.trim());
		});
		this.props.onCreate(formData);

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
		const posts = Object.keys(this.props.posts).map((key, index) =>
			<Post key={index} post={this.props.posts[key]} attributes={this.props.attributes} onUpdate={this.props.onUpdate} onDelete={this.props.onDelete}/>
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
		this.props.onDelete(this.props.post.id);
	}
	render() {
		return (
			<tr>
				<td>{this.props.post.name}</td>
				<td>{this.props.post.rating}</td>
				<td>{this.props.post.description}</td>
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
    <App url={'/'} />,
    document.getElementById('react')
)
