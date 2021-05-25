const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');

class App extends React.Component { 

	constructor(props) {
		super(props);
		this.state = {posts: []};
	}

	componentDidMount() { 
		// client({method: 'GET', path: '/api/posts'}).done(response => {
		// 	this.setState({posts: response.entity._embedded.posts});
		// });
		fetch("/api/posts")
			.then((response) => {
				if (!response.ok) throw Error(response.statusText);
				return response.json();
			})
			.then((data) => {
				this.setState({posts: data._embedded.posts});
			})
			.catch((error) => console.log(error));
	}

	render() { 
		return (
			<PostList posts={this.state.posts}/>
		)
	}
}

class PostList extends React.Component{
	render() {
		const posts = this.props.posts.map(post =>
			<Post key={post._links.self.href} post={post}/>
		);
		return (
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
		)
	}
}

class Post extends React.Component{
	render() {
		return (
			<tr>
				<td>{this.props.post.name}</td>
				<td>{this.props.post.rating}</td>
				<td>{this.props.post.description}</td>
			</tr>
		)
	}
}

ReactDOM.render(
    <App />,
    document.getElementById('react')
)