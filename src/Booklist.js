import React, { Component }  from 'react';
import BookItem from "./BookItem"
import { Link } from 'react-router-dom';

class Booklist extends Component {
	render(){
		const currentlyReadingList = this.props.books.filter(book => book.shelf==="current");
		const wantToReadList = this.props.books.filter(book => book.shelf==="wantToRead");
		const readList = this.props.books.filter(book => book.shelf==="read");
		return(
			<div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {currentlyReadingList.map((book) => (
                    	<BookItem key={book.title} book={book}/>
                    ))}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {wantToReadList.map((book) => (
                    	<BookItem key={book.title} book={book}/>
                    ))}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {readList.map((book) => (
                    	<BookItem key={book.title} book={book}/>
                    ))}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
            	<Link to="/search">Add a book</Link>
            </div>
          </div>
		)
	}
}

export default Booklist;