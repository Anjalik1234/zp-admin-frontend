import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import imageCompression from "browser-image-compression";
import "./AddStudent.css";

function AddStudent() {

  const [student, setStudent] = useState({
    name: "",
    std: "",
    birthMonth: "",
    birthDay: "",
    academicYear: "2025-26"
  });

  const [students, setStudents] = useState([]);
  const [image, setImage] = useState(null);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const fetchStudents = useCallback(async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/students/all",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setStudents(res.data);

    } catch (err) {
      console.error(err);
    }
  }, [token]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      let compressedImage = image;

      if (image) {
        const options = {
          maxSizeMB: 0.3,
          maxWidthOrHeight: 800,
          useWebWorker: true
        };

        compressedImage = await imageCompression(image, options);
      }

      const formData = new FormData();

      formData.append("name", student.name);
      formData.append("std", student.std);
      formData.append("birthMonth", student.birthMonth);
      formData.append("birthDay", student.birthDay);
      formData.append("academicYear", student.academicYear);

      if (image) {
        formData.append("image", compressedImage);
      }

      if (editId) {

        await axios.put(
          `http://localhost:5000/api/students/update/${editId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        alert("Student Updated ✅");

        setEditId(null);

      } else {

        await axios.post(
          "http://localhost:5000/api/students/add",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        alert("Student Added ✅");
      }

      setStudent({
        name: "",
        std: "",
        birthMonth: "",
        birthDay: "",
        academicYear: "2025-26"
      });

      setImage(null);

      fetchStudents();

    } catch (err) {
      console.error(err);
      alert("Error ❌");
    }
  };

  const deleteStudent = async (id) => {

    if (!window.confirm("Delete this student?")) return;

    try {

      await axios.delete(
        `http://localhost:5000/api/students/delete/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      fetchStudents();

    } catch (err) {
      console.error(err);
    }
  };

  const editStudent = (s) => {

    setStudent({
      name: s.name,
      std: s.std,
      birthMonth: s.birthMonth,
      birthDay: s.birthDay,
      academicYear: s.academicYear
    });

    setEditId(s._id);
  };

  const filteredStudents = students.filter((s) => {

    const nameMatch = s.name.toLowerCase().includes(search.toLowerCase());

    const stdMatch = s.std.toString().includes(search);

    return nameMatch || stdMatch;

  });

  const groupedStudents = filteredStudents.reduce((acc, student) => {

    if (!acc[student.std]) {
      acc[student.std] = [];
    }

    acc[student.std].push(student);

    return acc;

  }, {});

  return (

    <div className="add-student-container">

      <h2>{editId ? "Edit Student" : "Add Student"}</h2>

      <form onSubmit={handleSubmit}>

        <input
          name="name"
          placeholder="Student Name"
          value={student.name}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="std"
          placeholder="Standard (1-7)"
          value={student.std}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="birthMonth"
          placeholder="Birth Month"
          value={student.birthMonth}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="birthDay"
          placeholder="Birth Day"
          value={student.birthDay}
          onChange={handleChange}
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        {image && (
          <div className="preview-box">
            <img
              src={URL.createObjectURL(image)}
              alt="preview"
            />
          </div>
        )}

        <button type="submit" id="add">
          {editId ? "Update Student" : "Add Student"}
        </button>

      </form>

      <h2 className="students-title">Students List</h2>

      <input
        type="text"
        placeholder="Search student by name or standard..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="student-search"
      />

      {Object.keys(groupedStudents)
        .sort((a, b) => a - b)
        .map((std) => (

          <div key={std} className="standard-section">

            <h3 className="standard-title">Standard {std}</h3>

            <div className="students-table-wrapper">

              <table className="students-table">

                <thead>
                  <tr>
                    <th>Photo</th>
                    <th>Name</th>
                    <th>Std</th>
                    <th>Birthday</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>

                  {groupedStudents[std].map((s) => (

                    <tr key={s._id}>

                      <td>
                        {s.img && (
                          <img
                            src={s.img}
                            alt={s.name}
                            className="student-img"
                          />
                        )}
                      </td>

                      <td>{s.name}</td>

                      <td>{s.std}</td>

                      <td>{s.birthDay}/{s.birthMonth}</td>

                      <td>

                        <button
                          className="edit-btn"
                          onClick={() => editStudent(s)}
                        >
                          Edit
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() => deleteStudent(s._id)}
                        >
                          Delete
                        </button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

        ))}

    </div>

  );
}

export default AddStudent;