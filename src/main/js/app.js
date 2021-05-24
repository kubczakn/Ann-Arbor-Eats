const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');

class App extends React.Component { 

	constructor(props) {
		super(props);
		this.state = {posts: []};
	}

	componentDidMount() { 
        // May want to use different logic for REST calls
        // TOOD: Change
		client({method: 'GET', path: '/api/posts'}).done(response => {
			this.setState({posts: response.entity._embedded.posts});
		});
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