// testDuration: "60"
// platforms: "Win32,Windows10,Xbox"
// gameMode: "campaign"
// testDescription: "Verify at least 1 village spawns in campaign"
// runAsPartOfCompleteTestSuite: "true"

SNIPPET_Bootstrap("", () => {
    LISTENFOR_TestStarted({
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        snippet: "ts_verify_num_villages_in_campaign_perf",
        testName: "verify_num_villages_in_campaign_perf"
    })
})

SNIPPET_TestStarted("ts_verify_num_villages_in_campaign_perf", () => {
    const villages = QUERY_GetAllVillages()
    OUTPUT_TestFinished("verify_num_villages_in_campaign_perf", QUERY_GetEntitiesCount(villages) > 1 ? 1 : 0)
    OUTPUT_SaveProfilerFrames("badger_verify_num_villages_in_campaign_perf_microprofile", 150)
})
