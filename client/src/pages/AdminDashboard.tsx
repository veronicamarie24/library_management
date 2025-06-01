import { SearchBooks } from "../components/admin-dashboard/SearchBooks";
import "../styles/AdminDashboard.css";

export default function AdminDashboard() {
  return (
    <div className="dashboard">
      <h1>Admin Dashboard</h1>
      <div className="widget-container">
        <div className="section">
          <h2>Add New Book</h2>
        </div>
        <div className="section">
          <h2>Search Books</h2>
          <SearchBooks />
        </div>
      </div>
    </div>
  );
}
