import React, { Component } from "react";
import "./settings.css";
import Navbar from "../../components/Navbar";
import Roles from "../../components/SettingsComponents/Roles";

const routes = [
  { id: 1, name: "Roles" },
  { id: 2, name: "Store Information" },
  { id: 3, name: "Store Settings" },
  { id: 4, name: "Data Settings" },
];

class Settings extends Component {
  state = {
    active: 1,
  };

  renderSettings() {
    const { active } = this.state;

    switch (active) {
      case 1:
        return <Roles />;
      case 2:
        return <p>The store information</p>;
      case 3:
        return <p>The store settings</p>;
      case 4:
        return <p>The data Settings</p>;

      default:
        return <Roles />;
    }
  }

  render() {
    const { active } = this.state;
    return (
      <div>
        <Navbar />
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light py-3 mt-2 report-nav settings__tab">
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav mx-auto h5 f-1 settingTab__list ">
                {routes.map((route, key) => {
                  return (
                    <li
                      key={key}
                      onClick={() => this.setState({ active: route.id })}
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
          <div className="container">{this.renderSettings()}</div>
        </div>
      </div>
    );
  }
}

export default Settings;
