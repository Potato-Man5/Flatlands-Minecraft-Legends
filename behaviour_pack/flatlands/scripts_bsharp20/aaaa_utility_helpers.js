/* eslint-disable @typescript-eslint/no-unused-vars */

// ===================
// ===== LOGGING =====
// ===================

const Logv = (message) => {
    OUTPUT_DebugLog("" + message, LOG_LEVEL_VERBOSE)
}

const Logi = (message) => {
    OUTPUT_DebugLog("" + message, LOG_LEVEL_INFO)
}

const Logw = (message) => {
    OUTPUT_DebugLog("" + message, LOG_LEVEL_WARNING)
}

const Loge = (message) => {
    OUTPUT_DebugLog("" + message, LOG_LEVEL_ERROR)
}

const DebugOutput = (stringToOutput, shouldDoOutput = false) => {
    if (shouldDoOutput) {
        Logi(stringToOutput)
    }
}

// ======================
// ===== ANNOUNCING =====
// ======================

const DelayedAnnounce = (message, delay) => {
    LISTENFOR_LocalTimer({
        snippet: "delayed_announce",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT, // this is a safe optout, since no entities are affected
        waitTime: delay,
        payloadString: message
    })
}
SNIPPET_LocalTimer("delayed_announce", (payload) => {
    //Set message in payloadString. Set priority in payloadInt.
    OUTPUT_Announce(payload.string, [])
})

const DelayedAnnounceTimed = (message, delay) => {
    LISTENFOR_LocalTimer({
        snippet: "delayed_announce_timed",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT, // this is a safe optout, since no entities are affected
        waitTime: delay,
        payloadString: message
    })
}
SNIPPET_LocalTimer("delayed_announce_timed", (payload) => {
    //Set message in payloadString. Set duration in payloadFloat. Set priority in payloadInt.
    OUTPUT_Announce(payload.string, [])
})

const AnnounceTeamsHelper = (messageFriendly, messageEnemy, friendlyteam) => {
    if (friendlyteam === TEAM_RED) {
        OUTPUT_AnnounceTeam(messageFriendly, [], TEAM_RED)
        OUTPUT_AnnounceTeam(messageEnemy, [], TEAM_BLUE)
    } else if (friendlyteam === TEAM_BLUE) {
        OUTPUT_AnnounceTeam(messageFriendly, [], TEAM_BLUE)
        OUTPUT_AnnounceTeam(messageEnemy, [], TEAM_RED)
    }
}

// Shows the HUD message only to the players in vicinity
const AnnounceToClosePlayers = (messageId, params, pointOfReference) => {
    let closePlayers = FILTER_ByDistance(GetPlayers(), pointOfReference, 300)
    while (HasEntities(closePlayers)) {
        const player = RandomEntity(closePlayers)

        OUTPUT_AnnouncePlayer(messageId, params, player)

        // Move on
        closePlayers = OPER_Difference(closePlayers, player)
    }
}

// ====================
// ===== SPAWNING =====
// ====================
const ConfigureNewEntities = (entities, team, villageId, piglinAppearanceOverride) => {
    OUTPUT_SetTeam(entities, team)
    if (villageId !== undefined && villageId >= 0) {
        OUTPUT_SetOwnerVillageById(entities, villageId)
        const factionName = QUERY_GetFactionNameFromVillageID(villageId)
        OUTPUT_SetFactionByName(entities, factionName)

        if (piglinAppearanceOverride === undefined) {
            if (FACTION_PIGLINS.includes(factionName)) {
                OUTPUT_OverrideFactionAppearanceByName(entities, factionName)
            }
        } else {
            OUTPUT_OverrideFactionAppearanceByName(entities, piglinAppearanceOverride)
        }
    }
}

const SpawnEntitiesAt = (spawnLocationEntities, entityArchetype, spawnCount, team, villageId, piglinAppearanceOverride) => {
    if (!HasEntities(spawnLocationEntities)) {
        Loge(`'SpawnEntitiesAt' called with no position entities! Failed to spawn ${spawnCount}* '${entityArchetype}'`)
    }

    const entities = OUTPUT_SpawnEntitiesAt(spawnLocationEntities, entityArchetype, spawnCount)
    OUTPUT_SetTeam(entities, team)
    ConfigureNewEntities(entities, team, villageId, piglinAppearanceOverride)
    return entities
}

const SpawnEntitiesNear = (spawnLocationEntities, entityArchetype, spawnCount, team, villageId, piglinAppearanceOverride) => {
    if (!HasEntities(spawnLocationEntities)) {
        Loge(`'SpawnEntitiesNear' called with no position entities! Failed to spawn ${spawnCount}* '${entityArchetype}'`)
    }

    const entities = OUTPUT_SpawnEntitiesNear(spawnLocationEntities, entityArchetype, spawnCount)
    ConfigureNewEntities(entities, team, villageId, piglinAppearanceOverride)
    return entities
}

