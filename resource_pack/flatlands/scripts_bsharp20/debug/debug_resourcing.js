const resourceDebugValues = {
    baseResources: {
        wood: {
            name: "wood",
            baseAmount: 500,
            startingAmount: 1000
        },
        stone: {
            name: "stone",
            baseAmount: 500,
            startingAmount: 1000
        },
        emerald: {
            name: "emerald",
            baseAmount: 150,
            startingAmount: 250
        },
        iron: {
            name: "iron",
            baseAmount: 150,
            startingAmount: 0
        },
        coal: {
            name: "coal",
            baseAmount: 150,
            startingAmount: 0
        },
        redstone: {
            name: "redstone",
            baseAmount: 150,
            startingAmount: 0
        },
        xpcommon: {
            name: "xp_common",
            baseAmount: 150,
            startingAmount: 250
        },
        gold: {
            name: "gold",
            baseAmount: 150,
            startingAmount: 250
        },
        diamond: {
            name: "diamond",
            baseAmount: 150,
            startingAmount: 0
        }
    },
    wofUpgrades: {
        gatherAndBuild: {
            unlock: ["unlock_allay_gather_and_build"],
            journal: [],
            debugString: "gatherAndBuild"
        },
        prismarine: {
            unlock: ["unlock_prismarine_upgrades"],
            journal: [],
            debugString: "prismarine"
        },
        misc: {
            unlock: ["unlock_remaining_wof_upgrades", "battle_view_unlock", "advanced_direct_unlock", "advanced_direct_unlock", "clear_nether_resource"],
            journal: [],
            debugString: "misc"
        },
        all: {
            unlock: ["unlock_allay_gather_and_build", "unlock_prismarine_upgrades", "unlock_remaining_wof_upgrades", "battle_view_unlock", "advanced_direct_unlock", "advanced_direct_unlock", "clear_nether_resource"],
            journal: [],
            debugString: "all"
        }
    },
    resourceGathering: {
        coal: {
            unlock: ["gather_coal"],
            journal: [],
            debugString: "coal"
        },
        redstone: {
            unlock: ["gather_redstone"],
            journal: [],
            debugString: "redstone"
        },
        iron: {
            unlock: ["gather_uncommon_resource"],
            journal: [],
            debugString: "iron"
        },
        combined: {
            unlock: ["gather_rare_resource"],
            journal: [],
            debugString: "combined"
        },
        all: {
            unlock: ["gather_rare_resource", "gather_uncommon_resource", "gather_redstone", "gather_coal"],
            journal: [],
            debugString: "all"
        }
    },
    poiTowers: {
        blast: {
            unlock: ["poi_tower_01_resource"],
            journal: [JOURNAL_UNLOCKS.TOWER_BLAST],
            debugString: "blast"
        },
        frost: {
            unlock: ["poi_tower_02_resource"],
            journal: [JOURNAL_UNLOCKS.TOWER_FROST],
            debugString: "frost"
        },
        stun: {
            unlock: ["poi_tower_04_resource"],
            journal: [JOURNAL_UNLOCKS.TOWER_STUN],
            debugString: "stun"
        },
        all: {
            unlock: ["poi_tower_04_resource", "poi_tower_02_resource", "poi_tower_01_resource"],
            journal: [JOURNAL_UNLOCKS.TOWER_STUN, JOURNAL_UNLOCKS.TOWER_FROST, JOURNAL_UNLOCKS.TOWER_BLAST],
            debugString: "all"
        }
    },
    mounts: {
        tiger: {
            unlock: ["unlock_quest_mount_01"],
            journal: [JOURNAL_UNLOCKS.MOUNT_TIGER],
            debugString: "tiger"
        },
        beetle: {
            unlock: ["unlock_quest_mount_03"],
            journal: [JOURNAL_UNLOCKS.MOUNT_BEETLE],
            debugString: "beetle"
        },
        bird: {
            unlock: ["unlock_quest_mount_04"],
            journal: [JOURNAL_UNLOCKS.MOUNT_BIRD],
            debugString: "bird"
        },
        all: {
            unlock: ["unlock_quest_mount_04", "unlock_quest_mount_03", "unlock_quest_mount_01"],
            journal: [JOURNAL_UNLOCKS.MOUNT_BIRD, JOURNAL_UNLOCKS.MOUNT_BEETLE, JOURNAL_UNLOCKS.MOUNT_TIGER],
            debugString: "all"
        }
    },
    allies: {
        fallenWarrior: {
            unlock: ["unlock_poi_golem_resource"],
            journal: [JOURNAL_UNLOCKS.ALLY_FALLEN_WARRIOR],
            identifier: ["badger:mob_fallen_warrior"],
            identifierTag: ["fallen_warrior"],
            debugString: "fallenWarrior"
        },
        carrierAlly: {
            unlock: ["unlock_poi_golem_resource"],
            journal: [JOURNAL_UNLOCKS.ALLY_SPAWNER],
            identifier: ["badger:mob_golem_carrier"],
            identifierTag: ["carrier_golem"],
            debugString: "carrier"
        },
        shieldAlly: {
            unlock: ["unlock_poi_golem_resource"],
            journal: [JOURNAL_UNLOCKS.ALLY_SHIELD],
            identifier: ["badger:mob_golem_shield"],
            identifierTag: ["shield_golem"],
            debugString: "shield"
        },
        sniperAlly: {
            unlock: ["unlock_poi_golem_resource"],
            journal: [JOURNAL_UNLOCKS.ALLY_SNIPER],
            identifier: ["badger:mob_golem_sniper"],
            identifierTag: ["sniper"],
            debugString: "sniper"
        },
        all: {
            unlock: ["unlock_poi_golem_resource"],
            journal: [JOURNAL_UNLOCKS.ALLY_FALLEN_WARRIOR, JOURNAL_UNLOCKS.ALLY_SPAWNER, JOURNAL_UNLOCKS.ALLY_SHIELD, JOURNAL_UNLOCKS.ALLY_SNIPER],
            identifier: ["badger:mob_fallen_warrior", "badger:mob_golem_carrier", "badger:mob_golem_shield", "badger:mob_golem_sniper"],
            identifierTag: ["fallen_warrior", "carrier_golem", "shield_golem", "sniper"],
            debugString: "all"
        }
    },
    mobs: {
        zombie: {
            unlock: ["unlock_spawner_zombie", "unlock_player_spawner_zombie", "unlock_battle_view_zombie"],
            journal: [JOURNAL_UNLOCKS.MOB_ZOMBIE],
            debugString: "zombie"
        },
        skeleton: {
            unlock: ["unlock_spawner_skeleton", "unlock_player_spawner_skeleton", "unlock_battle_view_skeleton"],
            journal: [JOURNAL_UNLOCKS.MOB_SKELETON],
            debugString: "skeleton"
        },
        creeper: {
            unlock: ["unlock_spawner_creeper", "unlock_player_spawner_creeper", "unlock_battle_view_creeper"],
            journal: [JOURNAL_UNLOCKS.MOB_CREEPER],
            debugString: "creeper"
        },
        all: {
            unlock: ["unlock_spawner_zombie", "unlock_player_spawner_zombie", "unlock_spawner_skeleton", "unlock_player_spawner_skeleton", "unlock_spawner_creeper", "unlock_player_spawner_creeper"],
            journal: [JOURNAL_UNLOCKS.MOB_ZOMBIE, JOURNAL_UNLOCKS.MOB_SKELETON, JOURNAL_UNLOCKS.MOB_CREEPER],
            debugString: "all"
        }
    },
    golems: {
        support: {
            unlock: ["unlock_spawner_support", "unlock_player_spawner_support"],
            journal: [JOURNAL_UNLOCKS.SUPPORT_GOLEM],
            debugString: "support"
        },
        cavalry: {
            unlock: ["unlock_spawner_golemcavalry", "unlock_player_spawner_golemcavalry"],
            journal: [JOURNAL_UNLOCKS.CAVALRY_GOLEM],
            debugString: "cavalry"
        },
        wood: {
            unlock: ["unlock_spawner_golemwood", "unlock_player_spawner_golemwood"],
            journal: [JOURNAL_UNLOCKS.PLANK_GOLEM],
            debugString: "wood"
        },
        stone: {
            unlock: ["unlock_spawner_golemstone", "unlock_player_spawner_golemstone"],
            journal: [JOURNAL_UNLOCKS.STONE_GOLEM],
            debugString: "stone"
        },
        all: {
            unlock: ["unlock_spawner_support", "unlock_player_spawner_support", "unlock_spawner_golemcavalry", "unlock_player_spawner_golemcavalry", "unlock_spawner_golemwood", "unlock_player_spawner_golemwood", "unlock_spawner_golemstone", "unlock_player_spawner_golemstone"],
            journal: [JOURNAL_UNLOCKS.SUPPORT_GOLEM, JOURNAL_UNLOCKS.CAVALRY_GOLEM, JOURNAL_UNLOCKS.PLANK_GOLEM, JOURNAL_UNLOCKS.STONE_GOLEM],
            debugString: "all"
        }
    }
}

