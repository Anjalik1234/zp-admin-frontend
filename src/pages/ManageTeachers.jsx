import { useState, useEffect } from "react";
import imageCompression from "browser-image-compression";
import "./ManageTeachers.css";

function ManageTeachers() {

  const [teachers, setTeachers] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [teacher, setTeacher] = useState({
    name_mr: "",
    name_en: "",
    position_mr: "",
    position_en: "",
    education: "",
    category: "teacher",
    photo: null
  });

  const [preview, setPreview] = useState(null);


  // ===============================
  // Load Teachers
  // ===============================

  const loadTeachers = async () => {

    try {

      const res = await fetch("https://zpsajur-backend-production.up.railway.app/api/teachers");
      const data = await res.json();

      setTeachers(Array.isArray(data) ? data : data.teachers || []);

    } catch (error) {

      console.log("Error loading teachers:", error);

    }

  };

  useEffect(() => {
    loadTeachers();
  }, []);


  // ===============================
  // Handle Input
  // ===============================

  const handleChange = (e) => {

    setTeacher({
      ...teacher,
      [e.target.name]: e.target.value
    });

  };


  // ===============================
  // Handle Photo Upload
  // ===============================

  const handlePhotoChange = async (e) => {

    const file = e.target.files[0];

    if (file.size > 10 * 1024 * 1024) {
      alert("Image too large (max 10MB)");
      return;
    }

    if (!file) return;

    try {

      const options = {
        maxSizeMB: 0.3,
        maxWidthOrHeight: 1200,
        useWebWorker: true
      };

      const compressedFile = await imageCompression(file, options);

      setTeacher({
        ...teacher,
        photo: compressedFile
      });

      setPreview(URL.createObjectURL(compressedFile));

    } catch (error) {

      console.log("Compression error:", error);

    }

  };


  // ===============================
  // Add / Update Teacher
  // ===============================

  const handleSubmit = async (e) => {

    e.preventDefault();

    const formData = new FormData();

    formData.append("name[mr]", teacher.name_mr);
    formData.append("name[en]", teacher.name_en);
    formData.append("position[mr]", teacher.position_mr);
    formData.append("position[en]", teacher.position_en);
    formData.append("education", teacher.education);
    formData.append("category", teacher.category);

    if (teacher.photo) {
      formData.append("photo", teacher.photo);
    }

    try {

      if (editingId) {

        await fetch(`https://zpsajur-backend-production.up.railway.app/api/teachers/${editingId}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          },
          body: formData
        });

      } else {

        await fetch("https://zpsajur-backend-production.up.railway.app/api/teachers", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          },
          body: formData
        });

      }

      resetForm();
      loadTeachers();

    } catch (error) {

      console.log("Error saving teacher:", error);

    }

  };


  // // ===============================
  // // Edit Teacher
  // // ===============================

  // const editTeacher = (t) => {

  //   setTeacher({
  //     name_mr: t.name.mr,
  //     name_en: t.name.en,
  //     position_mr: t.position.mr,
  //     position_en: t.position.en,
  //     education: t.education,
  //     category: t.category,
  //     photo: null
  //   });

  //   setPreview(t.photo);
  //   setEditingId(t._id);

  // };


  // ===============================
  // Delete Teacher
  // ===============================

  const deleteTeacher = async (id) => {

    const confirmDelete = window.confirm("Delete this teacher?");

    if (!confirmDelete) return;

    try {

      await fetch(`https://zpsajur-backend-production.up.railway.app/api/teachers/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      loadTeachers();

    } catch (error) {

      console.log("Error deleting teacher:", error);

    }

  };


  // ===============================
  // Reset Form
  // ===============================

  const resetForm = () => {

    setTeacher({
      name_mr: "",
      name_en: "",
      position_mr: "",
      position_en: "",
      education: "",
      category: "teacher",
      photo: null
    });

    setPreview(null);
    setEditingId(null);

  };


  // ===============================
  // UI
  // ===============================

  return (

    <div className="manage-teachers-page">

      <div className="manage-teachers-container">

        <h2>Manage Teachers</h2>

        <form onSubmit={handleSubmit} className="teacher-form">

          <input
            name="name_mr"
            placeholder="Name (Marathi)"
            value={teacher.name_mr}
            onChange={handleChange}
          />

          <input
            name="name_en"
            placeholder="Name (English)"
            value={teacher.name_en}
            onChange={handleChange}
          />

          <input
            name="position_mr"
            placeholder="Position (Marathi)"
            value={teacher.position_mr}
            onChange={handleChange}
          />

          <input
            name="position_en"
            placeholder="Position (English)"
            value={teacher.position_en}
            onChange={handleChange}
          />

          <input
            name="education"
            placeholder="Education"
            value={teacher.education}
            onChange={handleChange}
          />

          <select
            name="category"
            value={teacher.category}
            onChange={handleChange}
          >

            <option value="teacher">Teacher</option>
            <option value="special">Special Member</option>

          </select>

          <input
            type="file"
            onChange={handlePhotoChange}
          />

          {preview && (
            <div className="preview-image">
              <img src={preview} alt="preview" width="100" />
            </div>
          )}

          <button className="submit-btn" type="submit">
            {editingId ? "Update Teacher" : "Add Teacher"}
          </button>

        </form>

        <hr />

        <h3>Teachers List</h3>

        <table className="teachers-table">

          <thead>

            <tr>
              <th>Photo</th>
              <th>Name</th>
              <th>Position</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            {Array.isArray(teachers) && teachers.map((t) => (

              <tr key={t._id}>

                <td>
                  <img src={t.photo} alt="" width="60" />
                </td>

                <td>{t.name.en}</td>

                <td>{t.position.en}</td>

                <td>{t.category}</td>

                <td>

                  {/* <button
                    className="action-btn edit-btn"
                    onClick={() => editTeacher(t)}
                  >
                    Edit
                  </button> */}

                  <button
                    className="action-btn delete-btn"
                    onClick={() => deleteTeacher(t._id)}
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

  );

}

export default ManageTeachers;
