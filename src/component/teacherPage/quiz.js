import React, {Component} from 'react';
import Button from "@material-ui/core/es/Button/Button";
import Question from "./question";
import {request} from "../../utils/APIUtils";
import {API_BASE_URL} from "../../constants/index";

export default class Quiz extends Component {

    state = {
        newQuestion: false,
        quiz: null
    };

    componentDidMount() {
        this.getQuiz(this.props.quizId)
            .then((quiz) => {
                this.setState({
                    quiz
                })
            })
    }

    addQuestion = () => {
        this.setState({
            newQuestion: true
        })
    };

    saveQuestion = (question) => {
        this.setState(({quiz}) => {
            const newQuiz = quiz;
            newQuiz.questions.push(question);
            return {
                quiz: newQuiz,
                newQuestion: false
            }
        })

    };

    newQuestion = () => {
        const {quiz:{id}} = this.state;
        if (this.state.newQuestion) {
            return <Question quizId={id} save={this.saveQuestion}/>
        } else {
            return null;
        }
    };

    getQuiz = (id) => {
        return request({
            url: `${API_BASE_URL}/quiz/${id}`,
            method: 'GET'
        })
    };

    back = () => {
        this.props.back();
    };

    render() {

        if (this.state.quiz) {
            const {questions} = this.state.quiz;
            // const {} = quiz;
            let questNumber = 0;
            const questElements = questions.map((item) => {
                questNumber++;
                return <Button key={item.id} variant="contained" color="default">{questNumber}</Button>
            });


            return (
                <React.Fragment>
                    {questElements}
                    <Button variant="contained" color="default" onClick={this.addQuestion}>Add new quest</Button>
                    <Button variant="contained" color="default" onClick={this.back}>Back</Button>
                    {this.newQuestion()}
                </React.Fragment>
            );
        }
        return null;
    }
}