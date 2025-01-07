// testDuration: "400"
// platforms: "Win32,Windows10"
// gameMode: "editor"
// testDescription: "Generate all Defend Horde bases/flavors combinations"
// runAsPartOfCompleteTestSuite: "true"

// Can't put test name in the const because test parser requires a specific snippet signature

SNIPPET_Bootstrap("", () => {
    LISTENFOR_TestStarted({
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        snippet: "ts_generate_all_defend_horde_flavours_perf",
        testName: "generate_all_defend_horde_flavours_perf"
    })
})

SNIPPET_TestStarted("ts_generate_all_defend_horde_flavours_perf", () => {
    TEST_FlavourTestInit(FACTION_NAME_DEFEND, "generate_all_defend_horde_flavours_perf")
    OUTPUT_SaveProfilerFrames("badger_generate_all_defend_horde_flavours_perf_microprofile", 150)
})
