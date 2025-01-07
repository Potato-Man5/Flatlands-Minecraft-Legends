// Default **global** rally point tunings
const rallyVals = {
    debug: {
        logging: false,
        showRallyPoints: false
    },
    constants: {
        defaultMovementPadding: 15,
        defaultPatrolTime: 30
    },
    entity: {
        triggerVolumeDefault: "badger:spatial_trigger_rally_point",
        debugIndicator: "badger:debug_rally_point_indicator"
    },
    tags: {
        unitUsed: "rally_man_used",
        unitCanPatrol: "rally_man_can_patrol",
        unitPatrolling: "rally_man_patrolling",
        unitRecruiting: "rally_man_recruiting",
        rallyDisabled: "rally_point_disabled",
        rallypointPatrolling: "rally_point_patrolling"
    },
    unitTypes: ["runt", "seeker", "pigmadilo", "warboar", "piggo_lava_launcher", "medic", "grunter", "grenadier", "bruiser"]
}

// ========== HELPERS ==========

const _GetRallyPointTag = (name) => {
    return "rally_point_name_" + name
}
const _GetCurrentRallyPointTag = () => {
    return "rally_point_active"
}
const _GetUsedRallyPointTag = () => {
    return "rally_point_used"
}

// ========== INITIALIZATION & ACTIVE RALLY POINT MANAGEMENT ==========

// eslint-disable-next-line @typescript-eslint/camelcase, @typescript-eslint/no-unused-vars
const RALLYMAN_Initdata = (villageId, rallyPointsInfo) => {
    DebugOutput(`RALLYMAN Initializing village: ${villageId} to use RALLYMAN.`, rallyVals.debug.logging)
    for (const info of rallyPointsInfo) {
        if (info.name === undefined) {
            Loge("RALLYMAN: Cannot setup rally points. No name was given")
        }
        if (info.accumulations === undefined) {
            Loge("RALLYMAN: Cannot setup rally points. No accumulations was given")
        }
        if (info.count === undefined) {
            Loge("RALLYMAN: Cannot setup rally points. No count was given")
        }
        if (info.distance === undefined) {
            Logv("RALLYMAN: No minimum distance defined. Defaulting to 0.")
        }

        _SetAccmulationCap(villageId, info.name, info.accumulations)
        _SetRegistrationRallyPointCap(villageId, info.name, info.count)
        _SetMinimumRallyDistance(villageId, info.name, info.distance !== undefined ? info.distance : 0)

        //Patrol Info
        if (info.patrolEnabled) {
            if (info.patrolDistance === undefined) {
                Logv(`RALLYMAN: No minimum distance for patrols. Using the rally point distance: ${_GetMinimumRallyPointDistance(villageId, info.name)}.`)
            }
            if (info.patrolTime === undefined || info.patrolTime <= 0) {
                Logv(`RALLYMAN: No patrol time specified. Using default: ${rallyVals.constants.defaultPatrolTime}.`)
            }
            _SetPatrolEnabled(villageId, info.name, 1)
            _SetPatrolDistance(villageId, info.name, info.patrolDistance !== undefined ? info.patrolDistance : _GetMinimumRallyPointDistance(villageId, info.name))
            _SetPatrolTime(villageId, info.name, info.patrolTime !== undefined ? info.patrolTime : rallyVals.constants.defaultPatrolTime)
        } else {
            _SetPatrolEnabled(villageId, info.name, 0)
        }
    }
}

const _SetAccmulationCap = (villageId, name, cap) => {
    SetVillageVariable(villageId, "rallyman_acc_cap_" + name, cap)
}
const _GetAccumulationCap = (villageId, name) => {
    return GetVillageVariable(villageId, "rallyman_acc_cap_" + name)
}

const _SetAccumulationCount = (villageId, name, count) => {
    SetVillageVariable(villageId, "rallyman_acc_count_" + name, count)
}
const _GetAccumulationCount = (villageId, name) => {
    return GetVillageVariable(villageId, "rallyman_acc_count_" + name)
}

const _SetMinimumRallyDistance = (villageId, name, distance) => {
    SetVillageVariable(villageId, "rallyman_dist_" + name, distance)
}
const _GetMinimumRallyPointDistance = (villageId, name) => {
    return GetVillageVariable(villageId, "rallyman_dist_" + name)
}

const _SetPatrolsActivated = (villageId, name, enabled) => {
    SetVillageVariable(villageId, "rallyman_patrols_activated_" + name, enabled)
}

const _GetPatrolsActivated = (villageId, name) => {
    return GetVillageVariable(villageId, "rallyman_patrols_activated_" + name)
}

const _SetPatrolEnabled = (villageId, name, enabled) => {
    SetVillageVariable(villageId, "rallyman_patrol_enabled_" + name, enabled)
}

const _GetPatrolEnabled = (villageId, name) => {
    return GetVillageVariable(villageId, "rallyman_patrol_enabled_" + name)
}

