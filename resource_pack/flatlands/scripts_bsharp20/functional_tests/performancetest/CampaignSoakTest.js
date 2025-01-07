// testDuration: "1200"
// platforms: "Win32,Windows10,Xbox"
// gameMode: "campaign"
// testDescription: "Teleport and sit in the WOF, MobAlliance, DBB and Village while collecting perf metrics"
// runAsPartOfCompleteTestSuite: "true"

const AREA_SOAK_TIME = 60 //time spent in a single area
const GAME_ACT_WAIT_TIME = 15 //buffer time to allow the game to settle into a new game act

/*
    name: name of the area type we want to visit
    goToAllAreas: should we visit all the areas, or just one of them?
    gameAct: what act should the game be when visiting.
*/
const AREAS_OF_INTERESTS = [
    {
        areas: [
            {
                name: FACTION_NAME_DBB,
                goToAllAreas: false
            }
        ],
        gameAct: GV_STARTED_ACT_1_B
    },
    {
        areas: [
            {
                name: CULTURE_NAME_VILLAGERS,
                goToAllAreas: true
            },
            {
                name: FACTION_MOB_ALLIANCES,
                goToAllAreas: true
            },
            {
                name: WELL_OF_FATE,
                goToAllAreas: false
            },
            {
                name: FACTION_POI_MOUNTS,
                goToAllAreas: true
            }
        ],
        gameAct: GV_STARTED_ACT_2
    }
]

SNIPPET_Bootstrap("", () => {
    LISTENFOR_TestStarted({
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        snippet: "ts_campaign_soak_perf",
        testName: "campaign_soak_test"
    })
})

SNIPPET_TestStarted("ts_campaign_soak_perf", () => {
    OUTPUT_TriggerSlashCommand("/gm true", true)

    _StartAreaSoakTest(0, 0)
})

SNIPPET_LocalTimer("lt_goto_next_area_type", (payload) => {
    let act = payload.float
    const villageTypeStep = payload.int

    Logi(`Finished soaking villages`)
    //if we are at the end of all the villages in the list, we move onto the next act's villages to test
    if (villageTypeStep >= AREAS_OF_INTERESTS[act].areas.length) {
        _StartAreaSoakTest(++act, 0)
        return
    }

    _StartAreaSoakTest(act, villageTypeStep)
})

SNIPPET_LocalTimer("lt_goto_next_area", (payload) => {
    const villages = payload.entities
    if (!HasEntities(villages)) {
        return
    }
    const village = FILTER_RandomCount(villages, 1)
    OUTPUT_TeleportWithOffset(GetPlayers(), village, 25, 50, 25)
    LISTENFOR_LocalTimer({
        snippet: "lt_goto_next_area",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        waitTime: AREA_SOAK_TIME,
        payloadEntities: OPER_Difference(villages, village)
    })
})

SNIPPET_LocalTimer("lt_game_act_buffer", (payload) => {
    _GoToArea(payload.float, payload.int)
})

const _StartAreaSoakTest = (gameActStep, villageTypeStep) => {
    Logi(`gameAct is ${gameActStep}/${AREAS_OF_INTERESTS.length}`)
    if (gameActStep >= AREAS_OF_INTERESTS.length) {
        Logi("Campaign Soak Test is Complete!!!")
        OUTPUT_TestFinished("campaign_soak_test", 1)
        return
    }

    const act = AREAS_OF_INTERESTS[gameActStep].gameAct

    //skip to the desired game act
    if (QUERY_GetGlobalVariable(act) <= 0) {
        _GoToGameAct(act)
        //allow some buffer time to allow the game to settle once changing acts
        LISTENFOR_LocalTimer({
            snippet: "lt_game_act_buffer",
            ownerVillageId: OWNER_VILLAGE_OPT_OUT,
            waitTime: GAME_ACT_WAIT_TIME,
            payloadInt: villageTypeStep,
            payloadFloat: gameActStep
        })
        return
    }

    //Go to area for soak testing
    _GoToArea(gameActStep, villageTypeStep)
}

const _GoToArea = (gameActStep, villageTypeStep) => {
    const area = AREAS_OF_INTERESTS[gameActStep].areas[villageTypeStep]
    const village = FILTER_ByFactionName(QUERY_GetAllAliveVillages(), area.name)
    if (!HasEntities(village)) {
        Loge(`No ${area.name} found in the world`)
        OUTPUT_TestFinished("campaign_soak_test", 0)
        return
    }

    if (area.goToAllAreas) {
        LISTENFOR_LocalTimer({
            snippet: "lt_goto_next_area",
            ownerVillageId: OWNER_VILLAGE_OPT_OUT,
            waitTime: AREA_SOAK_TIME,
            payloadEntities: village
        })
    }

    OUTPUT_TeleportWithOffset(GetPlayers(), FILTER_RandomCount(village, 1), 25, 50, 25)
    const waitTimer = area.goToAllAreas ? AREA_SOAK_TIME * QUERY_GetEntitiesCount(village) : AREA_SOAK_TIME
    LISTENFOR_LocalTimer({
        snippet: "lt_goto_next_area_type",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        waitTime: waitTimer,
        payloadInt: ++villageTypeStep,
        payloadFloat: gameActStep
    })
}

const _GoToGameAct = (gameAct) => {
    let commandSuffix = ""
    switch (gameAct) {
        case GV_STARTED_ACT_1_B:
            commandSuffix = "act_1b"
            break
        case GV_STARTED_ACT_2:
            commandSuffix = "act_2"
            break
        case GV_STARTED_ACT_3_A:
            commandSuffix = "act_3a"
            break
        case GV_STARTED_ACT_3_B:
            commandSuffix = "act_3b"
            break
        case GV_STARTED_EPILOGUE:
            commandSuffix = "epilogue"
            break
    }

    if (commandSuffix === "") {
        Loge("commandSuffex found empty. Did you pass in an invalid game act?")
        return
    }
    OUTPUT_TriggerSlashCommand(`/bsharp event test_campaign_start_${commandSuffix}`, true)
}
