import React, { Component } from 'react';
import {Button, Paper} from '@material-ui/core';

class QuestionList extends Component {

    state = {
        currentQuestion: null,
        answeredQuestions: []
    };

    componentDidUpdate(prevProps) {
        const { quizId : newQuizId, answeredQuestions: newAnsweredQuestions, question: newQuestion } = this.props;
        const { quizId : prevQuizId, answeredQuestions: prevAnsweredQuestions, question: prevQuestion } = prevProps;

        if (newQuizId !== prevQuizId) {
            this.setState({ currentQuestion: null, answeredQuestions: [] })
        }
        if (newAnsweredQuestions !== prevAnsweredQuestions) {
            this.setState({ answeredQuestions: newAnsweredQuestions})
        }
        if (newQuestion !== prevQuestion) {
            this.setState({ currentQuestion: newQuestion })
        }

    }

    currentQuestionChanged(question) {
        const { answeredQuestions } = this.props;
        if (answeredQuestions) this.setState({ answeredQuestions: answeredQuestions });
        this.setState({ currentQuestion: question });
    }

    render() {
        const { questions, onItemSelected } = this.props;
        const { currentQuestion, answeredQuestions } = this.state;

        let index = 0;
        const questionsPaper = questions !== undefined ? questions.map(question => {
            const { id, questionOptions } = question;
            index++;

            const answeredQuestion = answeredQuestions.some(o => questionOptions.some(a => a.id === o.id));
            const buttonStyle = question === currentQuestion ?
                { background: "#22efef", boxShadow: "0 0 12px #22efef" }
                : answeredQuestion ?
                    { background: "#DAF7A6" }
                    : {};

            return (
                <Button
                    key={id}
                    style={buttonStyle}
                    onClick={() => { onItemSelected(question); this.currentQuestionChanged(question) }}
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