const _SetPatrolDistance = (villageId, name, distance) => {
    SetVillageVariable(villageId, "rallyman_patrol_dist_" + name, distance)
}

const _GetPatrolDistance = (villageId, name) => {
    return GetVillageVariable(villageId, "rallyman_patrol_dist_" + name)
}

const _SetPatrolTime = (villageId, name, time) => {
    SetVillageVariable(villageId, "rallyman_patrol_time_" + name, time)
}

const _GetPatrolTime = (villageId, name) => {
    return GetVillageVariable(villageId, "rallyman_patrol_time_" + name)
}

const _SwitchCurrentRallyPoint = (villageId, name) => {
    const all = QUERY_GetEntitiesOwnedByVillage(villageId)
    const currentRallyPoint = FILTER_ByTagFilter(all, [_GetRallyPointTag(name), _GetCurrentRallyPointTag()], [])
    if (HasEntities(currentRallyPoint)) {
        OUTPUT_RemoveTag(currentRallyPoint, _GetCurrentRallyPointTag())
        OUTPUT_AddTag(currentRallyPoint, _GetUsedRallyPointTag())
    }

    let rallyPointCandidates = _GetUnusedRallyPoints(villageId, name)
    if (!HasEntities(rallyPointCandidates)) {
        rallyPointCandidates = RALLYMAN_GetEnabledRallyPoints(villageId, name)
        OUTPUT_RemoveTag(rallyPointCandidates, _GetUsedRallyPointTag())
    }

    if (!HasEntities(rallyPointCandidates)) {
        Logw(`Cannot switch current rally point: There are no rally points for ${villageId} named ${name} that are enabled.`)
        return EMPTY_ENTITY_GROUP
    }

    const newRallyPoint = FILTER_RandomCount(rallyPointCandidates, 1)
    OUTPUT_AddTag(newRallyPoint, _GetCurrentRallyPointTag())
    return newRallyPoint
}

// eslint-disable-next-line @typescript-eslint/camelcase
const RALLYMAN_GetRallyPoints = (villageId, name) => {
    const all = QUERY_GetEntitiesOwnedByVillage(villageId)
    const rallies = FILTER_ByTagFilter(all, [_GetRallyPointTag(name)], [])
    return rallies
}

const _GetUnusedRallyPoints = (villageId, name) => {
    const all = QUERY_GetEntitiesOwnedByVillage(villageId)
    const rallies = FILTER_ByTagFilter(all, [_GetRallyPointTag(name)], [_GetUsedRallyPointTag(), rallyVals.tags.rallyDisabled])
    return rallies
}

const _GetCurrentRallyPoint = (villageId, name) => {
    const all = QUERY_GetEntitiesOwnedByVillage(villageId)
    let rallies = FILTER_ByTagFilter(all, [_GetRallyPointTag(name), _GetCurrentRallyPointTag()], [])
    if (!HasEntities(rallies)) {
        rallies = _SwitchCurrentRallyPoint(villageId, name)
    }
    return rallies
}

// ========== RALLY POINT REGISTRATION ==========

// eslint-disable-next-line @typescript-eslint/camelcase, @typescript-eslint/no-unused-vars
const RALLYMAN_TryRegisterAsCappedRallyPoint = (villageId, entity, name) => {
    const rpName = name
    const rpCount = _GetRegisteredRallyPointCount(villageId, rpName)
    const rpCap = _GetRegisteredRallyPointCap(villageId, rpName)

    if (rpCount >= rpCap) {
        return EMPTY_ENTITY_GROUP
    }

    const rpDist = _GetMinimumRallyPointDistance(villageId, name)
    const rallyPoints = RALLYMAN_GetRallyPoints(villageId, name)
    if (rpDist > 0 && HasEntities(rallyPoints) && HasEntities(FILTER_ByDistance(rallyPoints, entity, rpDist))) {
        DebugOutput(`A rally point already exists nearby!`, rallyVals.debug.logging, rallyVals.debug.logging)
        return EMPTY_ENTITY_GROUP
    }

    DebugOutput(`Registered a capped rally point for village: ${villageId} named: ${rpName}. Now at: ${rpCount + 1} / ${rpCap}`, rallyVals.debug.logging)
    return RALLYMAN_RegisterAsRallyPoint(villageId, entity, rpName)
}

// Note: You can use this to bypass cap limits
// eslint-disable-next-line @typescript-eslint/camelcase, @typescript-eslint/no-unused-vars
const RALLYMAN_RegisterAsRallyPoint = (villageId, entity, name) => {
    DebugOutput(`Registered a rally point for ${villageId} named ${name}`, rallyVals.debug.logging)

    // TODO: SpawnTriggerVolume should handle if we don't want to overwrite the tagsets
    const DEFAULT_INCLUDE_TAGS = ["piglin", "mob"]
    const DEFAULT_EXCLUDE_TAGS = ["boss", "engineer", rallyVals.tags.unitUsed, rallyVals.tags.unitRecruiting, rallyVals.tags.unitPatrolling]
    const triggerVolume = SpawnTriggerVolume(entity, entity, rallyVals.entity.triggerVolumeDefault, TEAM_ORANGE, villageId, true, DEFAULT_INCLUDE_TAGS, DEFAULT_EXCLUDE_TAGS, ALLIANCE_FRIENDLY)
    OUTPUT_AddTag(triggerVolume, _GetRallyPointTag(name))

    if (rallyVals.debug.showRallyPoints) {
        const debugIndicator = SpawnEntitiesAt(entity, rallyVals.entity.debugIndicator, 1, TEAM_BLUE, villageId)
        RegisterForCleanup(villageId, triggerVolume, debugIndicator)
    }

    _IncrementRegisteredRallyPointCount(villageId, name)

    return triggerVolume
}

