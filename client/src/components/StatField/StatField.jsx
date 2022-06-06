import { useState, useEffect } from 'react'
import handleCalculations from '../../utils/calculations/stat_calculations'
import StatButton from '../StatButton/StatButton'
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
    }, [props.value, statValue])
    

    return (
        <div id="stat-field-container">
            <div class="grid-item"><p>{statName}: {statValue}</p></div>
            <div className="grid-item"></div>
            <StatButton icon={'+'} onClick={() => {props.handleIncrement(statName)}}/>
            <StatButton icon={'-'} onClick={() => {props.handleDecrement(statName)}}/>
        </div>
    )

}

export default StatField