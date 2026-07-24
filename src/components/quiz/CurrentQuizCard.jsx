function CurrentQuizCard({

    quizNumber,

    quiz,

    onViewStudents,

    onEndQuiz

}) {

    const formattedDate = quiz.publishDate
        ? new Date(quiz.publishDate).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        })
        : "-";

    return (

        <div className="quiz-card">

            <div className="quiz-card-header">

                <div>

                    <h3>

                        Quiz {quizNumber}

                    </h3>

                    <p className="quiz-date">

                        📅 Published : {formattedDate}

                    </p>

                </div>

                <span className="status-badge active">

                    🟢 Active

                </span>

            </div>

            <div className="quiz-info">

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

                    className="students-btn"

                    onClick={onViewStudents}

                >

                    👨‍🎓 Students

                </button>

                <button

                    className="end-btn"

                    onClick={onEndQuiz}

                >

                    ⛔ End Quiz

                </button>

            </div>

        </div>

    );

}

export default CurrentQuizCard;