const _SetRegistrationRallyPointCap = (villageId, name, cap) => {
    SetVillageVariable(villageId, "rally_man_cap_" + name, cap)
    SetVillageVariable(villageId, "rally_man_count_" + name, 0)
}

const _GetRegisteredRallyPointCap = (villageId, name) => {
    return GetVillageVariable(villageId, "rally_man_cap_" + name)
}

const _GetRegisteredRallyPointCount = (villageId, name) => {
    return GetVillageVariable(villageId, "rally_man_count_" + name)
}

const _IncrementRegisteredRallyPointCount = (villageId, name) => {
    DeltaVillageVariable(villageId, "rally_man_count_" + name, 1)
}

// ========== RALLY POINT AUTO-REGISTRATION ==========

// eslint-disable-next-line @typescript-eslint/camelcase, @typescript-eslint/no-unused-vars
const RALLYMAN_AutoRegisterRallyPoints = (villageId, tag, name) => {
    DebugOutput(`Auto-registering building with tag ${tag} to rally named ${name} for village: ${villageId}`, rallyVals.debug.logging)
    LISTENFOR_BuildingComplete({
        snippet: "bc_rally_man_auto_register_rp",
        ownerVillageId: villageId,
        includeTags: [tag],
        payloadString: name
    })
}

SNIPPET_BuildingComplete("bc_rally_man_auto_register_rp", (buildingEntity, payload) => {
    const villageId = payload.ownerVillageId
    const rpName = payload.string
    RALLYMAN_TryRegisterAsCappedRallyPoint(villageId, buildingEntity, rpName)
})

// ========== RECRUITMENT ==========

// eslint-disable-next-line @typescript-eslint/camelcase, @typescript-eslint/no-unused-vars
const RALLYMAN_RecruitSpawnedUnit = (villageId, name, entities) => {
    _RecruitUnits(villageId, name, entities)
}

// eslint-disable-next-line @typescript-eslint/camelcase, @typescript-eslint/no-unused-vars
const RALLYMAN_RecruitSpawnerOutput = (villageId, name, spawnerEntity) => {
    LISTENFOR_BuildableSpawnerBatchSpawned({
        snippet: "bss_rally_man_recruit_spawned",
        ownerVillageId: villageId,
        buildableSpawner: spawnerEntity,
        payloadString: name
    })
}

// eslint-disable-next-line @typescript-eslint/camelcase, @typescript-eslint/no-unused-vars
const RALLYMAN_RecruitUnitsAfterDelay = (villageId, name, entities, delay) => {
    LISTENFOR_LocalTimer({
        snippet: "lt_reset_rallies",
        ownerVillageId: villageId,
        waitTime: delay,
        payloadEntities: entities,
        payloadString: name
    })
}

SNIPPET_LocalTimer("lt_reset_rallies", (payload) => {
    DebugOutput(`RALLYMAN Re-recruiting units for ${payload.ownerVillageId} name ${payload.string}`, rallyVals.debug.logging)
    _RecruitUnits(payload.ownerVillageId, payload.string, payload.entities)
})