//Helpers
const _SetResourceFromDebugData = (team, debugDataItem, activate = true) => {
    const randomPlayer = RandomEntity(GetPlayers())
    const setTo = activate ? 1 : 0

    //Lock/Unlock resources
    debugDataItem.unlock.forEach((unlock) => {
        SetResourceForTeam(team, unlock, setTo)
    })

    //Lock/unlock journals
    debugDataItem.journal.forEach((journal) => {
        SetResourceForTeam(team, journal, setTo)
    })

    //Spawn if necessary
    if (debugDataItem.identifier !== undefined && activate) {
        debugDataItem.identifier.forEach((spawnIdentifier) => {
            SpawnEntitiesAt(randomPlayer, spawnIdentifier, 1, team)
        })
    }

    //Despawn if necessary
    if (debugDataItem.identifierTag !== undefined && !activate) {
        debugDataItem.identifierTag.forEach((identifierTag) => {
            const entitiesToUnspawn = QUERY_GetEntitiesWithTags(identifierTag) //Despawn irrespective of any condition
            OUTPUT_DespawnEntities(entitiesToUnspawn)
        })
    }
}

const _IsResourceItemUnlockedFromDebug = (debugDataItem) => {
    const randomPlayer = RandomEntity(GetAllPlayers())
    let isUnlocked = true
    debugDataItem.unlock.forEach((unlock) => {
        if (QUERY_GetResource(randomPlayer, unlock) === 0) {
            isUnlocked = false
        }
    })
    return isUnlocked
}

