let allDifficultyConfigs = {}

// Reappropriated from https://stackoverflow.com/questions/49726801/js-recursive-object-assign

function _isObject(item) {
    return item && typeof item === "object" && !Array.isArray(item)
}

// NOTE: this only works on objects and arrays (which is a type of object)
const ObjectAssignRecursive = (target, source) => {
    const bothObjects = _isObject(target) && _isObject(source)
    if (!bothObjects) {
        // If the arguments are not objects, just do the regular assign
        Object.assign(target, source)
        return
    }

    // The meat of the problems
    for (const key in source) {
        if (_isObject(source[key])) {
            // The value at key is an object, proceed with recursion
            if (!target[key]) {
                // If the key doesn't exist yet, create a new object
                Object.assign(target, { [key]: {} })
            } else {
                // If the key does exist, make a shallow copy
                target[key] = Object.assign({}, target[key])
            }

            // Recurse further within that key
            ObjectAssignRecursive(target[key], source[key])
        } else {
            // The value at key is not an object, do the regular assign
            Object.assign(target, { [key]: source[key] })
        }
    }
}

const RegisterDifficultyConfig = (id, config, difficulty, respectFirstGameLoadDifficulty = false) => {
    // Initialize an object if not present yet
    if (allDifficultyConfigs[id] === undefined) {
        allDifficultyConfigs[id] = {}
    }

    // Log if we have the same difficulty defined > 1 for an id
    if (allDifficultyConfigs[id][difficulty] !== undefined) {
        Loge(`[DIFFICULTY B#] More than one difficulty config for id ${id} and difficulty ${difficulty}!`)
    }

    // Create a reference to the "core" object
    if (difficulty === GAME_DIFFICULTY.easy) {
        allDifficultyConfigs[id].core = config //core will now point to the original "easy" instance which will be modified when difficulty changes
    }

    // Copy over - these values will be later assigned into core
    // NOTE: performing deep copy, otherwise some references may be shared
    allDifficultyConfigs[id][difficulty] = {}
    ObjectAssignRecursive(allDifficultyConfigs[id][difficulty], config)

    // If we choose to respect the first game load difficulty, flag the config
    if (respectFirstGameLoadDifficulty) {
        allDifficultyConfigs[id].respectFirstGameLoadDifficulty = respectFirstGameLoadDifficulty
    }
}
