SNIPPET_Bootstrap("", () => {
    LISTENFOR_TestStarted({
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        snippet: "ts_fight_dark_beacon_base",
        testName: "fight_dark_beacon_base"
    })
})

SNIPPET_TestStarted("ts_fight_dark_beacon_base", () => {
    OUTPUT_SetGlobalVariable(GV_DBB_VARIANT, 3)

    OUTPUT_TriggerSlashCommand(`/assignteam @s piglin_team`, true)

    OUTPUT_TriggerSlashCommand(`/village add_village badger:piglin_dbb darkBeacon faction.pig.dbb`, true)

    const allVillages = QUERY_GetAllAliveVillages()
    const dbbVillage = FILTER_ByFactionName(allVillages, FACTION_NAME_DBB)

    if (QUERY_GetEntitiesCount(dbbVillage) !== 1) {
        Loge(`Failed to spawn dbb`)
        OUTPUT_TestFinished("fight_dark_beacon_base", 0)
    } else {
        OUTPUT_TriggerSlashCommand(`/teleport @s 15 50 15`, false)

        OUTPUT_TriggerSlashCommand(`/assignteam @s blue_team`, true)

        LISTENFOR_LocalTimer({
            snippet: "lt_delay_execute_slash_command",
            ownerVillageId: OWNER_VILLAGE_OPT_OUT,
            waitTime: 10,
            payloadString: `/sm badger:mob_zombie 100`
        })

        LISTENFOR_LocalTimer({
            snippet: "lt_finish_test",
            ownerVillageId: OWNER_VILLAGE_OPT_OUT,
            waitTime: 90
        })
    }
})

SNIPPET_LocalTimer("lt_delay_execute_slash_command", (payload) => {
    OUTPUT_TriggerSlashCommand(payload.string, true)
})

SNIPPET_LocalTimer("lt_finish_test", () => {
    OUTPUT_TestFinished("fight_dark_beacon_base", 1)
    OUTPUT_SaveProfilerFrames("badger_fight_DBB_microprofile", 150)
})

// testDuration: "120"
// platforms: "Win32,Xbox,Windows10"
// gameMode: "editor"
// testDescription: "Spawn DBB in Flatlands then spawn 100 zombies to fight it"
// runAsPartOfCompleteTestSuite: "true"
