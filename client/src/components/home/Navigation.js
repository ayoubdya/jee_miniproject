import { getToken, getSession } from "../../contexts/";
import { logout } from "../../util";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

const Navigation = () => {
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [session, setSession] = useState(undefined);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    setIsSessionActive(getToken() !== undefined ? true : false);
    setSession(getSession());
  }, []);

  const logUserOut = () => {
    logout();
    window.location.reload();
  };

  const handleDropdown = () => {
    if (isDropdownOpen) {
      setIsDropdownOpen(false);
      document.getElementById("dropdown-btn-nav-1").blur();
    } else {
      setIsDropdownOpen(true);
    }
  };

  if (isSessionActive && session === undefined) {
    return null;
  }
  return (
    <div className="flex justify-between py-4 px-4">
      <Link to="/">
        <img src="/images/logo-v2.png" alt="" className="h-10" />
      </Link>
      <div className="flex">
        {!isSessionActive && (
          <div className="my-auto">
            <Link to="/register">
              <button
                className=" border-white
              font-bold rounded-lg px-6 py-1 bg-raisin-black
              text-silver-accent hover:text-slate-300  shadow-md"
              >
                Register
              </button>
            </Link>

            <Link to="/login">
              <button
                className=" border-white text-raisin-black ml-2
              font-bold rounded-lg px-6 py-1 bg-silver-accent hover:bg-slate-300  shadow-md"
              >
                Login
              </button>
            </Link>
          </div>
        )}
        {isSessionActive && (
          <div className="dropdown dropdown-end">
            <label
              tabIndex="0"
              className="btn"
              id="dropdown-btn-nav-1"
              onClick={() => handleDropdown()}
              onBlur={(e) => setIsDropdownOpen(false)}
            >
              <Icon
                className="w-10 h-10 text-gray-600 bg-silver-accent rounded-full"
                icon="tabler:user-circle"
                inline={true}
              />
            </label>
            <ul
              tabIndex="0"
              className="dropdown-content menu p-2 shadow bg-silver-accent text-left rounded-box w-40"
            >
              {session.accountType != "ADMIN" &&
                session.accountType != "SUPERUSER" && (
                  <Link to={`/me`}>
                    <li>
                      <div className="flex text-lg rounded-lg hover:bg-gray-500 hover:bg-opacity-10 px-1">
                        <Icon
                          className="w-6 h-6 text-gray-600"
                          icon="tabler:user"
                          inline={true}
                        />
                        <span className="ml-1.5 pb-1">profile</span>
                      </div>
                    </li>
                  </Link>
                )}

              {/* <Link to='/account'>
                <li>
                  <div className='flex text-lg rounded-lg hover:bg-gray-500 hover:bg-opacity-10 px-1'>
                    <Icon className='w-6 h-6 text-gray-600' icon="tabler:pencil" inline={true} />
                    <span className='ml-1.5 pb-1'>edit account</span>
                  </div>
                </li>
              </Link> */}

              {session.accountType != "CUSTOMER" && (
                <Link to="/control-panel">
                  <li>
                    <div className="flex text-lg rounded-lg hover:bg-gray-500 hover:bg-opacity-10 px-1">
                      <Icon
                        className="w-6 h-6 text-gray-600"
                        icon="tabler:settings"
                        inline={true}
                      />
                      <span className="ml-1.5 pb-1">control panel</span>
                    </div>
                  </li>
                </Link>
              )}

              <li onClick={logUserOut}>
                <div className="flex text-lg rounded-lg hover:bg-gray-500 hover:bg-opacity-10 px-1">
                  <Icon
                    className="w-6 h-6 text-gray-600"
                    icon="tabler:logout"
                    inline={true}
                  />
                  <span className="ml-1.5 pb-1">log out</span>
                </div>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navigation;
