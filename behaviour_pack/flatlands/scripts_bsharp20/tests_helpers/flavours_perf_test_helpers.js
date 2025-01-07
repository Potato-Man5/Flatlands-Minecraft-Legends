const GAP_BETWEEN_BASES = 500
const TIME_BETWEEN_BASE_SPAWN = 6

const EXPECTED_BUILDINGS_COUNT_VAR = "expectedBuildingsCountVar"
const CURRENT_BUILDINGS_COUNT_VAR = "currentBuildingsCountVar"
const CURRENT_FAILED_BUILDINGS_COUNT_VAR = "currentFailedBuildingsCountVar"
const CURRENT_TEST_VILLAGE_ID = "currentTestVillageId"
const TEST_TARGET_HORDE_VAR = "testTargetHordeVar"

const piglinBaseArchetypes = {
    [FACTION_NAME_ATTACK]: "badger:piglin_attack",
    [FACTION_NAME_DEFEND]: "badger:piglin_defend",
    [FACTION_NAME_OBSTACLE]: "badger:piglin_obstacle"
}

const testingCaseVars = {
    currentHorde: "testingCaseHordeVar",
    currentSize: "testingCaseSizeVar",
    currentFlavour: "testingCaseFlavourVar"
}

const _SetExpectedBuildingsCount = (number) => {
    OUTPUT_SetGlobalVariable(EXPECTED_BUILDINGS_COUNT_VAR, number)
}

const _GetExpectedBuildingsCount = () => {
    return QUERY_GetGlobalVariable(EXPECTED_BUILDINGS_COUNT_VAR)
}

const _SetCurrentBuildingsCount = (number) => {
    OUTPUT_SetGlobalVariable(CURRENT_BUILDINGS_COUNT_VAR, number)
}

const _GetCurrentBuildingsCount = () => {
    return QUERY_GetGlobalVariable(CURRENT_BUILDINGS_COUNT_VAR)
}

const _SetCurrentFailedBuildingsCount = (number) => {
    OUTPUT_SetGlobalVariable(CURRENT_FAILED_BUILDINGS_COUNT_VAR, number)
}

const _GetCurrentFailedBuildingsCount = () => {
    return QUERY_GetGlobalVariable(CURRENT_FAILED_BUILDINGS_COUNT_VAR)
}

const _IncrementCurrentBuildingsCount = () => {
    OUTPUT_SetGlobalVariable(CURRENT_BUILDINGS_COUNT_VAR, QUERY_GetGlobalVariable(CURRENT_BUILDINGS_COUNT_VAR) + 1)
}

const _IncrementCurrentFailedBuildingsCount = () => {
    OUTPUT_SetGlobalVariable(CURRENT_FAILED_BUILDINGS_COUNT_VAR, QUERY_GetGlobalVariable(CURRENT_FAILED_BUILDINGS_COUNT_VAR) + 1)
}

const _SetCurrentTestVillageId = (vID) => {
    OUTPUT_SetGlobalVariable(CURRENT_TEST_VILLAGE_ID, vID)
}

const _GetCurrentTestVillageId = () => {
    return QUERY_GetGlobalVariable(CURRENT_TEST_VILLAGE_ID)
}

const _SetTargetHorde = (horde) => {
    OUTPUT_SetGlobalVariable(TEST_TARGET_HORDE_VAR, ALLOWED_VILLAGE_VARIATION_FACTIONS.indexOf(horde))
}

const _GetTargetHorde = () => {
    return ALLOWED_VILLAGE_VARIATION_FACTIONS[QUERY_GetGlobalVariable(TEST_TARGET_HORDE_VAR)]
}

const _ResetCounts = () => {
    _SetExpectedBuildingsCount(0)
    _SetCurrentBuildingsCount(0)
    _SetCurrentFailedBuildingsCount(0)
    _SetCurrentTestVillageId(-1)
}

const _InitializeCurrentTestingCase = () => {
    const horde = _GetTargetHorde()
    const size = ALLOWED_VILLAGE_VARIATION_SIZES[0]
    const flavour = GetBaseVariationDefinitionDeck(VARIATION_ID_FLAVOUR, horde, size)[0].type
    _SetCurrentTestingCase(horde, size, flavour)
}

