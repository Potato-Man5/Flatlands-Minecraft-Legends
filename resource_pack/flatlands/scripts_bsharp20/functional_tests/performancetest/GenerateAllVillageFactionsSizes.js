// testDuration: "420"
// platforms: "Win32,Windows10"
// gameMode: "editor"
// testDescription: "Generate all village faction/size combinations"
// runAsPartOfCompleteTestSuite: "true"

//=================== Testing Parameters ==========================

const villageFactions = [
    {
        mobType: "badger:piglin_defend",
        factionName: FACTION_NAME_DEFEND,
        sizes: BASE_SIZE_ALL_PORTALS
    },
    {
        mobType: "badger:piglin_attack",
        factionName: FACTION_NAME_ATTACK,
        sizes: BASE_SIZE_ALL_PORTALS
    },
    {
        mobType: "badger:piglin_obstacle",
        factionName: FACTION_NAME_OBSTACLE,
        sizes: BASE_SIZE_ALL_PORTALS
    },
    {
        mobType: "badger:piglin_roaming",
        factionName: FACTION_NAME_ROAMING,
        sizes: BASE_SIZE_ALL_PORTALS
    },
    {
        mobType: "badger:villager_village_001",
        factionName: CULTURE_NAME_VILLAGERS,
        sizes: BASE_SIZE_ALL_VILLAGES
    },
    {
        mobType: "badger:mob_alliance_creeper_village",
        factionName: MOB_ALLIANCE_NAME_CREEPER,
        sizes: BASE_SIZE_SMALL
    },
    {
        mobType: "badger:mob_alliance_skeleton_village",
        factionName: MOB_ALLIANCE_NAME_SKELETON,
        sizes: BASE_SIZE_SMALL
    },
    {
        mobType: "badger:mob_alliance_zombie_village",
        factionName: MOB_ALLIANCE_NAME_ZOMBIE,
        sizes: BASE_SIZE_SMALL
    },
    {
        mobType: "badger:piglin_defend",
        factionName: FACTION_NAME_DEFEND,
        sizes: BASE_SIZE_PIGLIN_CREEPER
    },
    {
        mobType: "badger:piglin_attack",
        factionName: FACTION_NAME_ATTACK,
        sizes: BASE_SIZE_PIGLIN_SKELETON
    },
    {
        mobType: "badger:piglin_obstacle",
        factionName: FACTION_NAME_OBSTACLE,
        sizes: BASE_SIZE_PIGLIN_ZOMBIE
    },
    {
        mobType: "badger:poi_mount_01_village",
        factionName: POI_NAME_MOUNT_01,
        sizes: BASE_SIZE_SMALL
    },
    {
        mobType: "badger:poi_mount_03_village",
        factionName: POI_NAME_MOUNT_03,
        sizes: BASE_SIZE_SMALL
    },
    {
        mobType: "badger:poi_mount_04_village",
        factionName: POI_NAME_MOUNT_04,
        sizes: BASE_SIZE_SMALL
    },
    {
        mobType: "badger:poi_mount_06_village",
        factionName: POI_NAME_MOUNT_06,
        sizes: BASE_SIZE_SMALL
    },
    {
        mobType: "badger:xp_well_of_fate",
        factionName: WELL_OF_FATE,
        sizes: BASE_SIZE_SMALL
    },
    {
        mobType: "badger:poi_ally_01_village",
        factionName: POI_NAME_ALLY_01,
        sizes: BASE_SIZE_SMALL
    },
    {
        mobType: "badger:poi_ally_02_village",
        factionName: POI_NAME_ALLY_02,
        sizes: BASE_SIZE_SMALL
    },
    {
        mobType: "badger:poi_ally_04_village",
        factionName: POI_NAME_ALLY_04,
        sizes: BASE_SIZE_SMALL
    },
    {
        mobType: "badger:poi_ally_05_village",
        factionName: POI_NAME_ALLY_05,
        sizes: BASE_SIZE_SMALL
    },
    {
        mobType: "badger:piglin_dbb",
        factionName: FACTION_NAME_DBB,
        sizes: BASE_SIZE_ACT1_FIRST_SKIRMISH
    },
    {
        mobType: "badger:piglin_dbb",
        factionName: FACTION_NAME_DBB,
        sizes: BASE_SIZE_ACT1_SECOND_SKIRMISH
    },
    {
        mobType: "badger:piglin_dbb",
        factionName: FACTION_NAME_DBB,
        sizes: BASE_SIZE_LARGE
    }
]
//=================================================================

const delayVillageGenerationTimer = 6
const delayVillageActionTimer = 1

let factionsIndex = 0
let sizesIndex = 0

let buildingCount = 0
let expectedBuildingCount = 0
let currentVillageId = -1
let fetchedExpectedBuildingCount = false

let villageSizes = []

const ResetTestingParameters = () => {
    buildingCount = 0
    expectedBuildingCount = 0
    currentVillageId = -1
    fetchedExpectedBuildingCount = false
}

