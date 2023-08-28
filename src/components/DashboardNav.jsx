import { Link } from "react-router-dom";

export default function DashboardNav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/addNew">AddNew</Link>
        </li>
        <li>
          <Link to="/view">View</Link>
        </li>
      </ul>
    </nav>
  );
}
