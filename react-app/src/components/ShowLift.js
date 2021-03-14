import React, { useState, useCallback, useEffect } from "react";
import '@inovua/reactdatagrid-community'
import '@inovua/reactdatagrid-community/base.css'
import '@inovua/reactdatagrid-community/theme/default-dark.css'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'
import * as liftActions from "../store/reducers/lifts"
import * as sessionActions from "../store/reducers/session"

import plusIcon from "../images/icons/plus.png"
import minusIcon from "../images/icons/minus.png"

import ReactDataGrid from '@inovua/reactdatagrid-community'
import Tippy, { tippy } from '@tippyjs/react';
import { roundArrow } from 'tippy.js'
import 'tippy.js/dist/tippy.css';
import 'tippy.js/dist/svg-arrow.css';
import 'tippy.js/themes/material.css';
import 'tippy.js/dist/border.css';

function ShowLift({ authenticated }) {
    const [dataSource, setDataSource] = useState()
    const lift = useSelector((x) => (x.shownLifts.lift))
    const stats = useSelector((x) => (x.shownLifts.stats))
    const user = useSelector((x) => x.session.user)
    const history = useHistory()

    useEffect(() => {
        if (stats != null) {

            setDataSource(stats)
        }
    }, [stats])

    const dispatch = useDispatch()

    const closeMenu = () => {
        dispatch(sessionActions.toggleMenu(false))
    }

    const createStat = () => {
        history.push("/create-stat")
    }

    const deleteLift = async () => {
        await dispatch(liftActions.deleteLift({ liftId: lift.id }))
        await dispatch(sessionActions.normalizeUserData({ id: user.id }))
    }

    const onEditComplete = useCallback(({ value, columnId, rowIndex, data }) => {
        let { id, sets, reps, weight, date, difficulty, notes } = data
        if (columnId == "sets") {
            sets = value
        } else if (columnId == "reps") {
            reps = value
        } else if (columnId == "weight") {
            weight = value
        } else if (columnId == "date") {
            date = value
        } else if (columnId == "difficulty") {
            difficulty = value
        } else if (columnId == "notes") {
            notes = value
        }

        dispatch(liftActions.updateShownStats({ id, sets, reps, weight, date, difficulty, notes }))
    }, [dataSource])

    const statsExample = [
        {
            id: 1,
            sets: "example",
            reps: "example",
            weight: "100",
            date: "11",
            difficulty: "example",
            notes: 'example',
        }
    ]

    const columns = [
        {
            name: 'sets',
            header: 'Sets',
            defaultFlex: 1,
            header: 'Sets',
        },
        {
            name: 'reps',
            header: 'Reps',
            defaultFlex: 1,
            header: 'Reps'
        },
        {
            name: 'weight',
            header: 'Weight',
            defaultFlex: 1.2,
        },
        {
            name: 'date',
            header: 'Date',
            defaultFlex: 1.5,
        },
        {
            name: 'difficulty',
            header: 'Difficulty',
            defaultFlex: 1.4,


        },
        {
            name: 'notes',
            header: 'Notes',
            defaultFlex: 2,
        }

    ]

    const gridStyle = {
        minHeight: 250,
    }

    return (
        <>
            <div className="body" onClick={() => closeMenu()}>
                {lift !== "deleted" ?
                    <div className="table-container">
                        <Tippy content={lift ? lift.description : "no description of lift"} maxWidth={600} arrow={roundArrow} theme={'custom'} >
                            <p className="table-heading">{lift ? lift.title : "Example Heading"}</p>

                        </Tippy>
                        <Tippy content="Add Stat" arrow={roundArrow} theme={'custom'}>
                            <img className="table-plus" onClick={() => createStat()} src={plusIcon} alt='add stat' />
                        </Tippy>
                        <Tippy content="Delete Lift" arrow={roundArrow} theme={'custom'}>
                            <img className="table-minus" onClick={() => deleteLift()} src={minusIcon} alt='delete lift' />
                        </Tippy>
                        <ReactDataGrid dataSource={statsExample}
                            idProperty="id"
                            columns={columns}
                            dataSource={stats ? stats : statsExample}
                            style={gridStyle}
                            defaultSortInfo={{ name: 'date', dir: -1 }}
                            livePagination="true"
                            editable="true"
                            onEditComplete={onEditComplete}
                            theme="default-dark"
                        />
                    </div>
                    :
                    <div className="lift-delete">
                        <p className="lift-delete-text">LIFT DELETED</p>
                    </div>
                }
            </div>
        </>
    )
}

export default ShowLift;