const _LockUnlockRandomResourcesOfTypeToTargetAmount = (debugData, targetAmount) => {
    let amountToUnlock = targetAmount
    let unlockedValues = []
    let allValues = []
    let lockedValues = []

    for (const data in debugData) {
        //Ignore the additional "all" debug lists - create arrays for all items, and unlocked items
        if (debugData[data].debugString !== "all") {
            allValues.push(debugData[data])
            if (_IsResourceItemUnlockedFromDebug(debugData[data])) {
                unlockedValues.push(debugData[data])
                amountToUnlock--
            }
        }
    }

    //Create array for locked items
    lockedValues = allValues.filter((val) => !unlockedValues.includes(val))

    //Unlock/Lock items depending on if amount is +/-
    if (amountToUnlock > 0) {
        ShuffleArray(lockedValues)
        for (let i = 0; i < amountToUnlock; i++) {
            _SetResourceFromDebugData(TEAM_BLUE, lockedValues[i])
        }
    } else if (amountToUnlock < 0) {
        ShuffleArray(unlockedValues)
        for (let i = 0; i < Math.abs(amountToUnlock); i++) {
            _SetResourceFromDebugData(TEAM_BLUE, unlockedValues[i], false)
        }
    }
}

const _UnlockResourceFromDebugString = (debugData, string) => {
    //Unlock multiple things chaining them with _
    const allStrings = string.split("_")
    for (const data in debugData) {
        if (allStrings.includes(debugData[data].debugString)) {
            _SetResourceFromDebugData(TEAM_BLUE, debugData[data])
        }
    }
}

