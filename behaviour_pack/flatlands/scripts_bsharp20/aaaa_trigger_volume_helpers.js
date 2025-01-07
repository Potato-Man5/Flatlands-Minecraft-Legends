/* eslint-disable @typescript-eslint/no-unused-vars */

const SpawnTriggerVolume = (positionEntity, lifetimeEntity, entityArchetype, team, villageId, stretchVertically, includeTags, excludeTags, alliance) => {
    if (!HasEntities(positionEntity)) {
        Loge("'SpawnTriggerVolume' called with no positionEntity!")
    }
    if (lifetimeEntity !== undefined && villageId === undefined) {
        Loge("`SpawnTriggerVolume` lifetimeEntity and villageId cannot both be undefined. Set lifetimeEntity to undefined if you don't need cleanup OR set villageId if you do need cleanup.")
    }
    const volume = OUTPUT_SpawnEntityAt(positionEntity, entityArchetype)
    return _SetTriggerVolume(lifetimeEntity === undefined ? undefined : lifetimeEntity, volume, team, villageId, stretchVertically, includeTags, excludeTags, alliance)
}

const SpawnStandardTriggerVolume = (positionEntity, entityArchetype, includeTags, excludeTags, alliance) => {
    if (!HasEntities(positionEntity)) {
        Loge("'SpawnStandardTriggerVolume' called with no positionEntity!")
    }
    const volume = OUTPUT_SpawnEntityAt(positionEntity, entityArchetype)
    const team = QUERY_GetTeamName(positionEntity)
    const villageId = QUERY_GetVillageIDFromEntity(positionEntity)
    return _SetTriggerVolume(positionEntity, volume, team, villageId, true, includeTags, excludeTags, alliance)
}

const SpawnTriggerVolumeWithMultipleTagsets = (positionEntity, lifetimeEntity, entityArchetype, team, villageId, stretchVertically, triggerTags) => {
    if (!HasEntities(positionEntity)) {
        Loge("'SpawnTriggerVolumeWithMultipleTagsets' called with no positionEntity!")
    }
    const volume = OUTPUT_SpawnEntityAt(positionEntity, entityArchetype)
    return _SetTriggerVolumeWithMultipleTagsets(lifetimeEntity === undefined ? undefined : lifetimeEntity, volume, team, villageId, stretchVertically, triggerTags)
}

const GetInstanceTriggerVolume = (instanceName, team, villageId, stretchVertically, includeTags, excludeTags, alliance) => {
    const volume = QUERY_GetEntitiesWithInstanceName(instanceName)
    return _SetTriggerVolume(undefined, volume, team, villageId, stretchVertically, includeTags, excludeTags, alliance)
}

const GetInstanceTriggerVolumeWithMultipleTagsets = (instanceName, team, villageId, stretchVertically, triggerTags) => {
    const volume = QUERY_GetEntitiesWithInstanceName(instanceName)
    return _SetTriggerVolumeWithMultipleTagsets(undefined, volume, team, villageId, stretchVertically, triggerTags)
}

const _SetTriggerVolume = (lifetimeEg, volume, team, villageId, stretchVertically, includeTags, excludeTags, alliance) => {
    OUTPUT_SetTeam(volume, team)
    if (villageId !== undefined && villageId >= 0) {
        OUTPUT_SetOwnerVillageById(volume, villageId)
        OUTPUT_SetFactionByName(volume, QUERY_GetFactionNameFromVillageID(villageId))
    }
    if (stretchVertically) {
        OUTPUT_VerticallyStretchAABBToMax(volume)
    }
    OUTPUT_OverwriteTriggerCriteriaTags(volume, includeTags, excludeTags, alliance)
    // clean yourself up if your lifetime entity is destroyed
    if (lifetimeEg !== undefined) {
        const ownerId = villageId === undefined ? OWNER_VILLAGE_OPT_OUT : villageId
        RegisterForCleanup(ownerId, lifetimeEg, volume)
    }

    return volume
}

const _SetTriggerVolumeWithMultipleTagsets = (lifetimeEg, volume, team, villageId, stretchVertically, triggerTags) => {
    OUTPUT_SetTeam(volume, team)
    if (villageId !== undefined && villageId >= 0) {
        OUTPUT_SetOwnerVillageById(volume, villageId)
        OUTPUT_SetFactionByName(volume, QUERY_GetFactionNameFromVillageID(villageId))
    }
    if (stretchVertically) {
        OUTPUT_VerticallyStretchAABBToMax(volume)
    }
    let i
    for (i = 0; i < triggerTags.length; i++) {
        if (i === 0) {
            OUTPUT_OverwriteTriggerCriteriaTags(volume, triggerTags[i].include, triggerTags[i].exclude, triggerTags[i].alliance)
        } else {
            OUTPUT_AppendTriggerCriteriaTags(volume, triggerTags[i].include, triggerTags[i].exclude, triggerTags[i].alliance)
        }
    }

    // clean yourself up if your lifetime entity is destroyed
    if (lifetimeEg !== undefined) {
        const ownerId = villageId === undefined ? OWNER_VILLAGE_OPT_OUT : villageId
        RegisterForCleanup(ownerId, lifetimeEg, volume)
    }
    return volume
}

const AddTriggerVolumeToBuildable = (buildableEg, triggerVolumeId, triggerVolumeEnteredSnippetName, triggerVolumeExiteddSnippetName, triggerIncludeTags, triggerExcludeTags, alliance, payloadString) => {
    const villageId = QUERY_GetVillageIDFromEntity(buildableEg)

    const genericTriggerVolume = SpawnTriggerVolume(buildableEg, undefined, triggerVolumeId, TEAM_WILD, villageId, true, triggerIncludeTags, triggerExcludeTags, alliance)

    if (payloadString === undefined) {
        payloadString = ""
    }
    LISTENFOR_SpatialPartitionEntered({
        snippet: triggerVolumeEnteredSnippetName,
        ownerVillageId: villageId,
        triggerEntity: genericTriggerVolume,
        payloadEntities: buildableEg,
        payloadString: payloadString
    })

    if (triggerVolumeExiteddSnippetName !== undefined) {
        LISTENFOR_SpatialPartitionExited({
            snippet: triggerVolumeExiteddSnippetName,
            ownerVillageId: villageId,
            triggerEntity: genericTriggerVolume,
            payloadEntities: buildableEg,
            payloadString: payloadString
        })
    }
}
