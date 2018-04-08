import React from 'react'
import BookShelfChanger from './BookShelfChanger'

const BookShelf = (props) => (
  <div>
    {props.isSearch && <div className="bookshelf"><div className="bookshelf-books"><ol className="books-grid"><li>           
          <div className="book">
            <div className="book-top">
              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${props.thumbnail})`}}></div>
              <BookShelfChanger shelfValue={props.shelfValue} id={props.selectId} onSelectChange={props.onSelectChange}/>
            </div>
              <div>
                <div className="book-title">{props.bookTitle}</div>
                <div className="book-authors">{(props.authors!==undefined && `${props.authors[0]}`)}</div>
              </div>
              </div>
        </li></ol></div></div>}
  {!!props.books && <ol className="books-grid">
    {props.books.map((book)=>(    
      <li key={book.id}>
        <div  className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
            <BookShelfChanger shelfValue={book.shelf} id={book.id} onSelectChange={props.onSelectChange}/>
          </div>
          <div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{(book.authors!==undefined && `${book.authors[0]}`)}</div>
          </div>
        </div>
      </li>
      ))}
    </ol>
    }
  </div>
)

export default BookShelf;