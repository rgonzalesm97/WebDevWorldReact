import React, {Component} from 'react';
import { Redirect, Link } from 'react-router-dom';

class Sidebar extends Component {

    query = React.createRef();

    state = {
        query: "",
        redirect: false
    }

    search = (e) => {
        e.preventDefault();

        this.setState({
            query: this.query.current.value,
            redirect: true
        })
    }
    

    render(){

        if(this.state.redirect){
            return <Redirect to={`/redirect/${this.state.query}`} />
        }
        return(
            <aside id="sidebar">
                {this.props.blog &&
                    <div id="nav-blog" className="sidebar-item">
                        <h3>Puedes hacer esto</h3>
                        <Link to='/blog/new' className="btn btn-success">Crear artículo</Link>
                    </div>
                }

                <div id="search" className="sidebar-item">
                        <h3>Buscador</h3>
                        <p>Encuentra el artículo que buscas</p>
                        <form onSubmit={this.search}>
                            <input type="text" name="search" ref={this.query}/>
                            <input type="submit" name="submit" value="Buscar" className="btn" />
                        </form>
                </div>
            </aside>
        );
    }
}

export default Sidebar;