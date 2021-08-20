import axios from 'axios';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import SimpleReactValidator from 'simple-react-validator';
import Global from '../Global';
import Sidebar from './Sidebar';
import swal from 'sweetalert';
import noImage from '../assets/images/nopichorizontal.png';



class EditArticle extends Component {

    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator();
        this.articleId = this.props.match.params.id;
    }

    componentDidMount() {
        this.getArticle(this.articleId)
    }

    url = Global.url;

    title = React.createRef();
    content = React.createRef();

    state = {
        article: {},
        isUpdated: false,
        file: null,
    }

    getArticle = (id) => {
        axios.get(`${this.url}getone/${id}`)
            .then(resp => {
                this.setState({
                    article: resp.data.article,
                });
            })
    }

    saveArticle = (e) => {
        e.preventDefault();

        if (this.validator.allValid()) {
            axios.put(this.url + 'update/' + this.articleId, this.state.article)
                .then(resp => {
                    if (resp.data.articleUpdated) {
                        const articleId = resp.data.articleUpdated._id;

                        this.setState({
                            article: resp.data.articleUpdated,
                        })


                        if (this.state.file !== null) {
                            const formData = new FormData();

                            formData.append(
                                'file0',
                                this.state.file,
                                this.state.file.name
                            )

                            axios.post(this.url + 'upload-image/' + articleId, formData)
                                .then(resp => {
                                    this.setState({
                                        article: resp.data.article,
                                        isUpdated: true
                                    })
                                }).catch(error => {
                                    console.log(error)
                                })
                        } else {
                            this.setState({
                                isUpdated: true
                            })
                        }

                        swal(
                            'Article updated',
                            'Article was updated correctly',
                            'success'
                        )
                    }
                }).catch(error => {
                    console.log(error)
                })
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    setFile = (event) => {
        this.setState({
            file: event.target.files[0]
        })
    }

    changeState = () => {
        this.setState({
            article: {
                title: this.title.current.value,
                content: this.content.current.value,
                image: this.state.article.image
            }
        });
    }

    render() {
        if (this.state.isUpdated) {
            return <Redirect to='/blog' />
        }
        return (
            <div className="center">
                <section id="content">
                    <h1 className="subheader">Edit Article</h1>

                    {this.state.article.title &&
                        <form className="mid-form" onSubmit={this.saveArticle}>

                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input type="text" name="title" defaultValue={this.state.article.title} ref={this.title} onChange={this.changeState} />

                                {this.validator.message('title', this.state.article.title, 'required')}
                            </div>

                            <div className="form-group">
                                <label htmlFor="content">Content</label>
                                <textarea name="content" defaultValue={this.state.article.content} ref={this.content} onChange={this.changeState}></textarea>

                                {this.validator.message('content', this.state.article.content, 'required')}
                            </div>

                            <div className="form-group">
                                <label htmlFor="file0">Image</label>
                                <input type="file" name="file0" onChange={this.setFile} />
                                <div className="image-wrap">
                                    {this.state.article.image !== null ? (
                                        <img src={`${this.url}get-image/${this.state.article.image}`} alt="Paisaje" className="thumb"/>
                                    ) : (
                                        <img src={noImage} alt="unavailable" className="thumb"/>
                                    )
                                    }
                                </div>
                            </div>
                            <div className="clearfix"></div>

                            <input type="submit" value="Save" className="btn btn-success" />

                        </form>
                    }
                    {!this.state.article.title &&
                        <h1 className="subheader">Loading...</h1>
                    }
                </section>

                <Sidebar />
            </div>
        )
    }
}

export default EditArticle;