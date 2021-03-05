import React from "react";
import '@inovua/reactdatagrid-community'
import '@inovua/reactdatagrid-community/base.css'
import '@inovua/reactdatagrid-community/theme/default-dark.css'
import { useSelector, useDispatch } from 'react-redux';

import ReactDataGrid from '@inovua/reactdatagrid-community'

function ShowLift({ authenticated }) {
    const lift = useSelector((x) => (x.shownLifts.lift))
    const stats = useSelector((x) => (x.shownLifts.stats))


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
            header: 'Sets'
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
            defaultFlex: 1,
        },
        {
            name: 'date',
            header: 'Date',
            defaultFlex: 1,
        },
        {
            name: 'difficulty',
            header: 'Difficulty',
            defaultFlex: 1,
        },
        {
            name: 'notes',
            header: 'Notes',
            defaultFlex: 1,
        }

    ]

    const gridStyle = {
        minHeight: 250,
        theme: "default-dark"

    }


    // console.log(lifts)
    // console.log(stats)
    return (
        <div className="table-container">
        <ReactDataGrid dataSource={statsExample}
            idProperty="id"
            columns={columns}
            dataSource={stats? stats : statsExample}
            style={gridStyle}
            livePagination={true}
        />
        </div>
    )
}

export default ShowLift;
