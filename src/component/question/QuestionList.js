import React from 'react';
import {Button, Paper} from '@material-ui/core';

const QuestionList  = (props) => {

    const { questions, onItemSelected } = props;

    let index = 0;
    const questionsPaper = questions !== undefined ? questions.map((question) => {
            index++;
            const { id } = question;
            return (
                <Button
                    key={id}
                    onClick={() => onItemSelected(id)}>
                    {index}
                </Button>
            );
        }) : null;

    return (
        <Paper>
            {questionsPaper}
        </Paper>
    )

};

export default QuestionList;