const SpawnEntitiesInVillage = (entityArchetype, spawnCount, team, villageId, minRadius = 20, maxRadius = 50, piglinAppearanceOverride = undefined, villageIdOwnerOverride = -1) => {
    const entities = OUTPUT_SpawnEntitiesInVillage(entityArchetype, spawnCount, villageId, minRadius, maxRadius)

    OUTPUT_SetTeam(entities, team)
    if (villageIdOwnerOverride === -1) {
        OUTPUT_SetOwnerVillageById(entities, villageId)
    } else {
        OUTPUT_SetOwnerVillageById(entities, villageIdOwnerOverride)
    }
    const factionName = QUERY_GetFactionNameFromVillageID(villageId)
    OUTPUT_SetFactionByName(entities, factionName)

    if (piglinAppearanceOverride === undefined) {
        if (FACTION_PIGLINS.includes(factionName)) {
            OUTPUT_OverrideFactionAppearanceByName(entities, factionName)
        }
    } else {
        OUTPUT_OverrideFactionAppearanceByName(entities, piglinAppearanceOverride)
    }

    return entities
}
// =======================
// ===== DESTRUCTION =====
// =======================

// All entities passed in must belong to the village!
const DelayedDespawn = (entities, delay, villageId) => {
    LISTENFOR_LocalTimer({
        snippet: "delayed_despawn",
        ownerVillageId: villageId,
        waitTime: delay,
        payloadEntities: entities
    })
}
SNIPPET_LocalTimer("delayed_despawn", (payload) => {
    OUTPUT_DespawnEntities(payload.entities)
})

// All entities passed in must belong to the village!
const DelayedDestroy = (entities, delay, villageId) => {
    LISTENFOR_LocalTimer({
        snippet: "delayed_destroy",
        ownerVillageId: villageId,
        waitTime: delay,
        payloadEntities: entities
    })
}
SNIPPET_LocalTimer("delayed_destroy", (payload) => {
    OUTPUT_DestroyEntities(payload.entities)
})

const DestroyStaggered = (entities, totalDespawnDuration, initialDelay, villageId) => {
    const TICKS_PER_SECOND = 20
    const MINIMUM_DELAY = 1 / TICKS_PER_SECOND

    const count = QUERY_GetEntitiesCount(entities)
    let delayBetweenDestruction = totalDespawnDuration / count
    let batchSize = 1

    // ensure everything is gone by totalDespawnDuration
    if (delayBetweenDestruction < MINIMUM_DELAY) {
        batchSize = Math.ceil(MINIMUM_DELAY / delayBetweenDestruction)
        delayBetweenDestruction = (totalDespawnDuration / count) * batchSize
    }

    LISTENFOR_LocalTimer({
        snippet: "lt_destroy_staggered_helper",
        ownerVillageId: villageId,
        waitTime: initialDelay,
        payloadFloat: delayBetweenDestruction,
        payloadEntities: entities,
        payloadInt: batchSize
    })
}

SNIPPET_LocalTimer("lt_destroy_staggered_helper", (payload) => {
    const entitiesToDestroy = payload.entities
    const delayBetweenDestruction = payload.float
    const batchSize = payload.int

    // check if finished
    const count = QUERY_GetEntitiesCount(entitiesToDestroy)
    if (count === 0) {
        return
    }

    // destroy entities
    const selectedEntitiesToDestroy = FILTER_RandomCount(entitiesToDestroy, Math.min(batchSize, count))
    const remainingEntities = OPER_Difference(entitiesToDestroy, selectedEntitiesToDestroy)
    OUTPUT_DestroyEntities(selectedEntitiesToDestroy)

    LISTENFOR_LocalTimer({
        snippet: "lt_destroy_staggered_helper",
        ownerVillageId: payload.ownerVillageId !== undefined ? payload.ownerVillageId : OWNER_VILLAGE_OPT_OUT,
        waitTime: delayBetweenDestruction,
        payloadFloat: delayBetweenDestruction,
        payloadEntities: remainingEntities,
        payloadInt: batchSize
    })
})

const RegisterForCleanup = (ownerVillageId, lifetimeEntity, destructionEntities) => {
    LISTENFOR_NonPopCappedEntityDestroyed({
        snippet: "ed_trigger_volume_garbage_collect",
        ownerVillageId: ownerVillageId,
        entities: lifetimeEntity,
        payloadEntities: destructionEntities
    })
}
SNIPPET_NonPopCappedEntityDestroyed("ed_trigger_volume_garbage_collect", (_entityDestroyed, payload) => {
    OUTPUT_DestroyEntities(payload.entities)
})

// =================
// ===== Presenation Actions =====
// =================

const PlayPresentationActionToAll = (eventName) => {
    OUTPUT_SendGlobalEventToAll(eventName, "PresentationAction")
}