SNIPPET_Bootstrap("", () => {
    LISTENFOR_ExternalEvent({
        snippet: "ee_set_spawn_upgrade_amount",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        eventName: "set_spawn_upgrade_amount"
    })

    LISTENFOR_ExternalEvent({
        snippet: "ee_set_lure_upgrade_amount",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        eventName: "set_lure_upgrade_amount"
    })

    LISTENFOR_ExternalEvent({
        snippet: "ee_set_build_upgrade_amount",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        eventName: "set_build_upgrade_amount"
    })

    LISTENFOR_ExternalEvent({
        snippet: "ee_set_gather_upgrade_amount",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        eventName: "set_gather_upgrade_amount"
    })

    LISTENFOR_ExternalEvent({
        snippet: "ee_set_bank_upgrade_amount",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        eventName: "set_bank_upgrade_amount"
    })

    LISTENFOR_ExternalEvent({
        snippet: "ee_set_resource_state",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        eventName: "set_resource_state"
    })

    LISTENFOR_ExternalEvent({
        snippet: "ee_set_all_resource_state",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        eventName: "set_all_resource_state"
    })

    LISTENFOR_ExternalEvent({
        snippet: "ee_unlock_wof_building_hard_set",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        eventName: "unlock_wof_building_hard_set"
    })

    LISTENFOR_ExternalEvent({
        snippet: "ee_unlock_wof_building",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        eventName: "unlock_wof_building"
    })

    LISTENFOR_ExternalEvent({
        snippet: "ee_unlock_gather_melody_hard_set",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        eventName: "unlock_gather_melody_hard_set"
    })

    LISTENFOR_ExternalEvent({
        snippet: "ee_unlock_gather_melody",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        eventName: "unlock_gather_melody"
    })

    LISTENFOR_ExternalEvent({
        snippet: "ee_unlock_random_poi_towers",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        eventName: "unlock_random_poi_towers"
    })

    LISTENFOR_ExternalEvent({
        snippet: "ee_unlock_poi_tower",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        eventName: "unlock_poi_tower"
    })

    LISTENFOR_ExternalEvent({
        snippet: "ee_unlock_random_mounts",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        eventName: "unlock_random_mounts"
    })

    LISTENFOR_ExternalEvent({
        snippet: "ee_unlock_mount",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        eventName: "unlock_mount"
    })

    LISTENFOR_ExternalEvent({
        snippet: "ee_unlock_random_allies",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        eventName: "unlock_random_allies"
    })

    LISTENFOR_ExternalEvent({
        snippet: "ee_unlock_ally",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        eventName: "unlock_ally"
    })

    LISTENFOR_ExternalEvent({
        snippet: "ee_unlock_mobs_based_on_gamestate",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        eventName: "unlock_mobs_based_on_gamestate"
    })

    LISTENFOR_ExternalEvent({
        snippet: "ee_unlock_mob",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        eventName: "unlock_mob"
    })

    LISTENFOR_ExternalEvent({
        snippet: "ee_unlock_village_vindicators",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        eventName: "unlock_village_vindicators"
    })
})

SNIPPET_ExternalEvent("ee_set_spawn_upgrade_amount", (value) => {
    const amount = value.value
    OUTPUT_SetTicketCap(TICKET_SPAWN, 20 + amount * 10)
})

SNIPPET_ExternalEvent("ee_set_lure_upgrade_amount", (value) => {
    const amount = value.value
    const players = GetAllPlayers()
    OUTPUT_SetResourceCap(players, "lure_cap", 25 + amount * 5)
})

SNIPPET_ExternalEvent("ee_set_build_upgrade_amount", (value) => {
    const amount = value.value
    OUTPUT_SetTicketCap(TICKET_BUILD, 5 + amount)
})