const _RecruitUnits = (villageId, name, entities) => {
    let unitCount = QUERY_GetEntitiesCount(entities)
    if (unitCount === 0) {
        return
    }

    let rallyPoints = RALLYMAN_GetEnabledRallyPoints(villageId, name)
    if (!HasEntities(rallyPoints)) {
        return
    }

    OUTPUT_RemoveTag(entities, rallyVals.tags.unitUsed)
    OUTPUT_RemoveTag(entities, rallyVals.tags.unitPatrolling)
    OUTPUT_AddTag(entities, rallyVals.tags.unitRecruiting) // Unit cannot be used until they have reached their rally point

    let accCount = _GetAccumulationCount(villageId, name)
    const accCap = _GetAccumulationCap(villageId, name)

    if (accCap > 1) {
        // group mode (the intent of setting accmulator > 1 is to quickly "fill" up a rally point. in this scenario we perfrom round robin).
        while (unitCount > 0) {
            const unitCountToSend = Math.min(accCap - accCount, unitCount)
            const unitsToSend = FILTER_RandomCount(entities, unitCountToSend)
            const currentRp = _GetCurrentRallyPoint(villageId, name)

            OUTPUT_MoveAttackPosition(unitsToSend, currentRp, rallyVals.constants.defaultMovementPadding, "recruiting_move_callback")

            accCount += unitCountToSend
            if (accCount >= accCap) {
                DebugOutput(`RALLYMAN Accumulator cap reached. Switching to next rally point for ${villageId} name ${name}`, rallyVals.debug.logging)
                _SwitchCurrentRallyPoint(villageId, name)
                accCount = 0
            }

            entities = OPER_Difference(entities, unitsToSend)
            unitCount = QUERY_GetEntitiesCount(entities)
        }
    } else {
        // single mode (the intent of setting accmulator of 1 is to evenly distrbute between all rally points. in this scenario we rely on randomness to distribute it).
        const rallyCount = QUERY_GetEntitiesCount(rallyPoints)
        const groupSize = Math.floor(unitCount / rallyCount)
        for (let i = 0; i < rallyCount - 1; i++) {
            const unitsToSend = FILTER_RandomCount(entities, groupSize)
            const currentRp = FILTER_RandomCount(rallyPoints, 1)

            if (HasEntities(unitsToSend)) {
                OUTPUT_MoveAttackPosition(unitsToSend, currentRp, rallyVals.constants.defaultMovementPadding, "recruiting_move_callback")
                entities = OPER_Difference(entities, unitsToSend)
            }
            rallyPoints = OPER_Difference(rallyPoints, currentRp)
        }

        // final rally point - send all remaining units
        OUTPUT_MoveAttackPosition(entities, rallyPoints, rallyVals.constants.defaultMovementPadding, "recruiting_move_callback")
    }

    _SetAccumulationCount(villageId, name, accCount)
}

SNIPPET_MoveCallback("recruiting_move_callback", (entity, _success) => {
    OUTPUT_RemoveTag(entity, rallyVals.tags.unitRecruiting)
})

SNIPPET_BuildableSpawnerBatchSpawned("bss_rally_man_recruit_spawned", (buildableSpawner, spawnedEntities, payload) => {
    const villageId = payload.ownerVillageId
    const rpName = payload.string
    _RecruitUnits(villageId, rpName, spawnedEntities)
})

// ========== LAUNCHING ==========

const _MoveAttackEntityOrPosition = (source, target, padding, follow, callback) => {
    if (follow) {
        OUTPUT_MoveAttackEntity(source, target, callback)
    } else {
        OUTPUT_MoveAttackPosition(source, target, padding, callback)
    }
}

const _SendUnitsEvenlyToTargets = (units, targetInfos, origin, context) => {
    // tag all units as used so they can't be relaunched normally.
    OUTPUT_AddTag(units, rallyVals.tags.unitUsed)

    const unitGroups = new Array(targetInfos.length)
    unitGroups.fill(EMPTY_ENTITY_GROUP)

    let totalWeight = 0
    for (let i = 0; i < targetInfos.length; i++) {
        const info = targetInfos[i]
        if (!HasEntities(info.target)) {
            info.target = null // optimization so further loops don't need to do an entity check
            continue
        }
        totalWeight += info.weight
        info.target = FILTER_RandomCount(info.target, 1)
        info.returnIndex = i
    }

    // ignore invalid targets
    targetInfos = targetInfos.filter((info) => info.target !== null)

    if (!HasEntities(units)) {
        return unitGroups
    }

    for (let i = 0; i < targetInfos.length; i++) {
        const info = targetInfos[i]
        const percent = (info.weight / totalWeight) * 100
        const callback = info.callback !== undefined ? info.callback : CALLBACK_NONE

        if (i === targetInfos.length - 1) {
            // last entry - send everything remaining! (may want to sort units so largest weight always gets the remaining / most units)
            unitGroups[info.returnIndex] = units
        } else {
            // divy up all units types evenly
            for (const type of rallyVals.unitTypes) {
                const filteredUnits = FILTER_RandomPercentage(FILTER_ByTagFilter(units, [type], []), percent)
                unitGroups[info.returnIndex] = OPER_Append(unitGroups[info.returnIndex], filteredUnits)
                units = OPER_Difference(units, filteredUnits)
            }
        }

        // move units
        const currentUnits = unitGroups[info.returnIndex]
        _MoveAttackEntityOrPosition(currentUnits, info.target, rallyVals.constants.defaultMovementPadding, info.follow, callback)
        if (context) {
            OUTPUT_TriggerPresentationEvent(currentUnits, context.presEvent)
        }

        totalWeight -= info.weight
    }

    if (context) {
        OUTPUT_SendPositionalAudio(context.audioEvent, origin)
    }

    return unitGroups
}

// eslint-disable-next-line @typescript-eslint/camelcase, @typescript-eslint/no-unused-vars
const RALLYMAN_LaunchRallyPointAtTargets = (villageId, rallyPoint, context, targetInfos) => {
    DebugOutput(`Launching units from rally point for ${villageId} to multiple targets!`, rallyVals.debug.logging)
    const units = QUERY_GetIntruders(rallyPoint)
    return _SendUnitsEvenlyToTargets(units, targetInfos, rallyPoint, context)
}

