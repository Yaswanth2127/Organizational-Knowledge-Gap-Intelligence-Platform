import api from "./api";

const BASE_URL = "api/questions";

const questionService = {

  getQuestionsByAssessment: (assessmentId) =>
    api.get(`${BASE_URL}/assessment/${assessmentId}`),

  getQuestionById: (questionId) =>
    api.get(`${BASE_URL}/${questionId}`)
};

export default questionService;