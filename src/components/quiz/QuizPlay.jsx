import { useEffect, useState } from "react";

import {
    getQuiz,
    startQuiz,
    submitQuiz
} from "../../services/quizApi";

function QuizPlay({

    standard,

    subject,

    studentName,

    onQuizSubmitted

}) {

    const [quiz, setQuiz] = useState(null);

    const [answers, setAnswers] = useState([]);

    const [loading, setLoading] = useState(true);

    const [submitting, setSubmitting] = useState(false);

    const [error, setError] = useState("");

    const [startedAt, setStartedAt] = useState(null);

    useEffect(() => {

        fetchQuiz();

    }, []);

    const fetchQuiz = async () => {

        try {

            setLoading(true);

            setError("");

            const availableQuiz = await getQuiz(

                standard,

                subject

            );

            setQuiz(availableQuiz);

            if (availableQuiz) {

                setAnswers(

                    availableQuiz.questions.map(

                        (_, index) => ({

                            questionNumber: index + 1,

                            selectedAnswer: null

                        })

                    )

                );

            }

        }

        catch (error) {

            setError(

                error.response?.data?.message ||

                "Unable to load quiz."

            );

        }

        finally {

            setLoading(false);

        }

    };

    const handleStartQuiz = async () => {

        try {

            const response = await startQuiz({

                quizId: quiz._id,

                studentName,

                standard,

                subject

            });

            setStartedAt(

                response.startedAt ||

                new Date().toISOString()

            );

        }

        catch (error) {

            setError(

                error.response?.data?.message ||

                "Unable to start quiz."

            );

        }

    };

    const handleOptionSelect = (

        questionNumber,

        optionIndex

    ) => {

        const updatedAnswers = [...answers];

        updatedAnswers[questionNumber - 1] = {

            questionNumber,

            selectedAnswer: optionIndex

        };

        setAnswers(updatedAnswers);

    };
        const handleSubmitQuiz = async () => {

        if (!startedAt) {

            setError("Please start the quiz first.");

            return;

        }

        const unanswered = answers.find(

            (answer) => answer.selectedAnswer === null

        );

        if (unanswered) {

            setError(

                `Please answer Question ${unanswered.questionNumber}.`

            );

            return;

        }

        try {

            setSubmitting(true);

            setError("");

            const result = await submitQuiz({

                quizId: quiz._id,

                studentName,

                standard,

                subject,

                answers

            });

            if (onQuizSubmitted) {

                onQuizSubmitted(result);

            }

        }

        catch (error) {

            setError(

                error.response?.data?.message ||

                "Failed to submit quiz."

            );

        }

        finally {

            setSubmitting(false);

        }

    };

    if (loading) {

        return (

            <div className="quiz-loading">

                Loading Quiz...

            </div>

        );

    }

    if (!quiz) {

        return (

            <div className="quiz-error">

                No quiz available.

            </div>

        );

    }

    return (

        <div className="quiz-play">

            <div className="quiz-header">

                <h2>

                    {quiz.subject} Quiz

                </h2>

                <p>

                    Standard {quiz.standard}

                </p>

                <p>

                    Total Questions: {quiz.numberOfQuestions}

                </p>

                <p>

                    Total Marks: {quiz.totalMarks}

                </p>

                {

                    !startedAt && (

                        <button

                            className="start-quiz-btn"

                            onClick={handleStartQuiz}

                        >

                            Start Quiz

                        </button>

                    )

                }

            </div>

            {

                error && (

                    <div className="quiz-error">

                        {error}

                    </div>

                )

            }

            {

                startedAt && (

                    <div className="questions-list">

                        {

                            quiz.questions.map(

                                (

                                    question,

                                    questionIndex

                                ) => (

                                    <div

                                        key={questionIndex}

                                        className="student-question-card"

                                    >

                                        <h3>

                                            Q{questionIndex + 1}.{" "}

                                            {question.question}

                                        </h3>

                                        {

                                            question.options.map(

                                                (

                                                    option,

                                                    optionIndex

                                                ) => (

                                                    <label

                                                        key={optionIndex}

                                                        className="option-label"

                                                    >

                                                        <input

                                                            type="radio"

                                                            name={`question-${questionIndex}`}

                                                            checked={

                                                                answers[questionIndex]

                                                                    ?.selectedAnswer === optionIndex + 1

                                                            }

                                                            onChange={() =>

                                                                handleOptionSelect(

                                                                    questionIndex + 1,

                                                                    optionIndex + 1

                                                                )

                                                            }

                                                        />

                                                        {option}

                                                    </label>

                                                )

                                            )

                                        }

                                    </div>

                                )

                            )

                        }

                        <button

                            className="submit-quiz-btn"

                            onClick={handleSubmitQuiz}

                            disabled={submitting}

                        >

                            {

                                submitting

                                    ? "Submitting..."

                                    : "Submit Quiz"

                            }

                        </button>

                    </div>

                )

            }

        </div>

    );

}

export default QuizPlay;