// eslint-disable-next-line @typescript-eslint/camelcase, @typescript-eslint/no-unused-vars
const RALLYMAN_LaunchClosestNamedRallyPointsWithThreshold = (villageId, rallyName, count, referenceEntity, threshold, context, targetInfos) => {
    const rallyPoints = RALLYMAN_GetEnabledRallyPoints(villageId, rallyName)
    return RALLYMAN_LaunchClosestRallyPointsWithThreshold(villageId, rallyPoints, count, referenceEntity, threshold, context, targetInfos)
}

// eslint-disable-next-line @typescript-eslint/camelcase, @typescript-eslint/no-unused-vars
const RALLYMAN_LaunchClosestRallyPointsWithThreshold = (villageId, rallyPoints, count, referenceEntity, threshold, context, targetInfos) => {
    const unitGroups = new Array(targetInfos.length)
    unitGroups.fill(EMPTY_ENTITY_GROUP)

    if (!HasEntities(rallyPoints)) {
        DebugOutput(`RALLYMAN: Could not find rally point with over ${threshold} units.`, rallyVals.debug.logging)
        return unitGroups
    }

    let rallyPointsUsed = 0
    while (HasEntities(rallyPoints) && rallyPointsUsed < count) {
        const rallyPoint = FILTER_ByClosest(rallyPoints, referenceEntity, 1)
        const units = RALLYMAN_GetUnitsFromRallyPoint(villageId, rallyPoint)
        if (QUERY_GetEntitiesCount(units) > threshold) {
            DebugOutput(`RALLYMAN: Found closest rally point with over ${threshold} units. Launching!`, rallyVals.debug.logging)
            const currentGroup = RALLYMAN_LaunchRallyPointAtTargets(villageId, rallyPoint, context, targetInfos)
            for (let i = 0; i < currentGroup.length; i++) {
                unitGroups[i] = OPER_Union(unitGroups[i], currentGroup[i])
            }
            rallyPointsUsed++
        }
        rallyPoints = OPER_Difference(rallyPoints, rallyPoint)
    }

    DebugOutput(`RALLYMAN: Sent rally points: ${rallyPointsUsed} out of desired ${count}.`, rallyVals.debug.logging)
    return unitGroups
}

// eslint-disable-next-line @typescript-eslint/camelcase, @typescript-eslint/no-unused-vars
const RALLYMAN_GetUnitsFromRallyPoint = (villageId, rallyPoint) => {
    return QUERY_GetIntruders(rallyPoint)
}

// ========== AUTO TRIGGERING ==========

// eslint-disable-next-line @typescript-eslint/camelcase, @typescript-eslint/no-unused-vars
const RALLYMAN_ListenForComposition = (uniqueHandlerName, rallyPoint, requiredUnitCount) => {
    const villageId = QUERY_GetVillageIDFromEntity(rallyPoint)
    LISTENFOR_SpatialPartitionEntered({
        snippet: "spe_rally_man_composition_handler_" + uniqueHandlerName,
        ownerVillageId: villageId,
        triggerEntity: rallyPoint,
        payloadInt: requiredUnitCount
    })
}

// eslint-disable-next-line @typescript-eslint/camelcase, @typescript-eslint/no-unused-vars
const RALLYMAN_DeclareCompositionHandler = (uniqueHandlerName, callback) => {
    SNIPPET_SpatialPartitionEntered("spe_rally_man_composition_handler_" + uniqueHandlerName, (triggerEntity, intruderEntity, payload) => {
        const villageId = QUERY_GetVillageIDFromEntity(triggerEntity)
        const intruders = QUERY_GetIntruders(triggerEntity)
        const requiredUnits = payload.int
        if (QUERY_GetEntitiesCount(intruders) >= requiredUnits) {
            callback(villageId, triggerEntity, intruders)
        }
    })
}

// eslint-disable-next-line @typescript-eslint/camelcase, @typescript-eslint/no-unused-vars
const RALLYMAN_ListenForCooldown = (uniqueHandlerName, rallyPoint, cooldown) => {
    const villageId = QUERY_GetVillageIDFromEntity(rallyPoint)
    LISTENFOR_EntityTimer({
        snippet: "et_rally_man_cooldown_handler_" + uniqueHandlerName,
        ownerVillageId: villageId,
        entity: rallyPoint,
        timerName: "rally_man_cooldown_timer",
        payloadFloat: cooldown
    })
    OUTPUT_SetEntityTimer(rallyPoint, "rally_man_cooldown_timer", cooldown)
}

// eslint-disable-next-line @typescript-eslint/camelcase, @typescript-eslint/no-unused-vars
const RALLYMAN_DeclareCooldownHandler = (uniqueHandlerName, callback) => {
    SNIPPET_EntityTimer("et_rally_man_cooldown_handler_" + uniqueHandlerName, (entity, payload) => {
        const villageId = QUERY_GetVillageIDFromEntity(entity)
        const cooldown = payload.float
        callback(villageId, entity)
        OUTPUT_SetEntityTimer(entity, "rally_man_cooldown_timer", cooldown)
    })
}

