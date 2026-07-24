function QuizDashboard({ setActivePage }) {

    return (

        <div>

            <h2 className="quiz-title">
                Quiz Management
            </h2>

            <div className="quiz-boxes">

                <div
                    className="quiz-box"
                    onClick={() => setActivePage("current")}
                >

                    <h3>Current Quizzes</h3>

                    <p>Active quizzes for students</p>

                </div>

                <div
                    className="quiz-box"
                    onClick={() => setActivePage("future")}
                >

                    <h3>Future Quizzes</h3>

                    <p>Draft quizzes</p>

                </div>

                <div
                    className="quiz-box"
                    onClick={() => setActivePage("past")}
                >

                    <h3>Past Quizzes</h3>

                    <p>Completed quizzes</p>

                </div>

            </div>

            <div className="create-btn-container">

                <button
                    className="create-quiz-btn"
                    onClick={() => setActivePage("create")}
                >

                    + Create New Quiz

                </button>

            </div>

        </div>

    );

}

export default QuizDashboard;