import React, { Component } from 'react';
import { FormGroup, FormControlLabel, Checkbox, RadioGroup, Radio } from '@material-ui/core';

class QuestionDetails extends Component {

    state = {
        question: null,
        quizOptions: []
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
        const { itemId : newItemId, getDataFromDetails } = this.props;
        const { itemId : prevItemId } = prevProps;

        if (newItemId !== prevItemId) {
            this.updateItem();
        }
        if (newItemId === null && prevItemId !== null) {
            this.setState({ question: null, quizOptions: [] })
        }
        getDataFromDetails(this.state.quizOptions);
    }

    updateItem() {
        const { questions, itemId } = this.props;
        if (!itemId) {
            return;
        }
        const question = questions.find(o => o.id === itemId);
        this.setState({ question });
    }

    checkBoxValueChange = id => event => {
        const { quizOptions } = this.state;
        const { checked } = event.target;

        const valIndex = quizOptions.findIndex(o => o.id === id);
        const newOptions = valIndex === -1 ?
            [
                ...quizOptions,
                this.createOptionItem(id, checked)
            ] : [
                ...quizOptions.slice(0, valIndex),
                ...quizOptions.slice(valIndex + 1),
                this.createOptionItem(id, checked)
            ];
        this.setState({quizOptions: newOptions});
    };

    radioButtonValueChange = ( id, checkedValue ) => event => {
        const { quizOptions } = this.state;
        const { checked } = event.target;

        const valIndex = checkedValue ? quizOptions.findIndex(o => o.id === checkedValue) : null;
        const newOptions = checkedValue ?
            [
                ...quizOptions.slice(0, valIndex),
                ...quizOptions.slice(valIndex + 1),
                this.createOptionItem(parseInt(id), checked)
            ] : [
                ...quizOptions,
                this.createOptionItem(parseInt(id), checked)
            ];
        this.setState({quizOptions: newOptions});
    };

    render() {
        const { question, quizOptions } = this.state;

        if (!question) {
            return <span>Select question</span>;
        }

        const { category, text, type, questionOptions } = question;

        return (
            <React.Fragment>
                <h2>{text}</h2>
                <h3>{category}</h3>
                {
                    type === 'RADIO_BUTTON' ?
                        <RadioButtonDetails
                            questionOptions={questionOptions}
                            quizOptions={quizOptions}
                            valueChange={this.radioButtonValueChange}/>
                        :
                        <CheckBoxDetails
                            questionOptions={questionOptions}
                            quizOptions={quizOptions}
                            valueChange={this.checkBoxValueChange}/>
                }
            </React.Fragment>
        );
    }
}

export default QuestionDetails;

const RadioButtonDetails = ({ questionOptions, quizOptions, valueChange }) => {

    const value = questionOptions.find(questionOption => {
        return quizOptions.find(o => o.id === questionOption.id && o.value)
    });
    const checkedValue = value ? value.id : null;

    return (
        <RadioGroup
            value={`${checkedValue}`}
        >
            {
                questionOptions.map(option => {
                    const { id, text } = option;
                    return (
                        <FormControlLabel
                            key={id}
                            value={`${id}`}
                            control={<Radio onChange={valueChange(id, checkedValue)}/>}
                            label={text}
                        />
                    )
                })
            }
        </RadioGroup>
    )
};

const CheckBoxDetails = ({ questionOptions, quizOptions, valueChange }) => {
    return (
        <FormGroup>
            {
                questionOptions.map(questionOption => {
                    const { id, text } = questionOption;

                    const value = quizOptions.find(o => o.id === id);
                    const checkedValue = value ? value.value : null;

                    return (
                        <FormControlLabel
                            key={id}
                            control={ <Checkbox checked={checkedValue} onChange={valueChange(id)}/> }
                            label={text}
                        />
                    )
                })
            }
        </FormGroup>
    )
};