SNIPPET_ExternalEvent("ee_set_gather_upgrade_amount", (value) => {
    const amount = value.value
    OUTPUT_SetTicketCap(TICKET_GATHER, 5 + amount)
})

SNIPPET_ExternalEvent("ee_set_bank_upgrade_amount", (value) => {
    const amount = value.value + 1
    const players = GetAllPlayers()
    OUTPUT_SetResourceCap(players, resourceDebugValues.baseResources.wood.name, amount * resourceDebugValues.baseResources.wood.baseAmount)
    OUTPUT_SetResourceCap(players, resourceDebugValues.baseResources.stone.name, amount * resourceDebugValues.baseResources.stone.baseAmount)
    OUTPUT_SetResourceCap(players, resourceDebugValues.baseResources.emerald.name, amount * resourceDebugValues.baseResources.emerald.baseAmount)
    OUTPUT_SetResourceCap(players, resourceDebugValues.baseResources.xpcommon.name, amount * resourceDebugValues.baseResources.xpcommon.baseAmount)
    OUTPUT_SetResourceCap(players, resourceDebugValues.baseResources.gold.name, amount * resourceDebugValues.baseResources.gold.baseAmount)
})

SNIPPET_ExternalEvent("ee_set_all_resource_state", (value) => {
    const amount = value.value
    const players = GetAllPlayers()

    //Set caps
    OUTPUT_SetResourceCap(players, resourceDebugValues.baseResources.wood.name, amount * resourceDebugValues.baseResources.wood.baseAmount + resourceDebugValues.baseResources.wood.startingAmount)
    OUTPUT_SetResourceCap(players, resourceDebugValues.baseResources.stone.name, amount * resourceDebugValues.baseResources.stone.baseAmount + resourceDebugValues.baseResources.stone.startingAmount)
    OUTPUT_SetResourceCap(players, resourceDebugValues.baseResources.emerald.name, amount * resourceDebugValues.baseResources.emerald.baseAmount + resourceDebugValues.baseResources.emerald.startingAmount)
    OUTPUT_SetResourceCap(players, resourceDebugValues.baseResources.iron.name, amount * resourceDebugValues.baseResources.iron.baseAmount + resourceDebugValues.baseResources.iron.startingAmount)
    OUTPUT_SetResourceCap(players, resourceDebugValues.baseResources.redstone.name, amount * resourceDebugValues.baseResources.redstone.baseAmount + resourceDebugValues.baseResources.redstone.startingAmount)
    OUTPUT_SetResourceCap(players, resourceDebugValues.baseResources.xpcommon.name, amount * resourceDebugValues.baseResources.xpcommon.baseAmount + resourceDebugValues.baseResources.xpcommon.startingAmount)
    OUTPUT_SetResourceCap(players, resourceDebugValues.baseResources.gold.name, amount * resourceDebugValues.baseResources.gold.baseAmount + resourceDebugValues.baseResources.gold.startingAmount)
    OUTPUT_SetResourceCap(players, resourceDebugValues.baseResources.diamond.name, amount * resourceDebugValues.baseResources.diamond.baseAmount + resourceDebugValues.baseResources.diamond.startingAmount)
    OUTPUT_SetResourceCap(players, resourceDebugValues.baseResources.coal.name, amount * resourceDebugValues.baseResources.coal.baseAmount + resourceDebugValues.baseResources.coal.startingAmount)

    //Set Resources (first reset, then add)
    SetResourceForTeam(TEAM_BLUE, resourceDebugValues.baseResources.wood.name, amount * resourceDebugValues.baseResources.wood.baseAmount + resourceDebugValues.baseResources.wood.startingAmount)
    SetResourceForTeam(TEAM_BLUE, resourceDebugValues.baseResources.stone.name, amount * resourceDebugValues.baseResources.stone.baseAmount + resourceDebugValues.baseResources.stone.startingAmount)
    SetResourceForTeam(TEAM_BLUE, resourceDebugValues.baseResources.emerald.name, amount * resourceDebugValues.baseResources.emerald.baseAmount + resourceDebugValues.baseResources.emerald.startingAmount)
    SetResourceForTeam(TEAM_BLUE, resourceDebugValues.baseResources.iron.name, amount * resourceDebugValues.baseResources.iron.baseAmount + resourceDebugValues.baseResources.iron.startingAmount)
    SetResourceForTeam(TEAM_BLUE, resourceDebugValues.baseResources.redstone.name, amount * resourceDebugValues.baseResources.redstone.baseAmount + resourceDebugValues.baseResources.redstone.startingAmount)
    SetResourceForTeam(TEAM_BLUE, resourceDebugValues.baseResources.xpcommon.name, amount * resourceDebugValues.baseResources.xpcommon.baseAmount + resourceDebugValues.baseResources.xpcommon.startingAmount)
    SetResourceForTeam(TEAM_BLUE, resourceDebugValues.baseResources.gold.name, amount * resourceDebugValues.baseResources.gold.baseAmount + resourceDebugValues.baseResources.gold.startingAmount)
    SetResourceForTeam(TEAM_BLUE, resourceDebugValues.baseResources.diamond.name, amount * resourceDebugValues.baseResources.diamond.baseAmount + resourceDebugValues.baseResources.diamond.startingAmount)
    SetResourceForTeam(TEAM_BLUE, resourceDebugValues.baseResources.coal.name, amount * resourceDebugValues.baseResources.coal.baseAmount + resourceDebugValues.baseResources.coal.startingAmount)
})

