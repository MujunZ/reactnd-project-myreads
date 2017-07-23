import React, { Component } from 'react';
import BookItem from "./BookItem";
import { Link } from "react-router-dom";
import * as BooksAPI from './BooksAPI';

class SearchBook extends Component {
	state = {
		foundBooks: []
	}
	componentDidMount() {
	  BooksAPI.getAll().then(foundBooks => {
	  	this.setState({ foundBooks });
	  	console.log(this.state);
	  })
	}
	render() {
		return(
			<div className="search-books">
			  <div className="search-books-bar">
			  	<Link to="/" className="close-search">Close</Link>
			    <div className="search-books-input-wrapper">
			      <input type="text" placeholder="Search by title or author"/>
			    </div>
			  </div>
			  <div className="search-books-results">
			    <ol className="books-grid">
			    	{this.state.foundBooks.map((book) => (
			    	    <BookItem key={book.title} book={book}/>
			    	))}
			    </ol>
			  </div>
			</div>
		)
	}
}

export default SearchBook;