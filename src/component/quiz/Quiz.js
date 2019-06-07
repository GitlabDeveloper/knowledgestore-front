import React, { Component } from 'react';
import QuestionList from '../question/QuestionList';
import QuestionDetails from "../question/QuestionDetails";
import { getQuizById, checkAnswers } from "../../store/quiz/actions";
import {Button} from "@material-ui/core";

class Quiz extends Component {

    state = {
        questionId: null,
        quizAnswers: [],
        quiz: {},
    };

    onItemSelected = (questionId) => {
        this.setState({ questionId })
    };

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id){
            this.setState({ questionId: null, quizAnswers: [], quiz: {} });
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

    nextQuestion = () => {
        const { questionId } = this.state;
        const { questions } = this.state.quiz;
        const questionIdIndex = questions.findIndex(question => question.id === questionId);
        this.setState( { questionId : questions[questionIdIndex + 1].id })
    };

    prevQuestion = () => {
        const { questionId } = this.state;
        const { questions } = this.state.quiz;
        const questionIdIndex = questions.findIndex(question => question.id === questionId);
        this.setState( { questionId : questions[questionIdIndex - 1].id })
    };

    check = () => {
        const answersIds = this.state.quizAnswers
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
        this.setState({ quizAnswers: data.filter(quizAnswer => quizAnswer.value) });
    };

    render() {
        const { questions } = this.state.quiz;
        const { questionId } = this.state;

        const firstElemId = questions ? questions[0].id : null;
        const lastElemId = questions ? questions[questions.length - 1].id : null;

        return (
            <div style={{ width: "90%", marginLeft: "5%", marginTop: "20px" }}>
                <QuestionList
                    questions={questions}
                    questionId={questionId}
                    answeredQuestions={this.state.quizAnswers}
                    onItemSelected={this.onItemSelected} />
                <QuestionDetails
                    questions={questions}
                    questionId={questionId}
                    getDataFromDetails={this.getDataFromDetails} />
                <div style={{ display: "flex", marginTop: "20px" }}>
                    {
                        questionId ?
                            firstElemId === questionId ?
                                null :
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={this.prevQuestion}
                                >
                                    Предыдущий
                                </Button>
                            : null
                    }
                    {
                        questionId ?
                            lastElemId === questionId ?
                                null :
                                <Button
                                    style={{ marginLeft: "auto" }}
                                    variant="contained"
                                    color="primary"
                                    onClick={this.nextQuestion}
                                >
                                    Следующий
                                </Button>
                            : null
                    }
                </div>
                {
                    questionId ?
                        <Button
                            style={{ display: "flex", marginLeft: "auto", marginTop: "20px",
                                background: 'linear-gradient(45deg, #3f51b5 25%, #ef2257 75%)'}}
                            variant="contained"
                            color="secondary"
                            onClick={this.check}
                        >
                            Отправить
                        </Button>
                        : null
                }
            </div>
        )
    }
}

export default Quiz;
