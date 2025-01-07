DEBUG_Event("test_horde4_sky", (_param) => {
    OUTPUT_TriggerSlashCommand("/gm true", true)
    OUTPUT_TriggerSlashCommand("/sprint 5", true)

    OUTPUT_SetSkyState(SKY_STATE_SUN_MOON)

    const wofVillage = FILTER_ByFactionName(QUERY_GetAllAliveVillages(), WELL_OF_FATE)
    for (let i = 10; i < 5000; i++) {
        OUTPUT_PlacementStart()
        OUTPUT_PlacementSlotTag(SLOT.BASE)
        OUTPUT_PlacementSetPrimaryProximityRule(GetPlayers(), 0, i)
        OUTPUT_PlacementAddExcludeProximityRule(wofVillage, 730, BSHARP_PLACEMENT.requireAll)

        const success = OUTPUT_PlacementExecute()
        if (success) {
            const pos = QUERY_PlacementResultPosition()
            OUTPUT_PlacementEntityUpdateTextureStamp(pos, TEXTURE_KEYS.PRIMARY, "debug_horde4_stamp", false)
            OUTPUT_TeleportWithOffset(GetPlayers(), pos, 0, 100, 0)
            return
        }
    }
})