SNIPPET_ExternalEvent("ee_set_resource_state", (value) => {
    const resourceData = value.value
    const splitData = resourceData.split("_") //Split for individual resources, format eg. wood_3
    const resourceString = splitData[0]
    const resourceAmount = splitData[1]
    const players = GetAllPlayers()

    for (const resource in resourceDebugValues.baseResources) {
        if (resourceDebugValues.baseResources[resource].name === resourceString) {
            OUTPUT_SetResourceCap(players, resourceDebugValues.baseResources[resource].name, resourceAmount * resourceDebugValues.baseResources[resource].baseAmount)
            SetResourceForTeam(TEAM_BLUE, resourceDebugValues.baseResources[resource].name, resourceAmount * resourceDebugValues.baseResources[resource].baseAmount)
            break
        }
    }
})

SNIPPET_ExternalEvent("ee_unlock_wof_building_hard_set", (value) => {
    const type = value.value
    _SetResourceFromDebugData(TEAM_BLUE, resourceDebugValues.wofUpgrades.all, false) //Set all to false first

    //Note: This requires other resources required to actually work
    _UnlockResourceFromDebugString(resourceDebugValues.wofUpgrades, type)
})

SNIPPET_ExternalEvent("ee_unlock_wof_building", (value) => {
    const type = value.value

    //Note: This requires other resources required to actually work
    _UnlockResourceFromDebugString(resourceDebugValues.wofUpgrades, type)
})

SNIPPET_ExternalEvent("ee_unlock_gather_melody_hard_set", (value) => {
    const type = value.value
    
    _SetResourceFromDebugData(TEAM_BLUE, resourceDebugValues.resourceGathering.all, false) //Set all to false first
    //Note: This requires other resources required to actually work
    _UnlockResourceFromDebugString(resourceDebugValues.resourceGathering, type)
})

SNIPPET_ExternalEvent("ee_unlock_gather_melody", (value) => {
    const type = value.value

    //Note: This requires other resources required to actually work
    _UnlockResourceFromDebugString(resourceDebugValues.resourceGathering, type)
})

SNIPPET_ExternalEvent("ee_unlock_random_poi_towers", (value) => {
    const amount = Clamp(value.value, 0, 3)

    //Note: This requires other resources required to actually work
    _LockUnlockRandomResourcesOfTypeToTargetAmount(resourceDebugValues.poiTowers, amount)
})

SNIPPET_ExternalEvent("ee_unlock_poi_tower", (value) => {
    const type = value.value

    //Note: This requires other resources required to actually work
    _UnlockResourceFromDebugString(resourceDebugValues.poiTowers, type)
})

