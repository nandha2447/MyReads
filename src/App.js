import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchPage from './Components/SearchPage'
import HomePage from './Components/HomePage'
import {Route} from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    allBooks: [],
    searchResults: []
  }

  //booksSyncHandler partially helps sync the state of the select dropdown of the same items in HomePage and SearchPage
  booksSyncHandler = () => {
    let allBooksIdentifiers = this.state.allBooks.map(book=>book.id);
        const searchResultsIdentifiers = this.state.searchResults.map(book=>book.id);
        let syncedBooks=[];
        if(searchResultsIdentifiers!==null && searchResultsIdentifiers !==undefined){
          //allBooksIdentifiers contains an array of ids which is there in home page
          allBooksIdentifiers = allBooksIdentifiers.filter(val => searchResultsIdentifiers.includes(val));
          //syncedBooks contains an array of book objects which is there in home page
          syncedBooks = this.state.allBooks.filter(book => searchResultsIdentifiers.includes(book.id));
          return [allBooksIdentifiers,syncedBooks];
    }
  }

  //displayBooksHandler is responsible for displaying books based on the search term in the Search Page
  displayBooksHandler = (e) => {
    const searchTerm = e.target.value;
    if(searchTerm){
      BooksAPI.search(searchTerm).then((res)=> {  
        const allBooksIdentifiers = this.booksSyncHandler()[0];
        const syncedBooks = this.booksSyncHandler()[1];
        const modifiedResponse = syncedBooks.concat(res.filter(book => !allBooksIdentifiers.includes(book.id)));
        this.setState((currentState)=>({
          searchResults: [...modifiedResponse]   
        }))
      }, ()=> {this.setState({
          searchResults: []
      })})
    }
    else if(!searchTerm){
      this.setState(()=>({
        searchResults: []
      }))
    }
  }

  // Using React's lifecycle method to display the books on PageLoad
  componentDidMount(){
    BooksAPI.getAll().then((book)=>{
      this.setState({
        allBooks: Array.from(book)
        })
    }, ()=> {this.setState({
        allBooks: []
    })})
  }

  //updateAPI does exactly what it is supposed to do
  updateAPI = (id,value) => {
    BooksAPI.update({id},value).then((book)=>{
      console.log("API update success",book)
    },()=>{
      console.log("API update failed")
    })
  }

  //onSelectChange is the handler for select dropdown for both pages(HomePage and SearchPage)
  onSelectChange = (e) =>{
    const {id,value} = e.target;    
    if(id!==undefined && this.state.allBooks.filter(book => book.id===id).length>0){
      console.log("we are inside Home page")
      if(value==="currentlyReading" || value==="wantToRead" || value==="read" ){
        console.log("one of the three values")
        this.updateAPI(id,value);
        this.setState((currentState)=>{           
          allBooks: [...currentState.allBooks,Object.defineProperty(currentState.allBooks.filter(book=> book.id===id)[0],"shelf",{value: value, configurable: true})]
        })
      }
      else if(value==="none"){
        console.log("none");
        this.setState((currentState)=>({
          allBooks: currentState.allBooks.filter(book=> book.id!==id)
        }))
        this.updateAPI(id,"none");
      }
    }
    if(id!==undefined && this.state.searchResults!==undefined && this.state.searchResults!==null && this.state.searchResults.length>0){
      console.log("we are inside search page");
      if(value==="currentlyReading" || value==="wantToRead" || value==="read"){      
        console.log("going inside the value check");
        this.setState((currentState)=>({ 
          allBooks: [...currentState.allBooks,Object.defineProperty(currentState.searchResults.filter(book=> book.id===id)[0],"shelf",{value})]
        }))
        this.updateAPI(id,value);
      }
      else if(value==="none"){
        this.setState((currentState)=>({
          allBooks: currentState.allBooks.filter(book=> book.id!==id)
        }))
        this.updateAPI(id,"none");
      }
    }
  }
  //To clear searchResults array when user navigates back to HomePage
  searchResultsClearHandler = () => {
    this.setState(()=>({
      searchResults: []
    }))
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={()=> (
          <HomePage 
              allBooks={this.state.allBooks}
              onSelectChange={this.onSelectChange}
          />
        )}/>
        <Route path='/create' render={()=> (
          <SearchPage searchResults={this.state.searchResults} 
                      displayBooksHandler={this.displayBooksHandler}
                      onSelectChange={this.onSelectChange}
                      searchResultsClearHandler={this.searchResultsClearHandler}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
