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
              {this.props.shelves.map(shelf => (
              	<div key={shelf.id} className="bookshelf">
                  <h2 className="bookshelf-title">{shelf.name}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {shelf.id === "current" && currentlyReadingList.map((book) => (
                    	<BookItem key={book.title} book={book} onMoveShelf={this.props.onMoveShelf}/>
                    ))}
                    {shelf.id === "wantToRead" && wantToReadList.map((book) => (
                    	<BookItem key={book.title} book={book} onMoveShelf={this.props.onMoveShelf}/>
                    ))}
                    {shelf.id === "read" && readList.map((book) => (
                    	<BookItem key={book.title} book={book} onMoveShelf={this.props.onMoveShelf}/>
                    ))}
                    </ol>
                  </div>
                </div>
              ))}
            </div>
            <div className="open-search">
            	<Link to="/search">Add a book</Link>
            </div>
          </div>
		)
	}
}

export default Booklist;