const PlayPresentationActionToTeam = (eventName, team) => {
    OUTPUT_SendGlobalEventToTeam(eventName, "PresentationAction", team)
}

const PlayPresentationActionToPlayers = (eventName, players) => {
    OUTPUT_SendGlobalEventToPlayers(eventName, "PresentationAction", players)
}

const PlayPresentationActionToClosePlayers = (eventName, pointOfReference, distance = 300) => {
    const closePlayers = FILTER_ByDistance(GetPlayers(), pointOfReference, distance)
    OUTPUT_SendGlobalEventToPlayers(eventName, "PresentationAction", closePlayers)
}

const PlayPresentationActionToPlayersInsideAVillage = (eventName, villageId) => {
    const players = GetPlayersInsideAVillage(villageId)
    OUTPUT_SendGlobalEventToPlayers(eventName, "PresentationAction", players)
}

const PlayPresentationActionToPlayersOutsideAVillage = (eventName, villageId) => {
    const players = GetPlayersOutsideAVillage(villageId)
    OUTPUT_SendGlobalEventToPlayers(eventName, "PresentationAction", players)
}

const PlayPresentationActionTeamsHelper = (messageFriendly, messageEnemy, friendlyteam) => {
    if (friendlyteam === TEAM_RED) {
        PlayPresentationActionToTeam(messageFriendly, friendlyteam)
        PlayPresentationActionToTeam(messageEnemy, TEAM_BLUE)
    } else if (friendlyteam === TEAM_BLUE) {
        PlayPresentationActionToTeam(messageFriendly, friendlyteam)
        PlayPresentationActionToTeam(messageEnemy, TEAM_RED)
    }
}

const PlayDelayedPresentationToAll = (eventName, delay) => {
    LISTENFOR_LocalTimer({
        snippet: "delayed_presentation",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT, // this is a safe optout, since no entities are affected
        waitTime: delay,
        payloadString: eventName
    })
}
SNIPPET_LocalTimer("delayed_presentation", (payload) => {
    PlayPresentationActionToAll(payload.string)
})

// for safety purposes, this needs to be ownded by a villageId
const PlayDelayedPresentationToClosePlayers = (eventName, villageId, delay, distance = 300) => {
    const villageEntity = GetVillageEntityFromID(villageId)
    LISTENFOR_LocalTimer({
        snippet: "delayed_presentation_close",
        ownerVillageId: villageId,
        waitTime: delay,
        payloadEntities: villageEntity,
        payloadString: eventName,
        payloadInt: distance
    })
}

SNIPPET_LocalTimer("delayed_presentation_close", (payload) => {
    PlayPresentationActionToClosePlayers(payload.string, payload.entities, payload.int)
})

// ======================
// ===== UI Actions =====
// ======================

const PlayUIActionToAll = (eventName) => {
    OUTPUT_SendGlobalEventToAll(eventName, "UI")
}

const PlayUIActionToTeam = (eventName, team) => {
    OUTPUT_SendGlobalEventToTeam(eventName, "UI", team)
}

const PlayUIActionToPlayers = (eventName, players) => {
    OUTPUT_SendGlobalEventToPlayers(eventName, "UI", players)
}

const PlayUIActionToClosePlayers = (eventName, pointOfReference) => {
    if (!HasEntities(pointOfReference)) {
        Logw(`No point of reference for playing UI action '${eventName}'`)
        return
    }
    const closePlayers = FILTER_ByDistance(GetPlayers(), pointOfReference, 300)
    OUTPUT_SendGlobalEventToPlayers(eventName, "UI", closePlayers)
}

const PlayUIActionTeamsHelper = (eventFriendly, eventEnemy, friendlyTeam) => {
    if (friendlyTeam === TEAM_RED) {
        PlayUIActionToTeam(eventFriendly, friendlyTeam)
        PlayUIActionToTeam(eventEnemy, TEAM_BLUE)
    } else if (friendlyTeam === TEAM_BLUE) {
        PlayUIActionToTeam(eventFriendly, friendlyTeam)
        PlayUIActionToTeam(eventEnemy, TEAM_RED)
    }
}

// =================
// ===== AUDIO =====
// =================

const PlayVOToAll = (eventName) => {
    OUTPUT_SendGlobalEventToAll(eventName, "Narrative")
}

const PlayVOToTeam = (eventName, team) => {
    OUTPUT_SendGlobalEventToTeam(eventName, "Narrative", team)
}

const PlayVOToPlayers = (eventName, players) => {
    OUTPUT_SendGlobalEventToPlayers(eventName, "Narrative", players)
}

const PlayVOToClosePlayers = (eventName, pointOfReference) => {
    if (!HasEntities(pointOfReference)) {
        Logw(`Cannot PlayVOToClosePlayers() - no entities in pointOfReference.`)
        return
    }
    const closePlayers = FILTER_ByDistance(GetPlayers(), pointOfReference, 300)
    OUTPUT_SendGlobalEventToPlayers(eventName, "Narrative", closePlayers)
}

