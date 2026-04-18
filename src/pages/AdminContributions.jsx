import { useEffect, useState } from "react";
import "./AdminContributions.css";

function AdminContributions() {

  const [contributions, setContributions] = useState([]);

  useEffect(() => {
    fetchContributions();
  }, []);

  const fetchContributions = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await fetch(
        "https://zpsajur-backend-production.up.railway.app/api/contributions/all",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (response.ok) {
        setContributions(data);
      } else {
        alert(data.message || "Unauthorized access");
      }

    } catch (error) {
      console.error("Error fetching contributions:", error);
    }

  };

  return (
    <div className="contribution-page">

      <div className="contribution-container">

        <h2 className="contribution-title">Contributions</h2>

        {/* Scroll wrapper added */}
        <div className="table-scroll">

          <table className="contribution-table">

            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Amount</th>
                <th>Transaction ID</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>

              {contributions.length === 0 ? (
                <tr>
                  <td colSpan="6" className="no-data">
                    No contributions yet
                  </td>
                </tr>
              ) : (
                contributions.map((c) => (
                  <tr key={c._id}>

                    <td>{c.name || "Unknown"}</td>

                    <td>{c.phone || "Unknown"}</td>

                    <td>{c.address || "Unknown"}</td>

                    <td className="amount">
                      ₹{c.amount}
                    </td>

                    <td className="transaction">
                      {c.transactionID}
                    </td>

                    <td>
                      {new Date(c.createdAt).toLocaleDateString()}
                    </td>

                  </tr>
                ))
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default AdminContributions;
