import { useEffect, useState } from "react";
import "./AdminQRUpdate.css";

function AdminQRUpdate() {

    const [currentQR, setCurrentQR] = useState("");
    const [qrFile, setQrFile] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchQR();
    }, []);


    const fetchQR = async () => {

        try {

            const res = await fetch("https://zpsajur-backend-production.up.railway.app/api/qr");

            const data = await res.json();

            if (data && data.imageUrl) {
                setCurrentQR(data.imageUrl);
            }

        } catch (error) {
            console.error("Error fetching QR:", error);
        }

    };


    const handleUpload = async () => {

        if (!qrFile) {
            alert("Please select a QR image");
            return;
        }

        setLoading(true);

        try {

            const token = localStorage.getItem("token");

            const formData = new FormData();

            formData.append("qr", qrFile);

            const response = await fetch(
                "https://zpsajur-backend-production.up.railway.app/api/qr/update",
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    body: formData
                }
            );

            const data = await response.json();

            if (response.ok) {

                alert("QR Updated Successfully");

                fetchQR();

                setQrFile(null); // clear selected file after upload

            } else {

                alert(data.message);

            }

        } catch (error) {

            console.error(error);
            alert("Upload failed");

        }

        setLoading(false);

    };


    return (
        <div className="admin-qr-page">

            <h2>Update Contribution QR</h2>

            <div className="qr-container">

                {/* Current QR */}
                <div className="current-qr">

                    <h3>Current QR Code</h3>

                    {currentQR ? (
                        <img src={currentQR} alt="Current QR" />
                    ) : (
                        <p>No QR uploaded yet</p>
                    )}

                </div>


                {/* Upload Section */}
                <div className="upload-qr">

                    <h3>Upload New QR</h3>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setQrFile(e.target.files[0])}
                    />

                    {qrFile && (
                        <div className="qr-preview">
                            <h4>Preview</h4>
                            <img
                                src={URL.createObjectURL(qrFile)}
                                alt="QR Preview"
                            />
                        </div>
                    )}

                    <button onClick={handleUpload} disabled={loading}>

                        {loading ? "Uploading..." : "Update QR"}

                    </button>

                </div>

            </div>

        </div>
    );
}

export default AdminQRUpdate;
