const DoPlayerBaseActionOnceEverySeconds = (actionId, playerEntity, baseVillageID, time) => {
    const uuid = QUERY_GetUserId(playerEntity)
    const gv = `gv_debounce_action_timer_on_${actionId}_${uuid}_${baseVillageID}`
    if (QUERY_GetGlobalVariable(gv) === 1) {
        return false
    }

    OUTPUT_SetGlobalVariable(gv, 1)
    LISTENFOR_LocalTimer({
        snippet: "lt_reset_announce_timer",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        waitTime: time,
        payloadString: gv
    })

    return true
}

SNIPPET_LocalTimer("lt_reset_announce_timer", (payload) => {
    const gv = payload.string
    OUTPUT_SetGlobalVariable(gv, 0)
})
