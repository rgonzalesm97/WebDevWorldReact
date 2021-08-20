import axios from 'axios';
import React, { Component } from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';


import noImage from '../assets/images/nopic.png'
import Global from '../Global'


class Articles extends Component {

    url = Global.url;

    state = {
        articles: [],
        loading: true
    }

    componentDidMount() {

        const query = this.props.query;

        if(this.props.last){
            this.getLastArticles();
        }else if (query && query !== null && query !== undefined) {
            this.getArticlesByQuery(query);
        }else{
            this.getArticles();
        }
    }

    getArticles() {
        axios.get(`${this.url}get`)
            .then(resp => {
                this.setState({
                    articles: resp.data.articles,
                    loading: false
                })
            });
    }

    getLastArticles() {
        axios.get(`${this.url}get/last`)
            .then(resp => {
                this.setState({
                    articles: resp.data.articles,
                    loading: false
                })
            });
    }

    getArticlesByQuery(query) {
        
        axios.get(`${this.url}search/${query}`)
            .then(resp => {
                this.setState({
                    articles: resp.data.articles,
                    loading: false
                })
            }).catch(error => {
                this.setState({
                    articles: [],
                    loading: false
                })
            })
    }

    renderArticles = () => {
        return this.state.articles.map((article, i) => (
            <article key={i} className="article-item" id="article-template">
                <div className="image-wrap">
                    {
                        article.image !== null ? (
                            <img src={`${this.url}get-image/${article.image}`} alt="Paisaje" />
                        ) : (
                            <img src={noImage} alt="unavilable" />
                        )
                    }
                </div>

                <h2>{article.title}</h2>
                <span className="date">
                    <Moment locale='en-us' fromNow>{article.date}</Moment>  
                </span>
                <Link to={`/blog/article/${article._id}`}>Leer más</Link>

                <div className="clearfix"></div>
            </article>
        ))
    }

    render() {
        if (this.state.loading) {
            return (
                <div id="articles">
                    <h1>Loading...</h1>
                </div>
            )
        } else {
            if (this.state.articles.length === 0) {
                return (
                    <div id="articles">
                        <h1 className="subheader">No articles found</h1>
                    </div>
                )
            } else {
                return (
                    <div id="articles">
                        {this.renderArticles()}
                    </div>
                )
            }
        }

    }
}

export default Articles;