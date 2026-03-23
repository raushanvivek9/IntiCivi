import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">

      <div className="container">

        <Link className="navbar-brand" to="/">
          IntiCivi
        </Link>

        <button
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#menu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="menu">

          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/registercomplaint">
                Report Issue
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/trackissue">
                Track Complaint
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link">
                Login
              </Link>
            </li>

          </ul>

        </div>

      </div>

    </nav>
  )
}

export default Navbar