import React from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import QuestionOption from "./questionOption";
import {request} from "../../utils/APIUtils";
import {API_BASE_URL} from "../../constants/index";
import Checkbox from "@material-ui/core/es/Checkbox/Checkbox";

export default class Question extends React.Component {

    key = 0;

    state = {
        elements: [],
        optionsData: [],
        questionText: '',
        explanationText: '',
        multiple: false
    };


    addAnswer = (event) => {
        event.preventDefault();
        this.key++;
        this.setState(({elements, optionsData}) => {
            const newElement =
                <QuestionOption key={this.key} id={this.key} onDelete={this.deleteAnswer} updateData={this.updateData}/>;
            const newValue = [...elements, newElement];
            const newData = {
                id: this.key,
                text: '',
                correct: false
            };
            const newElementsData = [...optionsData, newData];
            return {
                elements: newValue,
                optionsData: newElementsData
            }
        });
        console.log(this.state.optionsData);
    };

    deleteAnswer = (id) => {
        this.setState(({elements, optionsData}) => {
            let idx = elements.findIndex((el) => el.props.id === id);
            const newElements = [...elements.slice(0,idx), ...elements.slice(idx+1)];
            idx = optionsData.findIndex((el) => el.id === id);
            const newElementsData = [...optionsData.slice(0,idx), ...optionsData.slice(idx+1)];
            return {
                elements: newElements,
                optionsData: newElementsData
            }
        });
        console.log(this.state.optionsData);
    };

    updateData = (body) => {
        this.setState(({optionsData}) => {
            const newElementsData = optionsData.map((item) => {
                if (item.id === body.id) {
                    item.text = body.answerText;
                    item.correct = body.correct;
                    return item;
                } else {
                    return item;
                }
            });
            return {
                optionsData: newElementsData
            }
        });
        console.log(this.state.optionsData);
    };

    saveQuestion = async () => {
        const {quizId, save} = this.props;
        const body = {
            quizId: quizId,
            text: this.state.questionText,
            explanation: this.state.explanationText,
            questionOptions: this.state.optionsData,
            type: this.state.multiple ? 'CHECKBOX' : 'RADIO_BUTTON'
        };
        request({
            url: API_BASE_URL + "/question",
            method: 'POST',
            body: JSON.stringify(body)
        }).then((responce) => {
            console.log('All good');
            save(responce);
        });
    };

    handleChange = name => (event) => {

        if (name === 'question') {
            this.setState({
                questionText: event.target.value
            })
        }
        if (name === 'explanation') {
            this.setState({
                explanationText: event.target.value
            })
        }
        if (name === 'multiple') {
            this.setState({
                multiple: event.target.checked
            })
        }
    };

    render() {

        return (
            <React.Fragment>
                <br/>
                <TextField
                    id="question"
                    label="Question"
                    multiline
                    rowsMax="4"
                    margin="normal"
                    variant="outlined"
                    value={this.state.questionText}
                    onChange={this.handleChange('question')}
                />
                <Checkbox
                    checked={this.state.multiple}
                    onChange={this.handleChange('multiple')}
                    color="primary"
                    value="multiple"/>
                <span >Multiple answer</span>
                <br/>
                {this.state.elements}
                <br/>
                <Button variant="contained" color="default" onClick={this.addAnswer}>Add Answer</Button>
                <br/>
                <TextField
                    id="explanation"
                    label="Explanation"
                    multiline
                    rowsMax="4"
                    margin="normal"
                    variant="outlined"
                    value={this.state.explanationText}
                    onChange={this.handleChange('explanation')}
                />
                <br/>
                <Button variant="contained" color="primary" onClick={this.saveQuestion}>Save</Button>
                <Button variant="contained" color="secondary">Delete</Button>
            </React.Fragment>
        );
    }
}