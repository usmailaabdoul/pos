import React, { useState } from "react";
import "./settings.css";
import Roles from "../../components/SettingsComponents/Roles";
import Backups from "../../components/SettingsComponents/Backups";

const routes = [
  { id: 1, name: "Roles" },
  { id: 2, name: "Backups" },
  // { id: 3, name: "Store Information" },
  // { id: 4, name: "Store Settings" },
  // { id: 5, name: "Data Settings" },
];

const Settings = () => {
  const [active, setActive] = useState(1);

  function renderSettings() {
    switch (active) {
      case 1:
        return <Roles />;
      case 2:
        return <Backups />;
      // case 3:
      //   return <p>The store information</p>;
      // case 4:
      //   return <p>The store settings</p>;
      // case 5:
      //   return <p>The data Settings</p>;
      default:
        return <Roles />;
    }
  }

  return (
    <div>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light py-3 mt-2 report-nav settings__tab">
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mx-auto h5 f-1 settingTab__list ">
              {routes.map((route, key) => {
                return (
                  <li
                    key={key}
                    onClick={() => setActive(route.id)}
                    className={"nav-item"}
                  >
                    <a className="nav-link" href="###">
                      <span
                        className={
                          active === route.id ? "report-active-link" : null
                        }
                      >
                        {route.name}
                      </span>
                      {active === route.id ? (
                        <span class="sr-only">(current)</span>
                      ) : null}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
        <div className="container">{renderSettings()}</div>
      </div>
    </div>
  );
};

export default Settings;
