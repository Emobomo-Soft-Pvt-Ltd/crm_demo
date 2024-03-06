import Sidebar from "../Sidebar";
import Header from "../Header";
import "./css/Projects.css";
import { Link } from "react-router-dom";

function Projects() {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="contents">
        <Header />
        <nav className="sub-navbar">
          <h6>Projects</h6>
          <ul className="ul">
            <li>
              <Link to=" ">Venture 1</Link>
            </li>
            <li>
              <Link to=" ">Venture 2</Link>
            </li>
            <li>
              <Link to=" ">Venture 3</Link>
            </li>
          </ul>
        </nav>
        <div className="containerrr pt-20"></div>
      </div>
    </div>
  );
}

export default Projects;
