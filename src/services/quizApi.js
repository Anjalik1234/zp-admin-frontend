import axios from "axios";

const API = axios.create({

    baseURL: "https://zpsajur-backend.onrender.com"

});

// Automatically attach JWT token to every request
API.interceptors.request.use(

    (config) => {

        const token = localStorage.getItem("token");

        if (token) {

            config.headers.Authorization = `Bearer ${token}`;

        }

        return config;

    },

    (error) => Promise.reject(error)

);

/* ============================= */
/* CURRENT QUIZZES */
/* ============================= */

export const getCurrentQuizzes = async () => {

    const response = await API.get("/api/quizzes/current");

    return response.data;

};

export const endQuiz = async (quizId) => {

    const response = await API.put(`/api/quizzes/end/${quizId}`);

    return response.data;

};

export const getSubmittedStudents = async (quizId) => {

    const response = await API.get(`/api/quizzes/students/${quizId}`);

    return response.data;

};

/* ============================= */
/* FUTURE QUIZZES */
/* ============================= */

export const getFutureQuizzes = async () => {

    const response = await API.get("/api/quizzes/future");

    return response.data;

};

export const publishQuiz = async (quizId) => {

    const response = await API.put(`/api/quizzes/publish/${quizId}`);

    return response.data;

};

export const deleteQuiz = async (quizId) => {

    const response = await API.delete(`/api/quizzes/${quizId}`);

    return response.data;

};

/* ============================= */
/* PAST QUIZZES */
/* ============================= */

export const getPastQuizzes = async () => {

    const response = await API.get("/api/quizzes/past");

    return response.data;

};

export const getRankings = async (quizId) => {

    const response = await API.get(`/api/quizzes/rankings/${quizId}`);

    return response.data;

};

/* ============================= */
/* CREATE QUIZ */
/* ============================= */

export const createQuiz = async (quizData) => {

    const response = await API.post("/api/quizzes/create", quizData);

    return response.data;

};

/* ============================= */
/* STUDENT */
/* ============================= */

export const startQuiz = async (studentData) => {

    const response = await API.post("/api/quizzes/start", studentData);

    return response.data;

};

export const getQuiz = async (standard, subject) => {

    const response = await API.get(

        `/api/quizzes/play/${standard}/${subject}`

    );

    return response.data;

};

export const submitQuiz = async (submissionData) => {

    const response = await API.post(

        "/api/quizzes/submit",

        submissionData

    );

    return response.data;

};

export const getQuizById = async (quizId) => {

    const token = localStorage.getItem("token");

    const response = await API.get(

        `/api/quizzes/${quizId}`,

        {

            headers: {

                Authorization: `Bearer ${token}`

            }

        }

    );

    return response.data;

};

export default API;