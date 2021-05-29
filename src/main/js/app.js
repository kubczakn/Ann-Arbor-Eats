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

	onCreate(formData) {
		const url = "/add";
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
				this.setState((prevState) => ({
					posts: prevState.posts.concat(data),
				}));
			})
			.catch((error) => console.log(error));
	}

	onUpdate(post, updatedPost) {

	}

	onNavigate(navUri) {
	}

	updatePageSize(pageSize) {
	}

	onDelete(post) {

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

// class UpdateDialog extends React.Component {

// }

class CreateDialog extends React.Component {

	constructor(props) {
		super(props);
		this.myRef = React.createRef();
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