SNIPPET_ExternalEvent("ee_unlock_random_mounts", (value) => {
    const amount = Clamp(value.value, 0, 3)
    _LockUnlockRandomResourcesOfTypeToTargetAmount(resourceDebugValues.mounts, amount)
})

SNIPPET_ExternalEvent("ee_unlock_mount", (value) => {
    const type = value.value
    _UnlockResourceFromDebugString(resourceDebugValues.mounts, type)
})

SNIPPET_ExternalEvent("ee_unlock_random_allies", (value) => {
    const amount = Clamp(value.value, 0, 4)
    _LockUnlockRandomResourcesOfTypeToTargetAmount(resourceDebugValues.allies, amount)
})

SNIPPET_ExternalEvent("ee_unlock_ally", (value) => {
    const type = value.value
    _UnlockResourceFromDebugString(resourceDebugValues.allies, type)
})

SNIPPET_ExternalEvent("ee_unlock_mobs_based_on_gamestate", (value) => {
    const randomMobAmount = Clamp(value.value, 0, 4)

    //Note: This requires other resources unlocked (wood/stone etc.) to actually work

    if (randomMobAmount > 0) {
        _LockUnlockRandomResourcesOfTypeToTargetAmount(resourceDebugValues.mobs, randomMobAmount - 1)

        //Unlock cavalry/support anyway
        _SetResourceFromDebugData(TEAM_BLUE, resourceDebugValues.golems.cavalry)
        _SetResourceFromDebugData(TEAM_BLUE, resourceDebugValues.golems.support)
    } else {
        FACTION_PIGLINS.forEach((horde) => {
            if (HordeEntry.IsEntered(horde) || QUERY_GetEntitiesCount(GetFactionBases(horde)) > 0) {
                switch (horde) {
                    case FACTION_NAME_ATTACK:
                        _SetResourceFromDebugData(TEAM_BLUE, resourceDebugValues.mobs.skeleton)
                        break

                    case FACTION_NAME_DEFEND:
                        _SetResourceFromDebugData(TEAM_BLUE, resourceDebugValues.mobs.creeper)
                        break

                    case FACTION_NAME_OBSTACLE:
                        _SetResourceFromDebugData(TEAM_BLUE, resourceDebugValues.mobs.zombie)
                        break
                }
            } else {
                switch (horde) {
                    case FACTION_NAME_ATTACK:
                        _SetResourceFromDebugData(TEAM_BLUE, resourceDebugValues.mobs.skeleton, false)
                        break

                    case FACTION_NAME_DEFEND:
                        _SetResourceFromDebugData(TEAM_BLUE, resourceDebugValues.mobs.creeper, false)
                        break

                    case FACTION_NAME_OBSTACLE:
                        _SetResourceFromDebugData(TEAM_BLUE, resourceDebugValues.mobs.zombie, false)
                        break
                }
            }
        })

        //Unlock support/cavalry in Act 2
        if (QUERY_GetGlobalVariable(ACTS.ACT_2) > 0) {
            _SetResourceFromDebugData(TEAM_BLUE, resourceDebugValues.golems.cavalry)
            _SetResourceFromDebugData(TEAM_BLUE, resourceDebugValues.golems.support)
        }
    }

    //Unlock wood/stone always
    _SetResourceFromDebugData(TEAM_BLUE, resourceDebugValues.golems.wood)
    _SetResourceFromDebugData(TEAM_BLUE, resourceDebugValues.golems.stone)
})

SNIPPET_ExternalEvent("ee_unlock_mob", (value) => {
    const type = value.value

    //Note: This requires other resources required to actually work
    _UnlockResourceFromDebugString(resourceDebugValues.mobs, type)
    _UnlockResourceFromDebugString(resourceDebugValues.golems, type)
})

SNIPPET_ExternalEvent("ee_unlock_village_vindicators", () => {
    ActivateRiseOfVindicatorsFinalStep()
})
