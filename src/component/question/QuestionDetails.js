import React, { Component } from 'react';
import {Paper} from '@material-ui/core';
import RadioButtonDetails from './RadioButtonDetails';
import CheckBoxDetails from './CheckBoxDetails';

class QuestionDetails extends Component {

    state = {
        question: null,
        allQuizOptions: []
    };

    createOptionItem(id, value) {
        return {
            id,
            value
        }
    }

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps) {
        const { question : newQuestion } = this.props;
        const { question : prevQuestion } = prevProps;

        if (newQuestion !== prevQuestion) {
            this.updateItem();
        }
        if (newQuestion === null && prevQuestion !== null) {
            this.setState({ question: null, allQuizOptions: [] })
        }
    }

    updateItem() {
        const { question } = this.props;
        this.setState({ question });
    }

    checkBoxValueChange = id => event => {
        const { getDataFromDetails } = this.props;
        const { allQuizOptions } = this.state;
        const { checked } = event.target;

        const valIndex = allQuizOptions.findIndex(o => o.id === id);
        const newOptions = valIndex === -1 ?
            [
                ...allQuizOptions,
                this.createOptionItem(id, checked)
            ] : [
                ...allQuizOptions.slice(0, valIndex),
                ...allQuizOptions.slice(valIndex + 1),
                this.createOptionItem(id, checked)
            ];
        this.setState({ allQuizOptions: newOptions });
        getDataFromDetails(newOptions);
    };

    radioButtonValueChange = ( id, checkedValue ) => event => {
        const { getDataFromDetails } = this.props;
        const { allQuizOptions } = this.state;
        const { checked } = event.target;

        const valIndex = checkedValue ? allQuizOptions.findIndex(o => o.id === checkedValue) : null;
        const newOptions = checkedValue ?
            [
                ...allQuizOptions.slice(0, valIndex),
                ...allQuizOptions.slice(valIndex + 1),
                this.createOptionItem(parseInt(id), checked)
            ] : [
                ...allQuizOptions,
                this.createOptionItem(parseInt(id), checked)
            ];
        this.setState({ allQuizOptions: newOptions });
        getDataFromDetails(newOptions);
    };

    render() {
        const { question, allQuizOptions } = this.state;

        if (!question) {
            return <span>Select question</span>;
        }

        const { category, text, type, questionOptions, explanation } = question;

        return (
            <Paper style={{ textAlign: "center" }}>
                <h2>{text}</h2>
                <h3>{category}</h3>
                {
                    type === 'RADIO_BUTTON' ?
                        <RadioButtonDetails
                            questionOptions={questionOptions}
                            allQuizOptions={allQuizOptions}
                            valueChange={this.radioButtonValueChange}/>
                        :
                        <CheckBoxDetails
                            questionOptions={questionOptions}
                            allQuizOptions={allQuizOptions}
                            valueChange={this.checkBoxValueChange}/>
                }
                <h5 style={{ marginTop: "20px" }}>{explanation}</h5>
            </Paper>
        );
    }
}

export default QuestionDetails;