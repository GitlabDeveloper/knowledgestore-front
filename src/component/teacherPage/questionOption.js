import React, {Component} from 'react';
import TextField from "@material-ui/core/es/TextField/TextField";
import Checkbox from "@material-ui/core/es/Checkbox/Checkbox";
import Button from "@material-ui/core/es/Button/Button";

export default class QuestionOption extends Component {

    state = {
        correct: false,
        answerText: ''
    };

    delete = () => {
        this.props.onDelete(this.props.id);
    };


    render() {

        const handleChange = name => (event) => {
            if (name === 'checkBox') {
                this.setState({
                    correct: event.target.checked
                })
            }
            if (name === 'text') {
                this.setState({
                    answerText: event.target.value
                })
            }
            this.props.updateData({
                id: this.props.id,
                answerText: name === 'text' ? event.target.value : this.state.answerText,
                correct: name === 'checkBox' ? event.target.checked : this.state.correct
            })
        };

        return (
            <div >
                <TextField
                    label="Answer"
                    multiline
                    rowsMax="4"
                    margin="normal"
                    variant="outlined"
                    value={this.state.answerText}
                    onChange={handleChange('text')}
                />
                <Checkbox
                    checked={this.state.correct}
                    onChange={handleChange('checkBox')}
                    color="primary"
                    value="checkBox"/>
                <Button variant="contained" color="default" onClick={this.delete}>Delete</Button>
            </div>
        );
    }
}