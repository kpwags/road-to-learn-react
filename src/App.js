import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

const DEFAULT_QUERY = 'redux';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

// const list = [
//     {
//         title: 'React',
//         url: 'https://facebook.github.io/react/',
//         author: 'Jordan Walke',
//         num_comments: 3,
//         points: 4,
//         objectID: 0
//     },
//     {
//         title: 'Redux',
//         url: 'https://github.com/reactjs/redux',
//         author: 'Dan Abramov, Andrew Clark',
//         num_comments: 2,
//         points: 5,
//         objectID: 1
//     }
// ];

const isSearched = searchTerm => item =>
    !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase());

const Search = ({ value, onChange, children }) =>
    <form>
        {children} <input type="text" value={value} onChange={onChange} />
    </form>;

const Table = ({ list, pattern, onDismiss }) =>
    <div className="table">
        {list.filter(isSearched(pattern)).map(item =>
            <div key={item.objectID} className="table-row">
                <span style={{ width: '40%' }}>
                    <a href={item.url}>
                        {item.title}
                    </a>
                </span>
                <span style={{ width: '30%' }}>
                    Author: {item.author}
                </span>
                <span style={{ width: '10%' }}>
                    Comments: {item.num_comments}
                </span>
                <span style={{ width: '10%' }}>
                    Points: {item.points}
                </span>
                <span style={{ width: '10%' }}>
                    <Button
                        onClick={() => onDismiss(item.objectID)}
                        className="button-inline"
                    >
                        Dismiss
                    </Button>
                </span>
            </div>
        )}
    </div>;

/*
const Table = ({ list, pattern, onDismiss }) =>
    <div>
        { list.filter(isSearched(pattern)).map(item => 
            <Post
                id={item.objectID}
                url={item.url}
                title={item.title}
                author={item.author}
                num_comments={item.num_comments}
                points={item.points} 
                onDismiss={onDismiss} />
        )}
    </div>
*/

const Post = ({ id, url, title, author, num_comments, points, onDismiss }) =>
    <div key={id}>
        <span>
            <a href={url}>
                {title}
            </a>
        </span>
        <span>
            Author: {author}
        </span>
        <span>
            Comments: {num_comments}
        </span>
        <span>
            Points: {points}
        </span>
        <span>
            <Button onClick={() => onDismiss(id)}>Dismiss</Button>
        </span>
    </div>;

const Button = ({ onClick, className = '', children }) =>
    <button onClick={onClick} className={className} type="button">
        {children}
    </button>;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: null,
            searchTerm: DEFAULT_QUERY
        };
        this.setSearchTopstories = this.setSearchTopstories.bind(this);
        this.fetchSearchTopstories = this.fetchSearchTopstories.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
    }

    setSearchTopstories(result) {
        this.setState({ result });
    }

    fetchSearchTopstories(searchTerm) {
        fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
            .then(response => response.json())
            .then(result => this.setSearchTopstories(result))
            .catch(e => e);
    }

    componentDidMount() {
        const { searchTerm } = this.state;
        this.fetchSearchTopstories(searchTerm);
    }

    onDismiss(id) {
        const isNotId = item => item.objectID !== id;
        const updatedList = this.state.list.filter(isNotId);
        this.setState({ list: updatedList });
    }

    onSearchChange(event) {
        this.setState({ searchTerm: event.target.value });
    }

    render() {
        const { searchTerm, result } = this.state;

        if (!result) {
            return null;
        }

        return (
            <div className="page">
                <div className="interactions">
                    <Search value={searchTerm} onChange={this.onSearchChange}>
                        Search
                    </Search>
                </div>

                <Table
                    list={result.hits}
                    pattern={searchTerm}
                    onDismiss={this.onDismiss}
                />
            </div>
        );
    }
}

export default App;
