import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { DashboardGraph, PrimaryPieChart } from '../../components';

const graphData = [
  {
    year: '2015', sales: 4000, qnty: 2400, amt: 2400,
  },
  {
    year: '2016', sales: 3000, qnty: 1398, amt: 2210,
  },
  {
    year: '2017', sales: 2000, qnty: 9800, amt: 2290,
  },
  {
    year: '2018', sales: 2780, qnty: 3908, amt: 2000,
  },
  {
    year: '2019', sales: 1890, qnty: 4800, amt: 2181,
  },
  {
    year: '2020', sales: 2390, qnty: 3800, amt: 2500,
  },
  {
    year: '2014', sales: 3490, qnty: 4300, amt: 2100,
  },
];


const pieChartData = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const Dashboard = () => {

  return (
    <div>
      <div>
        <div><h5 className="my-4">Sale overview</h5></div>
        <div className="row row-cols-5 d-flex justify-content-center align-items-center">
          <div className="col p-0 card mx-4 text-white bg-primary shadow" style={{ maxWidth: "12rem" }}>
            <div className="card-header text-center">gross sales</div>
            <div className="card-body">
              <h5 className="card-title text-center">79,850 XAF</h5>
              <p className="card-text text-center"><small>Last updated 3 mins ago</small></p>
            </div>
          </div>
          <div className="col p-0 card mx-4 text-white bg-success shadow" style={{ maxWidth: "12rem" }}>
            <div className="card-header text-center">net sales</div>
            <div className="card-body">
              <h5 className="card-title text-center">79,850 XAF</h5>
              <p className="card-text text-center"><small>Last updated 3 mins ago</small></p>
            </div>
          </div>
          <div className="col p-0 card mx-4 text-white bg-info shadow" style={{ maxWidth: "12rem" }}>
            <div className="card-header text-center">products sold/mth</div>
            <div className="card-body">
              <h5 className="card-title text-center">150</h5>
              <p className="card-text text-center"><small>Last updated 3 mins ago</small></p>
            </div>
          </div>
        </div>
      </div>
      <div className="separator"></div>
      <div class="container mt-5">
        <div class="row row-cols-2 ">
          <div class="col mt-2">
            <div>
              <h4 className="card-title text-center">Quantity of products sold over time</h4>
            </div>
            <DashboardGraph data={graphData} />
          </div>
          <div class="col mt-2">
            <div>
              <h4 className="card-title text-center">Top selling items</h4>
            </div>
            <PrimaryPieChart data={pieChartData} />
          </div>
          <div class="col mt-5">
            <div>
              <h4 className="card-title text-center">Worst selling items</h4>
            </div>
            <PrimaryPieChart data={pieChartData} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;