const PlayVOTeamsHelper = (messageFriendly, messageEnemy, friendlyteam) => {
    if (friendlyteam === TEAM_RED) {
        PlayVOToTeam(messageFriendly, friendlyteam)
        PlayVOToTeam(messageEnemy, TEAM_BLUE)
    } else if (friendlyteam === TEAM_BLUE) {
        PlayVOToTeam(messageFriendly, friendlyteam)
        PlayVOToTeam(messageEnemy, TEAM_RED)
    }
}

// Set audio event name in payloadString.
// TODO : this plays narrative clips, and the name should be changed to reflect that
const DelayedAudio = (eventName, delay) => {
    LISTENFOR_LocalTimer({
        snippet: "delayed_audio",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT, // this is a safe optout, since no entities are affected
        waitTime: delay,
        payloadString: eventName
    })
}
SNIPPET_LocalTimer("delayed_audio", (payload) => {
    PlayVOToAll(payload.string)
})

const PlayDelayedStingerToAll = (eventName, delay) => {
    LISTENFOR_LocalTimer({
        snippet: "lt_delayed_stinger",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT, // this is a safe optout, since no entities are affected
        waitTime: delay,
        payloadString: eventName
    })
}
SNIPPET_LocalTimer("lt_delayed_stinger", (payload) => {
    PlayMusicStingerToAll(payload.string)
})

const PlayMusicStingerToAll = (eventName) => {
    OUTPUT_SendGlobalEventToAll(eventName, "Music")
}

const PlayMusicStingerToTeam = (eventName, team) => {
    OUTPUT_SendGlobalEventToTeam(eventName, "Music", team)
}

const PlayMusicStingerToPlayers = (eventName, players) => {
    OUTPUT_SendGlobalEventToPlayers(eventName, "Music", players)
}

const PlayStingerToClosePlayers = (eventName, pointOfReference) => {
    if (HasEntities(GetPlayers())) {
        const closePlayers = FILTER_ByDistance(GetPlayers(), pointOfReference, BASE_STINGER_RANGE)
        OUTPUT_SendGlobalEventToPlayers(eventName, "Music", closePlayers)
    }
}

// Check PIGLIN_BASE_STINGERS for suitable stinger types
const GetStingerForPiglinFaction = (factionName, stingerType) => {
    let stingerName = ""

    for (const stingerInfo of PIGLIN_BASE_STINGERS) {
        if (stingerInfo.factionName === factionName) {
            stingerName = stingerInfo[stingerType]
        }
    }

    if (!stingerName) {
        Loge(`Faction '${factionName}' has no definition for stinger action '${stingerType}'!`)
    }

    return stingerName
}

// ==================
// ===== PLAYER =====
// ==================

const GetClosestPlayer = (referenceEntity) => {
    return ClosestEntity(QUERY_GetAlivePlayers(), referenceEntity)
}

const GetNearbyPlayers = (referenceEntity) => {
    return FILTER_ByDistance(QUERY_GetAlivePlayers(), referenceEntity, NEARBY_PLAYER_RANGE)
}

const GetPlayersOutsideAVillage = (villageId) => {
    let allPlayers = GetPlayers()
    const fountain = GetVillageCentralStructures(villageId)
    if (HasEntities(fountain)) {
        const closePlayers = FILTER_ByDistance(allPlayers, fountain, 100)
        allPlayers = OPER_Difference(allPlayers, closePlayers)
    }
    return allPlayers
}

const GetPlayersInsideAVillage = (villageId) => {
    let allPlayers = GetPlayers()
    const fountain = GetVillageCentralStructures(villageId)
    if (HasEntities(fountain)) {
        allPlayers = FILTER_ByDistance(allPlayers, fountain, 100)
    }
    return allPlayers
}

const GetPlayers = () => {
    return QUERY_GetAlivePlayers()
}

const GetAllPlayers = () => {
    return QUERY_GetAllPlayers()
}

const GetPlayerAndMobs = () => {
    const playerEntities = QUERY_GetEntitiesWithTagFilter([TAG_PLAYER], [])
    const playerMobEntities = QUERY_GetEntitiesWithTagFilter(["mob"], ["piglin", "animal"])
    return OPER_Union(playerEntities, playerMobEntities)
}

const GetPlayerStructures = () => {
    return FILTER_ByHasCreator(FILTER_ByTeam(QUERY_GetEntitiesWithTags([TAG_BUILDABLE]), TEAM_BLUE))
}

const GetPlayerOwned = (includeTags) => {
    return FILTER_ByTeam(QUERY_GetEntitiesWithTags(includeTags), TEAM_BLUE)
}

