import React, {Component} from 'react';
import Slider from './Slider';
import Sidebar from './Sidebar';
import Articles from './Articles';

class Home extends Component {
    render(){
        return (
            <>
                <Slider title="Welcome to WebDevWorld" isButton={true} size='slider-big'/>
                <div className="center">
                    <section id="content">
                        <h1 className="subheader">Last Articles</h1>
                        <Articles last={true}/>
                    </section>
                    <Sidebar blog={false}/>
                </div>
            </>
        )
    }
}

export default Home;