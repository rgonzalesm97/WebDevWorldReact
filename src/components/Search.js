import React, {Component} from 'react';

import Slider from './Slider';
import Sidebar from './Sidebar';
import Articles from './Articles';

class Search extends Component {

    render(){

        let query = this.props.match.params.query;

        return (
            <>
                <Slider 
                    title={'Search: ' + query} 
                    isButton={false} 
                    size='slider-small'
                />
                <div className="center">
                    <section id="content">
                        <Articles query={query}/>
                    </section>
                    <Sidebar blog={true}/>
                </div>
            </>
        )
    }
}

export default Search;