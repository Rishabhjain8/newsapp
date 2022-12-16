// import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

export class App extends Component {
  pageSize = 8;
  apiKey = process.env.REACT_APP_NEWS_API;
  state = {
    progress: 0
  }

  setProgress = (progress) => {
    this.setState({ progress: progress })
  }
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
            height={3}
            color='#f11946'
            progress={this.state.progress}
          />
          <Routes>
            <Route exact path="/" element={<News key="home" setProgress={this.setProgress} apiKey={this.apiKey} pageSize={this.pageSize} country="in" category="general" />} />
            <Route exact path="/business" element={<News key="business" setProgress={this.setProgress} apiKey={this.apiKey} pageSize={this.pageSize} country="in" category="business" />} />
            <Route exact path="/entertainment" element={<News key="entertainment" setProgress={this.setProgress} apiKey={this.apiKey} pageSize={this.pageSize} country="in" category="entertainment" />} />
            <Route exact path="/general" element={<News key="general" setProgress={this.setProgress} apiKey={this.apiKey} pageSize={this.pageSize} country="in" category="general" />} />
            <Route exact path="/health" element={<News key="health" setProgress={this.setProgress} apiKey={this.apiKey} pageSize={this.pageSize} country="in" category="health" />} />
            <Route exact path="/science" element={<News key="science" setProgress={this.setProgress} apiKey={this.apiKey} pageSize={this.pageSize} country="in" category="science" />} />
            <Route exact path="/sports" element={<News key="sports" setProgress={this.setProgress} apiKey={this.apiKey} pageSize={this.pageSize} country="in" category="sports" />} />
            <Route exact path="/technology" element={<News key="technology" setProgress={this.setProgress} apiKey={this.apiKey} pageSize={this.pageSize} country="in" category="technology" />} />
          </Routes>
        </Router>

      </div>
    )
  }
}

export default App;
