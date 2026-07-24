import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import QuestionCard from "./QuestionCard";

import {
    createQuiz,
    publishQuiz
} from "../../services/quizApi";

function CreateQuiz({setActivePage}) {

    const navigate = useNavigate();

    const subjects = [
        "Marathi",
        "English",
        "Hindi",
        "Maths",
        "Science",
        "History",
        "Geography",
        "Evs"
    ];

    const standards = [
        1,
        2,
        3,
        4,
        5,
        6,
        7
    ];

    const [standard, setStandard] = useState("");

    const [subject, setSubject] = useState("");

    const [numberOfQuestions, setNumberOfQuestions] = useState(1);

    const [marksPerQuestion, setMarksPerQuestion] = useState(1);

    const [questions, setQuestions] = useState([]);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");

    const totalMarks = numberOfQuestions * marksPerQuestion;

    useEffect(() => {

        const generatedQuestions = [];

        for (let i = 0; i < Number(numberOfQuestions); i++) {

            generatedQuestions.push(

                questions[i] || {

                    question: "",

                    options: [
                        "",
                        "",
                        "",
                        ""
                    ],

                    correctAnswer: ""

                }

            );

        }

        setQuestions(generatedQuestions);

    }, [numberOfQuestions]);

    const updateQuestion = (index, updatedQuestion) => {

        const updatedQuestions = [...questions];

        updatedQuestions[index] = updatedQuestion;

        setQuestions(updatedQuestions);

    };

    const resetMessages = () => {

        setError("");

        setSuccess("");

    };

    const validateQuiz = () => {

        resetMessages();

        if (!standard) {

            setError("Please select a standard.");

            return false;

        }

        if (!subject) {

            setError("Please select a subject.");

            return false;

        }

        if (numberOfQuestions < 1) {

            setError("Number of questions must be at least 1.");

            return false;

        }

        if (marksPerQuestion < 1) {

            setError("Marks per question must be at least 1.");

            return false;

        }

        for (let i = 0; i < questions.length; i++) {

            const currentQuestion = questions[i];

            if (!currentQuestion.question.trim()) {

                setError(`Question ${i + 1} cannot be empty.`);

                return false;

            }

            for (let j = 0; j < currentQuestion.options.length; j++) {

                if (!currentQuestion.options[j].trim()) {

                    setError(`Option ${j + 1} of Question ${i + 1} cannot be empty.`);

                    return false;

                }

            }

            if (!currentQuestion.correctAnswer) {

                setError(`Please select the correct answer for Question ${i + 1}.`);

                return false;

            }

        }

        return true;

    };
    const buildQuizData = () => {

        return {

            standard,

            subject,

            numberOfQuestions: Number(numberOfQuestions),

            marksPerQuestion: Number(marksPerQuestion),

            totalMarks,

            questions

        };

    };

    const handleSaveDraft = async () => {

        if (!validateQuiz()) {

            return;

        }

        try {

            setLoading(true);

            resetMessages();

            await createQuiz(buildQuizData());

            setSuccess("Quiz saved as draft successfully.");

        }

        catch (error) {

            setError(

                error.response?.data?.message ||

                "Failed to save draft."

            );

        }

        finally {

            setLoading(false);

        }

    };

    const handlePublishQuiz = async () => {

        if (!validateQuiz()) {

            return;

        }

        try {

            setLoading(true);

            resetMessages();

            const createdQuiz = await createQuiz(buildQuizData());

            const quizId = createdQuiz.quiz?._id;

            if (!quizId) {

                throw new Error("Quiz ID not returned from server.");

            }

            await publishQuiz(quizId);

            setSuccess("Quiz published successfully.");

            setTimeout(() => {

                navigate("/dashboard", {

                    state: {

                        page: "current"

                    }

                });

            }, 1200);

        }

        catch (error) {

            setError(

                error.response?.data?.message ||

                error.message ||

                "Failed to publish quiz."

            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="create-quiz-page">
            <div className="create-quiz-header">

                <button
                    className="back-btn"
                    onClick={() => setActivePage("dashboard")}
                >
                    ← Back
                </button>

                <h2>

                    Create Quiz

                </h2>

            </div>

            {

                error && (

                    <div className="quiz-error">

                        {error}

                    </div>

                )

            }

            {

                success && (

                    <div className="quiz-success">

                        {success}

                    </div>

                )

            }

            <div className="quiz-form-card">

                <div className="quiz-form-grid">

                    <div className="form-group">

                        <label>

                            Standard

                        </label>

                        <select

                            value={standard}

                            onChange={(e) =>

                                setStandard(e.target.value)

                            }

                        >

                            <option value="">

                                Select Standard

                            </option>

                            {

                                standards.map((std) => (

                                    <option

                                        key={std}

                                        value={std}

                                    >

                                        {std}

                                    </option>

                                ))

                            }

                        </select>

                    </div>

                    <div className="form-group">

                        <label>

                            Subject

                        </label>

                        <select

                            value={subject}

                            onChange={(e) =>

                                setSubject(e.target.value)

                            }

                        >

                            <option value="">

                                Select Subject

                            </option>

                            {

                                subjects.map((item) => (

                                    <option

                                        key={item}

                                        value={item}

                                    >

                                        {item}

                                    </option>

                                ))

                            }

                        </select>

                    </div>

                    <div className="form-group">

                        <label>

                            Number of Questions

                        </label>

                        <input

                            type="number"

                            min="1"

                            value={numberOfQuestions}

                            onChange={(e) =>

                                setNumberOfQuestions(

                                    Number(e.target.value)

                                )

                            }

                        />

                    </div>

                    <div className="form-group">

                        <label>

                            Marks Per Question

                        </label>

                        <input

                            type="number"

                            min="1"

                            value={marksPerQuestion}

                            onChange={(e) =>

                                setMarksPerQuestion(

                                    Number(e.target.value)

                                )

                            }

                        />

                    </div>

                    <div className="form-group total-marks">

                        <label>

                            Total Marks

                        </label>

                        <input

                            type="number"

                            value={totalMarks}

                            disabled

                            readOnly

                        />

                    </div>

                </div>

            </div>

            <div className="questions-container">

                {

                    questions.map((question, index) => (

                        <QuestionCard

                            key={index}

                            index={index}

                            question={question}

                            updateQuestion={updateQuestion}

                        />

                    ))

                }

            </div>
            <div className="quiz-actions">

                <button

                    className="draft-btn"

                    onClick={handleSaveDraft}

                    disabled={loading}

                >

                    {

                        loading

                            ? "Saving..."

                            : "Save as Draft"

                    }

                </button>

                <button

                    className="publish-btn"

                    onClick={handlePublishQuiz}

                    disabled={loading}

                >

                    {

                        loading

                            ? "Publishing..."

                            : "Publish Quiz"

                    }

                </button>

            </div>

        </div >

    );

}

export default CreateQuiz;