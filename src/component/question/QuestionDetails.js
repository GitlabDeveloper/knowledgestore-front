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
        const { questionId : newQuestionId } = this.props;
        const { questionId : prevQuestionId } = prevProps;

        if (newQuestionId !== prevQuestionId) {
            this.updateItem();
        }
        if (newQuestionId === null && prevQuestionId !== null) {
            this.setState({ question: null, allQuizOptions: [] })
        }
    }

    updateItem() {
        const { questions, questionId } = this.props;
        if (!questionId) {
            return;
        }
        const question = questions.find(o => o.id === questionId);
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

        const { category, text, type, questionOptions } = question;

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
            </Paper>
        );
    }
}

export default QuestionDetails;