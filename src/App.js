import React from 'react';
import { Route } from 'react-router-dom';
import SearchBook from './SearchBook';
import Booklist from './Booklist'
import './App.css';
import * as BooksAPI from './BooksAPI';

class BooksApp extends React.Component {
  state = {
    books:[],
    shelves:[
      {
        "id": "currentlyReading",
        "name": "Currently Reading"
      },
      {
        "id": "wantToRead",
        "name": "Want to Read"
      },
      {
        "id": "read",
        "name":"Read"
      }
    ]
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState( state => {
        state.books = books;
      });
    })
  }

  moveShelf = (e,book) => {
    let shelf = e.target.value;
    this.setState(state => {
      if(!this.state.books.map(book => book.id).includes(book.id)){
        book.shelf = shelf;
        this.state.books.push(book);
        this.setState(this.state);
      } else if (shelf === "none") {
        book.shelf = shelf;
        let books = this.state.books.filter(book => book.shelf !== shelf);
        this.setState({books: books});
      } else {
        book.shelf = shelf;
        this.setState(this.state);
      }
    });

    BooksAPI.update(book, shelf);
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
            <Booklist books={this.state.books} shelves={this.state.shelves} shelfList={this.state.shelfList} onMoveShelf={this.moveShelf}/>
          )}/>
        <Route path="/search" render={({ history }) => (
            <SearchBook onMoveShelf={(e,book) => {
              this.moveShelf(e,book);
              //history.push("/"); // uncomment this, if we want to route back to the home page
            }}/>
          )}/>
      </div>
    )
  }
}

export default BooksApp;
