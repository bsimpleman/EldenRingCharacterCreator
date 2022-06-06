import { useState, useEffect, useCallback } from 'react'
import handleCalculations from '../../utils/calculations/stat_calculations'
import './characterBuilder.css'

import StatField from '../StatField/StatField'

const CharacterBuilder = () => {

    const [HP, setHP] = useState('10')
    const [FP, setFP] = useState('10')
    const [stamina, setStamina] = useState('10')

    const STATS_LIST = ['Vigor', 'Mind', 'Endurance', 'Strength', 'Dexterity', 'Intelligence', 'Faith', 'Arcane']
    const [stats, setStats] = useState({
        'Vigor': 10, 'Mind': 10, 'Endurance': 10, 'Strength': 0, 'Dexterity': 0, 'Intelligence': 0, 'Faith': 0, 'Arcane': 0
    })

    const calculateStats = () => {
        setHP(handleCalculations(stats['Vigor'], 'HP (Vigor)'))
        setFP(handleCalculations(stats['Mind'], 'FP (Mind)'))
        setStamina(handleCalculations(stats['Endurance'], 'Stamina (Endurance)'))
    }

    const incrementStatValue = useCallback((stat) => {
        const newStats = {...stats}
        newStats[stat]++
        setStats(newStats)
    })

    const decrementStatValue = useCallback((stat) => {
        const newStats = {...stats}
        newStats[stat]--
        setStats(newStats)
    })


    useEffect(() => {
        calculateStats()
    }, [stats]);

    return (
        <>
            <div id="main-content">
                <div id="column-container">
                    <div className="column">
                        <div className="stat-container">
                            {Object.keys(stats).map((key) => <StatField handleIncrement={incrementStatValue} handleDecrement={decrementStatValue} name={key} value={stats[key]}/>)}
                        </div>
                    </div>
                    <div className="column"></div>
                    <div className="column">
                        <p>HP: {HP}</p>
                        <p>FP: {FP}</p>
                        <p>Stamina: {stamina}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CharacterBuilder