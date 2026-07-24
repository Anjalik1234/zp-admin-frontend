import { useState } from "react";

import {

    getRankings,

    getQuizById

} from "../../services/quizApi";

function PastQuizCard({

    quiz,

    quizNumber

}) {

    const [loading, setLoading] = useState(false);

    const [showRankings, setShowRankings] = useState(false);

    const [rankings, setRankings] = useState([]);

    const [showQuestions, setShowQuestions] = useState(false);

    const [questions, setQuestions] = useState([]);

    const [error, setError] = useState("");

    const handleViewRankings = async () => {

        try {

            setLoading(true);

            setError("");

            const response = await getRankings(quiz._id);

            setRankings(response.results || []);

            setShowRankings(true);

        }

        catch (error) {

            setError(

                error.response?.data?.message ||

                "Failed to load rankings."

            );

        }

        finally {

            setLoading(false);

        }

    };

    const handleViewQuestions = async () => {

        try {

            setLoading(true);

            setError("");

            const quizDetails = await getQuizById(quiz._id);

            setQuestions(quizDetails.questions || []);

            setShowQuestions(true);

        }

        catch (error) {

            setError(

                error.response?.data?.message ||

                "Failed to load questions."

            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <>

            <div className="quiz-card">

                <div className="quiz-card-header">

                    <div>

                        <h3>

                            Quiz {quizNumber}

                        </h3>

                        <p className="quiz-date">

                            📅 {

                                new Date(

                                    quiz.publishDate

                                ).toLocaleDateString(
                                    "en-GB",
                                    {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric"
                                    }
                                )

                            }

                        </p>

                    </div>

                    <span className="status-badge completed">

                        ✓ Completed

                    </span>

                </div>

                <div className="quiz-info">

                    <div className="info-item">

                        <span className="info-icon">

                            📘

                        </span>

                        <div>

                            <small>

                                Subject

                            </small>

                            <strong>

                                {quiz.subject}

                            </strong>

                        </div>

                    </div>

                    <div className="info-item">

                        <span className="info-icon">

                            🏫

                        </span>

                        <div>

                            <small>

                                Standard

                            </small>

                            <strong>

                                {quiz.standard}

                            </strong>

                        </div>

                    </div>

                    <div className="info-item">

                        <span className="info-icon">

                            ❓

                        </span>

                        <div>

                            <small>

                                Questions

                            </small>

                            <strong>

                                {quiz.numberOfQuestions}

                            </strong>

                        </div>

                    </div>

                    <div className="info-item">

                        <span className="info-icon">

                            🎯

                        </span>

                        <div>

                            <small>

                                Total Marks

                            </small>

                            <strong>

                                {quiz.totalMarks}

                            </strong>

                        </div>

                    </div>

                </div>

                <div className="quiz-card-actions">

                    <button

                        className="secondary-btn"

                        onClick={handleViewQuestions}

                        disabled={loading}

                    >

                        📄 Questions

                    </button>

                    <button

                        className="primary-btn"

                        onClick={handleViewRankings}

                        disabled={loading}

                    >

                        {

                            loading

                                ? "Loading..."

                                : "🏆 Rankings"

                        }

                    </button>

                </div>

                {

                    error && (

                        <p className="error-message">

                            {error}

                        </p>

                    )

                }

            </div>

            {

                showRankings && (

                    <div className="modal-overlay">

                        <div className="modal">

                            <div className="modal-header">

                                <h3>

                                    Rankings

                                </h3>

                                <button

                                    className="close-btn"

                                    onClick={() =>

                                        setShowRankings(false)

                                    }

                                >

                                    ✕

                                </button>

                            </div>

                            {

                                rankings.length === 0 ? (

                                    <p>

                                        No rankings available.

                                    </p>

                                ) : (

                                    <table className="students-table">

                                        <thead>

                                            <tr>

                                                <th>

                                                    Rank

                                                </th>

                                                <th>

                                                    Student

                                                </th>

                                                <th>

                                                    Standard

                                                </th>

                                                <th>

                                                    Marks

                                                </th>

                                            </tr>

                                        </thead>

                                        <tbody>

                                            {

                                                rankings.map((student) => (

                                                    <tr

                                                        key={student.rank}

                                                    >

                                                        <td>

                                                            {student.rank}

                                                        </td>

                                                        <td>

                                                            {

                                                                student.studentName

                                                            }

                                                        </td>

                                                        <td>

                                                            {

                                                                student.standard

                                                            }

                                                        </td>

                                                        <td>

                                                            {

                                                                student.marksObtained

                                                            }

                                                        </td>

                                                    </tr>

                                                ))

                                            }

                                        </tbody>

                                    </table>

                                )

                            }

                        </div>

                    </div>

                )

            }

            {

                showQuestions && (

                    <div className="modal-overlay">

                        <div className="modal">

                            <div className="modal-header">

                                <h3>

                                    Quiz Questions

                                </h3>

                                <button

                                    className="close-btn"

                                    onClick={() =>

                                        setShowQuestions(false)

                                    }

                                >

                                    ✕

                                </button>

                            </div>

                            {

                                questions.map((question, index) => (

                                    <div

                                        key={question._id}

                                        className="question-card"

                                    >

                                        <h4>

                                            Q{index + 1}. {question.question}

                                        </h4>

                                        {

                                            question.options.map((option, optionIndex) => (

                                                <p

                                                    key={optionIndex}

                                                    style={{

                                                        color:

                                                            optionIndex + 1 === question.correctAnswer

                                                                ? "green"

                                                                : "black",

                                                        fontWeight:

                                                            optionIndex + 1 === question.correctAnswer

                                                                ? "bold"

                                                                : "normal"

                                                    }}

                                                >

                                                    {option}

                                                    {

                                                        optionIndex + 1 === question.correctAnswer &&

                                                        " ✓"

                                                    }

                                                </p>

                                            ))

                                        }

                                        <hr />

                                    </div>

                                ))

                            }

                        </div>

                    </div>

                )

            }

        </>

    );

}

export default PastQuizCard;