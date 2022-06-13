import './statButton.css'

import { useState, useEffect } from 'react'

const StatButton = (props) => {

    const [icon, setIcon] = useState('')

    useEffect(() => {
        setIcon(props.icon)
    }, [])

    return (
        <>
            <div id="icon-container">
                <span onClick={props.onClick}>{icon}</span>
            </div>
        </>
    )
}

export default StatButton