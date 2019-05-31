import React, {Component} from 'react';
import {request} from "../../utils/APIUtils";
import {API_BASE_URL} from "../../constants/index";
import TextField from "@material-ui/core/es/TextField/TextField";
import Button from "@material-ui/core/es/Button/Button";

export default class NewQuiz extends Component {

    state = {
        name: '',
        description: ''
    };

    createQuiz = () => {
        let body = {
            name: this.state.name,
            description: this.state.description
        };
        request({
            url: API_BASE_URL + "/quiz/create",
            method: 'POST',
            body: JSON.stringify(body)
        }).then((responce) => {
            this.props.create(responce)
        });
    };

    handleChange = name => (event) => {
        if (name === 'name') {
            this.setState({
                name: event.target.value
            })
        }
        if (name === 'description') {
            this.setState({
                description: event.target.value
            })
        }
    };

    render() {
        return (
            <React.Fragment>
                <TextField
                    label="Name"
                    multiline
                    rowsMax="4"
                    margin="normal"
                    variant="outlined"
                    value={this.state.name}
                    onChange={this.handleChange('name')}
                />
                <br/>
                <TextField
                    label="Description"
                    multiline
                    rowsMax="4"
                    margin="normal"
                    variant="outlined"
                    value={this.state.description}
                    onChange={this.handleChange('description')}
                />
                <br/>
                <Button variant="contained" color="primary" onClick={this.createQuiz}>Save</Button>
            </React.Fragment>
        )
    }
}