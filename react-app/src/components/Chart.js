import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useHistory } from "react-router-dom";
import * as liftActions from "../store/reducers/lifts"
import * as graphActions from "../store/reducers/graphData"
import * as sessionActions from "../store/reducers/session"
import { ResponsiveLine } from '@nivo/line'
import Select from 'react-select'


const Chart = ({ authenticated }) => {
    const user = useSelector((x) => x.session.user)
    const allLifts = useSelector((x) => x.session.user.lifts)
    // const lift = useSelector((x) => (x.shownLifts.lift))
    const stats = useSelector((x) => (x.shownLifts.stats))
    const graphData = useSelector((x) => x.graphData)
    let dispatch = useDispatch()
    let history = useHistory()

    const closeMenu = () => {
        dispatch(sessionActions.toggleMenu(false))
    }

    const goBack = async () => {
        window.history.back()
        window.history.back()
    }

    useEffect(() => {
    }, [graphData])

    const [selected, setSelected] = useState([])

    const findIds = async () => {
        let ids = []
        for (let option in selected) {
            ids.push(option.id)
        }
    }

    useEffect(() => {
        let ids = []
        for (let key in selected) {
            ids.push(selected[key].id)
        }
        dispatch(graphActions.setGraphLifts(ids))
    }, [selected])


    const data = [
        {
            "id": "Select a Lift",
            "color": "hsl(230, 70%, 50%)",
            "data": [
                {
                    "x": "2001-01-01",
                    "y": 100
                },
            ]
        }
    ]

    function customTheme(theme) {
        return {
            ...theme,
            colors: {
                ...theme.colors,
                primary25: '#34c0b9',
                primary: '#34c0b9'
            },


        }
    }

    const theme = {
        background: 'transparent',
        fontFamily: 'sans-serif',
        fontSize: 19,
        fontOpacity:1,
        textColor: 'white',
        axis: {
            domain: {
                line: {
                    stroke: 'transparent',
                    strokeWidth: 1
                }
            },
            ticks: {
                line: {
                    stroke: '#777777',
                    strokeWidth: 1
                },
                text: {}
            },
            legend: {
                text: {
                    fontSize: 18
                }
            }
        },
        grid: {
            line: {
                stroke: '#dddddd',
                strokeWidth: 1
            }
        },
        legends: {
            text: {
                fill: 'white'
            }
        },
        labels: {
            text: {}
        },
        markers: {
            lineColor: 'white',
            lineStrokeWidth: 1,
            text: {}
        },
        dots: {
            text: {}
        },
        tooltip: {
            container: {
                background: 'white',
                color: 'inherit',
                fontSize: 'inherit',
                borderRadius: '2px',
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.25)',
                padding: '5px 9px'
            },
            basic: {
                whiteSpace: 'pre',
                display: 'flex',
                alignItems: 'center'
            },
            table: {},
            tableCell: {
                padding: '3px 5px'
            }
        },
        crosshair: {
            line: {
                stroke: 'white',
                strokeWidth: 1,
                strokeOpacity: 0.75,
                strokeDasharray: '6 6'
            }
        },
        annotations: {
            text: {
                fontSize: 13,
                outlineWidth: 2,
                outlineColor: '#ffffff'
            },
            link: {
                stroke: 'white',
                strokeWidth: 1,
                outlineWidth: 2,
                outlineColor: '#ffffff'
            },
            outline: {
                fill: 'none',
                stroke: 'white',
                strokeWidth: 2,
                outlineWidth: 2,
                outlineColor: '#ffffff'
            },
            symbol: {
                fill: 'white',
                outlineWidth: 2,
                outlineColor: '#ffffff'
            }
        }
    }




    return (
        <div className="body" onClick={() => closeMenu()}>
            <div className="chart-background">
                <p className="chart-heading">CHARTED DATA</p>
                <div className="chart-and-select">
                    <div className="graph-select">
                        <Select
                            className="graph-select-dropdown"
                            onChange={setSelected}
                            isMulti={true}
                            placeholder="Select Lifts"
                            noOptionsMessage="no lifts"
                            autoFocus
                            theme={customTheme}
                            isSearchable
                            options={allLifts && allLifts.map((lift) => {
                                return {
                                    id: lift.id,
                                    value: lift.id,
                                    label: lift.title
                                }
                            })}
                        // onChange={(e) => addLift(e.target.value)}
                        />
                    </div>
                    <div className="chart-container">
                        <ResponsiveLine
                            data={graphData ? graphData : data}
                            margin={{ top: 50, right: 30, bottom: 90, left: 350 }}
                            xScale={{
                                type: 'point',
                                type: "time",
                                format: "%Y-%m-%d",
                                precision: "month",
                                useUTC: false,
                            }}
                            yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
                            axisTop={null}
                            axisRight={null}
                            lineWidth={2}
                            isInteractive
                            indexBy="date"
                            theme={theme}
                            xFormat="time:%Y-%m-%d"
                            axisBottom={{
                                orient: 'bottom',
                                tickSize: 5,
                                tickPadding: 5,
                                tickRotation: 0,
                                format: "%-m/%y",
                                legend: 'Date',
                                legendOffset: 55,
                                legendPosition: 'middle'
                            }}
                            axisLeft={{
                                orient: 'left',
                                tickSize: 5,
                                tickPadding: 5,
                                tickRotation: 0,
                                legend: '1RM',
                                legendOffset: -55,
                                legendPosition: 'middle'
                            }}
                            colors={{ scheme: 'set2' }}
                            pointSize={10}
                            pointColor={{ theme: 'background' }}
                            pointBorderWidth={3}
                            pointBorderColor={{ from: 'serieColor' }}
                            pointLabelYOffset={-12}
                            useMesh={true}
                            tooltip={(input) => {
                                // input.point['data'].xFormatted
                                return (
                                    <div className="tooltip">
                                        <p> Date: {input.point['data'].xFormatted}</p>
                                        <p> 1RM: {input.point['data'].yFormatted}</p>
                                    </div>
                                )
                            }}
                            legends={[
                                {
                                    anchor: 'bottom-left',
                                    direction: 'column',
                                    justify: false,
                                    translateX: -310,
                                    translateY: -10,
                                    itemWidth: 200,
                                    itemHeight: 21,
                                    itemsSpacing: 6,
                                    symbolSize: 20,
                                    symbolShape: 'circle',
                                    itemDirection: 'left-to-right',
                                    itemTextColor: '#777',
                                    effects: [
                                        {
                                            on: 'hover',
                                            style: {
                                                itemBackground: 'white;',
                                                itemOpacity: 1
                                            }
                                        }
                                    ]
                                }
                            ]}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chart;
