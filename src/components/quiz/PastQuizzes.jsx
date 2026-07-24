import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getPastQuizzes } from "../../services/quizApi";

import PastQuizCard from "./PastQuizCard";

function PastQuizzes({ setActivePage }) {

    const [quizzes, setQuizzes] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const navigate = useNavigate();

    const fetchPastQuizzes = async () => {

        try {

            setLoading(true);

            setError("");

            const response = await getPastQuizzes();

            setQuizzes(response);

        }

        catch (error) {

            setError(

                error.response?.data?.message ||

                "Failed to load past quizzes."

            );

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchPastQuizzes();

    }, []);

    return (

        <div className="past-quizzes-page">

            <div className="past-page-header">

                <div className="header-left">

                    <button
                        className="back-btn"
                        onClick={() => setActivePage("dashboard")}
                    >
                        ← Back
                    </button>

                    <div>

                        <h1 className="past-title">

                            📚 Past Quizzes

                        </h1>

                        <p className="past-subtitle">

                            View completed quizzes, rankings and question papers.

                        </p>

                    </div>

                </div>

                <div className="quiz-count-card">

                    <span className="count-number">

                        {quizzes.length}

                    </span>

                    <span className="count-label">

                        Completed Quizzes

                    </span>

                </div>

            </div>

            {

                loading ? (

                    <div className="loading-card">

                        <h3>

                            Loading quizzes...

                        </h3>

                        <p>

                            Please wait while we fetch completed quizzes.

                        </p>

                    </div>

                ) : error ? (

                    <div className="error-card">

                        {error}

                    </div>

                ) : quizzes.length === 0 ? (

                    <div className="empty-card">

                        <div className="empty-icon">

                            📚

                        </div>

                        <h3>

                            No Past Quizzes

                        </h3>

                        <p>

                            Completed quizzes will appear here.

                        </p>

                    </div>

                ) : (

                    <div className="quiz-list">

                        {

                            quizzes.map((quiz, index) => (

                                <PastQuizCard

                                    key={quiz._id}

                                    quiz={quiz}

                                    quizNumber={index + 1}

                                />

                            ))

                        }

                    </div>

                )

            }

        </div>

    );

}

export default PastQuizzes;