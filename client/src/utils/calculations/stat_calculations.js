const stats = require('../../data/CalcCorrectGraph.json')

const STAT_MAX_IDENTIFIERS = ['Stat Max 0', 'Stat Max 1', 'Stat Max 2', 'Stat Max 3', 'Stat Max 4']
const GROWTH_IDENTIFIERS = ['Grow 0', 'Grow 1', 'Grow 2', 'Grow 3', 'Grow 4']
const ADJUSTMENT_IDENTIFIERS = ['Adjustment Point - Grow 0', 'Adjustment Point - Grow 1', 'Adjustment Point - Grow 2', 'Adjustment Point - Grow 3', 'Adjustment Point - Grow 4']
const GROUP_IDENTIFIER = 'Used For'

const getGroup = (stat) => {
    for (let group of stats) {
        if (group[GROUP_IDENTIFIER] === stat) {
            return group
        }
    }
    throw new Error('Invalid group name');
}

const getStatMinAndMax = (input, group) => {
    let stats_info = {}

    console.log('min' + group[STAT_MAX_IDENTIFIERS[1]])
    console.log(input)

    if (input >= group[STAT_MAX_IDENTIFIERS[0]] && input < group[STAT_MAX_IDENTIFIERS[1]]) {
        stats_info = {'min': 0, 'max': 1}
    } else if (input >= group[STAT_MAX_IDENTIFIERS[1]] && input < group[STAT_MAX_IDENTIFIERS[2]]) {
        stats_info = {'min': 1, 'max': 2}
    } else if (input >= group[STAT_MAX_IDENTIFIERS[2]] && input < group[STAT_MAX_IDENTIFIERS[3]]) {
        stats_info = {'min': 2, 'max': 3}
    } else if (input >= group[STAT_MAX_IDENTIFIERS[3]] && input <= group[STAT_MAX_IDENTIFIERS[4]]) {
        stats_info = {'min': 3, 'max': 4}
    } else {
        throw new Error('Invalid input level')
    }

    return stats_info
}

const calculateRatio = (input, statMin, statMax) => {
    return ((input - statMin) / (statMax - statMin))
}

const calculateGrowth = (ratio, growthMinAdjustment) => {
    if (growthMinAdjustment > 0) {
        return Math.pow(ratio, growthMinAdjustment)
    } else if (growthMinAdjustment < 0) {
        return 1 - (Math.pow((1 - ratio), Math.abs(growthMinAdjustment)))
    }
}

const calculateStat = (growMin, growMax, growth) => {
    return growMin + ((growMax - growMin) * growth)
}

const handleCalculations = (input, stat) => {
    const group = getGroup(stat)
    const stats_info = getStatMinAndMax(input, group)
    const ratio = calculateRatio(input, group[STAT_MAX_IDENTIFIERS[stats_info.min]], group[STAT_MAX_IDENTIFIERS[stats_info.max]])
    const growth = calculateGrowth(ratio, group[ADJUSTMENT_IDENTIFIERS[stats_info.min]])
    const result = calculateStat(group[GROWTH_IDENTIFIERS[stats_info.min]], group[GROWTH_IDENTIFIERS[stats_info.max]], growth)
    return Math.floor(result)
}

module.exports = handleCalculations