import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

const list = [
    {
        title: 'React',
        url: 'https://facebook.github.io/react/',
        author: 'Jordan Walke',
        num_comments: 3,
        points: 4,
        objectID: 0,
    },
    {
        title: 'Redux',
        url: 'https://github.com/reactjs/redux',
        author: 'Dan Abramov, Andrew Clark',
        num_comments: 2,
        points: 5,
        objectID: 1,
    }
];

const isSearched = (searchTerm) => (item) =>
    !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase());

class Search extends Component {
    render() {
        const { value, onChange, children } = this.props;
        return (
            <div>
                <form>
                    {children}:&nbsp;
                    <input 
                        type="text" 
                        value={value}
                        onChange={onChange}
                    />
                </form>
                <hr/>
            </div>
        );
    }
}

class Table extends Component {
    render() {
        const { list, pattern, onDismiss } = this.props;
        return (
            <div>
                { list.filter(isSearched(pattern)).map(item => 
                    <div key={item.objectID}> 
                        <span><a href={item.url}>{item.title}</a></span><br/>
                        <span>Author: {item.author}</span><br/>
                        <span>Comments: {item.num_comments}</span><br/>
                        <span>Points: {item.points}</span><br/>
                        <span>
                            <Button
                                onClick={() => onDismiss(item.objectID)}
                            >
                                Dismiss
                            </Button>
                        </span>
                        <hr/>
                    </div>
                )}
            </div>
        );
    }
}

class Button extends Component { 
    render() {
        const { 
            onClick,
            className = '', 
            children 
        } = this.props;

        return ( 
            <button
                onClick={onClick}
                className={className}
                type="button"
            >
                {children}
            </button> 
        );
    }
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list,
            searchTerm: ''
        }; 
        this.onSearchChange = this.onSearchChange.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
    }

    onDismiss(id) {
        const isNotId = item =>  item.objectID !== id;
        const updatedList = this.state.list.filter(isNotId);
        this.setState({ list: updatedList });
    }

    onSearchChange(event) {
        this.setState({ searchTerm: event.target.value });
    }

    render() {
        const { searchTerm, list } = this.state;
        return (
            <div className="App">
                <Search 
                    value={searchTerm} 
                    onChange={this.onSearchChange}
                >
                    Search
                </Search>
                <Table
                    list={list}
                    pattern={searchTerm} 
                    onDismiss={this.onDismiss}
                />
            </div>
        );
    }
}

export default App;