const IsPlayer = (entity) => {
    const allPlayers = GetPlayers()
    const entityCount = QUERY_GetEntitiesCount(OPER_Intersection(allPlayers, entity))
    if (entityCount === 1) {
        return true
    }

    return false
}

// ==================
// ===== VILLAGE ====
// ==================

const GetVillageVariableKey = (villageId, key) => {
    if (!key) {
        Loge(`Call to GetVillageVariableKey made with undefined or empty string!`)
    }
    return "village_var_" + villageId + "_" + key
}

const SetVillageVariable = (villageId, key, value) => {
    OUTPUT_SetGlobalVariable(GetVillageVariableKey(villageId, key), value)
}

const GetVillageVariable = (villageId, key) => {
    return QUERY_GetGlobalVariable(GetVillageVariableKey(villageId, key))
}

const GetTeamVariableKey = (team, key) => {
    if (!key) {
        Loge(`Call to GetTeamVariableKey made with undefined or empty string!`)
    }
    return "team_var_" + team + "_" + key
}

const SetTeamVariable = (team, key, value) => {
    OUTPUT_SetGlobalVariable(GetTeamVariableKey(team, key), value)
}

const GetTeamVariable = (team, key) => {
    return QUERY_GetGlobalVariable(GetTeamVariableKey(team, key))
}

const DeltaVillageVariable = (villageId, key, delta) => {
    const variableKey = GetVillageVariableKey(villageId, key)
    const value = QUERY_GetGlobalVariable(variableKey) + delta
    OUTPUT_SetGlobalVariable(variableKey, value)
    return value
}

const GetVillagePortal = (villageId) => {
    return FILTER_ByVillageID(QUERY_GetEntitiesWithTags(["portal_piglin"]), villageId)
}

const GetVillagePortalSpawnLocation = (villageId) => {
    const portal = GetVillagePortal(villageId)
    if (!HasEntities(portal)) {
        return portal
    }
    return RandomEntity(QUERY_GetChildEntitiesWithInstanceName(portal, INSTANCE_LARGE_PORTAL_SPAWN_LOCATION))
}

const GetAllVillagePortalSpawnLocation = (villageId) => {
    const portal = GetVillagePortal(villageId)
    if (!HasEntities(portal)) {
        return portal
    }
    return QUERY_GetChildEntitiesWithInstanceName(portal, INSTANCE_LARGE_PORTAL_SPAWN_LOCATION)
}

const GetVillageCentralStructures = (villageId) => {
    let centralEntities = []
    const centralEnityTags = [TAG_MOB_ALLEGIANCE_STRUCTURE, TAG_OUTPOST_STRUCTURE, TAG_VILLAGE_FOUNTAIN]

    centralEnityTags.forEach((tag) => {
        centralEntities = OPER_Union(centralEntities, QUERY_GetEntitiesWithTags([tag]))
    })

    return FILTER_ByVillageID(centralEntities, villageId)
}

const GetVillageEntityFromID = (villageId) => {
    return FILTER_ByVillageID(QUERY_GetAllVillages(), villageId)
}

const GetVillageEntityFromFaction = (factionName) => {
    const villages = FILTER_ByFactionName(QUERY_GetAllVillages(), factionName)
    const villageCount = QUERY_GetEntitiesCount(villages)
    if (villageCount > 1) {
        Loge("Called GetVillageIDFromFaction on faction " + factionName + " but found more than one village! You can only use this function on factions that have one village.")
        return []
    }
    return villages
}

const GetEntitiesWithTagsAndVillage = (tags, villageId) => {
    // Note the two lines below aren't the same. The latter will also include child entities that belong to the village.
    // FILTER_ByTagFilter(QUERY_GetEntitiesOwnedByVillage(villageId), tags, [])
    return FILTER_ByVillageID(QUERY_GetEntitiesWithTags(tags), villageId)
}

const GetAliveVillages = (factions, sizes) => {
    let result = QUERY_GetAllAliveVillages()
    if (factions !== undefined) {
        result = FILTER_ByFactionName(result, factions)
    }
    if (sizes !== undefined) {
        result = FILTER_ByVillageSize(result, sizes)
    }
    return result
}

const GetAllVillages = (factions, sizes) => {
    let result = QUERY_GetAllVillages()
    if (factions !== undefined) {
        result = FILTER_ByFactionName(result, factions)
    }
    if (sizes !== undefined) {
        result = FILTER_ByVillageSize(result, sizes)
    }
    return result
}

const GetDeadVillages = (factions, sizes) => {
    const alive = GetAliveVillages(factions, sizes)
    const all = GetAllVillages(factions, sizes)
    return OPER_Difference(all, alive)
}

const GetStampTextureForFaction = (faction, size) => {
    for (const textureInfo of STAMP_TEXTURES) {
        if (textureInfo.factionName === faction) {
            const temp = textureInfo[size]
            Logw(`getting stamp texture for faction ${faction}, size ${size}: Result = ${temp}`)
            return temp
        }
    }
}

