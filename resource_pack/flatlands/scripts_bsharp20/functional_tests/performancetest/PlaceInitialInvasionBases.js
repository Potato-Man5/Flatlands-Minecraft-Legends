/*
 * Note:
 *  This test will only pass/fail if we reach the amount of bases we expect to be building or exceed it.
 *  Generating fewer bases than we expect will require the testing suite to time out (currently takes 15min).
 *  If this is a problem, we can potentially add a bsharp timer to this test to time out sooner.
*/

// platforms: ""
// gameMode: "campaign"
// testDescription: "Ensure that initial invasion bases are placed."
// runAsPartOfCompleteTestSuite: "true"

let expectedNumberOfFactionBases = {}

const setupExpectedNumberOfFactionBases = (setupData) => {
    for (let factionData in setupData) {
        const faction = setupData[factionData]

        let factionBaseCount = {}
        factionBaseCount[BASE_SIZE_SMALL] = faction.numSmall
        factionBaseCount[BASE_SIZE_MEDIUM] = faction.numMedium
        factionBaseCount[BASE_SIZE_LARGE] = faction.numLarge
        factionBaseCount[BASE_SIZE_OUTPOST] = faction.numDefOutposts

        ++factionBaseCount[faction.centralBase]

        expectedNumberOfFactionBases[faction.name] = factionBaseCount
    }

    for (let faction in expectedNumberOfFactionBases) {
        for (let size in expectedNumberOfFactionBases[faction]) {
            Logi(`${faction}: expecting ${expectedNumberOfFactionBases[faction][size]} more ${size} bases.`)
        }
    }
}

SNIPPET_Bootstrap("", () => {
    LISTENFOR_TestStarted({
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        snippet: "ts_setup_place_initial_invasion_bases_perf_test",
        testName: "place_initial_invasion_bases_perf"
    })
})

SNIPPET_TestStarted("ts_setup_place_initial_invasion_bases_perf_test", () => {
    Logi("Test Started")

    // Setup listeners for each faction.
    LISTENFOR_VillagePlanned({
        snippet: "vp_count_planned_villages",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        factionName: FACTION_NAME_ATTACK
    })

    LISTENFOR_VillagePlanned({
        snippet: "vp_count_planned_villages",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        factionName: FACTION_NAME_DEFEND
    })

    LISTENFOR_VillagePlanned({
        snippet: "vp_count_planned_villages",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        factionName: FACTION_NAME_OBSTACLE
    })

    //Record the number of bases to setup from 'campaign_acts.js'.
    setupExpectedNumberOfFactionBases(campaignActsVal.act2SetupData)

    //Jump to act 2 so the bases start generating.
    OUTPUT_TriggerSlashCommand("/bsharp event test_campaign_start_act_2", true)
})

SNIPPET_VillagePlanned("vp_count_planned_villages", (villageId) => {
    const factionName = QUERY_GetFactionNameFromVillageID(villageId)
    const size = QUERY_GetFactionSizeFromVillageID(villageId)

    --expectedNumberOfFactionBases[factionName][size]

    // Output the updated number of bases we're expecting and check if the test is complete.
    let complete = true
    let error = false
    for (let faction in expectedNumberOfFactionBases) {
        for (let size in expectedNumberOfFactionBases[faction]) {
            const count = expectedNumberOfFactionBases[faction][size]
            Logi(`${faction}: expecting ${count} more ${size} bases.`)
            if (count > 0) {
                // Still waiting for bases to be placed. Mark the test isn't complete,
                // but continue iterating to finish logging and detect errors.
                complete = false
            } else if (count < 0) {
                // If the count goes negative, something is wrong. Mark the existance of
                // an error and continue to finish logging.
                error = true
            }
        }
    }

    if (error) {
        Logi(`Test Failed! Too many bases of a given type were placed.`)
        OUTPUT_TestFinished("place_initial_invasion_bases_perf", 0)
        Once()
    }
    else if (complete) {
        Logi(`All expected bases are placed. Test Complete!`)
        OUTPUT_TestFinished("place_initial_invasion_bases_perf", 1)
        OUTPUT_SaveProfilerFrames("place_initial_invasion_bases_perf", 150)
        Once()
    }
    else {
        Logi('Still waiting for more bases...')
    }
})
