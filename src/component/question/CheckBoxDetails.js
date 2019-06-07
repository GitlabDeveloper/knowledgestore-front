import {Checkbox, FormControlLabel, FormGroup} from "@material-ui/core";
import React from "react";

const CheckBoxDetails = ({ questionOptions, allQuizOptions, valueChange }) => {
    return (
        <FormGroup style={{ marginLeft: "2%" }}>
            {
                questionOptions.map(questionOption => {
                    const { id, text } = questionOption;

                    const value = allQuizOptions.find(o => o.id === id);
                    const checkedValue = value ? value.value : '';

                    return (
                        <FormControlLabel
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