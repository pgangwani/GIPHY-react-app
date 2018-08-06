import React, { Component } from 'react';
import ViewGIPHYThumbInfo from './ViewGIPHYThumbInfo.js';

class ViewGIPHYThumb extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    function FormatViewGIPHYThumb(props) {
      let displayThumb = "";
      if (props.giphy) {
        const giphy = props.giphy;
        let src = "https://media.giphy.com/media/" + giphy.id + "/200w_d.gif";
        //TODO: use the actual images array, yet in interest of time I'm going to use hard coded path

        displayThumb = <div key={`thumb${giphy.id}`} className="grid-item display-thumb" >
          <ViewGIPHYThumbInfo giphy={giphy} />
          <a key={`link_${giphy.id}`} href={giphy.url}><img key={`img_${giphy.id}`} src={src} alt={giphy.slug}/></a>
        </div>;
      }
      return displayThumb;
    }
    
    return (
      <FormatViewGIPHYThumb giphy={this.props.giphy} />
    );
  }
}

export default ViewGIPHYThumb;
