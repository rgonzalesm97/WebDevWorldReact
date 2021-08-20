import axios from 'axios';
import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import SimpleReactValidator from 'simple-react-validator';
import Global from '../Global';
import Sidebar from './Sidebar';
import swal from 'sweetalert';



class CreateArticle extends Component {

    constructor(props){
        super(props);
        this.validator = new SimpleReactValidator();
    }

    url = Global.url;

    title = React.createRef();
    content = React.createRef();

    state = {
        article: {},
        isCreated: false,
        file: null,
    }

    saveArticle = (e) => {
        e.preventDefault();

        const article = {
            title: this.title.current.value,
            content: this.content.current.value
        }

        if(this.validator.allValid()){
            axios.post(this.url+'save', article)
                .then(resp => {
                    if(resp.data.article){
                        const articleId = resp.data.article._id;
    
                        this.setState({
                            article: resp.data.article,
                        })

    
                        if(this.state.file !== null){
                            const formData = new FormData();
    
                            formData.append(
                                'file0',
                                this.state.file,
                                this.state.file.name
                            )
    
                            axios.post(this.url+'upload-image/'+articleId, formData)
                                .then(resp => {
                                    this.setState({
                                        article: resp.data.article,
                                        isCreated: true
                                    })
                                }).catch(error => {
                                    console.log(error)
                                })
                        }else{
                            this.setState({
                                isCreated: true
                            })
                        }

                        swal(
                            'Article created',
                            'Article was created correctly',
                            'success'
                        )
                    } 
                }).catch(error => {
                    console.log(error)
                })
        } else{
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
        this.setState ({
            article: {
                title: this.title.current.value,
                content: this.content.current.value
            }
        });
    }

    render(){
        if(this.state.isCreated){
            return <Redirect to='/blog' />
        }
        return(
            <div className="center">
                <section id="content">
                    <h1 className="subheader">Create Article</h1>

                    <form className="mid-form" onSubmit={this.saveArticle}>

                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input type="text" name="title" ref={this.title} onChange={this.changeState}/>

                            {this.validator.message('title', this.state.article.title, 'required')}
                        </div>

                        <div className="form-group">
                            <label htmlFor="content">Content</label>
                            <textarea name="content" ref={this.content} onChange={this.changeState}></textarea>

                            {this.validator.message('content', this.state.article.content, 'required')}
                        </div>

                        <div className="form-group">
                            <label htmlFor="file0">Image</label>
                            <input type="file" name="file0" onChange={this.setFile} />
                        </div>

                        <input type="submit" value="Save" className="btn btn-success" />
            
                    </form>
                </section>

                <Sidebar />
            </div>
        )
    }
}

export default CreateArticle;