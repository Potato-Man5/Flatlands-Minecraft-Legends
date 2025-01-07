// ====== GLOBAL CONSTANTS ======

const CELEBRATION_NAMES = {
    // Generic
    ALLAY_DANCE_SMALL: "allay_dance_small",
    ALLAY_DANCE_MEDIUM: "allay_dance_medium",
    ALLAY_DANCE_LARGE: "allay_dance_large",
    MOBS: "mob_celebration",
    CAGED_MOBS: "caged_mob_celebration",
    VILLAGER: "villager_celebration",
    HOSTS: "celebration",
    // Example
    PORTAL_DESTROYED_GOLEM_SUPPORT: "portal_destroyed_support_golem",
    MOB_ALLIANCE_COMPLETE: "mob_alliance_complete",
    PLAYER_DANCE: "player_dance"
}

const CELEBRATIONS = {
    // Generic Celebrations
    [CELEBRATION_NAMES.ALLAY_DANCE_SMALL]: {
        // refers to the status effects *name*
        data: "allay_dance_small", // TODO: Use a real status effect
        duration: 3.0,
        range: 1.0,
        includeTags: ["player"],
        excludeTags: []
    },
    [CELEBRATION_NAMES.ALLAY_DANCE_SMALL]: {
        data: "allay_dance_medium", // TODO: Use a real status effect
        duration: 3.0,
        range: 1.0,
        includeTags: ["player"],
        excludeTags: []
    },
    [CELEBRATION_NAMES.ALLAY_DANCE_SMALL]: {
        data: "allay_dance_large", // TODO: Use a real status effect
        duration: 3.0,
        range: 1.0,
        includeTags: ["player"],
        excludeTags: []
    },
    [CELEBRATION_NAMES.MOBS]: {
        data: "celebration",
        duration: 10.0,
        range: 100.0,
        includeTags: ["mob"],
        excludeTags: ["piglin"]
    },
    [CELEBRATION_NAMES.VILLAGER]: {
        data: "celebration",
        duration: 10.0,
        range: 50.0,
        includeTags: ["mob", "villager"],
        excludeTags: ["piglin"]
    },
    [CELEBRATION_NAMES.HOSTS]: {
        data: "celebration",
        duration: 10.0,
        range: 500.0,
        includeTags: ["host"],
        excludeTags: []
    },
    [CELEBRATION_NAMES.CAGED_MOBS]: {
        data: "celebration",
        duration: 10.0,
        range: 15.0,
        includeTags: ["mob"],
        excludeTags: ["piglin"]
    },
    // Examples
    // TODO: this is really specific... the plan is to have a generic one `badger:behavior_mob_celebration` but there's no data for that yet.
    [CELEBRATION_NAMES.PORTAL_DESTROYED_GOLEM_SUPPORT]: {
        data: "celebration",
        duration: 5.0,
        range: 100.0,
        includeTags: ["mob", "support"],
        excludeTags: []
    },
    [CELEBRATION_NAMES.MOB_ALLIANCE_COMPLETE]: {
        data: "celebration",
        duration: 5.0,
        range: 50.0,
        includeTags: ["mob"],
        excludeTags: []
    }
}

// ====== INTERNAL HELPERS ======

const _GetEntitiesForCelebration = (centerEntity, celebrationData) => {
    let entities = EMPTY_ENTITY_GROUP

    // tag filter
    const includeTags = celebrationData.includeTags ? celebrationData.includeTags : []
    const excludeTags = celebrationData.excludeTags ? celebrationData.excludeTags : []
    entities = QUERY_GetEntitiesWithTagFilter(includeTags, excludeTags)

    // distance filter
    if (celebrationData.range !== undefined) {
        entities = FILTER_ByDistance(entities, centerEntity, celebrationData.range)
    }

    Logv(`\tRetrieved ${QUERY_GetEntitiesCount(entities)} entities for celebration`)

    return entities
}

const _TriggerCelebration = (entity, celebrationName) => {
    const celebrationData = CELEBRATIONS[celebrationName]
    if (celebrationData === undefined) {
        Loge(`Cannot trigger celebration for non-existent name: ${celebrationName}`)
        return
    }

    Logi(`Triggering celebration: ${celebrationName}`)

    const entities = _GetEntitiesForCelebration(entity, celebrationData, false)
    OUTPUT_ApplyStatusEffect(entities, celebrationData.data, 1.0)
}

const _TriggerCelebrationOverride = (entity, celebrationData) => {
    if (celebrationData === undefined) {
        Loge(`Cannot trigger celebration for non-existent name`)
        return
    }

    const entities = _GetEntitiesForCelebration(entity, celebrationData, false)
    OUTPUT_ApplyStatusEffect(entities, celebrationData.data, celebrationData.duration)
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TriggerCelebration = (entity, celebrationName, override = undefined) => {
    if (override === undefined) {
        if (typeof celebrationName === "string") {
            _TriggerCelebration(entity, celebrationName)
        } else if (Array.isArray(celebrationName)) {
            for (const name of celebrationName) {
                _TriggerCelebration(entity, name)
            }
        } else {
            Loge(`Unsupported celebration name type: ${celebrationName}`)
        }
    } else {
        _TriggerCelebrationOverride(entity, override)
    }
}

const TriggerRippleCelebration = (entity, celebrationName) => {
    const celebrationData = CELEBRATIONS[celebrationName]
    if (celebrationData === undefined) {
        Loge(`Cannot trigger celebration for non-existent name: ${celebrationName}`)
        return
    }

    Logi(`Triggering celebration: ${celebrationName}`)

    const entities = _GetEntitiesForCelebration(entity, celebrationData, false)
    const center = FILTER_RandomCount(entities, 1)
    const feID = FOREACH_RippleOut(entities, center, 20, 5)
    LISTENFOR_ForEachEntity({
        snippet: "fore_ripple_celebration",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        id: feID,
        payloadString: celebrationName
    })
}

SNIPPET_ForEachEntity("fore_ripple_celebration", (entity, payload) => {
    const celebrationData = CELEBRATIONS[payload.string]
    OUTPUT_ApplyStatusEffect(entity, celebrationData.data, 1.0)
})
