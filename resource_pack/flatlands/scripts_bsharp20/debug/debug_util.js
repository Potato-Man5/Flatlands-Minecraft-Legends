const _PIGLIN_SPAWNING_DISABLED = "piglin_spawns_disabled_debug"
const _PIGLIN_SPAWNING_LISTENER_ACTIVE = "piglin_spawns_listener_active_debug"

SNIPPET_Bootstrap("", () => {
    LISTENFOR_ExternalEvent({
        snippet: "ee_remove_all_piglins",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        eventName: "remove_all_piglins"
    })

    LISTENFOR_ExternalEvent({
        snippet: "ee_disable_barracks",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        eventName: "disable_barracks"
    })

    LISTENFOR_ExternalEvent({
        snippet: "ee_set_piglins",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        eventName: "set_piglins"
    })

    LISTENFOR_ExternalEvent({
        snippet: "ee_remove_all_player_mobs",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        eventName: "remove_all_player_mobs"
    })

    LISTENFOR_ExternalEvent({
        snippet: "ee_remove_all_animals",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        eventName: "remove_all_animals"
    })

    LISTENFOR_ExternalEvent({
        snippet: "ee_trigger_cine_on_wof",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        eventName: "trigger_cine_on_wof"
    })

    LISTENFOR_ExternalEvent({
        snippet: "ee_advance_to_next_landmark_time",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        eventName: "advanceToNextLandmarkTime"
    })

    LISTENFOR_ExternalEvent({
        snippet: "ee_make_portals_invuln",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        eventName: "makePortalsInvuln"
    })

    LISTENFOR_ExternalEvent({
        snippet: "ee_unhide_all_hud",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        eventName: "unhide_all_hud"
    })

    LISTENFOR_ExternalEvent({
        snippet: "ee_infect_wof",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        eventName: "infectWof"
    })

    LISTENFOR_ExternalEvent({
        snippet: "ee_set_skybox_state",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        eventName: "set_skybox_state"
    })

    LISTENFOR_ExternalEvent({
        snippet: "ee_set_chest_visual_state",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        eventName: "set_chest_visual_state"
    })

    LISTENFOR_ExternalEvent({
        snippet: "ee_end_match",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        eventName: "end_match"
    })

    LISTENFOR_ExternalEvent({
        snippet: "ee_set_timer",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        eventName: "set_timer"
    })
})

const _removeAllPiglins = () => {
    const allPiglins = QUERY_GetEntitiesWithTagFilter(["piglin", "mob"], [])
    OUTPUT_DestroyEntities(allPiglins)
}

SNIPPET_ExternalEvent("ee_remove_all_piglins", () => {
    _removeAllPiglins()
})

SNIPPET_ExternalEvent("ee_disable_barracks", () => {
    let barrackEntities = []
    const barrackTypes = [BARRACKS_NAME_DISRUPTOR, BARRACKS_NAME_FIGHTER, BARRACKS_NAME_SIEGER, BARRACKS_NAME_SPECIALIST, BARRACKS_NAME_ENGINEER]

    barrackTypes.forEach((tag) => {
        barrackEntities = OPER_Union(barrackEntities, QUERY_GetEntitiesWithTags([tag]))
    })

    if (HasEntities(barrackEntities)) {
        OUTPUT_SetBarracksSpawnCap(barrackEntities, 0)
    }
})

SNIPPET_ExternalEvent("ee_set_piglins", (variant) => {
    const enabled = variant.value
    if (!enabled && DoOnce(_PIGLIN_SPAWNING_DISABLED)) {
        _removeAllPiglins()

        if (DoOnce(_PIGLIN_SPAWNING_LISTENER_ACTIVE)) {
            LISTENFOR_EntitySpawned({
                snippet: "es_debug_kill_spawned_piglin",
                ownerVillageId: OWNER_VILLAGE_OPT_OUT,
                includeTags: ["piglin"]
            })
        }
    } else {
        OUTPUT_SetGlobalVariable(_PIGLIN_SPAWNING_DISABLED, 0)
    }
})

SNIPPET_EntitySpawned("es_debug_kill_spawned_piglin", (spawnedEntity, _payload) => {
    if (!QUERY_GetGlobalVariable(_PIGLIN_SPAWNING_DISABLED)) {
        OUTPUT_SetGlobalVariable(_PIGLIN_SPAWNING_LISTENER_ACTIVE, 0)
        Once()
        return
    }

    OUTPUT_DespawnEntities(spawnedEntity)
})

SNIPPET_ExternalEvent("ee_remove_all_player_mobs", () => {
    const allPlayerMobs = QUERY_GetEntitiesWithTagFilter(["mob"], ["piglin", "animal"])
    OUTPUT_DestroyEntities(allPlayerMobs)
})

