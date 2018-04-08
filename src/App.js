import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchPage from './Components/SearchPage'
import HomePage from './Components/HomePage'
import {Route} from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    // currentlyReading: [],
    // wantToRead: [],
    // Read: [],
    allBooks: [],
    searchResults: []
  }

  getAPIbyID = (id) => {
    BooksAPI.get(id).then((particularBook)=>{
      console.log("getAPIbyId",particularBook)
    },()=>{
      console.log("Stupid book didn't load");
    })
  }

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
  displayBooksHandler = (e) => {
    const searchTerm = e.target.value;
    if(searchTerm){
      BooksAPI.search(searchTerm).then((res)=> {  
        const allBooksIdentifiers = this.booksSyncHandler()[0];
        const syncedBooks = this.booksSyncHandler()[1];
        // 1 for fitness, 4 for artifical intelligence
        console.log(syncedBooks)
        const modifiedResponse = syncedBooks.concat(res.filter(book => !allBooksIdentifiers.includes(book.id)));
        console.log(modifiedResponse)
        this.setState((currentState)=>({
          searchResults: [...modifiedResponse]   
        }))
      }, ()=> {this.setState({
          searchResults: []
      })})
    }
    else if(!searchTerm){
      console.log("empty the search page");
      this.setState(()=>({
        searchResults: []
      }))
    }
}

componentDidMount(){
  console.log("Nandha da");
  BooksAPI.getAll().then((book)=>{
    console.log("allbooks",book)
    this.setState({
      allBooks: Array.from(book)
      })
    }, ()=> {this.setState({
      allBooks: []
    })})
  }

  updateAPI = (id,value) => {
    BooksAPI.update({id},value).then((book)=>{
      console.log("API update success",book)
    },()=>{
      console.log("failure")
    })
  }

  getAPI = (id,value) => {
    BooksAPI.get(id).then((particularBook)=>{
      console.log("Stupid book",particularBook)
      particularBook.shelf=value
      console.log("Stupid book after shelving",particularBook)
    },()=>{
      console.log("Stupid book didn't load");
    })
  }
  onSelectChange = (e) =>{
    const {id,value} = e.target;
    console.log(id);
    console.log(value)
    //To check whether this is in homepage
    if(id!==undefined && this.state.allBooks.filter(book => book.id===id).length>0){
      console.log("we are inside Home page")
      if(value==="currentlyReading" || value==="wantToRead" || value==="read" ){
        console.log("one of the three values")
        this.updateAPI(id,value);
        this.setState((currentState)=>{ 
          allBooks: [...currentState.allBooks,Object.defineProperty(currentState.allBooks.filter(book=> book.id===id)[0],"shelf",{value})]
        })
      }
      // The below code snippet is working just fine.
      else if(value==="none"){
        console.log("none");
        this.setState((currentState)=>({
          allBooks: currentState.allBooks.filter(book=> book.id!==id)
        }))
        this.updateAPI(id,"none");
      }
    }

    if(id!==undefined && this.state.searchResults!==undefined && this.state.searchResults!==null){
      console.log("we are inside search page");
      if(value==="currentlyReading" || value==="wantToRead" || value==="read" ){      
        console.log("going inside the value check");
        this.setState((currentState)=>{ 
          allBooks: [...currentState.allBooks,Object.defineProperty(currentState.searchResults.filter(book=> book.id===id)[0],"shelf",{value})]
        })
        this.updateAPI(id,value);
      }
      else if(value==="none"){
        this.setState((currentState)=>({
          allBooks: currentState.allBooks.filter(book=> book.id!==id)
        }))
        this.updateAPI(id,"none");
      }
      // this.setState((currentState)=>({
      //   // searchResults: [...currentState.searchResults,...currentState.allBooks]
      //   allBooks: [...currentState.allBooks,searchResultBook]
      // }))
      
    }
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
                      onSelectChange={this.onSelectChange}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
