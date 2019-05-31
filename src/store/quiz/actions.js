import {API_BASE_URL} from "../../constants/index";
import {request} from "../../utils/APIUtils";

export const getAllQuizzes = () => {
    return request({
        url: API_BASE_URL + "/quiz",
        method: 'get',
    });
};

export const getQuizById = (id) => {
    return request({
        url: API_BASE_URL + `/quiz/${id}`,
        method: 'get',
    });
};

export const checkAnswers = (answers) => {
    return request({
        url: API_BASE_URL + `/quiz/check`,
        method: 'POST',
        body: JSON.stringify(answers)
    });
};
