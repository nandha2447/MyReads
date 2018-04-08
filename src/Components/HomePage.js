import React from 'react'
import Header from './Header'
import BookShelf from './BookShelf'
import {Link} from 'react-router-dom'

const HomePage = (props) => (
    <div className="list-books">
        <Header />
        <div className="list-books-content">
        <div>
          <h2 className="bookshelf-title">Currently Reading</h2>
          {console.log(props.allBooks+ "is props.allBooks")}
          <BookShelf 
              books={props.allBooks.filter(book => book.shelf==="currentlyReading")} 
              title="Currently Reading"
              onSelectChange={props.onSelectChange}
          />
          <h2 className="bookshelf-title">Want To Read</h2>
          <BookShelf 
              books={props.allBooks.filter(book => book.shelf==="wantToRead")} 
              title="Want to read"
              onSelectChange={props.onSelectChange}
          />
          <h2 className="bookshelf-title">Read</h2>
          <BookShelf 
              books={props.allBooks.filter(book => book.shelf==="read")} 
              title="Read"
              onSelectChange={props.onSelectChange}
          />
        </div>
      </div>
      <div className="open-search">
        <Link to='/create'>Add a book</Link>
      </div>
    </div>
  )

  export default HomePage;