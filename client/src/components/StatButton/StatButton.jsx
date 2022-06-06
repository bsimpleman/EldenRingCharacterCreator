import './statButton.css'

import { useState, useEffect } from 'react'

const StatButton = (props) => {

    const [icon, setIcon] = useState('')

    useEffect(() => {
        setIcon(props.icon)
    }, [])

    return (
        <>
        <span onClick={props.onClick}>{icon}</span>
        </>
    )
}

export default StatButton