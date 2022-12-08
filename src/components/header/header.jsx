import { Link, NavLink } from "react-router-dom";
import "./header.scss";
import useToken from '../../Hooks/useToken';

import logo from "../../assets/images/logo.svg";

function Header() {
  const [, setToken] = useToken();

  return (
    <header>
      <div className="nav-bar_wrapper">
        <div className="nav-bar_wrapper_inner">
          <div className="logo_wrapper">
            <Link to="/" className="title">
              <img src={logo} alt="logo" width={150} height={31} />
            </Link>
          </div>
          <nav>
            <ul className="nav_list">
              <li className="nav_list_item">
                <NavLink
                  className="nav_link"
                  to="/"
                >
                  Services
                </NavLink>
              </li>
              <li className="nav_list_item">
                <NavLink
                  className="nav_link"
                  to="/team"
                >
                  Our Team
                </NavLink>
              </li>
              <li className="nav_list_item">
                <NavLink
                  className="nav_link"
                  to="/message"
                >
                  All Message
                </NavLink>
              </li>
              <li className="nav_list_item">
                <NavLink
                  className="nav_link"
                  to="/partners"
                >
                  Partners
                </NavLink>
              </li>
              <li className="nav_list_item">
                <NavLink
                  className="nav_link"
                  to="/portfoliocategories"
                >
                  Portfolio Categories
                </NavLink>
              </li>
              <li className="nav_list_item">
                <NavLink
                  className="nav_link"
                  to="/portfolio"
                >
                  Portfolio
                </NavLink>
              </li>
              <li className="nav_list_item">
                <a
                  className="nav_link"
                >
                  Go to the site
                </a>
              </li>
              <li className="nav_list_item">
                <button
                  className='logout-modal__button'
                  onClick={() => {
                    setToken(false);
                  }}>
                  Log out
                </button>
              </li>
            </ul>
          </nav>

        </div>
      </div>
    </header>
  );
}

export default Header;