import React, { Component } from 'react';
import BookItem from "./BookItem";
import { Link } from "react-router-dom";
import * as BooksAPI from './BooksAPI';

class SearchBook extends Component {
	state = {
		searchedBooks: [],
		query: "",
		keywords: ['Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'History', 'History', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Program Javascript', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS']
	}

	searchBooks = query => {
	  	if(query){
	  		BooksAPI.search(query,10).then( result => {
	  			let searchedBooks = Array.from(result);
			  	this.setState( state => {
			  		state.searchedBooks = searchedBooks;
			  	});
	  		})
	  	}
	  	this.setState({ query: query });
	}

	searchKeywords = e => {
		let query = e.target.innerText;
		this.setState({ query: query });
		this.searchBooks(query);
	}

	render() {
		return(
			<div className="search-books">
			  <div className="search-books-bar">
			  	<Link to="/" className="close-search">Close</Link>
			    <div className="search-books-input-wrapper">
			      <input
			      	id="searchInput"
			      	type="text"
			      	placeholder="Search by title or author"
			      	value={this.state.query}
			      	onChange={ e => {this.searchBooks(e.target.value)}}
			      	/>
			    </div>
			  </div>
			  <div className="search-keywords">
			  	{this.state.keywords.map( (keyword,index) => (
			  		<p key={index} className="search-keyword" onClick={this.searchKeywords}>{keyword}</p>
			  	))}
			  </div>
			  {this.state.query && <div className="search-books-results">
			    <ol className="books-grid">
			    	{this.state.searchedBooks.map((book) => (
			    	    <BookItem key={book.id} book={book} onMoveShelf={this.props.onMoveShelf}/>
			    	))}
			    </ol>
			  </div>}
			</div>
		)
	}
}

export default SearchBook;