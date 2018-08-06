import React, { Component } from 'react';

class ViewGIPHYThumbInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    function FormatViewGIPHYThumbInfo(props) {
      let hashtags = "";

      if ( props.giphy ) {
      	const {id,slug} = props.giphy;
        const hashtagsArray = slug.split("-");
        hashtags = hashtagsArray.filter(slugwithoutid => slugwithoutid !== id).map( eachHasTag => `#${eachHasTag} ` );
      }

      return hashtags;
    }
    
    return (
      <FormatViewGIPHYThumbInfo giphy={this.props.giphy} />
    );
  }
}

export default ViewGIPHYThumbInfo;





