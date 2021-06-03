'use strict';
import Post from "./Post.jsx";
import { makeStyles } from "@material-ui/core/styles";
import {
	Typography,
	Grid,
	AppBar,
	Toolbar,
	Button,
	Card,
	CardContent,
	CardMedia
} from "@material-ui/core";

const React = require('react');
const ReactDOM = require('react-dom');


// TODO: Modularize all of this

// For card
const useStyles = makeStyles({

});

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
			.catch((error) => console.log(error));
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
			<Grid container direction={"column"} justify={"flex-end"} alignItems={"center"}>
				{/*Header*/}
				{/*<Grid item container>*/}
				{/*	<CreateDialog attributes={this.state.attributes} onCreate={this.onCreate}/>*/}
				{/*</Grid>*/}
				<Grid item >
					<CreateDialog attributes={this.state.attributes} onCreate={this.onCreate}/>
				</Grid>
				{/*Main content*/}
				<Grid item container>
					{/*Left Size*/}
					<Grid item xs={0} sm={2}/>
					{/*Middle*/}
					<Grid item xs={12} sm={8}>
						<PostList posts={this.state.posts}
								  links={this.state.links}
								  pageSize={this.state.pageSize}
								  attributes={this.state.attributes}
								  onNavigate={this.onNavigate}
								  onDelete={this.onDelete}
								  onUpdate={this.onUpdate}
								  updatePageSize={this.updatePageSize}
						/>
					</Grid>
					{/*Right Size*/}
					<Grid item xs={0} sm={2}/>
				</Grid>
			</Grid>
		)
	}
}

class CreateDialog extends React.Component {
	constructor(props) {
		super(props);
		this.state = { image: null };
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleUpload = this.handleUpload.bind(this);
	}

	handleUpload(e) {
		this.setState({
			image: e.target.files[0],
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		const formData = new FormData();
		this.props.attributes.forEach(attribute => {
			formData.append(attribute, ReactDOM.findDOMNode(this.refs[attribute]).value.trim());
		});
		formData.append('image', this.state.image);
		this.props.onCreate(formData);
		// clear out the dialog's inputs
		this.props.attributes.forEach(attribute => {
			ReactDOM.findDOMNode(this.refs[attribute]).value = '';
		});

		// Navigate away from the dialog to hide it.
		window.location = "#";
	}

	render() {
		// TODO: Set defaults for input fields
		const inputs = this.props.attributes.map(attribute =>
			<p key={attribute}>
				<input type="text" placeholder={attribute} ref={attribute} className="field"/>
			</p>
		);

		return (
			<AppBar position={"static"}>
				<Toolbar>
					<Button href="#createPost">Create</Button>
					<Typography>Ann Arbor Eats</Typography>
					<div id="createPost" className="modalDialog">
						<div>
							<a href="#" title="Close" className="close">X</a>

							<h2>Create new post</h2>

							<form  encType="multipart/form-data">
								{inputs}
								<p>
									<input type="file" name="image" accept={"image/png, image/jpeg"} className="field" onChange={this.handleUpload}/>
								</p>
								<button onClick={this.handleSubmit}>Create</button>
							</form>
						</div>
					</div>
				</Toolbar>
			</AppBar>
		)
	}
}

class UpdateDialog extends React.Component {
	constructor(props) {
		super(props);
		this.state = { image: null };
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleUpload = this.handleUpload.bind(this);
	}

	handleUpload(e) {
		this.setState({
			image: e.target.files[0],
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		const formData = new FormData();
		this.props.attributes.forEach(attribute => {
			formData.append(attribute, ReactDOM.findDOMNode(this.refs[attribute]).value.trim());
		});
		formData.append("image", this.state.image);
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

						<form encType={"multipart/form-data"}>
							{inputs}
							<p>
								<input type="file" name="image" accept={"image/png, image/jpeg"} className="field" onChange={this.handleUpload}/>
							</p>
							<button onClick={this.handleSubmit}>Update</button>
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
			// <Post key={index} post={this.props.posts[key]} attributes={this.props.attributes} onUpdate={this.props.onUpdate} onDelete={this.props.onDelete}/>
			<Post key={index} value={this.props.posts[key]}/>
		);

		return (
			<div>
				{/*<input ref="pageSize" defaultValue={this.props.pageSize}/>*/}
				<table>
					<tbody>
						{/*<tr>*/}
						{/*	<th>Name</th>*/}
						{/*	<th>Rating</th>*/}
						{/*	<th>Description</th>*/}
						{/*</tr>*/}
						{posts}
					</tbody>
				</table>
			</div>
		)
	}
}

ReactDOM.render(
    <App url={'/'} />,
    document.getElementById('react')
)
