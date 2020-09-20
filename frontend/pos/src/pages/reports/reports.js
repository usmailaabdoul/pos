import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './reports.css';
import { Dashboard, Sales } from '../../sections';
import Navbar from '../../components/Navbar';

const routes = [
  { id: 1, name: 'Dashboard' },
  { id: 2, name: 'Sales' },
  { id: 3, name: 'Items' },
  { id: 4, name: 'Customer' },
  { id: 5, name: 'Print' },
  { id: 6, name: 'Spiral' },
  { id: 7, name: 'Scan' },
  { id: 8, name: 'Payment' },
  { id: 9, name: 'Audit Trail' },
];

class Reports extends Component {
  constructor() {
    super();
    this.state = {
      active: 1,
    }
  }

  renderRoutes() {
    const { active } = this.state;

    switch (active) {
      case 1:
        return <Dashboard />;
      case 2:
        return <Sales />
      case 3:
        return <div>sales page loading</div>;
      case 4:
        return <div>sales page loading</div>;
      case 5:
        return <div>sales page loading</div>;
      case 6:
        return <div>sales page loading</div>;
      case 7:
        return <div>sales page loading</div>;
      default:
        return <Dashboard />;
    }
  }

  render() {
    const { active } = this.state;

    return (
      <div>
        <Navbar />
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light py-3 mt-2 report-nav">
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav mx-auto h5 f-1">
                {routes.map((route, key) => {
                  return (
                    <li key={key} onClick={() => this.setState({ active: route.id })} className={"nav-item"}>
                      <a className="nav-link" href="###">
                        <span className={active === route.id ? "report-active-link" : null}>{route.name}</span>
                        {active === route.id ? <span class="sr-only">(current)</span> : null}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          </nav>
          <div className="container">
            {this.renderRoutes()}
          </div>
        </div>
      </div>
    )
  };
};

export default Reports;
