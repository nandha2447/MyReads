import React from 'react';
import {Link} from 'react-router-dom'
import BookShelf from './BookShelf'

class SearchPage extends React.Component {
  render(){
    return (
      <div className="search-books">
      <div className="search-books-bar">
        <Link to='/' onClick={this.props.searchResultsClearHandler} className="close-search">Close</Link>
        <div className="search-books-input-wrapper">
          <input onChange={this.props.displayBooksHandler} type="text" placeholder="Search by title or author"/>
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
           {!!this.props.searchResults.length && 
              this.props.searchResults.map((obj)=>
                (<li key={obj.id}><BookShelf
                                    shelfValue={obj.shelf} 
                                    isSearch={true}
                                    selectId={obj.id}
                                    bookTitle={obj.title}
                                    authors={obj.authors}
                                    thumbnail={obj.imageLinks.thumbnail}
                                    onSelectChange={this.props.onSelectChange}/></li>))}
        </ol>
      </div>
    </div>
    )
  }
}

export default SearchPage;