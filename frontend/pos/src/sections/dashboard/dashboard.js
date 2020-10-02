import React, { useEffect, useState } from 'react';
import './dash.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import CachedIcon from '@material-ui/icons/Cached';
import { BarChart, PieChart, Pie, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts';
import { renderCustomizedLabel, COLORS } from '../../components/primaryPieChart/primaryPieChart';
import { DateRangePicker } from '../../components';
import EditIcon from '@material-ui/icons/Edit';
import apis from "../../apis/apis";


const pieChartData = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
];

var date = new Date();
var formatedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}  ${date.getHours()}:${date}`


const Dashboard = () => {

    const currentDate = new Date()
    const startMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0)
    const [startDate, setStartDate] = useState(startMonth)
    const [endDate, setEndDate] = useState(currentDate)
    const [isStartDatePickerOpen, setStartDatePickerOpen] = useState(false)
    const [isEndDatePickerOpen, setEndDatePickerOpen] = useState(false)
    const [salesData, setSalesData] = useState([])


    useEffect(() => {
        getSales()
    }, [])

    const getSales = async () => {
        const data = await apis.reportApi.sales(startDate.getTime(), endDate.getTime(), "", "", "day")
        let tmp = []
        Object.keys(data).forEach(key => {
            tmp.push({ label: new Date(key).toLocaleDateString(), total: data[key] })
        })
        setSalesData(tmp)
    }

    return (
        <div>
            <div>
                <div className="overview">
                    <h5>Sale overview</h5>
                    <div className="overview__inputs">
                        <div>
                            Start date <span className="ml-2" onClick={() => setStartDatePickerOpen(true)}><EditIcon style={{ fontSize: 20 }} /></span> <span>{startDate.toLocaleDateString()}</span>
                            {isStartDatePickerOpen && <DateRangePicker label="dashboard" default="week" onClose={() => setStartDatePickerOpen(false)} onSave={(dates) => { console.log(dates) }}></DateRangePicker>}
                        </div>
                        <div>
                            End date <span className="ml-2" onClick={() => setEndDatePickerOpen(true)}><EditIcon style={{ fontSize: 20 }} /></span><span>{endDate.toLocaleDateString()}</span>
                            {isEndDatePickerOpen && <DateRangePicker label="dashboard" default="week" onClose={() => setEndDatePickerOpen(false)} onSave={(dates) => { console.log(dates) }}></DateRangePicker>}
                        </div>
                        <button type="button" class="btn btn-secondary">
                            <CachedIcon />
                            Refresh
                        </button>

                    </div>
                </div>
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
                <div class="col mt-2">
                    <div>
                        <h4 className="card-title text-center">Sales</h4>
                    </div>
                    <BarChart
                        width={1000}
                        height={300}
                        data={salesData}
                        margin={{
                            top: 5, right: 30, left: 20, bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="label" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="total" fill="#8884d8" />
                    </BarChart>
                </div>
                <div class="row row-cols-2 ">
                    <div class="col">
                        <div>
                            <h4 className="card-title text-center">Top selling items</h4>
                        </div>
                        <PieChart width={500} height={300} >
                            <Pie
                                data={pieChartData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            > {
                                    pieChartData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                                }
                            </Pie>
                        </PieChart>
                    </div>
                    <div class="col">
                        <div>
                            <h4 className="card-title text-center">Worst selling items</h4>
                        </div>
                        <PieChart width={500} height={300} >
                            <Pie
                                data={pieChartData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {
                                    pieChartData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                                }
                            </Pie>
                        </PieChart>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
