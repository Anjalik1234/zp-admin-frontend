function StudentsModal({

    quiz,

    students,

    onClose

}) {

    return (

        <div className="modal-overlay">

            <div className="students-modal">

                <div className="modal-header">

                    <div>

                        <h2>

                            Submitted Students

                        </h2>

                        <p>

                            Standard {quiz.standard} • {quiz.subject}

                        </p>

                    </div>

                    <button
                        className="close-btn"
                        onClick={onClose}
                    >
                        ✕
                    </button>

                </div>

                {

                    students.length === 0 ?

                    (

                        <div className="empty-message">

                            No student has submitted this quiz yet.

                        </div>

                    )

                    :

                    (

                        <table className="students-table">

                            <thead>

                                <tr>

                                    <th>#</th>

                                    <th>Name</th>

                                    <th>Standard</th>

                                    <th>Marks</th>

                                    <th>Submitted On</th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    students.map((student,index)=>(

                                        <tr key={student._id}>

                                            <td>

                                                {index+1}

                                            </td>

                                            <td>

                                                {student.studentName}

                                            </td>

                                            <td>

                                                {student.standard}

                                            </td>

                                            <td>

                                                {student.marksObtained}

                                            </td>

                                            <td>

                                                {

                                                    new Date(

                                                        student.submittedAt

                                                    ).toLocaleString("en-IN")

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

    );

}

export default StudentsModal;