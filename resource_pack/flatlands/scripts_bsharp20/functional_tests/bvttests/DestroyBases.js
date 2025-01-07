// testDuration: "200"
// platforms: "Win32,Xbox,Windows10"
// gameMode: "campaign"
// testDescription: "Load into campaign, debug skip to act 2, and destroy 2 random portal bases of each faction."
// runAsPartOfCompleteTestSuite: "true"

SNIPPET_Bootstrap("", () => {
    LISTENFOR_TestStarted({
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        snippet: "ts_destroy_bases",
        testName: "destroy_bases"
    })
})

const delayBetweenBases = 25

const getTwoRandomPortalBases = (faction) => FILTER_RandomCount(FILTER_ByVillageSize(FILTER_ByFactionName(QUERY_GetAllAliveVillages(), faction), BASE_SIZE_ALL_PORTALS), 2)

SNIPPET_TestStarted("ts_destroy_bases", () => {
    LISTENFOR_LocalTimer({
        snippet: "lt_base_destruction_test_finished",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        waitTime: delayBetweenBases * 7
    })

    // eslint-disable-next-line no-undef
    OUTPUT_TriggerSlashCommand(`/bsharp event ${campaignActsVal.testEvent.testStartAct2}`, true)
    OUTPUT_TriggerSlashCommand("/gm true", true)
    OUTPUT_TriggerSlashCommand("/autoskipcinematics true", true)

    LISTENFOR_LocalTimer({
        snippet: "lt_initiate_base_destruction_test",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        waitTime: 5
    })
})

SNIPPET_LocalTimer("lt_initiate_base_destruction_test", () => {
    let delay = -(delayBetweenBases - 5)
    const bases = OPER_Union(getTwoRandomPortalBases(FACTION_NAME_OBSTACLE), OPER_Union(getTwoRandomPortalBases(FACTION_NAME_DEFEND), getTwoRandomPortalBases(FACTION_NAME_ATTACK)))
    ForEachEntities(bases, (base) => {
        LISTENFOR_LocalTimer({
            snippet: "lt_base_destruction_test",
            ownerVillageId: OWNER_VILLAGE_OPT_OUT,
            waitTime: (delay += delayBetweenBases),
            payloadInt: base
        })
    })
})

SNIPPET_LocalTimer("lt_base_destruction_test", (payload) => {
    const base = payload.int
    const villageId = QUERY_GetVillageIDFromEntity(base)
    Logi(`BASE DESTRUCTION TEST - Teleporting to base ${villageId}.`)
    OUTPUT_TeleportWithOffset(GetPlayers(), base, 0, 50, 0)

    LISTENFOR_VillageFinishedBuilding({
        snippet: "vfb_base_destruction_test_apply_damage",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        villageId: villageId
    })
})

SNIPPET_VillageFinishedBuilding("vfb_base_destruction_test_apply_damage", (villageId, _payload) => {
    LISTENFOR_LocalTimer({
        snippet: "lt_base_destruction_apply_damage",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        waitTime: 1,
        payloadInt: villageId
    })

    LISTENFOR_LocalTimer({
        snippet: "lt_base_destruction_test_coils",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        waitTime: 4,
        payloadInt: villageId
    })

    LISTENFOR_LocalTimer({
        snippet: "lt_base_destruction_test_assert",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        waitTime: 7,
        payloadInt: villageId
    })
})

SNIPPET_LocalTimer("lt_base_destruction_apply_damage", (payload) => {
    const villageId = payload.int
    Logi(`BASE DESTRUCTION TEST - Applying damage at base ${villageId}.`)
    OUTPUT_TriggerSlashCommand("/ad 5000 500", true)
})

SNIPPET_LocalTimer("lt_base_destruction_test_coils", (payload) => {
    const villageId = payload.int
    if (QUERY_GetVillageObjective(villageId) === VILLAGE_VARIATION_STRUCTURE_DESTRUCTION) {
        if (QUERY_IsVillageDestroyed(villageId)) {
            Loge(`BASE DESTRUCTION TEST - Base ${villageId} is supposed to be invulnerable but is not.`)
            OUTPUT_TestFinished("destroy_bases", 0)
        } else {
            Logi(`BASE DESTRUCTION TEST - This is a coil base! Reapplying damage at base ${villageId}.`)
            OUTPUT_TriggerSlashCommand("/ad 5000 500", true)
        }
    }
})

SNIPPET_LocalTimer("lt_base_destruction_test_assert", (payload) => {
    const villageId = payload.int
    if (!QUERY_IsVillageDestroyed(villageId)) {
        Loge(`BASE DESTRUCTION TEST - Base ${villageId} is not destructible.`)
        OUTPUT_TestFinished("destroy_bases", 0)
    }
})

SNIPPET_LocalTimer("lt_base_destruction_test_finished", () => {
    OUTPUT_TestFinished("destroy_bases", 1)
})
