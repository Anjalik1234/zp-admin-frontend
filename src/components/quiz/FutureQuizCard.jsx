function FutureQuizCard({

    quizNumber,

    quiz,

    onPublish,

    onDelete

}) {

    const createdDate = new Date(

        quiz.createdAt

    ).toLocaleDateString(

        "en-IN",

        {

            day: "2-digit",

            month: "short",

            year: "numeric"

        }

    );

    return (

        <div className="quiz-card">

            <div className="quiz-card-header">

                <div>

                    <h3>

                        Quiz {quizNumber}

                    </h3>

                    <p className="quiz-date">

                        📅 {createdDate}

                    </p>

                </div>

                <span className="status-badge draft">

                    📝 Draft

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

                        ⭐

                    </span>

                    <div>

                        <small>

                            Marks / Question

                        </small>

                        <strong>

                            {quiz.marksPerQuestion}

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

                    className="delete-btn"

                    onClick={onDelete}

                >

                    🗑 Delete

                </button>

                <button

                    className="publish-btn"

                    onClick={onPublish}

                >

                    🚀 Publish

                </button>

            </div>

        </div>

    );

}

export default FutureQuizCard;