import {FormControlLabel, Radio, RadioGroup} from "@material-ui/core";
import React from "react";

const RadioButtonDetails = ({ questionOptions, allQuizOptions, valueChange }) => {

    const value = questionOptions.find(questionOption => allQuizOptions.some(o => o.id === questionOption.id ));
    const checkedValue = value ? value.id : null;

    return (
        <RadioGroup
            style={{ marginLeft: "2%" }}
            value={`${checkedValue}`}
        >
            {
                questionOptions.map(option => {
                    const { id, text, correct } = option;
                    const buttonStyle = correct !== null ?
                        correct ? { background:  "#affda0" } : { background:  "#f04848" }
                    : {};
                    return (
                        <FormControlLabel
                            style={buttonStyle}
                            key={id}
                            value={`${id}`}
                            control={<Radio onChange={valueChange(id, checkedValue)}/>}
                            label={`${id} ${text}`}
                        />
                    )
                })
            }
        </RadioGroup>
    )
};

export default RadioButtonDetails;