// ==================
// === PLACEMENT ====
// ==================

const GetWorldCenter = () => {
    return QUERY_GetEntitiesWithTags(["world_center_locator"])
}

// ================
// = WELL OF FATE =
//=================

const IsCurrentAct = (act) => {
    if (act === ACTS.ACT_1A) {
        return QUERY_GetGlobalVariable(ACTS.ACT_1B) === 0
    } else if (act === ACTS.ACT_1B) {
        return QUERY_GetGlobalVariable(ACTS.ACT_1B) > 0 && QUERY_GetGlobalVariable(ACTS.ACT_2) === 0
    } else if (act === ACTS.ACT_2) {
        return QUERY_GetGlobalVariable(ACTS.ACT_2) > 0 && QUERY_GetGlobalVariable(ACTS.ACT_3A) === 0
    } else if (act === ACTS.ACT_3A) {
        return QUERY_GetGlobalVariable(ACTS.ACT_3A) > 0 && QUERY_GetGlobalVariable(ACTS.EPILOGUE) === 0
    } else if (act === ACTS.EPILOGUE) {
        return QUERY_GetGlobalVariable(ACTS.EPILOGUE) > 0
    }
}

// ==================
// ===== PLAYER =====
// ==================

const GetPlayerVariableKey = (playerId, key) => {
    if (!key) {
        Loge(`Call to GetPlayerVariableKey made with undefined or empty string!`)
    }
    return "player_var_" + playerId + "_" + key
}

const SetPlayerVariable = (playerId, key, value) => {
    OUTPUT_SetGlobalVariable(GetPlayerVariableKey(playerId, key), value)
}

const GetPlayerVariable = (playerId, key) => {
    return QUERY_GetGlobalVariable(GetPlayerVariableKey(playerId, key))
}

// =====================
// ===== RESOURCES =====
// =====================

const UnlockJournalEntry = (journalUnlockResource) => {
    if (QUERY_GetCampaignResource(journalUnlockResource) === 0) {
        OUTPUT_AddOrRemoveTeamResource(TEAM_BLUE, journalUnlockResource, 1, false)
    }
}

const SetResourceForTeam = (team, resource, amount) => {
    OUTPUT_AddOrRemoveTeamResource(team, resource, -QUERY_GetTeamResource(team, resource) + amount, false)
}

const Resource = (name, amount) => {
    return { name: name, amount: amount }
}

const _resourceUnlockAssociations = {
    coal: ["gather_coal", "unlock_coal_tech"],
    iron: ["gather_uncommon_resource", "unlock_iron_tech"],
    redstone: ["gather_redstone", "unlock_redstone_tech"],
    diamond: ["gather_rare_resource", "unlock_diamond_tech"]
}

const IsGatherResourceUnlocked = (team, name) => {
    if (_resourceUnlockAssociations[name] === undefined) {
        return true
    }

    for (const resourceUnlocks of _resourceUnlockAssociations[name]) {
        if (QUERY_GetTeamResource(team, resourceUnlocks) > 0) {
            return true
        }
    }

    return false
}

// ================
// ===== MISC =====
// ================

const IncrementGlobal = (variable, incrementValue = 1) => {
    const value = QUERY_GetGlobalVariable(variable) + incrementValue
    OUTPUT_SetGlobalVariable(variable, value)
    return value
}

const DecrementGlobal = (variable, decrementValue = 1) => {
    const value = QUERY_GetGlobalVariable(variable) - decrementValue
    OUTPUT_SetGlobalVariable(variable, value)
    return value
}

const RandomEntity = (entities) => {
    return FILTER_RandomCount(entities, 1)
}

// like FILTER_RandomCount but can return 0 to count (rather than erroring)
const RandomUpToCount = (entities, count) => {
    if (QUERY_GetEntitiesCount(entities) <= count) {
        return entities
    } else {
        return FILTER_RandomCount(entities, count)
    }
}

//Avoid using this where-ever possible!
const ForEachEntities = (Entities, Callback) => {
    if (QUERY_GetEntitiesCount(Entities) >= 50) {
        Logw("ForEachEntities call with a large group of entities")
    }
    while (HasEntities(Entities)) {
        const entityToCheck = FILTER_RandomCount(Entities, 1)
        Callback(entityToCheck)
        Entities = OPER_Difference(Entities, entityToCheck)
    }
}

const ClosestEntity = (entities, referenceEntity) => {
    return FILTER_ByClosest(entities, referenceEntity, 1)
}

const HasEntities = (entities) => {
    return QUERY_GetEntitiesCount(entities)
}

const Unit = (archetype, amount) => {
    return { archetype: archetype, amount: amount }
}

