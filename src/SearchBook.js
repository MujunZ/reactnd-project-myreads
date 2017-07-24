import React, { Component } from 'react';
import BookItem from "./BookItem";
import { Link } from "react-router-dom";
import * as BooksAPI from './BooksAPI';

class SearchBook extends Component {
	state = {
		foundBooks: [],
		searchedBooks: [],
		query: ""
	}
	componentDidMount() {
	  BooksAPI.getAll().then(foundBooks => {
	  	this.setState( state => { state.foundBooks = foundBooks });
	  })
	}

	searchBooks = query => {
	  	let result = [];
	  	let searchTerm = query.toLowerCase();
	  	if(query)
	  		result = this.state.foundBooks.filter(book => book.title.toLowerCase().includes(searchTerm));
	  	this.setState( state => {
	  		state.searchedBooks = result;
	  		state.query = query;
	  	});
	}

	render() {
		return(
			<div className="search-books">
			  <div className="search-books-bar">
			  	<Link to="/" className="close-search">Close</Link>
			    <div className="search-books-input-wrapper">
			      <input
			      	type="text"
			      	placeholder="Search by title or author"
			      	value={this.state.query}
			      	onChange={ e => {this.searchBooks(e.target.value)}}
			      	/>
			    </div>
			  </div>
			  <div className="search-books-results">
			    <ol className="books-grid">
			    	{this.state.searchedBooks.map((book) => (
			    	    <BookItem key={book.title} book={book}/>
			    	))}
			    </ol>
			  </div>
			</div>
		)
	}
}

export default SearchBook;