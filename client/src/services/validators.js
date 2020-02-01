// Duplicates
export const validateDuplicates = (valueSets) => {
    const result = ['Duplicate value']

    valueSets = valueSets.map(val => JSON.stringify(val))

    for (let i = 0; i < valueSets.length; i++) {
        if (valueSets.indexOf(valueSets[i], i +1) !== -1) {
            result.push(valueSets.indexOf(valueSets[i], i +1))
            result.push(JSON.parse(valueSets[i]))
        }
    }

    console.log('result', result)
    return result
}

// Forks
export const validateForks = (valueSets) => {
    const result = ['Fork value']

    const domains = valueSets.map(val => val[0])
    const ranges = valueSets.map(val => val[1])
    let domainNames = []

    for (let i = 0; i < domains.length; i++) {
        if (domains.indexOf(domains[i], i +1) !== -1) {
            domainNames.push(`${i}${domains[i]}`)
            domainNames.push(`${domains.lastIndexOf(domains[i])}${domains[i]}`)
        }
    }

    const rangeNames = []
    for (let i = 0; i < domainNames.length; i++) {
        rangeNames.push(ranges[domainNames[i][0]])
    }
    
    //checks that values are not duplicates, but forks
    for (let i = 0; i < rangeNames.length; i += 2) {
        if (rangeNames[i] !== rangeNames[i +1]) {
            result.push(domainNames[i][0])
            result.push(valueSets[domainNames[i][0]])
            result.push(domainNames[i +1][0])
            result.push(valueSets[domainNames[i +1][0]])
        }
    }

    console.log('result', result)
    return result
}

// Cycles
export const validateCycles = (valueSets) => {
    const result = ['Cycle value']

    const JsonValueSets = valueSets.map(val => JSON.stringify(val))

    for (let i = 0; i < valueSets.length; i++) {
        let swap = []
        let swapper = []
        swapper[0] = valueSets[i][1]
        swapper[1] = valueSets[i][0]
        swap.push(swapper)
        swap = swap.map(val => JSON.stringify(val))
        if (JsonValueSets.indexOf(swap[0]) !== -1) {
            result.push(valueSets.indexOf(valueSets[i]))
            result.push(valueSets[i])
        }
    }
    
    console.log('result', result)
    return result
}

// Chains
export const validateChains = (valueSets) => {
    const addChains = ['Chain value']

    const domains = valueSets.map(val => val[0])
    const ranges = valueSets.map(val => val[1])

    for (let i = 0; i < ranges.length; i++) {
        for (let j = 0; j < domains.length; j++) {
            if (ranges[i] === domains[j]) {
                if (domains[i] !== ranges[j]) {
                    addChains.push(i)
                    addChains.push(valueSets[i])
                    addChains.push(j)
                    addChains.push(valueSets[j])
                }
            }
        }
    }

    const result = [...new Set(addChains)]

    console.log('result', result)
    return result
}

export const checkForIssues = (newDictionary) => {
    //removes all prior issues so new values are checked fresh
    for (let i = 0; i < newDictionary.valueSets.length; i++) {
        if (newDictionary.valueSets[i].length > 2) {
            let domain = newDictionary.valueSets[i][0]
            let range = newDictionary.valueSets[i][1]
            newDictionary.valueSets[i] = []
            newDictionary.valueSets[i].push(domain)
            newDictionary.valueSets[i].push(range)
        }
    }

    const chains = validateChains(newDictionary.valueSets)
    const cycles = validateCycles(newDictionary.valueSets)
    const forks = validateForks(newDictionary.valueSets)
    const duplicates = validateDuplicates(newDictionary.valueSets)

    

    if (chains.length > 1) { 
        for (let i = 1; i < chains.length; i = i +2) {
            newDictionary.valueSets[chains[i]].push(chains[0])
        }
    }
    if (cycles.length > 1) { 
        for (let i = 1; i < cycles.length; i = i +2) {
            newDictionary.valueSets[cycles[i]].push(cycles[0])
        }
    }    
    if (forks.length > 1) {
        for (let i = 1; i < forks.length; i = i +2) {
            newDictionary.valueSets[forks[i]].push(forks[0])
        }
    }
    if (duplicates.length > 1) {
        for (let i = 1; i < duplicates.length; i = i +2) {
            newDictionary.valueSets[duplicates[i]].push(duplicates[0])
        }   
    } 

    newDictionary.valueSets.forEach(value => {
        if (value.length === 2) {
            value.push('-')
        }
    })

    //sets every valueSet length to 3 despite the amount of issues, so tables are easier to code
    for (let i = 0; i < newDictionary.valueSets.length; i++) {
        if (newDictionary.valueSets[i].length > 3) {
            let joinStrings = newDictionary.valueSets[i][2]
            for (let j = 3; j < newDictionary.valueSets[i].length; j++) {
                joinStrings = joinStrings.concat(', ', newDictionary.valueSets[i][j])
            }
            newDictionary.valueSets[i].splice(2)
            newDictionary.valueSets[i][2] = joinStrings
        }
    }
}

export const letterCase = (string) => {
    const toArray = string.toLowerCase().split(' ')
    const result = toArray.map(val => {
        return val.replace(val.charAt(0), val.charAt(0).toUpperCase())
    })
    return result.join(' ')
}