const RandomFloat = () => {
    return QUERY_RandomNumber(0, 999) / 1000.0
}

const RandomFloatGroup = (group) => {
    return QUERY_RandomNumberGroup(0, 999, group) / 1000.0
}

const RandomIntFromInterval = (min, max) => {
    return Math.floor(RandomFloat() * (max - min) + min)
}

const RandomIntFromIntervalGroup = (min, max, group) => {
    return Math.floor(RandomFloatGroup(group) * (max - min) + min)
}

const ChooseFromArray = (array) => {
    return array[Math.floor(RandomFloat() * array.length)]
}

const ChooseFromArrayGroup = (array, group) => {
    return array[Math.floor(RandomFloatGroup(group) * array.length)]
}

const ShuffleArray = (array) => {
    let currentIndex = array.length,
        temporaryValue,
        randomIndex

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(RandomFloat() * currentIndex)
        currentIndex -= 1

        // And swap it with the current element.
        temporaryValue = array[currentIndex]
        array[currentIndex] = array[randomIndex]
        array[randomIndex] = temporaryValue
    }
    return array
}

const ShuffleArrayGroup = (array, group) => {
    let currentIndex = array.length,
        temporaryValue,
        randomIndex

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(RandomFloatGroup(group) * currentIndex)
        currentIndex -= 1

        // And swap it with the current element.
        temporaryValue = array[currentIndex]
        array[currentIndex] = array[randomIndex]
        array[randomIndex] = temporaryValue
    }
    return array
}

const ChooseFromWeightedArray = (array) => {
    // VALIDATION
    for (const element of array) {
        if (element.weight === undefined) {
            Loge("ChooseFromWeightedArray - Element did not have 'weight' property")
            return array[0]
        }
    }

    // Choose a random element
    let totalWeight = 0
    for (const element of array) {
        totalWeight += element.weight
    }

    const roll = RandomFloat() * totalWeight

    let currentWeight = 0
    for (const element of array) {
        currentWeight += element.weight
        if (currentWeight >= roll) {
            return element
        }
    }

    Loge("ChooseFromWeightedArray - Something went wrong (this shouldn't happen), please go yell at a B-Team programmer")
    return array[0]
}

const ChooseFromWeightedArrayGroup = (array, group) => {
    // VALIDATION
    for (const element of array) {
        if (element.weight === undefined) {
            Loge("ChooseFromWeightedArray - Element did not have 'weight' property")
            return array[0]
        }
    }

    // Choose a random element
    let totalWeight = 0
    for (const element of array) {
        totalWeight += element.weight
    }

    const roll = RandomFloatGroup(group) * totalWeight

    let currentWeight = 0
    for (const element of array) {
        currentWeight += element.weight
        if (currentWeight >= roll) {
            return element
        }
    }

    Loge("ChooseFromWeightedArray - Something went wrong (this shouldn't happen), please go yell at a B-Team programmer")
    return array[0]
}

const IsAnyNear = (groupToCheck, checkAgainst, distance) => {
    while (HasEntities(groupToCheck)) {
        const entityToCheck = FILTER_RandomCount(groupToCheck, 1)
        groupToCheck = OPER_Difference(groupToCheck, entityToCheck)
        const isInRange = FILTER_ByDistance(checkAgainst, entityToCheck, distance)
        if (HasEntities(isInRange)) {
            return true
        }
    }
    return false
}

const DoOnce = (globalKey) => {
    if (QUERY_GetGlobalVariable(globalKey) === 0) {
        OUTPUT_SetGlobalVariable(globalKey, 1)
        return true
    } else {
        return false
    }
}

const DoIfNotOnCooldown = (cooldown, globalKey, villageId = OWNER_VILLAGE_OPT_OUT) => {
    const onCooldown = (villageId !== OWNER_VILLAGE_OPT_OUT) ? GetVillageVariable(villageId, globalKey) : QUERY_GetGlobalVariable(globalKey)
    if (onCooldown) {
        return false
    } 

    if (villageId !== OWNER_VILLAGE_OPT_OUT) {
        SetVillageVariable(villageId, globalKey, 1)
    } else {
        OUTPUT_SetGlobalVariable(globalKey, 1)
    }
    Logi("setting timer " + globalKey)
    LISTENFOR_LocalTimer({
        snippet: "lt_util_snippet_cooldown_village",
        ownerVillageId: villageId,
        waitTime: cooldown,
        payloadString: globalKey
    })
    return true
}

SNIPPET_LocalTimer("lt_util_snippet_cooldown_village", (payload) => {
    if (payload.ownerVillageId === undefined) {
        OUTPUT_SetGlobalVariable(payload.string, 0)
    } else {
        SetVillageVariable(payload.ownerVillageId, payload.string, 0)
    }
})