// eslint-disable-next-line @typescript-eslint/camelcase, @typescript-eslint/no-unused-vars
const RALLYMAN_ListenForSpecificComposition = (uniqueHandlerName, rallyPoint) => {
    const villageId = QUERY_GetVillageIDFromEntity(rallyPoint)
    LISTENFOR_SpatialPartitionEntered({
        snippet: "spe_rally_man_composition_handler_" + uniqueHandlerName,
        ownerVillageId: villageId,
        triggerEntity: rallyPoint
    })
}

// eslint-disable-next-line @typescript-eslint/camelcase, @typescript-eslint/no-unused-vars
const RALLYMAN_DeclareSpecificCompositionHandler = (uniqueHandlerName, compositionInfo, callback) => {
    SNIPPET_SpatialPartitionEntered("spe_rally_man_composition_handler_" + uniqueHandlerName, (triggerEntity, intruderEntity, payload) => {
        const villageId = payload.ownerVillageId
        const intruders = QUERY_GetIntruders(triggerEntity)
        let excludeTags = []
        for (const entry of compositionInfo) {
            excludeTags = []
            if (entry.excludeTags !== undefined) excludeTags = entry.excludeTags //checks for the optional exclude parameter in composition info
            const count = QUERY_GetEntitiesCount(FILTER_ByTagFilter(intruders, [entry.tag], excludeTags)) //filter out units that have the exclude tag
            if (count < entry.count) {
                return
            }
        }
        Logv("Condition Triggered!")
        callback(villageId, triggerEntity, intruders)
    })
}
// =================== Helpers ========================

// eslint-disable-next-line @typescript-eslint/camelcase, @typescript-eslint/no-unused-vars
const ForEachRallyPoint = (villageId, rallyName, checkOnlyEnabled, callback) => {
    let rallyPointEntities = EMPTY_ENTITY_GROUP
    if (checkOnlyEnabled) {
        rallyPointEntities = RALLYMAN_GetEnabledRallyPoints(villageId, rallyName)
    } else {
        rallyPointEntities = RALLYMAN_GetRallyPoints(villageId, rallyName)
    }
    while (HasEntities(rallyPointEntities)) {
        const entityToCheck = FILTER_RandomCount(rallyPointEntities, 1)
        rallyPointEntities = OPER_Difference(rallyPointEntities, entityToCheck)
        callback(entityToCheck)
    }
}

// ========== ENABLING / DISABLING ==========

// eslint-disable-next-line @typescript-eslint/camelcase, @typescript-eslint/no-unused-vars
const RALLYMAN_DisableRallyPoints = (villageId, rallyName, amount) => {
    const NEW_INCLUDE_TAGS = ["disabled_rallied_piglins"] //Dummy tag
    const NEW_EXCLUDE_TAGS = ["piglin"]

    const enabledRallyPoints = RALLYMAN_GetEnabledRallyPoints(villageId, rallyName)
    const amountToDisable = Math.min(QUERY_GetEntitiesCount(enabledRallyPoints), amount)
    const ralliesToDisable = FILTER_RandomCount(enabledRallyPoints, amountToDisable)

    OUTPUT_OverwriteTriggerCriteriaTags(ralliesToDisable, NEW_INCLUDE_TAGS, NEW_EXCLUDE_TAGS, ALLIANCE_FRIENDLY)
    OUTPUT_AddTag(ralliesToDisable, rallyVals.tags.rallyDisabled)
}

// eslint-disable-next-line @typescript-eslint/camelcase, @typescript-eslint/no-unused-vars
const RALLYMAN_EnableRallyPoints = (villageId, rallyName, amount) => {
    const NEW_INCLUDE_TAGS = ["piglin"]
    const NEW_EXCLUDE_TAGS = ["boss", "engineer", rallyVals.tags.unitUsed, rallyVals.tags.unitRecruiting, rallyVals.tags.unitPatrolling]

    const allRallyPoints = RALLYMAN_GetRallyPoints(villageId, rallyName)
    const disabledRallyPoints = FILTER_ByTagFilter(allRallyPoints, [rallyVals.tags.rallyDisabled], [])
    const amountToEnable = Math.min(QUERY_GetEntitiesCount(disabledRallyPoints), amount)
    const ralliesToEnable = FILTER_RandomCount(disabledRallyPoints, amountToEnable)

    OUTPUT_OverwriteTriggerCriteriaTags(ralliesToEnable, NEW_INCLUDE_TAGS, NEW_EXCLUDE_TAGS, ALLIANCE_FRIENDLY)
    OUTPUT_RemoveTag(ralliesToEnable, rallyVals.tags.rallyDisabled)
}

