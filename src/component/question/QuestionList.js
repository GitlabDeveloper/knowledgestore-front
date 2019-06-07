import React, { Component } from 'react';
import {Button, Paper} from '@material-ui/core';

class QuestionList extends Component {

    state = {
        currentQuestionId: null,
        answeredQuestions: []
    };

    componentDidUpdate(prevProps) {
        const { questions : newQuestions, answeredQuestions: newAnsweredQuestions, questionId: newQuestionId } = this.props;
        const { questions : prevQuestions, answeredQuestions: prevAnsweredQuestions, questionId: prevQuestionId } = prevProps;

        if (newQuestions !== prevQuestions) {
            this.setState({ currentQuestionId: null, answeredQuestions: [] })
        }
        if (newAnsweredQuestions !== prevAnsweredQuestions) {
            this.setState({ answeredQuestions: newAnsweredQuestions})
        }
        if (newQuestionId !== prevQuestionId) {
            this.setState({ currentQuestionId: newQuestionId })
        }

    }

    currentQuestionChanged(id) {
        const { answeredQuestions } = this.props;
        if (answeredQuestions) this.setState({ answeredQuestions: answeredQuestions });
        this.setState({ currentQuestionId: id });
    }

    render() {
        const { questions, onItemSelected } = this.props;
        const { currentQuestionId, answeredQuestions } = this.state;

        let index = 0;
        const questionsPaper = questions !== undefined ? questions.map((question) => {
            const { id, questionOptions } = question;
            index++;

            const answeredQuestion = answeredQuestions.some(o => questionOptions.some(a => a.id === o.id));
            const buttonStyle = id === currentQuestionId ?
                { background: "#22efef", boxShadow: "0 0 12px #22efef" }
                : answeredQuestion ?
                    { background: "#DAF7A6" }
                    : {};

            return (
                <Button
                    key={id}
                    style={buttonStyle}
                    onClick={() => { onItemSelected(id); this.currentQuestionChanged(id) }}
                >
                    {index}
                </Button>
            );
        }) : null;

        return (
            <Paper>
                {questionsPaper}
            </Paper>
        )
    }
}

export default QuestionList;
