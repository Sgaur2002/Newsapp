import React, { Component } from "react";
import './News'
export class NewsItem extends Component {
  render() {
    let {title,description,imageUrl,newsUrl,date,author,source}=this.props;
    return (
      <div>
        <div className="card my-3 mx-4" >
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...<span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{zIndex:'1', left:'90%'}}>{source}</span></h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-body-secondary">By {author?author:"Anonymous"} on {new Date(date).toLocaleString()}</small></p>             
            <a href={newsUrl} target="_blank" className="btn btn-sm btn-primary btn-dark">Read More</a> 
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
