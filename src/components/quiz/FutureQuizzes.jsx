import { useEffect, useState } from "react";

import {
    getFutureQuizzes,
    publishQuiz,
    deleteQuiz
} from "../../services/quizApi";

import FutureQuizCard from "./FutureQuizCard";

function FutureQuizzes({ setActivePage }) {

    const [quizzes, setQuizzes] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        fetchFutureQuizzes();

    }, []);

    const fetchFutureQuizzes = async () => {

        try {

            setLoading(true);

            const data = await getFutureQuizzes();

            setQuizzes(data);

            setError("");

        }

        catch (error) {

            setError(

                error.response?.data?.message ||

                "Failed to load future quizzes."

            );

        }

        finally {

            setLoading(false);

        }

    };

    const handlePublishQuiz = async (quizId) => {

        const confirmPublish = window.confirm(

            "Are you sure you want to publish this quiz?"

        );

        if (!confirmPublish) return;

        try {

            await publishQuiz(quizId);

            alert("Quiz published successfully.");

            fetchFutureQuizzes();

        }

        catch (error) {

            alert(

                error.response?.data?.message ||

                "Unable to publish quiz."

            );

        }

    };

    const handleDeleteQuiz = async (quizId) => {

        const confirmDelete = window.confirm(

            "Are you sure you want to delete this quiz?"

        );

        if (!confirmDelete) return;

        try {

            await deleteQuiz(quizId);

            alert("Quiz deleted successfully.");

            fetchFutureQuizzes();

        }

        catch (error) {

            alert(

                error.response?.data?.message ||

                "Unable to delete quiz."

            );

        }

    };

    return (

        <div className="future-quizzes-page">

            <div className="future-page-header">

                <div className="header-left">

                    <button
                        className="back-btn"
                        onClick={() => setActivePage("dashboard")}
                    >
                        ← Back
                    </button>

                    <div>

                        <h1 className="future-title">

                            📝 Future Quizzes

                        </h1>

                        <p className="future-subtitle">

                            Manage draft quizzes before publishing them.

                        </p>

                    </div>

                </div>

                <div className="quiz-count-card">

                    <span className="count-number">

                        {quizzes.length}

                    </span>

                    <span className="count-label">

                        Draft Quizzes

                    </span>

                </div>

            </div>

            {

                loading ? (

                    <div className="loading-card">

                        <h3>

                            Loading Draft Quizzes...

                        </h3>

                    </div>

                ) : error ? (

                    <div className="error-card">

                        {error}

                    </div>

                ) : quizzes.length === 0 ? (

                    <div className="empty-card">

                        <div className="empty-icon">

                            📝

                        </div>

                        <h3>

                            No Draft Quizzes

                        </h3>

                        <p>

                            Create a new quiz to get started.

                        </p>

                    </div>

                ) : (

                    <div className="quiz-list">

                        {

                            quizzes.map((quiz, index) => (

                                <FutureQuizCard

                                    key={quiz._id}

                                    quizNumber={index + 1}

                                    quiz={quiz}

                                    onPublish={() =>

                                        handlePublishQuiz(quiz._id)

                                    }

                                    onDelete={() =>

                                        handleDeleteQuiz(quiz._id)

                                    }

                                />

                            ))

                        }

                    </div>

                )

            }

        </div>

    );

}

export default FutureQuizzes;