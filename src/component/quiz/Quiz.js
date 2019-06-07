import React, { Component } from 'react';
import QuestionList from '../question/QuestionList';
import QuestionDetails from "../question/QuestionDetails";
import { getQuizById, checkAnswers } from "../../store/quiz/actions";
import {Button} from "@material-ui/core";

class Quiz extends Component {

    state = {
        question: null,
        quizAnswers: [],
        quiz: {},
    };

    onItemSelected = (question) => {
        this.setState({ question })
    };

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id){
            this.setState({ question: null, quizAnswers: [], quiz: {} });
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
                this.setState({ quiz: response })
            }).catch(() => {
            this.setState({
                question: null,
                quiz: {}
            });
        });
    }

    nextQuestion = () => {
        const { question } = this.state;
        const { questions } = this.state.quiz;
        const questionIdIndex = questions.findIndex(q => q === question);
        this.setState( { question : questions[questionIdIndex + 1] })
    };

    prevQuestion = () => {
        const { question } = this.state;
        const { questions } = this.state.quiz;
        const questionIdIndex = questions.findIndex(q => q === question);
        this.setState( { question : questions[questionIdIndex - 1] })
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
                const sameQuestion = response.quizDTO.questions.find(question =>
                    question.id === this.state.question.id
                );
                this.setState({ quiz: response.quizDTO, question: sameQuestion });
                alert(response.quizResult);
            })
    };

    getDataFromDetails = (data) => {
        this.setState({ quizAnswers: data.filter(quizAnswer => quizAnswer.value) });
    };

    render() {
        const { quizId, questions } = this.state.quiz;
        const { question } = this.state;

        const firstElem = questions ? questions[0] : null;
        const lastElem = questions ? questions[questions.length - 1] : null;

        return (
            <div style={{ width: "90%", marginLeft: "5%", marginTop: "20px" }}>
                <QuestionList
                    questions={questions}
                    question={question}
                    quizId={quizId}
                    answeredQuestions={this.state.quizAnswers}
                    onItemSelected={this.onItemSelected} />
                <QuestionDetails
                    question={question}
                    getDataFromDetails={this.getDataFromDetails} />
                <div style={{ display: "flex", marginTop: "20px" }}>
                    {
                        question ?
                            firstElem === question ?
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
                        question ?
                            lastElem === question ?
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
                    question ?
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
