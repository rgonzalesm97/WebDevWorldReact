import React, { Component } from 'react';
import Slider from './Slider';
import Sidebar from './Sidebar';

class Form extends Component {

    firstName = React.createRef();
    lastName = React.createRef();
    email = React.createRef();
    description = React.createRef();

    state = {
        user: {}
    }

    onSubmit = (e) => {
        e.preventDefault();

        const user = {
            firstName: this.firstName.current.value,
            lastName: this.lastName.current.value,
            email: this.email.current.value,
            description: this.description.current.value
        }

        this.setState({
            user: user
        });
    }

    render() {
        return (
            <>
                <Slider
                    title="Form"
                    size='slider-small'
                />
                <div className="center">
                    <section id="content">

                        <h1 className="subheader">Form</h1>

                        {this.state.user.firstName &&
                            <p>First name: <strong>{this.state.user.firstName}</strong></p>
                        }
                        {this.state.user.lastName &&
                            <p>Last name: <strong>{this.state.user.lastName}</strong></p>
                        }
                        {this.state.user.email &&
                            <p>Email: <strong>{this.state.user.email}</strong></p>
                        }
                        {this.state.user.description &&
                            <p>Description: <strong>{this.state.user.description}</strong></p>
                        }

                        <form className="mid-form" onChange={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor="FirstName">First Name</label>
                                <input type="text" name="FirstName" ref={this.firstName} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="lastName">Last Name</label>
                                <input type="text" name="lastName" ref={this.lastName} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">email</label>
                                <input type="text" name="email" ref={this.email} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="comments">Comments</label>
                                <textarea name="comments" ref={this.description} ></textarea>
                            </div>

                            <div className="clearfix"></div>

                            <input type="submit" value="Enviar" className="btn btn-success" />

                        </form>

                    </section>

                    <Sidebar
                        blog={false}
                    />
                </div>
            </>
        )
    }
}

export default Form;