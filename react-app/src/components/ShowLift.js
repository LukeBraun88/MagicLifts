import React, {useState, useCallback, useEffect} from "react";
import '@inovua/reactdatagrid-community'
import '@inovua/reactdatagrid-community/base.css'
import '@inovua/reactdatagrid-community/theme/default-dark.css'
import NumericEditor from '@inovua/reactdatagrid-community/NumericEditor'
import { useSelector, useDispatch } from 'react-redux';
import * as liftActions from "../store/reducers/lifts"

import ReactDataGrid from '@inovua/reactdatagrid-community'

function ShowLift({ authenticated }) {
    const [dataSource, setDataSource] = useState()
    const lift = useSelector((x) => (x.shownLifts.lift))
    const stats = useSelector((x) => (x.shownLifts.stats))

    const [liftId, setliftId] = useState(0)

    const defaultSortInfo = { name: 'date', dir: 1 }

    useEffect(()=>{
        if (stats != null){

            setDataSource(stats)
            // console.log("------------dataSource:",dataSource)
        }
    },[stats])

    useEffect(()=>{
        console.log("lift", lift)
    },[])

    const dispatch = useDispatch()

    const onEditComplete = useCallback(({ value, columnId, rowIndex, data }) => {
        let {id, sets, reps, weight, date, difficulty, notes} = data
        // console.log("columnId",columnId)
        if (columnId == "sets"){
            sets = value
        } else if (columnId == "reps"){
            reps = value
        } else if (columnId == "weight"){
            weight = value
        } else if (columnId == "date"){
            date = value
        } else if (columnId == "difficulty"){
            difficulty = value
        } else if (columnId == "notes"){
            notes = value
        }
        // console.log({
        //     "id":id,
        //     "sets":sets,
        //     "reps": reps,
        //     "weight":weight,
        //     "date":date,
        //     "difficulty":difficulty,
        //     "notes": notes,
        // })
        // console.log({
        //     "columnId":columnId,
        //     "value":value
        // })
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
            defaultFlex: 2,
        }

    ]

    const gridStyle = {
        minHeight: 250,


    }




    // console.log(lifts)
    // console.log(stats)
    return (
        <div className="body">
        <div className="table-container">
            <p className="table-heading">{lift? lift.title : "Example Heading"}</p>
        <ReactDataGrid dataSource={statsExample}
            idProperty="id"
            columns={columns}
            dataSource={stats? stats : statsExample}
            style={gridStyle}
            defaultSortInfo={defaultSortInfo}
            livePagination="true"
            editable="true"
            onEditComplete={onEditComplete}
            theme= "default-dark"
        />
        </div>
        </div>
    )
}

export default ShowLift;