const CheckVillageGenerationComplete = () => {
    if (fetchedExpectedBuildingCount && buildingCount >= expectedBuildingCount) {
        ResetTestingParameters()
        TeleportPlayerToNextPosition()
        SetTimerForNextVillage()
    }
}

const TeleportPlayerToNextPosition = () => {
    const playerPositionIncrement = 500

    OUTPUT_TriggerSlashCommand(`/teleport @s ${playerPositionIncrement * factionsIndex} 50 ${playerPositionIncrement * sizesIndex}`, false)
}

const SetTimerForNextVillage = () => {
    LISTENFOR_LocalTimer({
        snippet: "lt_delayed_village_generation",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        waitTime: delayVillageGenerationTimer
    })
}

const GenerateNextVillage = () => {
    if (factionsIndex === villageFactions.length) {
        // All villages were generated without issue. Complete the test.
        Logi(`Test complete!`)
        OUTPUT_SaveProfilerFrames("badger_generate_all_village_factions_sizes_perf_microprofile", 150)
        OUTPUT_TestFinished("generate_all_village_factions_sizes_perf", 1)
    } else {
        const currentFaction = villageFactions[factionsIndex]

        LISTENFOR_VillageGenerated({
            snippet: "vg_set_current_villageId",
            ownerVillageId: OWNER_VILLAGE_OPT_OUT,
            factionName: currentFaction.factionName
        })

        if (villageSizes.length === sizesIndex) {
            sizesIndex = 0
            villageSizes = []
            const sizes = currentFaction.sizes
            if (Array.isArray(sizes)) {
                sizes.forEach(function(size) {
                    villageSizes.push(size)
                })
            } else {
                villageSizes.push(sizes)
            }
        }

        Logi(`Generating village ${currentFaction.mobType} with size ${villageSizes[sizesIndex]}`)

        const slashCommand = `/village add_village ${currentFaction.mobType} ${villageSizes[sizesIndex]} ${currentFaction.factionName}`
        OUTPUT_TriggerSlashCommand(slashCommand, true)

        if (sizesIndex === villageSizes.length - 1) {
            ++factionsIndex
        }
        ++sizesIndex
    }
}

SNIPPET_Bootstrap("", () => {
    LISTENFOR_TestStarted({
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        snippet: "ts_setup",
        testName: "generate_all_village_factions_sizes_perf"
    })
})

SNIPPET_TestStarted("ts_setup", () => {
    LISTENFOR_BuildingComplete({
        snippet: "bc_count_buildings",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT
    })

    LISTENFOR_BuildingFailedToPlace({
        snippet: "bf_decrement_expected_count",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT
    })

    SetTimerForNextVillage()
})

SNIPPET_VillageGenerated("vg_set_current_villageId", (villageId) => {
    currentVillageId = villageId
    Logi(`Village #${currentVillageId} generated.`)

    LISTENFOR_LocalTimer({
        snippet: "lt_delayed_vg_action",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        waitTime: delayVillageActionTimer
    })

    Once()
})

SNIPPET_BuildingComplete("bc_count_buildings", (buildingEntity) => {
    const villageId = QUERY_GetVillageIDFromEntity(buildingEntity)

    if (currentVillageId === villageId) {
        ++buildingCount
        Logi(`Counting ${buildingCount} buildings out of ${expectedBuildingCount}`)

        CheckVillageGenerationComplete()
    }
})

SNIPPET_BuildingFailedToPlace("bf_decrement_expected_count", (buildingId, villageId) => {
    if (currentVillageId === villageId) {
        --expectedBuildingCount
        Logw(`Building '${buildingId}' failed to build for village ${villageId}`)
        Logi(`Counting ${buildingCount} buildings out of ${expectedBuildingCount}`)

        CheckVillageGenerationComplete()
    }
})

SNIPPET_LocalTimer("lt_delayed_village_generation", () => {
    GenerateNextVillage()
})

SNIPPET_LocalTimer("lt_delayed_vg_action", () => {
    let queryExpectedBuildingCount = QUERY_CountCardTypeInDeck(INSTANT_BUILD_DECK_NAME + currentVillageId, DECK_GetLibraryIndexFromName("buildable_card_library"))
    Logi(`Expecting ${queryExpectedBuildingCount} buildings to be made for village${currentVillageId}.`)

    if (queryExpectedBuildingCount === 0) {
        // Failed to get an expected size. This village failed to generate.
        Loge(`Failed to get expected building count for village${currentVillageId}. Test failed.`)
        OUTPUT_TestFinished("generate_all_village_factions_sizes_perf", 0)
    } else {
        expectedBuildingCount += queryExpectedBuildingCount
        fetchedExpectedBuildingCount = true
        // Some villages are super small and have generated all their buildings before we know
        // the expected size. Check just in case we're already done.
        CheckVillageGenerationComplete()
    }
})
