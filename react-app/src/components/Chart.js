import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useHistory } from "react-router-dom";
import * as liftActions from "../store/reducers/lifts"
import * as graphActions from "../store/reducers/graphData"
import * as selectActions from "../store/reducers/selected"
import * as clickActions from "../store/reducers/clicked"
import * as sessionActions from "../store/reducers/session"
import { ResponsiveLine } from '@nivo/line'
import Select from 'react-select'
import Tippy, { tippy } from '@tippyjs/react';
import { roundArrow } from 'tippy.js'
import 'tippy.js/dist/tippy.css';
import 'tippy.js/dist/svg-arrow.css';
import 'tippy.js/themes/material.css';
import 'tippy.js/dist/border.css';

const Chart = ({ authenticated }) => {
    const user = useSelector((x) => x.session.user)
    const allLifts = useSelector((x) => x.session.user.lifts)
    const liftIds = useSelector((x) => x.clickedLiftIds)
    const stats = useSelector((x) => (x.shownLifts.stats))
    const lift = useSelector((x) => (x.shownLifts.lift))
    const selectedLifts = useSelector((x) => x.selectedLifts)

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




    // const [liftIds, setLiftIds] = useState([])

    const setSelectedLifts = async (lifts) => {
        let ids = []
        for (let key in lifts) {
            ids.push(lifts[key].id)
        }
        // await dispatch(clickActions.setClickedLifts(ids))
        await dispatch(selectActions.setSelected(ids))
        await dispatch(graphActions.setGraphLifts(ids))


    }

    const [visible, setVisible] = useState(false);

    // useEffect(() => {
    //     let selectedIds = []
    //     for (let key in selectedLifts) {
    //         selectedIds.push(selectedLifts[key].id)
    //     }

    //     console.log("selectedIds:", selectedIds)
    //     console.log("ids:", liftIds)
    //     if (liftIds && liftIds.length != selectedIds.length) {
    //         setVisible(true)
    //         setTimeout(() => {
    //             setVisible(false)
    //             setTimeout(()=>{
    //                 dispatch(clickActions.setClickedLifts(selectedIds))
    //             },150)
    //         }, 3000)
    //     } else {
    //         setVisible(false)
    //     }
    // }, [selectedLifts])

    // const findIds = async () => {
    //     let ids = []
    //     for (let option in selected) {
    //         ids.push(option.id)
    //     }
    // }

    // useEffect(() => {
    //     let ids = []
    //     for (let key in selected) {
    //         ids.push(selected[key].id)
    //     }
    //     dispatch(graphActions.setGraphLifts(ids))

    // }, [selected])




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
        fontOpacity: 1,
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
                <p className="chart-heading">PROGRESS</p>
                <div className="chart-and-select">
                    {/* <Tippy content={"Lift has no stats!"} maxWidth={600} arrow={roundArrow} visible={visible} theme={'custom'} > */}
                        <div className="graph-select">
                            <Select
                                className="graph-select-dropdown"
                                isMulti={true}
                                placeholder="Select Lifts"
                                noOptionsMessage="no lifts"
                                autoFocus
                                value={selectedLifts && selectedLifts.map((lift) => {
                                    return {
                                        id: lift.id,
                                        value: lift.id,
                                        label: lift.title
                                    }
                                })}
                                isOptionDisabled={(option) => option.isdisabled}
                                onChange={setSelectedLifts}
                                theme={customTheme}
                                isSearchable
                                options={allLifts && allLifts.map((lift) => {
                                    console.log(lift.stats)
                                    if (JSON.stringify(lift.stats) === JSON.stringify({})) {
                                            return {
                                                id: lift.id,
                                                value: lift.id,
                                                label: lift.title,
                                                isdisabled: true
                                            }
                                        } else {
                                            return {
                                                id: lift.id,
                                                value: lift.id,
                                                label: lift.title
                                            }
                                        }
                                })}
                            />

                        </div>

                    {/* </Tippy> */}
                    <div className="chart-container">
                        <ResponsiveLine
                            data={graphData && graphData.length >= 1 ? graphData : data}
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
