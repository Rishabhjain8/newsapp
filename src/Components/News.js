import React, { Component } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types';
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";


class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general',
    }
    
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            totalResults: 0,
            pageSize: 8,
            page: 1,
            loading: true
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsShorts`;
    }

    fetchMoreData = async () => {   
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        this.setState({page: this.state.page+1}) 
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults
      })
    }

    updateNews = async () => {
        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        this.props.setProgress(40);
        let data = await fetch(url);
        this.props.setProgress(60);
        let parsedData = await data.json();
        this.props.setProgress(80);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
        this.props.setProgress(100);
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    } 
    
    // handlePrev = () => {
    //     this.setState({ page: this.state.page - 1 });
    //     this.updateNews();
    // }
    // handleNext = () => {
    //     this.setState({ page: this.state.page + 1 });
    //     this.updateNews();
    // }
    componentDidMount = () => {
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsShorts`;
        this.updateNews();
    }

    render() {
        return (
            <>
                <h1 className='text-center' style={{ margin: '35px 0px', marginTop: '90px' }}>NewsShorts - Top {this.capitalizeFirstLetter(this.props.category)} News</h1>
                {this.state.loading && <Spinner/>}

                <InfiniteScroll
                dataLength={this.state.articles.length}
                next={this.fetchMoreData}
                hasMore={this.state.articles.length !== this.state.totalResults}
                loader={<Spinner/>}
                > 
                <div className='container'>
                    <div className='row'>
                        {
                            this.state.articles.map((element) => {
                                return <div className='col-md-4' key={element.title}>
                                    <NewsItem title={element.title ? element.title : ""} urlToImage={element.urlToImage} url={element.url} description={element.description ? element.description : ""} source={element.source.name} author={element.author} date={element.publishedAt} />
                                </div>
                            })
                        }
                    </div>
                    {/* <div className='my-3 d-flex justify-content-between'>
                <button type="button" disabled={this.state.page<=1} className="btn btn-dark" onClick={this.handlePrev}>Previous</button>
                <button type="button" disabled={this.state.page >= Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-dark" onClick={this.handleNext}>Next</button>
            </div> */}
                </div>
                </InfiniteScroll>
            </>
        )
    }
}

export default News;