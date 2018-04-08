import React from 'react'
import Header from './Header'
import BookShelf from './BookShelf'
import {Link} from 'react-router-dom'

const HomePage = (props) => (
    <div className="list-books">
        <Header />
        <div className="list-books-content">
        <div>
          <div className="bookshelf">
          <h2 className="bookshelf-title">Currently Reading</h2>
          <div className="bookshelf-books">
          <BookShelf 
              books={props.allBooks.filter(book => book.shelf==="currentlyReading")} 
              title="Currently Reading"
              onSelectChange={props.onSelectChange}
          />
          </div></div>
          <div className="bookshelf">
          <h2 className="bookshelf-title">Want To Read</h2>
          <div className="bookshelf-books"><ol className="books-grid">
          <BookShelf 
              books={props.allBooks.filter(book => book.shelf==="wantToRead")} 
              title="Want to read"
              onSelectChange={props.onSelectChange}
          />
          </ol></div></div>
          <div className="bookshelf">
          <h2 className="bookshelf-title">Read</h2>
          <div className="bookshelf-books"><ol className="books-grid">
          <BookShelf 
              books={props.allBooks.filter(book => book.shelf==="read")} 
              title="Read"
              onSelectChange={props.onSelectChange}
          />
          </ol></div></div>
        </div>
      </div>
      <div className="open-search">
        <Link to='/create'>Add a book</Link>
      </div>
    </div>
  )

export default HomePage;