// eslint-disable-next-line @typescript-eslint/camelcase, @typescript-eslint/no-unused-vars
const RALLYMAN_GetEnabledRallyPoints = (villageId, rallyName) => {
    const allRallyPoints = RALLYMAN_GetRallyPoints(villageId, rallyName)
    const enabledRallyPoints = FILTER_ByTagFilter(allRallyPoints, [], [rallyVals.tags.rallyDisabled])

    return enabledRallyPoints
}

// eslint-disable-next-line @typescript-eslint/camelcase, @typescript-eslint/no-unused-vars
const RALLYMAN_MarkUnitsForPatrol = (unitEntities) => {
    OUTPUT_AddTag(unitEntities, rallyVals.tags.unitCanPatrol)
}

// eslint-disable-next-line @typescript-eslint/camelcase, @typescript-eslint/no-unused-vars
const RALLYMAN_EnablePatrols = (villageId, rallyPointName) => {
    Logi(`RALLYMAN: Enabling patrols for rally points ${rallyPointName} in village ${villageId}`)

    if (!_GetPatrolEnabled(villageId, rallyPointName)) {
        Loge("Attempting to enable patrols for rally points that were not configured!")
        return
    }

    if (_GetPatrolsActivated(villageId, rallyPointName)) {
        Logi(`Patrols for rally points ${rallyPointName} are already activated...`)
        return
    }

    const rallyPoints = RALLYMAN_GetEnabledRallyPoints(villageId, rallyPointName)
    if (QUERY_GetEntitiesCount(rallyPoints) <= 1) {
        Logi(`Not enough enabled rally points to setup patrols.`)
        return
    }

    _SetPatrolsActivated(villageId, rallyPointName, 1)

    OUTPUT_AddTag(rallyPoints, rallyVals.tags.rallypointPatrolling)

    const minDistance = _GetPatrolDistance(villageId, rallyPointName)
    const cooldown = _GetPatrolTime(villageId, rallyPointName)
    _InitiateNamedRallyPointPatrols(rallyPoints, minDistance, cooldown)
}

// eslint-disable-next-line @typescript-eslint/camelcase, @typescript-eslint/no-unused-vars
const RALLYMAN_DisablePatrols = (villageId, rallyPointName) => {
    Logi(`RALLYMAN: Disabling patrols for rally points ${rallyPointName} in village ${villageId}`)

    _SetPatrolsActivated(villageId, rallyPointName, 0)

    const rallyPoints = RALLYMAN_GetEnabledRallyPoints(villageId, rallyPointName)
    OUTPUT_RemoveTag(rallyPoints, rallyVals.tags.rallypointPatrolling)

    // Override any existing timers so their listeners can be removed next tick.
    ForEachRallyPoint(villageId, rallyPointName, false, (rallyPoint) => {
        OUTPUT_SetEntityTimer(rallyPoint, "rally_man_patrol_cooldown_timer", 0)
    })
}

const _InitiateNamedRallyPointPatrols = (rallyPoints, minDistance, cooldown) => {
    let remainingRallyPoints = rallyPoints

    // Setup patrols as a loop around all the named rally points.
    // Start with a random one...
    const startingRallyPoint = RandomEntity(remainingRallyPoints)
    remainingRallyPoints = OPER_Difference(remainingRallyPoints, startingRallyPoint)

    // Loop through all the rally points so that they each send units to a different rally point.
    let previousRallyPoint = startingRallyPoint
    while (HasEntities(remainingRallyPoints)) {
        // Start with filtering out rally points within minDistance from the last one.
        let validDestinations = OPER_Difference(remainingRallyPoints, FILTER_ByDistance(remainingRallyPoints, previousRallyPoint, minDistance))
        if (!HasEntities(validDestinations)) {
            // If nothing is minDisance away, break out and complete the circuit.
            validDestinations = remainingRallyPoints
        }

        // Use the closest rally point to the previous. Remove the chosen rally point from the set.
        const destRallyPoint = FILTER_ByClosest(validDestinations, previousRallyPoint, 1)
        remainingRallyPoints = OPER_Difference(remainingRallyPoints, destRallyPoint)

        // Setup timer to send units to the destination
        _SetupPatrolTimer(previousRallyPoint, destRallyPoint, cooldown)

        previousRallyPoint = destRallyPoint
    }

    // Once all the rally points are connected, connect the last one to the start to complete the circuit.
    if (startingRallyPoint !== previousRallyPoint) {
        _SetupPatrolTimer(previousRallyPoint, startingRallyPoint, cooldown)
    }
}

const _SetupPatrolTimer = (sourceRallyPoint, destRallyPoint, cooldown) => {
    const villageId = QUERY_GetVillageIDFromEntity(sourceRallyPoint)

    LISTENFOR_EntityTimer({
        snippet: "et_rally_man_patrol_cooldown_handler",
        ownerVillageId: villageId,
        entity: sourceRallyPoint,
        timerName: "rally_man_patrol_cooldown_timer",
        payloadEntities: destRallyPoint,
        payloadFloat: cooldown
    })
    // Set timer initially at 0 so it fires right away
    OUTPUT_SetEntityTimer(sourceRallyPoint, "rally_man_patrol_cooldown_timer", 0)
}

