import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { retriveStudents } from '../actions/students'

const Students = () => {
    const students = useSelector(state => state.students)
    console.log("🚀 ~ file: Students.js ~ line 6 ~ Students ~ students", students)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(retriveStudents())
    }, [])
    return (
        <div>
            <h1>Students</h1>
            {
                students && students.map((st,index) => (
                    <div key={index}>
                        <h1>{st[0].username}</h1>
                    </div>
                ))
            }
        </div>
    )
}

export default Students
