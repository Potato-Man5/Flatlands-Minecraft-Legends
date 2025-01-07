/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars  */

let _debugCounter = 0

const DEBUG_Loop = (initialDelay, loopDelay, callback) => {
    _debugCounter++
    const localTimerSnippetName = `debug_lt_${_debugCounter}`
    const externalEventSnippetName = `debug_ee_${_debugCounter}`

    SNIPPET_Bootstrap("", () => {
        if (typeof initialDelay !== "number") {
            // assume string b/c JS checking for string is bonkers apparently
            LISTENFOR_ExternalEvent({
                snippet: externalEventSnippetName,
                ownerVillageId: OWNER_VILLAGE_OPT_OUT,
                eventName: initialDelay
            })
        } else {
            LISTENFOR_LocalTimer({
                snippet: localTimerSnippetName,
                ownerVillageId: OWNER_VILLAGE_OPT_OUT,
                waitTime: initialDelay
            })
        }
    })

    if (typeof initialDelay !== "number") {
        // assume string b/c JS checking for string is bonkers apparently
        SNIPPET_ExternalEvent(externalEventSnippetName, () => {
            LISTENFOR_LocalTimer({
                snippet: localTimerSnippetName,
                ownerVillageId: OWNER_VILLAGE_OPT_OUT,
                waitTime: 0
            })
        })
    }

    SNIPPET_LocalTimer(localTimerSnippetName, () => {
        if (!callback()) {
            LISTENFOR_LocalTimer({
                snippet: localTimerSnippetName,
                ownerVillageId: OWNER_VILLAGE_OPT_OUT,
                waitTime: loopDelay
            })
        }
    })
}

/*
// EXAMPLES: DEBUG_Loop 
DEBUG_Loop(50, 10, () => {
    // After 50 seconds, execute this block every 10 seconds
    OUTPUT_DestroyEntities(_GetAllMobs())
})

DEBUG_Loop("ee_destroy_mobs", 10, () => {
    // On `/bsharp event ee_destroy_mobs`, execute this block every 10 seconds
    OUTPUT_DestroyEntities(_GetAllMobs())

    // ... and if no mobs then stop!
    if (QUERY_GetEntitiesCount(_GetAllMobs()) === 0) {
        return true
    }
})
*/

const DEBUG_Event = (eventName, callback) => {
    const externalEventSnippetName = `debug_ee_${++_debugCounter}`

    SNIPPET_Bootstrap("", () => {
        LISTENFOR_ExternalEvent({
            snippet: externalEventSnippetName,
            ownerVillageId: OWNER_VILLAGE_OPT_OUT,
            eventName: eventName
        })
    })

    SNIPPET_ExternalEvent(externalEventSnippetName, (value) => {
        Logv(`DEBUG_Event: ${eventName} with argument ${value.value}`)
        callback(value)
    })
}

/*
// EXAMPLES: DEBUG_Event
DEBUG_Event("ee_nuke_tag", (value) => {
    const tag = value.value
    if (tag) {
        const entities = QUERY_GetEntitiesWithTags([tag])
        OUTPUT_DestroyEntities(entities)
    }
})
*/
