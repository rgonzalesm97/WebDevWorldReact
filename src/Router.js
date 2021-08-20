import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Header from './components/Header';
import Home from './components/Home';
import Blog from './components/Blog';
import Form from './components/Form';
import Search from './components/Search';
import Article from './components/Article';
import CreateArticle from './components/CreateArticle';
import EditArticle from './components/EditArticle';


class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <Header />

                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/home' component={Home} />
                    <Route exact path='/blog' component={Blog} />
                    <Route exact path='/blog/article/:id' component={Article}/>
                    <Route exact path='/blog/search/:query' component={Search} />
                    <Route exact path='/redirect/:query' render={
                        props => {
                            var search = props.match.params.query;
                            return (
                                <Redirect to={`/blog/search/${search}`} />
                            )
                        }
                    } />
                    <Route exact path='/blog/new' component={CreateArticle} />
                    <Route exact path='/blog/edit/:id' component={EditArticle} />
                    <Route exact path='/form' component={Form} />

                    <Route component={Home} />
                </Switch>
            </BrowserRouter>
        )
    }
}

export default Router;