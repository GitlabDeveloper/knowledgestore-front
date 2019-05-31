import React, { Component } from 'react';
import connect from "react-redux/es/connect/connect";
import QuestionList from '../question/QuestionList';
import QuestionDetails from "../question/QuestionDetails";
import { getQuizById, checkAnswers } from "../../store/quiz/actions";
import {Button} from "@material-ui/core";

class Quiz extends Component {

    quizAnswers = null;

    state = {
        questionId: null,
        quiz: {},
    };

    onItemSelected = (questionId) => {
        this.setState({questionId})
    };

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id){
            this.setState({ questionId: null });
            this.updateItem();
        }
    }

    extractId = ({ match }) => {
        const { id } = match.params;
        return id;
    };

    updateItem() {
        getQuizById(this.extractId(this.props))
            .then(response => {
                this.setState({quiz: response})
            }).catch(() => {
            this.setState({
                questionId: null,
                quiz: {}
            });
        });
    }

    check = () => {
        const answersIds = this.quizAnswers
            .filter(quizAnswer => quizAnswer.value)
            .map(quizAnswer => quizAnswer.id);
        const quizDataForCheck = {
            quizId: this.state.quiz.id,
            answerIds: [...answersIds]
        };
        checkAnswers(quizDataForCheck)
            .then(response => {
                alert(response.name);
            })
    };

    getDataFromDetails = (data) => {
        this.quizAnswers = data;
    };

    render() {
        const { questions } = this.state.quiz;
        const { questionId } = this.state;

        return (
            <React.Fragment>
                <QuestionList questions={questions} onItemSelected={this.onItemSelected}/>
                <QuestionDetails questions={questions} itemId={questionId} getDataFromDetails={this.getDataFromDetails}/>
                {
                    questionId ?
                        <Button variant="contained" color="secondary" onClick={this.check}> Отправить </Button>
                        : null
                }
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.authReducer.isAuthenticated,
        currentUser: state.authReducer.currentUser
    }
};

export default connect(mapStateToProps)(Quiz)
