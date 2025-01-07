SNIPPET_Bootstrap("", () => {
    LISTENFOR_TestStarted({
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        snippet: "ts_teleport_in_rows",
        testName: "teleport_in_rows"
    })
})

SNIPPET_TestStarted("ts_teleport_in_rows", () => {
    OUTPUT_TriggerSlashCommand("/gm true", true)

    LISTENFOR_LocalTimer({
        snippet: "lt_finish_teleport_test",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        waitTime: 60
    })

    let x
    let z
    let i = 0
    const teleportSpeed = 55 // blocks per second

    for (x = 0; x < 1000; x += teleportSpeed) {
        for (z = 0; z < 1000; z += teleportSpeed) {
            LISTENFOR_LocalTimer({
                snippet: "delay_execute_teleport_rows_slash_command",
                ownerVillageId: OWNER_VILLAGE_OPT_OUT,
                waitTime: i++,
                payloadString: `/teleport @s ${x} 50 ${z}`
            })
        }
    }
})

SNIPPET_LocalTimer("delay_execute_teleport_rows_slash_command", (payload) => {
    OUTPUT_TriggerSlashCommand(payload.string, false)
})

SNIPPET_LocalTimer("lt_finish_teleport_test", () => {
    OUTPUT_TestFinished("teleport_in_rows", 1)
})

// testDuration: "120"
// platforms: "Win32,Xbox,Windows10"
// gameMode: "campaign"
// testDescription: "Load into campaign and teleport player across map in rows"
// runAsPartOfCompleteTestSuite: "true"
