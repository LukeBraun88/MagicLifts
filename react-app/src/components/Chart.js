import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useHistory } from "react-router-dom";
import * as liftActions from "../store/reducers/lifts"
import * as graphActions from "../store/reducers/graphData"
import * as sessionActions from "../store/reducers/session"
import { ResponsiveLine } from '@nivo/line'
import Select from 'react-select'


const Chart = ({authenticated}) => {
    const user = useSelector((x) => x.session.user)
    const allLifts = useSelector((x)=>x.session.user.lifts)
    // const lift = useSelector((x) => (x.shownLifts.lift))
    const stats = useSelector((x) => (x.shownLifts.stats))
    const graphData = useSelector((x)=> x.graphData)
    let dispatch = useDispatch()
    let history = useHistory()

    const closeMenu = () => {
        dispatch(sessionActions.toggleMenu(false))
    }

    const goBack = async () => {
        window.history.back()
        window.history.back()
    }

    const [selected, setSelected] = useState([])

    const findIds = async() =>{
        let ids = []
        for (let option in selected) {
            // console.log(option)
            ids.push(option.id)
        }
    }

    useEffect(() => {
        let ids = []
        for (let key in selected) {
            console.log(selected[key])
            ids.push(selected[key].id)
        }
        // console.log("ids:",ids)
        dispatch(graphActions.setGraphLifts(ids))
    }, [selected])

    // const addLift = async(selectedOption) =>{

    //     setSelected(selectedOption)
    //     // console.log(selectedOption)
    //     // console.log("ids:",ids)
    //     // await
    // }
    const handleChange = function(e) {

    }



    const data =[
        {
            "id": "japan",
            "color": "hsl(230, 70%, 50%)",
            "data": [
                {
                    "x": "plane",
                    "y": 51
                },
                {
                    "x": "helicopter",
                    "y": 123
                },
                {
                    "x": "boat",
                    "y": 259
                },
                {
                    "x": "train",
                    "y": 4
                },
                {
                    "x": "subway",
                    "y": 149
                },
                {
                    "x": "bus",
                    "y": 171
                },
                {
                    "x": "car",
                    "y": 201
                },
                {
                    "x": "moto",
                    "y": 141
                },
                {
                    "x": "bicycle",
                    "y": 4
                },
                {
                    "x": "horse",
                    "y": 182
                },
                {
                    "x": "skateboard",
                    "y": 171
                },
                {
                    "x": "others",
                    "y": 75
                }
            ]
        }
    ]

    function customTheme(theme){
        return {
            ...theme,
            colors: {
                ...theme.colors,
                primary25: 'aquamarine',
                primary: 'aquamarine'
            }
        }
    }



    return(
        <div className="body" onClick={() => closeMenu()}>
            <div className="chart-background">
                <p className="chart-heading">CREATE LIFT</p>
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
                            return { id:lift.id,
                                 value:lift.id,
                                label: lift.title }
                        })}
                        // onChange={(e) => addLift(e.target.value)}
                    />
                </div>
                <div className="chart-container">
            <ResponsiveLine
                data={data}
                margin={{ top: 50, right: 110, bottom: 90, left: 80 }}
                xScale={{ type: 'point' }}
                yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
                axisTop={null}
                axisRight={null}
                theme={{"textColor": "white",
                        "fontSize": 19,
                        "labelFontSize":19}}

                axisBottom={{
                    orient: 'bottom',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
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
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabelYOffset={-12}
                useMesh={true}
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 110,
                        translateY: 0,
                        itemWidth: 100,
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
                                    itemBackground: 'rgba(0, 0, 0, .03)',
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
    )
}

export default Chart;
