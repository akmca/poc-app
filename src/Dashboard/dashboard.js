import React, { Component } from "react";

import MapChart from "../MapChart";
import Chart from "react-apexcharts";
import allStates from "../data/usstates.json";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentState: 'WA',
            options: {
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
    onstateChangeHandler = (stateID) => {
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
                <div className="my-card">
                    <div className="row">
                        <div className="col-lg-6">
                            <h3>All US States</h3>
                            <MapChart click={this.onstateChangeHandler} />
                        </div>
                        <div className="col-lg-6">
                            <div className="mixed-chart">
                                <h3>Current State : {this.state.currentState}</h3>
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

export default Dashboard;