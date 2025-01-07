/**
 * This file is responsible for spawning some preliminary Witches during village attacks
 * before the player has unlocked Witches.
 *
 * When a village attack begins, a few witches will be spawned to showcase their potential
 * to the player.
 */

// Bootstrap logic for when campaign starts.
SNIPPET_InheritsFromGameMode("campaign", () => {
    //If the player has disabled witches in their campaign, then stop this chain of events from spawning them
    if (witchHutEnabled.defaultValue === 1) {
        LISTENFOR_InvasionAttackV2Started({
            snippet: "iav2s_spawn_witches",
            ownerVillageId: OWNER_VILLAGE_OPT_OUT
        })
    }
})

// When a village attack begins, spawn some witches in the village
SNIPPET_InvasionAttackV2Started("iav2s_spawn_witches", (invasionData, _payload) => {
    // If we haven't started Act 2, exit early. We don't need to perform this logic yet.
    if (QUERY_GetGlobalVariable(GV_STARTED_ACT_2) === 0) {
        return
    }

    // If the witches have been unlocked, then we can exit early and dismiss this logic now.
    if (QUERY_GetGlobalVariable("gv_witch_unlocked")) {
        Once()
        return
    }

    const targetVillageId = invasionData.villageId

    // BBI-HACK: (dsavage) Rudely reduce the number of witches for VA balancing playtests
    const numberOfWitchesToSpawn = QUERY_RandomNumberGroup(3, 5, "witch_spawn_count")
    //const numberOfWitchesToSpawn = 1

    const newWitches = OUTPUT_SpawnEntitiesInVillage("badger:mob_illager_witch", numberOfWitchesToSpawn, targetVillageId, 30, 35)
    OUTPUT_SetTeam(newWitches, TEAM_BLUE)
    OUTPUT_SetOwnerVillageById(newWitches, targetVillageId)
})
