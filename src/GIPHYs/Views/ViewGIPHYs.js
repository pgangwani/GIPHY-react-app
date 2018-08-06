import React, { Component } from 'react';
import { GIPHY } from '../GIPHYAPI/GIPHYClass.js';
import ViewGIPHYThumb from './ViewGIPHYThumb.js';
import ViewGIPHYHeader from './ViewGIPHYHeader.js'

class ViewGIPHYs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      GIPHYObj: null,
      searchInRealTime: false,
      searchString: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleReturn = this.handleReturn.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.nextPage = this.nextPage.bind(this);
  }

  componentDidMount() {
    this.call_getGIPHYs();
  }

  async call_getGIPHYs() {
    let GIPHYObj = this.state.GIPHYObj;

    if ( GIPHYObj === null ) {
      let GIPHYObj = new GIPHY();
      this.setState( { GIPHYObj: GIPHYObj } );

      await GIPHYObj.getGIPHYs();
      this.forceUpdate();      
    } else {
      await GIPHYObj.getGIPHYs();
      this.forceUpdate();
    }
  }

  handleInputChange(event) {
    const target = event.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    let name = target.name;
    const { GIPHYObj } = this.state;

    this.setState({ [name]: value });

    if ( name === "searchString") {
      GIPHYObj.searchString = value;
    }

    if ( name === "searchString" && this.state.searchInRealTime ) {
      this.call_getGIPHYs();
    }
  }

  handleReturn(event) {
    //Search when user hits enter:
    if ( event.target.name === "searchString" && event.key === "Enter" ) {
      this.call_getGIPHYs();
    }
  }

  handleSearchClick() {
    this.call_getGIPHYs();
  }

  async nextPage() {
    let { GIPHYObj } = this.state;
    await GIPHYObj.incrementPage();

    this.forceUpdate();
  }

  render() {
    const { GIPHYObj, searchString, searchInRealTime } = this.state;
    const { handleInputChange, handleSearchClick, handleReturn, nextPage} = this;
    let content = <img key="loading-gif" src="https://media.giphy.com/media/xUOwG5iylTX8UT7EQg/giphy.gif" className="grid-loading" alt="loading..." />;
    //TODO: this default loading gif should not be inline.  There should be a function to call to get it. 

    if( GIPHYObj && GIPHYObj.data ) {
      //TODO:: Searchbox would really be a component/not in line like this, yet in interest of time...
      const searchbox = <React.Fragment>
        <div key="search-params- ">
          <label>Check this box to run search as you type.  (Not recommended on mobile)</label>
          <input key="giphy-search-in-real-time-input" type="checkbox" name="searchInRealTime" value={searchInRealTime} onChange={(e)=>handleInputChange(e)}/>
        </div>
        <div key="search-string-group" className="input-group">
          <input key="giphy-search-input" ref="giphy-search-input" name="searchString" type="search" className="form-control form-control-lg" placeholder="Type here to search for GIPHYs" value={searchString} onChange={(e)=>handleInputChange(e)} onKeyUp={(e)=>handleReturn(e)} />
          <span className="input-group-addon pointer" onClick={()=>handleSearchClick()}><span className="glyphicon glyphicon-search "></span></span>
        </div>
      </React.Fragment>;

      const gridViewOfGIPHYs = <div className="grid-container">
        {GIPHYObj.data.map( (eachGIPHYobj) => 
          <ViewGIPHYThumb key={eachGIPHYobj.id} giphy={eachGIPHYobj} />
        )}
      </div>;

      //TODO:: More link just gets next page of results.  Not really clear.
      //Add count per page,page#, clickable links to pages, previous, next << 1 2 3 >>
      //Ability to change those params
      content = <React.Fragment>
        <ViewGIPHYHeader giphy={GIPHYObj} />
        {searchbox}
        {gridViewOfGIPHYs}
        <button className="btn btn-primary" onClick={()=>nextPage()}>More...</button>
      </React.Fragment>;
    }
    
    return (
      content
    );
  }
}

export default ViewGIPHYs;