const _SetCurrentTestingCase = (horde, size, flavour) => {
    // Case definition
    OUTPUT_SetGlobalVariable(testingCaseVars.currentHorde, ALLOWED_VILLAGE_VARIATION_FACTIONS.indexOf(horde))
    OUTPUT_SetGlobalVariable(testingCaseVars.currentSize, ALLOWED_VILLAGE_VARIATION_SIZES.indexOf(size))
    OUTPUT_SetGlobalVariable(testingCaseVars.currentFlavour, GetVariationData(VARIATION_ID_FLAVOUR).variations.indexOf(flavour))

    // Reset counts before each test
    _ResetCounts()

    // Log info
    const testingArray = _GetTestingArray()
    Logi(`Preparing testing case ${_IndexOfTestingCase(_GetCurrentTestingCase(), testingArray) + 1} out of ${testingArray.length}`)
    Logi(`Base parameters: ${horde}, ${size}, ${flavour}`)
}

const _GetCurrentTestingCase = () => {
    const horde = ALLOWED_VILLAGE_VARIATION_FACTIONS[QUERY_GetGlobalVariable(testingCaseVars.currentHorde)]
    const size = ALLOWED_VILLAGE_VARIATION_SIZES[QUERY_GetGlobalVariable(testingCaseVars.currentSize)]
    const flavour = GetVariationData(VARIATION_ID_FLAVOUR).variations[QUERY_GetGlobalVariable(testingCaseVars.currentFlavour)]
    return { horde: horde, size: size, flavour: flavour }
}

const _IndexOfTestingCase = (testingCase, testingArray) => {
    for (let i = 0; i < testingArray.length; i++) {
        const arrayElem = testingArray[i]
        if (testingCase.horde === arrayElem.horde && testingCase.size === arrayElem.size && testingCase.flavour === arrayElem.flavour) {
            return i
        }
    }

    return -1
}

const _GetTestingArray = () => {
    const testingArray = []
    const horde = _GetTargetHorde()
    for (const size of ALLOWED_VILLAGE_VARIATION_SIZES) {
        const flavourDeck = GetBaseVariationDefinitionDeck(VARIATION_ID_FLAVOUR, horde, size)
        for (const flavour of flavourDeck) {
            const flavourType = flavour.type
            testingArray.push({ horde: horde, size: size, flavour: flavourType })
        }
    }

    return testingArray
}

const _RotateToNextTestingCase = () => {
    const testingArray = _GetTestingArray()
    const nextTestingCaseIndex = _IndexOfTestingCase(_GetCurrentTestingCase(), testingArray) + 1
    if (nextTestingCaseIndex >= testingArray.length) {
        Logi("Exhausted all the testing cases!")
        return false
    }

    _SetCurrentTestingCase(testingArray[nextTestingCaseIndex].horde, testingArray[nextTestingCaseIndex].size, testingArray[nextTestingCaseIndex].flavour)
    return true
}

const _SpawnPiglinFlavourBase = () => {
    // Teleport player to the position of spawn
    OUTPUT_TriggerSlashCommand(`/teleport @s ${_IndexOfTestingCase(_GetCurrentTestingCase(), _GetTestingArray()) * GAP_BETWEEN_BASES} 50 0`, false)

    // Setup next flavour
    ForceNextBaseVariation(VARIATION_ID_FLAVOUR, _GetCurrentTestingCase().flavour)

    LISTENFOR_LocalTimer({
        snippet: "lt_spawn_base",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        waitTime: TIME_BETWEEN_BASE_SPAWN
    })
}

const _ProceedTestIfFinishedBuilding = (testName) => {
    const totalBuildingsAttempted = _GetCurrentBuildingsCount() + _GetCurrentFailedBuildingsCount()
    if (totalBuildingsAttempted < _GetExpectedBuildingsCount()) {
        return
    }

    Logi(`Testing done for the base with parameters: ${_GetCurrentTestingCase().horde}, ${_GetCurrentTestingCase().size}, ${_GetCurrentTestingCase().flavour}`)
    Logi(`Buildings completed: ${_GetCurrentBuildingsCount()}/${_GetExpectedBuildingsCount()}`)
    Logi(`Buildings failed: ${_GetCurrentFailedBuildingsCount()}/${_GetExpectedBuildingsCount()}`)

    // Finish test if that's all
    if (_RotateToNextTestingCase() === false) {
        Logi("Test finished successfully, observe any console errors, especially for the buildings which didn't get placed.")
        _ResetCounts()
        OUTPUT_TestFinished(testName, 1)
        return
    }

    _SpawnPiglinFlavourBase()
}

