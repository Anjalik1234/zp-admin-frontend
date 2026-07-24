function QuestionCard({

    index,

    question,

    updateQuestion

}) {

    const handleQuestionChange = (value) => {

        updateQuestion(index, {

            ...question,

            question: value

        });

    };

    const handleOptionChange = (optionIndex, value) => {

        const updatedOptions = [...question.options];

        updatedOptions[optionIndex] = value;

        updateQuestion(index, {

            ...question,

            options: updatedOptions

        });

    };

    const handleAnswerChange = (value) => {

        updateQuestion(index, {

            ...question,

            correctAnswer: Number(value)

        });

    };

    return (

        <div className="question-card">

            <div className="question-left">

                <label>

                    Question {index + 1}

                </label>

                <textarea

                    className="question-input"

                    placeholder="Enter Question"

                    value={question.question}

                    onChange={(e) =>

                        handleQuestionChange(e.target.value)

                    }

                />

            </div>

            <div className="question-divider"></div>

            <div className="question-right">

                <label>

                    Options

                </label>

                <div className="options-grid">

                    {

                        question.options.map((option, optionIndex) => (

                            <input

                                key={optionIndex}

                                type="text"

                                className="option-input"

                                placeholder={`Option ${optionIndex + 1}`}

                                value={option}

                                onChange={(e) =>

                                    handleOptionChange(

                                        optionIndex,

                                        e.target.value

                                    )

                                }

                            />

                        ))

                    }

                </div>

                <div className="answer-section">

                    <label>

                        Answer

                    </label>

                    <select

                        className="answer-select"

                        value={question.correctAnswer}

                        onChange={(e) =>

                            handleAnswerChange(e.target.value)

                        }

                    >

                        <option value="">

                            Choose option number

                        </option>

                        <option value={1}>

                            Option 1

                        </option>

                        <option value={2}>

                            Option 2

                        </option>

                        <option value={3}>

                            Option 3

                        </option>

                        <option value={4}>

                            Option 4

                        </option>

                    </select>

                </div>

            </div>

        </div>

    );

}

export default QuestionCard;