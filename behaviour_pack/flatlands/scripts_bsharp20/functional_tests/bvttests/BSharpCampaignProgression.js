// testDuration: "80"
// platforms: "Win32,Xbox,Windows10"
// gameMode: "campaign"
// testDescription: "Load into campaign and debug skip through the campaign."
// runAsPartOfCompleteTestSuite: "true"

SNIPPET_Bootstrap("", () => {
    LISTENFOR_TestStarted({
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        snippet: "ts_campaign_progression",
        testName: "b#_campaign_progression"
    })
})

SNIPPET_TestStarted("ts_campaign_progression", () => {
    const delayBetweenActs = 15

    const campaignActs = [
        {
            testEvent: campaignActsVal.testEvent.testStartAct1B,
            gv: GV_STARTED_ACT_1_B
        },
        {
            testEvent: campaignActsVal.testEvent.testStartAct2,
            gv: GV_STARTED_ACT_2
        },
        {
            testEvent: campaignActsVal.testEvent.testStartAct3A,
            gv: GV_STARTED_ACT_3_A
        },
        {
            testEvent: campaignActsVal.testEvent.testStartAct3B,
            gv: GV_STARTED_ACT_3_B
        },
        {
            testEvent: campaignActsVal.testEvent.testStartEpilogue,
            gv: GV_STARTED_EPILOGUE
        }
    ]

    OUTPUT_TriggerSlashCommand("/gm true", true)

    LISTENFOR_LocalTimer({
        snippet: "lt_campaign_progression_finished",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        waitTime: 80
    })

    let delay = -delayBetweenActs
    for (let index = 0; index < campaignActs.length; index++) {
        const act = campaignActs[index]
        const testEvent = act.testEvent
        const gv = act.gv
        const command = `/bsharp event ${testEvent}`

        LISTENFOR_LocalTimer({
            snippet: "lt_campaign_progression_slash_command",
            ownerVillageId: OWNER_VILLAGE_OPT_OUT,
            waitTime: (delay += delayBetweenActs),
            payloadString: command
        })

        LISTENFOR_LocalTimer({
            snippet: "lt_campaign_progression_assert",
            ownerVillageId: OWNER_VILLAGE_OPT_OUT,
            waitTime: delay + delayBetweenActs - 1,
            payloadString: gv
        })
    }
})

SNIPPET_LocalTimer("lt_campaign_progression_finished", () => {
    OUTPUT_TestFinished("b#_campaign_progression", 1)
})

SNIPPET_LocalTimer("lt_campaign_progression_slash_command", (payload) => {
    Logi(`B# CAMPAIGN PROGRESSION TEST - executing ${payload.string}`)
    OUTPUT_TriggerSlashCommand(payload.string, true)
})

SNIPPET_LocalTimer("lt_campaign_progression_assert", (payload) => {
    if (QUERY_GetGlobalVariable(payload.string) === 0) {
        Loge(`B# CAMPAIGN PROGRESSION TEST - ${payload.string} is still zero. Test Failed.`)
        OUTPUT_TestFinished("b#_campaign_progression", 0)
    }
})
