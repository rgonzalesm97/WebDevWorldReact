import React, {Component} from 'react';

import Slider from './Slider';
import Sidebar from './Sidebar';
import Articles from './Articles';

class Blog extends Component {
    render(){
        return (
            <>
                <Slider title="Blog" isButton={false} size='slider-small'/>
                <div className="center">
                    <section id="content">
                        <Articles />
                    </section>
                    <Sidebar blog={true}/>
                </div>
            </>
        )
    }
}

export default Blog;