import { useEffect, useState } from "react";

import {
    getCurrentQuizzes,
    endQuiz,
    getSubmittedStudents
} from "../../services/quizApi";

import CurrentQuizCard from "./CurrentQuizCard";
import StudentsModal from "./StudentsModal";

function CurrentQuizzes({ setActivePage }) {

    const [quizzes, setQuizzes] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [students, setStudents] = useState([]);

    const [showStudentsModal, setShowStudentsModal] = useState(false);

    const [selectedQuiz, setSelectedQuiz] = useState(null);

    useEffect(() => {

        fetchCurrentQuizzes();

    }, []);

    const fetchCurrentQuizzes = async () => {

        try {

            setLoading(true);

            const data = await getCurrentQuizzes();

            setQuizzes(data);

            setError("");

        }

        catch (error) {

            setError(

                error.response?.data?.message ||

                "Failed to load current quizzes."

            );

        }

        finally {

            setLoading(false);

        }

    };

    const handleViewStudents = async (quiz) => {

        try {

            const data = await getSubmittedStudents(quiz._id);

            setStudents(data);

            setSelectedQuiz(quiz);

            setShowStudentsModal(true);

        }

        catch (error) {

            alert(

                error.response?.data?.message ||

                "Unable to fetch students."

            );

        }

    };

    const handleEndQuiz = async (quizId) => {

        const confirmEnd = window.confirm(

            "Are you sure you want to end this quiz?"

        );

        if (!confirmEnd) return;

        try {

            await endQuiz(quizId);

            alert("Quiz ended successfully.");

            fetchCurrentQuizzes();

        }

        catch (error) {

            alert(

                error.response?.data?.message ||

                "Unable to end quiz."

            );

        }

    };

    return (

        <div className="current-quizzes-page">

            <div className="current-page-header">

                <div className="header-left">

                    <button
                        className="back-btn"
                        onClick={() => setActivePage("dashboard")}
                    >
                        ← Back
                    </button>

                    <div>

                        <h1 className="current-title">

                            🟢 Current Quizzes

                        </h1>

                        <p className="current-subtitle">

                            Monitor active quizzes and manage student submissions.

                        </p>

                    </div>

                </div>

                <div className="quiz-count-card">

                    <span className="count-number">

                        {quizzes.length}

                    </span>

                    <span className="count-label">

                        Active Quizzes

                    </span>

                </div>

            </div>

            {

                loading ? (

                    <div className="loading-card">

                        <h3>

                            Loading Active Quizzes...

                        </h3>

                    </div>

                ) : error ? (

                    <div className="error-card">

                        {error}

                    </div>

                ) : quizzes.length === 0 ? (

                    <div className="empty-card">

                        <div className="empty-icon">

                            🟢

                        </div>

                        <h3>

                            No Active Quizzes

                        </h3>

                        <p>

                            Published quizzes will appear here.

                        </p>

                    </div>

                ) : (

                    <div className="quiz-list">

                        {

                            quizzes.map((quiz, index) => (

                                <CurrentQuizCard

                                    key={quiz._id}

                                    quizNumber={index + 1}

                                    quiz={quiz}

                                    onViewStudents={() =>

                                        handleViewStudents(quiz)

                                    }

                                    onEndQuiz={() =>

                                        handleEndQuiz(quiz._id)

                                    }

                                />

                            ))

                        }

                    </div>

                )

            }

            {

                showStudentsModal &&

                <StudentsModal

                    quiz={selectedQuiz}

                    students={students}

                    onClose={() =>

                        setShowStudentsModal(false)

                    }

                />

            }

        </div>

    );

}

export default CurrentQuizzes;