SNIPPET_EntityTimer("et_rally_man_patrol_cooldown_handler", (entity, payload) => {
    if (QUERY_HasTags(entity, rallyVals.tags.rallypointPatrolling)) {
        const sourceRallyPoint = entity
        const destRallyPoint = payload.entities
        const patrolCooldown = payload.float
        // Only launch units that have opted into patrolling and aren't already on patrol.
        const unitsToLaunch = FILTER_ByTagFilter(QUERY_GetIntruders(sourceRallyPoint), [rallyVals.tags.unitCanPatrol], [])
        if (HasEntities(unitsToLaunch)) {
            OUTPUT_AddTag(unitsToLaunch, rallyVals.tags.unitPatrolling)
            _MoveAttackEntityOrPosition(unitsToLaunch, destRallyPoint, rallyVals.constants.defaultMovementPadding, false, "patrol_move_callback")
        }

        OUTPUT_SetEntityTimer(sourceRallyPoint, "rally_man_patrol_cooldown_timer", patrolCooldown)
    } else {
        Once()
    }
})

SNIPPET_MoveCallback("patrol_move_callback", (entity, _success) => {
    OUTPUT_RemoveTag(entity, rallyVals.tags.unitPatrolling)
})

// ==================== Example Script ====================

/*
SNIPPET_Bootstrap("", () => {
    LISTENFOR_VillageGenerated({
        snippet: "vg_rally_test",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        factionName: FACTION_NAME_DEFEND
    })
})

SNIPPET_VillageGenerated("vg_rally_test", (villageId) => {
    // Required
    RALLYMAN_Initdata(villageId, [
        { name: "rallyA", accumulations: 1, count: 4, distance: 35 },
        { name: "rallyB", accumulations: 1, count: 1 } // if you want more types of rally points
    ])

    LISTENFOR_BuildingComplete({
        snippet: "bc_test_horde_create_rallyA",
        ownerVillageId: villageId,
        includeTags: ["piglin_bridge"]
    })

    LISTENFOR_BuildingComplete({
        snippet: "bc_test_horde_create_rallyA",
        ownerVillageId: villageId,
        includeTags: ["poi_loot_piglin_crate"]
    })

    LISTENFOR_BuildingComplete({
        snippet: "bc_test_horde_recruit_spawner_units",
        ownerVillageId: villageId,
        includeTags: ["barracks"]
    })
})

SNIPPET_BuildingComplete("bc_test_horde_create_rallyA", (buildingEntity, payload) => {
    const villageId = payload.ownerVillageId
    const rallyName = "rallyA"

    // if you want to force this entity to always be a rally point, use `RALLYMAN_RegisterAsRallyPoint` instead.
    const cappedRallyPoint = RALLYMAN_TryRegisterAsCappedRallyPoint(villageId, buildingEntity, rallyName)
    if (!HasEntities(cappedRallyPoint)) {
        return
    }

    // if we want to trigger on composition
    RALLYMAN_ListenForComposition("test_horde_small_base_composition_handler", cappedRallyPoint, 100)

    // if we want to trigger on cooldown
    RALLYMAN_ListenForCooldown("test_horder_small_base_cooldown_handler", cappedRallyPoint, 45)
})

RALLYMAN_DeclareCompositionHandler("test_horde_small_base_composition_handler", (villageId, rallyPoint, _units) => {
    const unitGroups = RALLYMAN_LaunchRallyPointAtTargets(villageId, rallyPoint, [{ target: GetPlayers(), weight: 100 }])
    Logv(`Comp full - sent units: ${QUERY_GetEntitiesCount(unitGroups[0])}`)
})

RALLYMAN_DeclareCooldownHandler("test_horder_small_base_cooldown_handler", (villageId, rallyPoint) => {
    const target1 = RandomUpToCount(GetPlayers(), 1)
    const target2 = RandomUpToCount(QUERY_GetEntitiesWithTags("zombie"), 1)
    const target3 = RandomUpToCount(GetPlayerStructures(), 1)
    const unitGroups = RALLYMAN_LaunchRallyPointAtTargets(villageId, rallyPoint, [
        { target: target1, weight: 50, follow: true, callback: "rally_move_done" },
        { target: target2, weight: 25 },
        { target: target3, weight: 25 }
    ])

    Logv(`0: ${QUERY_GetEntitiesCount(unitGroups[0])}`)
    Logv(`1: ${QUERY_GetEntitiesCount(unitGroups[1])}`)
    Logv(`2: ${QUERY_GetEntitiesCount(unitGroups[2])}`)
})

SNIPPET_BuildingComplete("bc_test_horde_recruit_spawner_units", (buildingEntity, _payload) => {
    const villageId = QUERY_GetVillageIDFromEntity(buildingEntity)
    RALLYMAN_RecruitSpawnerOutput(villageId, "rallyA", buildingEntity)
})

SNIPPET_MoveCallback("rally_move_done", (_entity, _success, _payload) => {
    // do stuff!
})
*/
