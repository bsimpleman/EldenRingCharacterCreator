import { useState, useEffect } from 'react'
import handleCalculations from '../../utils/calculations/stat_calculations'
import './statField.css'

const StatField = (props) => {

    const [statName, setStatName] = useState(null)
    const [statValue, setStatValue] = useState(0)

    useEffect(() => {
        setStatName(props.name)
        setStatValue(props.value)
    }, [])

    useEffect(() => {
        if (props.value !== statValue) {
            setStatValue(props.value);
        }
    }, [props.value])
    

    return (
        <div id="stat-field-container">
            <div class="grid-item"><p>{statName}: {statValue}</p></div>
            <div className="grid-item"></div>
            <div className="grid-item"><p onClick={() => {props.handleIncrement(statName)}}>+</p></div>
            <div className="grid-item"><p onClick={() => {props.handleDecrement(statName)}}>-</p></div>
        </div>
    )

}

export default StatField