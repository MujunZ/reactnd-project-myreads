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
    if(shelf !== book.shelf){
      BooksAPI.update(book, shelf).then(() => {
        book.shelf = shelf;
        this.setState({
          books: this.state.books.filter(b => b.id !== book.id).concat([book])
        })
      });
    }
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
            <Booklist books={this.state.books} shelves={this.state.shelves} onMoveShelf={this.moveShelf}/>
          )}/>
        <Route path="/search" render={({ history }) => (
            <SearchBook
              books={this.state.books}
              onMoveShelf={(e,book) => {
              this.moveShelf(e,book);
              //history.push("/"); // uncomment this, if we want to route back to the home page
            }}/>
          )}/>
      </div>
    )
  }
}

export default BooksApp;
