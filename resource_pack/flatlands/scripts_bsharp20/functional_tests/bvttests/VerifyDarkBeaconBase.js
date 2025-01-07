// testDuration: "40"
// platforms: "Win32,Xbox,Windows10"
// gameMode: "campaign"
// testDescription: "Load into campaign, debug skip to act 1b, and verify the DBB."
// runAsPartOfCompleteTestSuite: "true"

const expectedValuesVerifyDBBTest = {
    // at least
    barracks: 2,
    skeletons: 2,
    creepers: 2,
    zombies: 2
}

SNIPPET_Bootstrap("", () => {
    LISTENFOR_TestStarted({
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        snippet: "ts_verify_dark_beacon_base",
        testName: "verify_dark_beacon_base"
    })
})

const _dbbAssertFalse = (cond, error) => {
    if (cond) {
        Loge("VERIFY DBB TEST - " + error)
        OUTPUT_TestFinished("verify_dark_beacon_base", 0)
    }
}

SNIPPET_TestStarted("ts_verify_dark_beacon_base", () => {
    LISTENFOR_LocalTimer({
        snippet: "lt_verify_dbb_test_timeout",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        waitTime: 38
    })

    OUTPUT_TriggerSlashCommand("/autoskipcinematics true", true)
    OUTPUT_TriggerSlashCommand("/gm true", true)
    // eslint-disable-next-line no-undef
    OUTPUT_TriggerSlashCommand(`/bsharp event ${campaignActsVal.testEvent.testStartAct1B}`, true)

    LISTENFOR_VillageGenerated({
        snippet: "vg_dbb_verification_test",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        factionName: FACTION_NAME_DBB,
        villageSize: BASE_SIZE_DARK_BEACON
    })
})

SNIPPET_VillageGenerated("vg_dbb_verification_test", (villageId, _payload) => {
    const dbb = GetVillageEntityFromID(villageId)
    OUTPUT_TeleportWithOffset(GetPlayers(), dbb, 0, 100, 0)

    LISTENFOR_VillageFinishedBuilding({
        snippet: "vfb_verify_dbb_test",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        villageId: QUERY_GetVillageIDFromEntity(dbb)
    })
})

SNIPPET_VillageFinishedBuilding("vfb_verify_dbb_test", (villageId, _payload) => {
    const dbb = GetVillageEntityFromID(villageId)

    _dbbAssertFalse(QUERY_GetEntitiesCount(GetVillagePortal(dbb)) !== 1, "The Portal does not exist")

    SetPortalInvulnerable(villageId, true)

    const dbbEntities = QUERY_GetEntitiesOwnedByVillage(villageId)

    _dbbAssertFalse(QUERY_GetEntitiesCount(FILTER_ByTagFilter(dbbEntities, [TAG_BARRACKS], [])) < expectedValuesVerifyDBBTest.barracks, "Too few piglin barracks")

    _dbbAssertFalse(QUERY_GetEntitiesCount(FILTER_ByTagFilter(dbbEntities, [BARRACKS_NAME_SKELETON], [])) < expectedValuesVerifyDBBTest.skeletons, "Too few skeleton spawners")

    _dbbAssertFalse(QUERY_GetEntitiesCount(FILTER_ByTagFilter(dbbEntities, [BARRACKS_NAME_CREEPER], [])) < expectedValuesVerifyDBBTest.creepers, "Too few creeper spawners")

    _dbbAssertFalse(QUERY_GetEntitiesCount(FILTER_ByTagFilter(dbbEntities, [BARRACKS_NAME_ZOMBIE], [])) < expectedValuesVerifyDBBTest.zombies, "Too few zombie spawners")

    Loge("VERIFY DBB TEST - COMPLETED")
    OUTPUT_TestFinished("verify_dark_beacon_base", 1)
})

SNIPPET_LocalTimer("lt_verify_dbb_test_timeout", () => {
    _dbbAssertFalse(true, "Timed out. The DBB probably did not generate.")
})
