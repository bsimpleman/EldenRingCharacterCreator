import { useState, useEffect, useCallback, useMemo } from 'react'
import handleCalculations from '../../utils/calculations/stat_calculations'
import Dropdown from '../Dropdown/Dropdown'
import './characterBuilder.css'
import gear_data from '../../data/gear_data/Armor.json'
import talisman_data from '../../data/gear_data/Talismans.json'
import weapon_data from '../../data/gear_data/Weapons.json'
import spell_data from '../../data/gear_data/Spell_Data.json'
import starting_class_data from '../../data/Starting_Class_Data.json'

import ComboBox from '../ComboBox/ComboBox'

import StatField from '../StatField/StatField'

const CharacterBuilder = () => {

    const BASE_DISCOVERY = 100
    const RUNE_LEVEL_DIFFERENCE = 79

    const STATS_LIST = ['Vigor', 'Mind', 'Endurance', 'Strength', 'Dexterity', 'Intelligence', 'Faith', 'Arcane']
    const [stats, setStats] = useState({
        'Vigor': 10, 'Mind': 10, 'Endurance': 10, 'Strength': 10, 'Dexterity': 10, 'Intelligence': 10, 'Faith': 10, 'Arcane': 10
    })

    const ARMOR_HEAD_DATA = gear_data.filter((gear) => (gear['Equip Slot'] === 'Head'));
    const ARMOR_CHEST_DATA = gear_data.filter((gear) => (gear['Equip Slot'] === 'Body'));
    const ARMOR_HANDS_DATA = gear_data.filter((gear) => (gear['Equip Slot'] === 'Arm'));
    const ARMOR_LEGS_DATA = gear_data.filter((gear) => (gear['Equip Slot'] === 'Leg'));

    const getRuneLevel = () => {
        let sumLevels = 0
        for (let key of Object.keys(stats)) {
            sumLevels += stats[key]
        }
        return sumLevels - RUNE_LEVEL_DIFFERENCE;
    }

    const HP = handleCalculations(stats['Vigor'], 'HP (Vigor)')
    const FP = (handleCalculations(stats['Mind'], 'FP (Mind)'))
    const stamina = (handleCalculations(stats['Endurance'], 'Stamina (Endurance)'))
    const equipLoad = (handleCalculations(stats['Endurance'], 'Equip Load (Endurance)'))
    const discovery = (BASE_DISCOVERY + stats['Arcane'])

    const runeLevel = getRuneLevel()
    const runeLevelDefense = handleCalculations((runeLevel + RUNE_LEVEL_DIFFERENCE), 'Defense (Rune Level)', false)
    const defensePhysical = Math.floor(runeLevelDefense + handleCalculations(stats['Strength'], 'Physical Defense (Strength)', false))
    const defenseStrike = defensePhysical
    const defenseSlash = defensePhysical
    const defensePierce = defensePhysical
    const defenseMagic = Math.floor(runeLevelDefense + handleCalculations(stats['Intelligence'], 'Magic Defense (Intelligence)', false));
    const defenseFire = Math.floor(runeLevelDefense + handleCalculations(stats['Vigor'], 'Fire Defense (Vigor)', false));
    const defenseLightning = Math.floor(runeLevelDefense);
    const defenseHoly = Math.floor(runeLevelDefense + handleCalculations(stats['Arcane'], 'Holy Defense (Arcane)', false));

    const handleChange = (stat, value) => {
        setStats(stats => {return {...stats, [stat]: parseInt(value),}})
    }

    const incrementStatValue = useCallback((stat) => {
        setStats(prevStats => {return {...prevStats, [stat]: stats[stat] + 1,}})
        console.log(stats[stat])
    })

    const decrementStatValue = useCallback((stat) => {
        const newStats = {...stats}
        newStats[stat]--
        setStats(newStats)
    })

    const setStatData = (classStats) => {
        const newStats = {...stats}
        newStats.Vigor = classStats.vigor;
        newStats.Mind = classStats.mind;
        newStats.Intelligence = classStats.intelligence;
        newStats.Endurance = classStats.endurance;
        newStats.Faith = classStats.faith;
        newStats.Dexterity = classStats.dexterity;
        newStats.Strength = classStats.strength;
        newStats.Arcane = classStats.arcane;
        setStats(newStats);
    }

    useEffect(() => {
    }, [stats]);

    interface AutocompleteOption {
        Name: string;
    }

    return (
        <>
            <div id="main-content">
                <div id="column-container">
                    <div className="column">
                        <input></input>
                        <Dropdown className="dd" thresold={1} items={starting_class_data} onSet={setStatData} slot="Class"/>
                        <div className="stat-container">
                            {Object.keys(stats).map((key) => <StatField handleChange={handleChange} handleIncrement={incrementStatValue} handleDecrement={decrementStatValue} name={key} value={stats[key]}/>)}
                        </div>
                    </div>
                    <div className="column">
                        <p>Armor</p>
                        <ComboBox items={ARMOR_HEAD_DATA} labelText="Head"/>
                        <ComboBox items={ARMOR_CHEST_DATA} labelText="Chest"/>
                        <ComboBox items={ARMOR_HANDS_DATA} labelText="Hands"/>
                        <ComboBox items={ARMOR_LEGS_DATA} labelText="Legs"/>
                        <br/>
                        <p>Talismans</p>
                        <ComboBox items={talisman_data} labelText="Talisman 1"/>
                        <ComboBox items={talisman_data} labelText="Talisman 2"/>
                        <ComboBox items={talisman_data} labelText="Talisman 3"/>
                        <ComboBox items={talisman_data} labelText="Talisman 4"/>
                        <p>Weapons</p>
                        <Dropdown className="dd" items={weapon_data} slot="Left 1"/>
                        <Dropdown className="dd" items={weapon_data} slot="Right 1"/>
                        <Dropdown className="dd" items={weapon_data} slot="Left 2"/>
                        <Dropdown className="dd" items={weapon_data} slot="Right 2"/>
                        <Dropdown className="dd" items={weapon_data} slot="Left 3"/>
                        <Dropdown className="dd" items={weapon_data} slot="Right 3"/>

                    </div>
                    <div className="column">
                        <div id="base-stat-container">
                            <p>HP: {(handleCalculations(stats['Vigor'], 'HP (Vigor)'))}</p>
                            <p>FP: {FP}</p>
                            <p>Stamina: {stamina}</p>
                            <p>Equip Load: {equipLoad}</p>
                            <p>Discovery: {discovery}</p>
                            <br/>
                            <p>Physical / {defensePhysical}</p>
                            <p>VS Strike / {defenseStrike}</p>
                            <p>VS Slash / {defenseSlash}</p>
                            <p>VS Pierce / {defensePierce}</p>
                            <p>Magic / {defenseMagic}</p>
                            <p>Fire / {defenseFire}</p>
                            <p>Lightning / {defenseLightning}</p>
                            <p>Holy / {defenseHoly}</p>
                        </div>
                    </div>
                </div>
                <div className="bottom-column-wrapper">
                    <div className="bottom-column">
                        <Dropdown className="dd" thresold={1} items={spell_data} slot="Spell 1"/>
                        <Dropdown className="dd" thresold={1} items={spell_data} slot="Spell 2"/>
                        <Dropdown className="dd" thresold={1} items={spell_data} slot="Spell 3"/>
                        <Dropdown className="dd" thresold={1} items={spell_data} slot="Spell 4"/>
                        <Dropdown className="dd" thresold={1} items={spell_data} slot="Spell 5"/>
                        <Dropdown className="dd" thresold={1} items={spell_data} slot="Spell 6"/>
                        <Dropdown className="dd" thresold={1} items={spell_data} slot="Spell 7"/>
                        <Dropdown className="dd" thresold={1} items={spell_data} slot="Spell 8"/>
                        <Dropdown className="dd" thresold={1} items={spell_data} slot="Spell 9"/>
                        <Dropdown className="dd" thresold={1} items={spell_data} slot="Spell 10"/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CharacterBuilder