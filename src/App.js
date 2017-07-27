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
    ],
    shelfList:[
      {currentlyReading: []},
      {wantToRead: []},
      {read: []}
    ]
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState( state => {
        state.books = books;
        state.shelfList.currentlyReading = books.filter(book => book.shelf==="currentlyReading");
        state.shelfList.wantToRead = books.filter(book => book.shelf==="wantToRead");
        state.shelfList.read = books.filter(book => book.shelf==="read");
      });
    })
  }

  moveShelf = (e,book) => {
    let shelf = e.target.value;
    const books = [];

    BooksAPI.update(book, shelf).then((shelfList) => {
      for (let i = 0; i < shelfList.currentlyReading.length; i++) {
        BooksAPI.get(shelfList.currentlyReading[i]).then(book => {
          books.push(book)});
      }
      for (let i = 0; i < shelfList.wantToRead.length; i++) {
        BooksAPI.get(shelfList.wantToRead[i]).then(book => {
          books.push(book)});
      }
      for (let i = 0; i < shelfList.read.length; i++) {
        BooksAPI.get(shelfList.read[i]).then(book => {
          books.push(book)});
      }
    });
    this.setState( state => ({ books: books }));
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
              history.push("/");
            }}/>
          )}/>
      </div>
    )
  }
}

export default BooksApp;
