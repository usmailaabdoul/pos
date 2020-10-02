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
    const [rangeType, setRangeType] = useState("day")
    const [isDatePickerOPen, setDatePickerOpen] = useState(false)
    const [saleData, setSaleData] = useState([])
    const [grossSales, setGrossSales] = useState(0)
    const [grossProfit, setGrossProfit] = useState(0)


    useEffect(() => {
        getSales()
    }, [])

    const getSales = async () => {
        const res = await apis.reportApi.sales(startDate.getTime(), endDate.getTime(), "", "", rangeType)
        const { saleData, grossSales, grossProfit } = res

        let tmpSaleData = []
        Object.keys(saleData).forEach(key => {
            tmpSaleData.push({ label: new Date(key).toLocaleDateString(), total: saleData[key] })
        })
        setSaleData(tmpSaleData)
        setGrossSales(grossSales)
        setGrossProfit(grossProfit)
    }


    const handleDatePickerSaved = (dates) => {
        let _startDate = new Date(dates.start);
        let _endDate = new Date(dates.end);
        if (dates.type === 'year') {
            _startDate = new Date(dates.start, 0)
            _endDate = new Date(dates.end, 0)
        }
        setStartDate(_startDate)
        setEndDate(_endDate)
        setRangeType(dates.type)
        setDatePickerOpen(false)
    }



    return (
        <div>
            <div>
                <div className="overview">
                    <h5>Sale overview</h5>
                    <div className="overview__inputs">
                        <div>
                            Start date {startDate.toLocaleDateString()}&nbsp;
                            End date {endDate.toLocaleDateString()} &nbsp;  <span className="ml-2" onClick={() => setDatePickerOpen(true)}><EditIcon style={{ fontSize: 20 }} /></span>
                            {isDatePickerOPen && <DateRangePicker label="dashboard" default="week" onClose={() => setDatePickerOpen(false)} onSave={handleDatePickerSaved}></DateRangePicker>}
                        </div>
                        <button onClick={getSales} type="button" class="btn btn-secondary">
                            <CachedIcon />
                            Refresh
                        </button>

                    </div>
                </div>
                <div className="row row-cols-5 d-flex justify-content-center align-items-center">
                    <div className="col p-0 card mx-4 text-white bg-primary shadow" style={{ maxWidth: "12rem" }}>
                        <div className="card-header text-center">gross sales</div>
                        <div className="card-body">
                            <h5 className="card-title text-center">{grossSales} XAF</h5>
                            <p className="card-text text-center"><small>Last updated 3 mins ago</small></p>
                        </div>
                    </div>
                    <div className="col p-0 card mx-4 text-white bg-success shadow" style={{ maxWidth: "12rem" }}>
                        <div className="card-header text-center">gross profit</div>
                        <div className="card-body">
                            <h5 className="card-title text-center">{grossProfit} XAF</h5>
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
                        data={saleData}
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
