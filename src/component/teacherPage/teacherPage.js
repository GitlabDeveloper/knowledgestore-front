import React, {Component} from "react";
import {request} from "../../utils/APIUtils";
import {API_BASE_URL} from "../../constants/index";
import Button from "@material-ui/core/es/Button/Button";
import Quiz from "./quiz";
import NewQuiz from "./newQuiz";

export default class TeacherPage extends Component {

    state = {
        quizList: null,
        quizId: null,
        newQuiz: false
    };

    componentDidMount() {
        this.getData()
            .then((quizList) => {
                this.setState({
                    quizList
                });
            });
    }

    selectQuiz = (id) => (event) => {
        this.setState({
            quizId: id
        });
    };

    getData = () => {
        return request({
            url: API_BASE_URL + "/quiz/forUpdate",
            method: 'GET'
        })
    };

    backButton = () => {
        this.setState({
            quizId: null
        })
    };

    createQuiz = (quiz) => {
        this.setState(({quizList}) => {
            let newQuizList = quizList;
            newQuizList.push(quiz);
            return {
                quizList: newQuizList,
                newQuiz: false
            }
        })
    };

    createQuizButton = () => {
        this.setState({
            newQuiz: true
        });
    };

    render() {

        const {quizList, quizId, newQuiz} = this.state;

        if (!quizList) {
            return <span>HERE is nothing!!!</span>
        }

        if (quizId) {
            return <Quiz quizId={quizId} back={this.backButton}/>
        }

        if (newQuiz) {
            return <NewQuiz create={this.createQuiz}/>
        }

        const quizs = quizList.map(({id, name, description}) => {
            return <Button key={id} id={id}
                           variant="contained"
                           color="default"
                           onClick={this.selectQuiz(id)}>
                {name} {description}
            </Button>
        });

        return(
            <React.Fragment>
                {quizs}
                <Button variant="contained" color="default" onClick={this.createQuizButton}>Create quiz</Button>
            </React.Fragment>
        )
    }
}