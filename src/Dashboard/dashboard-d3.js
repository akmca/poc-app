import React, { Component } from "react";

import USAMap from "react-usa-map";
import Chart from "react-apexcharts";
import allStates from "../data/usstates.json";
import { LineChart } from 'react-charts-d3';

class DashboardD3 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentState: 'WA',
            data: [
                { key: 'Group 1', values: [{ x: 'A', y: 23 }, { x: 'B', y: 8 }] },
                { key: 'Group 2', values: [{ x: 'A', y: 15 }, { x: 'B', y: 37 }] },
            ],
            options: {
                chart: {
                    toolbar: {
                        show: false
                    }
                },
                xaxis: {
                    categories: ['15-Jan', '1-Feb', '15-Feb', '1-Mar', '15-Mar', '1-Apr', '15-Apr', '15-Apr', '15-Apr', '1-Jun', '15-Jun']
                },
                yaxis: {
                    labels: {
                        formatter: (value) => value > 0 ? `+${value}%` : `${value}%`
                    }
                }
            },
            series: [
                {
                    name: "series-1",
                    data: allStates.filter(x => x.id === 'WA')[0].series
                }
            ]
        };
    }

    statesCustomConfig = () => {
        return {
            "NJ": {
                fill: "navy",
                //clickHandler: (event) => console.log('Custom handler for NJ', event.target.dataset)
            },
            "AL": {
                fill: "red",
                text: 'AL'
            },
            "FL": {
                fill: "Orange",
                text: 'AL'
            },
            "NY": {
                fill: "#CC0000"
            }
        };
    };

    onstateChangeHandler = (event) => {
        let stateID = event.target.dataset.name;
        alert(stateID);
        if (allStates.filter(x => x.id === stateID).length > 0) {
            let seriesData = [...this.state.series];
            seriesData[0].data = allStates.filter(x => x.id === stateID)[0].series;
            this.setState({
                series: seriesData, currentState: stateID, options: {
                    xaxis: {
                        categories: ['15-Jan', '1-Feb', '15-Feb', '1-Mar', '15-Mar', '1-Apr', '15-Apr', '15-Apr', '15-Apr', '1-Jun', '15-Jun']
                    },
                    yaxis: {
                        labels: {
                            formatter: (value) => value > 0 ? `+${value}%` : `${value}%`
                        }
                    }
                }
            });
        }
    }

    render() {
        return (
            <div className="container-fluid">
                <h3>Dashboard in D3</h3>
                <div className="my-card">
                    <div className="row">
                        <div className="col-lg-6">
                            <h3>All US States</h3>
                            <USAMap customize={this.statesCustomConfig()} onClick={this.onstateChangeHandler} />
                        </div>
                        <div className="col-lg-6">
                            <div className="mixed-chart">
                                <h3>Current State : {this.state.currentState}</h3>
                                {/* <LineChart data={this.state.data} /> */}
                                <Chart
                                    options={this.state.options}
                                    series={this.state.series}
                                    type="line"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DashboardD3;