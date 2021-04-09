import React, { Component } from 'react'
import SearchPage from './SearchPage'
import ShelvesPage from './ShelvesPage'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'

class BooksApp extends Component {

  state = {
  books: []
  }

  componentDidMount(){

    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }

  changeShelf = (book, shelf) => {
    if(this.state.books){
      BooksAPI.update(book,shelf).then(() => {
        book.shelf = shelf
        this.setState((state) => ({
          books: state.books.filter(c => c.id !== book.id).concat([book])
        }))
      })
    }
  }

  render() {
    return (
      <div className="app">

        <Route exact path='/' 
        render={() => ( 
        <ShelvesPage books={this.state.books} changeShelf={this.changeShelf} /> )}
        />

        <Route exact path='/search' 
				render={() => (
				<SearchPage changeShelf={this.changeShelf} books={this.state.books} /> )}/>
      </div>
    )
  }
}

export default BooksApp