const ForceMoveEntities = (entities, destinationEntity, padding) => {
    OUTPUT_SetInfluenceable(entities, false)
    OUTPUT_Move(entities, destinationEntity, padding, "mc_enable_influenceable")
}

const ForceMoveEntitiesPosition = (entities, destinationEntity, padding) => {
    OUTPUT_SetInfluenceable(entities, false)
    OUTPUT_MovePosition(entities, destinationEntity, padding, "mc_enable_influenceable")
}

SNIPPET_MoveCallback("mc_enable_influenceable", (entity, successfullyArrived, payload) => {
    OUTPUT_SetInfluenceable(entity, true)
})

const SetVillageVariableForDuration = (villageId, variableName, delay) => {
    // Error notification for misuse
    if (GetVillageVariable(villageId, variableName) !== 0) {
        throw new Error("SetVillageVariableForDuration() called on a non-zero variable: " + variableName + " for vID: " + villageId)
    }

    SetVillageVariable(villageId, variableName, 1)
    LISTENFOR_LocalTimer({
        snippet: "lt_reset_village_var_delayed",
        ownerVillageId: villageId,
        waitTime: delay,
        payloadString: variableName
    })
}

SNIPPET_LocalTimer("lt_reset_village_var_delayed", (payload) => {
    SetVillageVariable(payload.ownerVillageId, payload.string, 0)
})

const SetVillageVariableForGlobalDuration = (villageId, variableName, delay) => {
    // Error notification for misuse
    if (GetVillageVariable(villageId, variableName) !== 0) {
        throw new Error("SetVillageVariableForGlobalDuration() called on a non-zero variable: " + variableName + " for vID: " + villageId)
    }

    SetVillageVariable(villageId, variableName, 1)
    LISTENFOR_LocalTimer({
        snippet: "lt_reset_village_var_delayed_global",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        waitTime: delay,
        payloadInt: villageId,
        payloadString: variableName
    })
}

SNIPPET_LocalTimer("lt_reset_village_var_delayed_global", (payload) => {
    SetVillageVariable(payload.int, payload.string, 0)
})

const IsNightTime = () => {
    const currentTime = QUERY_GetTimeOfDay()
    if (currentTime >= TIME_DUSK && currentTime < TIME_DAWN) {
        return true
    }
    return false
}

const Clamp = (number, minVal, maxVal) => {
    return number <= minVal ? minVal : number >= maxVal ? maxVal : number
}

const Lerp = (start, end, lerpVal) => {
    return start * (1 - lerpVal) + end * lerpVal
}

const TeleportEntitiesToWoF = (entities) => {
    const wofVillage = GetVillageEntityFromFaction(WELL_OF_FATE)
    OUTPUT_TeleportFastTravel(entities, wofVillage)
}

const IsDayTime = () => {
    return !IsNightTime()
}

const IsNotNull = (anyObject) => {
    return anyObject !== undefined && anyObject !== null
}

const MinMax = (min, max) => {
    return { min: min, max: max }
}

const GetClosestTimeOfDay = (time) => {
    let smallestDist = Number.MAX_VALUE
    let closestTOD = null
    for (const timeOfDay of TIME_LANDMARKS) {
        const dist = Math.abs(time - timeOfDay)
        if (dist < smallestDist) {
            smallestDist = dist
            closestTOD = timeOfDay
        }
    }

    return closestTOD
}

// This ensures that we can pass both ...args and args[] to functions
const GetRestParameter = (restArg) => {
    if (restArg.length === 1) {
        const firstElem = restArg[0]
        if (Array.isArray(firstElem)) {
            restArg = firstElem
        }
    }

    return restArg
}

const _GetPermutation = (runningSet, resultArray, sets) => {
    // Base case
    if (sets.length === 0) {
        return runningSet
    }

    if (sets.length === 1) {
        for (const n of sets[0]) {
            const finalPermutation = runningSet.concat(n)
            resultArray.push(finalPermutation)
        }
        return runningSet
    }

    for (const n of sets[0]) {
        _GetPermutation(runningSet.concat(n), resultArray, sets.slice(1))
    }
}

const GetChild = (object, ...keys) => {
    let child = object
    for (const key of keys) {
        child = child[key]
        if (child === undefined) {
            Logv(`Could not GetChild for key ${key} in object ${object}`)
            return undefined
        }
    }
    return child
}

// All input sets must be arrays []
const GetAllPermutations = (...sets) => {
    sets = GetRestParameter(sets)
    const resultArray = []
    _GetPermutation([], resultArray, sets)
    return resultArray
}

const GetTagForPiglinUnitType = (piglinType) => {
    return PIGLIN_TAG_LOOKUP[piglinType]
}

const EnableFastTravelForVillage = (villageId) => {
    OUTPUT_SetFastTravelEnabled(villageId, true)
    SetVillageVariable(villageId, GV_FAST_TRAVELLED_ENABLED_AT_VILLAGE, 1)
}
