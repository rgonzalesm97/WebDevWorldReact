import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import Global from '../Global';
import Sidebar from './Sidebar';
import Moment from 'react-moment';
import swal from 'sweetalert';
import noImage from '../assets/images/nopichorizontal.png';

class Article extends Component {

    url = Global.url;

    state = {
        article: null,
        loading: true,
        isDeleted: false
    }

    componentDidMount() {
        this.getArticle();
    }

    getArticle() {
        axios.get(`${this.url}getone/${this.props.match.params.id}`)
            .then(resp => {
                this.setState({
                    article: resp.data.article,
                    loading: false
                })
            }).catch(error => {
                this.setState({
                    article: null,
                    loading: false
                })
            })
    }

    deleteArticle = (id) => {

        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this article!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                axios.delete(this.url + 'delete/' + id)
                    .then(resp => {
                        this.setState({
                            isDeleted: true
                        })
                        swal("Poof! Your article has been deleted!", {
                            icon: "success",
                        });
                    })
            } else {
                swal("Your article is safe!");
            }
        });

    }

    render() {

        if (this.state.isDeleted) {
            return <Redirect to='/blog' />
        }

        const article = this.state.article;
        return (
            <div className="center">
                <section id="content">
                    {this.state.loading &&
                        <h1 className="subheader">Loading...</h1>
                    }

                    {this.state.article && !this.state.loading &&
                        <article className="article-item article-detail">
                            <div className="image-wrap">
                                {article.image !== null ? (
                                    <img src={`${this.url}get-image/${article.image}`} alt="Paisaje" />
                                ) : (
                                    <img src={noImage} alt="unavailable" />
                                )
                                }
                            </div>

                            <h1 className="subheader">{article.title}</h1>
                            <span className="date">
                                <Moment locale='en-us' fromNow>{article.date}</Moment>
                            </span>
                            <p>
                                {article.content}
                            </p>

                            <button onClick={() => { this.deleteArticle(article._id) }} className="btn btn-danger">Delete</button>
                            <Link to={`/blog/edit/${this.props.match.params.id}`} className="btn btn-warning">Edit</Link>

                            <div className="clearfix"></div>
                        </article>
                    }

                    {!this.state.article && !this.state.loading &&
                        <h1>Article doesn't exist. Pleas try again later.</h1>
                    }

                </section>

                <Sidebar />

            </div>
        )
    }
}

export default Article;