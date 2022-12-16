import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        return (
            <div className='my-3'>
                <div className="card">
                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    position: 'absolute',
                    right: '0'
                }}> 
                    <span className="badge rounded-pill bg-danger"> {this.props.source} </span>
                </div>
                    <img src={!this.props.urlToImage?"https://www.pewresearch.org/wp-content/uploads/sites/8/2016/07/PJ_2016.07.07_Modern-News-Consumer_0-01.png":this.props.urlToImage} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{this.props.title}</h5>
                        <p className="card-text">{this.props.description}</p>
                        <p className="card-text"><small className="text-muted">By {!this.props.author ? "Unknown" : this.props.author} on  {new Date(this.props.date).toGMTString()}</small></p>
                        <a rel="noreferrer" href={this.props.url} target="_blank" className="btn btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem