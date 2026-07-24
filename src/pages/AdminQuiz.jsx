import { useState } from "react";

import "./AdminQuiz.css";

import QuizDashboard from "../components/quiz/QuizDashboard";
import CurrentQuizzes from "../components/quiz/CurrentQuizzes";
import FutureQuizzes from "../components/quiz/FutureQuizzes";
import PastQuizzes from "../components/quiz/PastQuizzes";
import CreateQuiz from "../components/quiz/CreateQuiz";

function AdminQuiz() {

    const [activePage, setActivePage] = useState("dashboard");

    return (

        <div className="quiz-container">

            {activePage === "dashboard" &&
                <QuizDashboard
                    setActivePage={setActivePage}
                />
            }

            {activePage === "current" &&
                <CurrentQuizzes
                    setActivePage={setActivePage}
                />
            }

            {activePage === "future" &&
                <FutureQuizzes
                    setActivePage={setActivePage}
                />
            }

            {activePage === "past" &&
                <PastQuizzes
                    setActivePage={setActivePage}
                />
            }

            {activePage === "create" &&
                <CreateQuiz
                    setActivePage={setActivePage}
                />
            }

        </div>

    );

}

export default AdminQuiz;