const _InitializeTestListeners = (testName) => {
    // Register listener to assign the flavour on planned
    LISTENFOR_VillagePlanned({
        snippet: "vp_assign_flavour",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT
    })

    // Register listeners to update the state of the test
    LISTENFOR_BuildingComplete({
        snippet: "bc_progress_test",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        payloadString: testName
    })

    LISTENFOR_BuildingFailedToPlace({
        snippet: "bftp_progress_test",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        payloadString: testName
    })
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/camelcase
const TEST_FlavourTestInit = (horde, testName) => {
    _SetTargetHorde(horde)
    _InitializeTestListeners(testName)
    _InitializeCurrentTestingCase()
    _SpawnPiglinFlavourBase()
}

SNIPPET_LocalTimer("lt_spawn_base", (_payload) => {
    const horde = _GetCurrentTestingCase().horde
    const size = _GetCurrentTestingCase().size
    const archetype = piglinBaseArchetypes[horde]

    OUTPUT_SpawnVillage(RandomEntity(GetPlayers()), archetype, size, horde, TEAM_ORANGE)
})

// Assign the flavour
SNIPPET_VillagePlanned("vp_assign_flavour", (villageId, _payload) => {
    // Setup village id var - earliest moment the vID is known
    _SetCurrentTestVillageId(villageId)
})

SNIPPET_BuildingComplete("bc_progress_test", (buildingEntity, payload) => {
    const villageId = QUERY_GetVillageIDFromEntity(buildingEntity)
    if (villageId !== _GetCurrentTestVillageId()) {
        return
    }

    //We are storing test name in payload
    const testName = payload.string

    //Define the expected count
    const expectedBuildingCount = QUERY_CountCardTypeInDeck(INSTANT_BUILD_DECK_NAME + villageId, DECK_GetLibraryIndexFromName("buildable_card_library"))
    if (expectedBuildingCount === 0) {
        Loge(`Failed to generate a base with the following parameters: ${_GetCurrentTestingCase().horde}, ${_GetCurrentTestingCase().size}, ${_GetCurrentTestingCase().flavour}`)
        OUTPUT_TestFinished(testName, 0)
        return
    }

    // Can only initialize on building complete
    if (_GetExpectedBuildingsCount() === 0) {
        _SetExpectedBuildingsCount(expectedBuildingCount)
    }

    _IncrementCurrentBuildingsCount()
    _ProceedTestIfFinishedBuilding(testName)
})

SNIPPET_BuildingFailedToPlace("bftp_progress_test", (buildingId, villageId, payload) => {
    if (villageId !== _GetCurrentTestVillageId()) {
        return
    }

    Loge(`FAILED TO PLACE building ${buildingId} for base with the parameters: ${_GetCurrentTestingCase().horde}, ${_GetCurrentTestingCase().size}, ${_GetCurrentTestingCase().flavour}`)

    //We are storing test name in payload
    const testName = payload.string

    //Define the expected count
    const expectedBuildingCount = QUERY_CountCardTypeInDeck(INSTANT_BUILD_DECK_NAME + villageId, DECK_GetLibraryIndexFromName("buildable_card_library"))
    if (expectedBuildingCount === 0) {
        Loge(`Failed to generate a base with the following parameters: ${_GetCurrentTestingCase().horde}, ${_GetCurrentTestingCase().size}, ${_GetCurrentTestingCase().flavour}`)
        OUTPUT_TestFinished(testName, 0)
        return
    }

    // Can only initialize on building complete
    if (_GetExpectedBuildingsCount() === 0) {
        _SetExpectedBuildingsCount(expectedBuildingCount)
    }

    _IncrementCurrentFailedBuildingsCount()
    _ProceedTestIfFinishedBuilding(testName)
})