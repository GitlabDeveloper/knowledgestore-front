import {Checkbox, FormControlLabel, FormGroup} from "@material-ui/core";
import React from "react";

const CheckBoxDetails = ({ questionOptions, allQuizOptions, valueChange }) => {
    return (
        <FormGroup style={{ marginLeft: "2%" }}>
            {
                questionOptions.map(questionOption => {
                    const { id, text, correct } = questionOption;

                    const value = allQuizOptions.find(o => o.id === id);
                    const checkedValue = value ? value.value : '';
                    const buttonStyle = correct !== null ?
                        correct ? { background:  "#affda0" } : { background:  "#f04848" }
                        : {};
                    return (
                        <FormControlLabel
                            style={buttonStyle}
                            key={id}
                            control={ <Checkbox checked={checkedValue} onChange={valueChange(id)}/> }
                            label={`${id} ${text}`}
                        />
                    )
                })
            }
        </FormGroup>
    )
};

export default CheckBoxDetails;