// Study Jam 21/07 - FEND P7 - My Reads Maeva NAP walk-through
import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import { Link } from 'react-router-dom'

class SearchPage extends Component{

  state= {
    query: '',
    searchResults:[]
  }

  updateQuery = (query) => {
    this.setState({
      query: query
    })
    this.updateSearchResults(query)            
  }

  updateSearchResults = (query) => {
    if(query){
      BooksAPI.search(query).then((searchResults) => {
        if(searchResults.error){
          this.setState({searchResults: []})  
        }else{
          this.setState({searchResults})
        }
      })
    }else{
      this.setState({query: '', searchResults: []})
    }
  }

  render(){
    const { books, changeShelf } = this.props
    const { query, searchResults } = this.state 
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search" > Close </Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" value={query}
              onChange={(event) => this.updateQuery(event.target.value) }
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {searchResults.map((searchResult) => {
              let shelf = 'none'
              books.map(book => (book.id === searchResult.id? shelf = book.shelf: '' ))
              return(<li key={searchResult.id}>
                      <Book book={searchResult}
                      changeShelf={changeShelf}
                      myShelf = {shelf}
                      />
                    </li>)
              })
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchPage