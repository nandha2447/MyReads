import React from 'react';

class BookShelfChanger extends React.Component{
    render(){
        return(
            <div className="book-shelf-changer">
                <select value={`${this.props.shelfValue}`} id={`${this.props.id}`} onChange={this.props.onSelectChange}>
                    <option value="none" disabled>Move to...</option>
                    <option value="currentlyReading" >Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
            </div>
        )
    }
}


export default BookShelfChanger
