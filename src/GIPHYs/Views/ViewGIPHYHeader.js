import React, { Component } from 'react';

class ViewGIPHYHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    function FormatViewGIPHYHeader(props) {
      const {searchString, searching} = props.giphy;
      let greetingTXT = "Trending GIPHYs";

      if (searchString) {
        greetingTXT = `GIPHYs that match `;
      }
          


      return ( 
        <h1 className="jumbotron">{greetingTXT}<span className="font-italic">{searchString}</span>
          {/*
          //TODO:: Better formatting by designer needed here... Good to have feedback for user, so I left it.
          */}
        <p>{ searching && searchString ? `Currently searching for ${searchString}` : ""}&nbsp;</p></h1>
       );
    }
    
    return (
      <FormatViewGIPHYHeader giphy={this.props.giphy} />
    );
  }
}

export default ViewGIPHYHeader;





