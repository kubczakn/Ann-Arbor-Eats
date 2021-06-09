'use strict';
import Header from "./Header.jsx";
import PostList from "./PostList.jsx";
import MapContainer from "./MapContainer.jsx";
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


// TODO: Modularize all of this, add logic to remove image from storage on delete

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {posts: {}};
		this.onCreate = this.onCreate.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.onUpdate = this.onUpdate.bind(this);
		this.onEdit = this.onEdit.bind(this);
	}

	loadFromServer() {
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

	// TODO: Have JSON body be parameter
	onEdit(id, element, value) {
		const url = `posts/${id}`;
		const body = {
			op: "replace",
			path: `/${element}`,
			value: value
		}
		fetch(url, {
			headers: {
				'Content-type': 'application/json-patch+json',
			},
			method: 'PATCH',
			credentials: 'same-origin',
			body: JSON.stringify(body)
		})
			.then((response) =>{
				if (!response.ok) throw Error(response.statusText);
				return response.json();
			})
			.then((data) => {
				const newPosts = this.state.posts;
				newPosts[data.id].rating = data.rating;
				this.setState({
					posts: newPosts,
				});
			})
			.catch((error) => console.log(error));

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
		// TODO: Pass location data to map for markers
		// TODO: Fix passing of props, destructuring, callbacks
		return (
			<Grid container direction={"column"}>
				{/*Header*/}
				<Header attributes={this.state.attributes} onCreate={this.onCreate}/>
				<Grid item xs={12}>
					<MapContainer/>
				</Grid>
				{/*Main content*/}
				<Grid item container>
					{/*Left Size*/}
					<Grid item xs={false} sm={2}/>
					{/*Middle*/}
					<Grid item xs={12} sm={8}>
						<PostList
							posts={this.state.posts}
							onDelete={this.onDelete}
							onUpdate={this.onUpdate}
							onEdit={this.onEdit}
						/>
					</Grid>
					{/*Right Size*/}
					<Grid item xs={false} sm={2}/>
				</Grid>
			</Grid>
		)
	}
}

// TODO: Modularize
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

ReactDOM.render(
    <App url={'/'} />,
    document.getElementById('react')
)