SNIPPET_ExternalEvent("ee_remove_all_animals", () => {
    const allAnimals = QUERY_GetEntitiesWithTagFilter(["animal", "mob"], [])
    OUTPUT_DestroyEntities(allAnimals)
})

SNIPPET_ExternalEvent("ee_trigger_cine_on_wof", (value, _payload) => {
    const cineId = value.value
    Logv(`ee_trigger_cine_on_wof for: ${cineId}`)

    const wofVillage = GetVillageEntityFromFaction(WELL_OF_FATE)
    OUTPUT_TriggerCinematic(cineId, wofVillage)
})

SNIPPET_ExternalEvent("ee_advance_to_next_landmark_time", (_variant, _payload) => {
    const currentTime = QUERY_GetTimeOfDay()
    let nextTimeLandmark = -1

    // Find next "highest" time if possible
    for (const time of TIME_LANDMARKS) {
        if (time > currentTime) {
            nextTimeLandmark = time
            break
        }
    }

    // The cycle begins anew and next landmark - is the first landmark
    if (nextTimeLandmark === -1) {
        nextTimeLandmark = TIME_LANDMARKS[0]
    }

    OUTPUT_SetTimeOfDay(nextTimeLandmark)
})

SNIPPET_ExternalEvent("ee_make_portals_invuln", (value, _payload) => {
    const isInvuln = value.value
    const portals = QUERY_GetEntitiesWithTags([TAG_PORTAL_PIGLIN])
    OUTPUT_SetInvulnerable(portals, isInvuln)
})

SNIPPET_ExternalEvent("ee_unhide_all_hud", (_value, _payload) => {
    OUTPUT_UpdateHUDVisibility("hud_spawner_bar_gather_allays", true)
    OUTPUT_UpdateHUDVisibility("hud_resource_bar_core", true)
    OUTPUT_UpdateHUDVisibility("hud_resource_bar_other", true)
    OUTPUT_UpdateHUDVisibility("hud_hearts", true)
    OUTPUT_UpdateHUDVisibility("hud_toolbar", true)
    OUTPUT_UpdateHUDVisibility("hud_hotbar", true)
    OUTPUT_UpdateHUDVisibility("hud_quickslot", true)
    OUTPUT_UpdateHUDVisibility("hud_face_buttons", true)
    OUTPUT_UpdateHUDVisibility("hud_spawner_bar_build_allays", true)
    OUTPUT_UpdateHUDVisibility("hud_spawner_bar_flames", true)
    OUTPUT_UpdateHUDVisibility("hud_spawner_bar_spawners", true)
    OUTPUT_UpdateHUDVisibility("hud_map", true)
    OUTPUT_UpdateHUDVisibility("hud_compass", true)
    OUTPUT_UpdateHUDVisibility("songbook", true)
})

SNIPPET_ExternalEvent("ee_infect_wof", (value, _payload) => {
    const isInfected = value.value
    if (isInfected) {
        InfectWoF()
    } else {
        UninfectWoF()
    }
})

SNIPPET_ExternalEvent("ee_set_skybox_state", (parameter) => {
    const skyboxState = parameter.value

    Logi(`ee_set_skybox_state: ${skyboxState}`)

    if (!SKY_STATE_ALL.includes(skyboxState)) {
        Loge(`Provided a wrong sky state ${skyboxState} for B# SetSkyState. Must be one of ${SKY_STATE_ALL}`)
        return
    }

    OUTPUT_SetSkyState(skyboxState)
})

SNIPPET_ExternalEvent("ee_set_chest_visual_state", (value) => {
    let entities = EMPTY_ENTITY_GROUP
    entities = OPER_Union(entities, QUERY_GetEntitiesWithTags(["village_treasure_chest_interact"]))
    entities = OPER_Union(entities, QUERY_GetEntitiesWithTags(["treasure_chest_interact"]))
    entities = OPER_Union(entities, QUERY_GetEntitiesWithTags(["piglin_crate_interact"]))

    Logv(`Set chest visual state: ${value.value} for ${QUERY_GetEntitiesCount(entities)} chests`)

    if (HasEntities(entities)) {
        if (value.value) {
            OUTPUT_AddVisualState(entities, "open_chest")
            OUTPUT_AddVisualState(entities, "open_crate")
        } else {
            OUTPUT_RemoveVisualState(entities, "open_chest")
            OUTPUT_AddVisualState(entities, "open_crate")
        }
    }
})

SNIPPET_ExternalEvent("ee_end_match", (winningTeam) => {
    OUTPUT_EndMatch(winningTeam.value)
})

SNIPPET_ExternalEvent("ee_set_timer", (timerInfo) => {
    const commandString = timerInfo.value
    const tokens = commandString.split(" ")

    const timerName = tokens[0]
    const timerValue = parseFloat(tokens[1])
    OUTPUT_SetNamedTimer(timerName, timerValue)
})
