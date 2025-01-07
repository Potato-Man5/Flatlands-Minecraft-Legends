const hosts = {
    knowledge: {
        id: "knowledge",
        behaviors: {
            celebrate: "badger:behavior_host_knowledge_celebrate",
            follow: "badger:behavior_host_knowledge_follow",
            default: "badger:behavior_host_knowledge_carefree"
        }
    },
    action: {
        id: "action",
        behaviors: {
            beckon: "badger:behavior_host_action_beckon",
            celebrate: "badger:behavior_host_action_celebrate",
            default: "badger:behavior_host_action_carefree",
            consts: {
                timeToBeckon: 20
            }
        },
        misc: {
            waypointMarker: "badger:onboarding_action_waypoint_marker"
        }
    },
    foresight: {
        id: "foresight",
        behaviors: {
            celebrate: "badger:behavior_host_foresight_celebrate",
            default: "badger:behavior_host_action_carefree"
        }
    },
    events: {
        removeSkinsEvent: "remove_ghost",
        fastTravelEvent: "fast_travel_start"
    },
    haveBeenInitialized: "gv_hosts_initialized"
}

const cinematics = {
    introFMV: "mst00_c01a_tcw_fmv",
    introNIS: "tu01_c01_intro",
    outroNIS: "tu01_c02_outro",
    outroFMV: "mst00_c01b_tcw_fmv"
}
const onboardingVal = {
    onboardingFaction: "faction.onboarding",
    currentOnboardingStep: "gv_current_basics_onboarding_step",
    genericMarkerTag: "onboarding_generic_marker",
    genericSpawnerTag: "onboarding_generic_spawner",
    centralOnboardingPieceTag: "onboarding_world_central_piece",
    centralOnboardingPieceInstance: "onboarding_central_piece_metadata",
    teleporterPiece: "onboarding_world_teleporter_piece",
    islandGenericMarkerTag: "onboarding_generic_marker_island",
    skyState: "sky_welloffate",
    onboardingIntroVO: "onboarding_intro",
    hasPlayedOnboardingIntroVO: "gv_has_played_onboarding_intro_vo",
    hasTeleportedForesightDuringWood: "gv_has_teleported_foresight_during_wood",
    attractorFxTag: "attractorOnboarding",
    timeToShowTutorial: 20,
    moveToAction: {
        id: "moveToAction",
        start: () => {
            _StartMoveToActionOnboarding()
        },
        setupTracker: () => {
            _SetupMoveToActionOnboardingTracker()
        },
        onboardingComplete: () => {
            _CompleteMoveToActionOnboarding()
        },
        vo: {
            initialVO: "onboarding_move_to_action",
            reminderVO: "onboarding_reminder_move_to_action",
            completeVO: "onboarding_move_to_action_success",
            flavorVO: ""
        },
        const: {
            timeToPlayFirstVO: 1,
            timeToCallStart: 2,
            timeToShowOnboardingMessage: 5,
            timeToTriggerReminderVO: 50,
            timeToHint: 55,
            timeToFlavourVO: 70,
            timeToStartOnboarding: 6,
            timeBetweenSuccessStingerAndVO: 1
        },
        message: {
            onboardingMessage: "onboarding_move_to_action_nudge",
            initialVOPlaceholder: "",
            reminderVOPlaceholder: "",
            completeVOPlaceholder: "",
            hint: ""
        },
        music: {
            Stinger: "BAE_mus_stinger_onboarding_01_resources"
        },
        global: {
            onboardingComplete: "gv_move_to_action_onboarding_complete",
            hintNoLongerNeeded: "gv_move_to_action_hint_no_longer_needed"
        },
        attractorLocationTag: "",
        unlockResources: [],
        tutorialKey: "",
        hudItem: []
    },
    gatheringWood: {
        id: "gatheringWood",
        start: () => {
            _StartGatheringWoodOnboarding()
        },
        setupTracker: () => {
            _SetupGatheringWoodOnboardingTracker()
        },
        onboardingComplete: () => {
            _CompleteGatheringWoodOnboarding()
        },
        vo: {
            initialVO: "onboarding_gathering_1",
            reminderVO: "onboarding_gathering_2",
            completeVO: "onboarding_gathering_3",
            flavorVO: "onboarding_gathering_flavour"
        },
        const: {
            timeToPlayFirstVO: 4,
            timeToCallStart: 2,
            timeToShowOnboardingMessage: 7,
            timeToTriggerReminderVO: 50,
            timeToHint: 55,
            timeToFlavourVO: 70,
            amountOfWoodNecessary: 60,
            amountOfStoneNecessary: 60,
            timeToStartOnboarding: 4,
            timeBetweenSuccessStingerAndVO: 1
        },
        message: {
            onboardingMessage: "onboarding_wood_resourcing_nudge",
            initialVOPlaceholder: "placeholder_gathering_intro_vo",
            reminderVOPlaceholder: "placeholder_gathering_reminder_vo",
            completeVOPlaceholder: "placeholder_gathering_completed_vo",
            hint: ""
        },
        music: {
            Stinger: "BAE_mus_stinger_onboarding_01_resources"
        },
        global: {
            onboardingComplete: "gv_gathering_wood_onboarding_complete",
            hintNoLongerNeeded: "gv_gathering_hint_no_longer_needed"
        },
        attractorLocationTag: "",
        unlockResources: ["gather_wood"],
        tutorialKey: "",
        hudItem: ["wood", "badger:terraform_gather_surface_wood"]
    },
    secondMoveToAction: {
        id: "secondMoveToAction",
        start: () => {
            _StartSecondMoveToActionOnboarding()
        },
        setupTracker: () => {
            _SetupSecondMoveToActionOnboardingTracker()
        },
        onboardingComplete: () => {
            _CompleteSecondMoveToActionOnboarding()
        },
        vo: {
            initialVO: "onboarding_move_to_action_2",
            reminderVO: "onboarding_move_to_action_3",
            completeVO: "onboarding_move_to_action_4",
            flavorVO: ""
        },
        const: {
            timeToPlayFirstVO: 4,
            timeToCallStart: 2,
            timeToCreateTrigger: 2,
            timeToTeleportActionToStones: 5,
            timeToShowOnboardingMessage: 5,
            timeToTriggerReminderVO: 50,
            timeToHint: 55,
            timeToFlavourVO: 70,
            timeToStartOnboarding: 6,
            timeBetweenSuccessStingerAndVO: 1
        },
        message: {
            onboardingMessage: "onboarding_second_move_to_action_nudge",
            initialVOPlaceholder: "",
            reminderVOPlaceholder: "",
            completeVOPlaceholder: "",
            hint: ""
        },
        music: {
            Stinger: "BAE_mus_stinger_onboarding_01_resources"
        },
        global: {
            onboardingComplete: "gv_second_move_to_action_onboarding_complete",
            hintNoLongerNeeded: "gv_second_move_to_action_hint_no_longer_needed"
        },
        attractorLocationTag: "",
        unlockResources: [],
        tutorialKey: "",
        hudItem: []
    },
    gatheringStone: {
        id: "gatheringStone",
        start: () => {
            _StartGatheringStoneOnboarding()
        },
        setupTracker: () => {
            _SetupGatheringStoneOnboardingTracker()
        },
        onboardingComplete: () => {
            _CompleteGatheringStoneOnboarding()
        },
        vo: {
            initialVO: "onboarding_gathering_4",
            reminderVO: "onboarding_gathering_5",
            completeVO: "onboarding_gathering_6",
            flavorVO: ""
        },
        const: {
            timeToPlayFirstVO: 2,
            timeToCallStart: 2,
            timeToShowOnboardingMessage: 7,
            timeToTriggerReminderVO: 50,
            timeToHint: 55,
            timeToFlavourVO: 70,
            amountOfWoodNecessary: 60,
            amountOfStoneNecessary: 60,
            timeBetweenSuccessStingerAndVO: 1
        },
        message: {
            onboardingMessage: "onboarding_stone_resourcing_nudge",
            initialVOPlaceholder: "",
            reminderVOPlaceholder: "",
            completeVOPlaceholder: "",
            hint: ""
        },
        music: {
            Stinger: "BAE_mus_stinger_onboarding_01_resources"
        },
        global: {
            onboardingComplete: "gv_gathering_stone_onboarding_complete",
            hintNoLongerNeeded: "gv_gathering_hint_no_longer_needed"
        },
        attractorLocationTag: "",
        unlockResources: ["gather_stone"],
        tutorialKey: "",
        hudItem: ["stone", "badger:terraform_gather_surface_stone"]
    },
    climbPlateau: {
        id: "climbPlateau",
        start: () => {
            _StartClimbPlateauOnboarding()
        },
        setupTracker: () => {
            _SetupClimbPlateauOnboardingTracker()
        },
        onboardingComplete: () => {
            _CompleteClimbPlateauOnboarding()
        },
        vo: {
            initialVO: "onboarding_climb_plateau_1",
            reminderVO: "onboarding_buildstairshelp_3",
            completeVO: "onboarding_climb_plateau_3",
            flavorVO: "onboarding_climb_plateau_flavour",
            failSafeVOs: {
                noBridgeAtAll: "onboarding_buildstairshelp_1",
                lotsOfBridgesNoSuccess: "onboarding_deconstructplatforms_1",
                noSuccessForALongTime: "onboarding_buildstairshelp_2"
            }
        },
        const: {
            timeToPlayFirstVO: 4,
            timeToCallStart: 2,
            timeToShowOnboardingMessage: 9,
            timeToTriggerReminderVO: 50,
            timeToHint: 55,
            timeToFlavourVO: 70,
            timeBetweenSuccessStingerAndVO: 1,
            failSafeDelays: {
                noBridgeAtAll: 25,
                lotsOfBridgesNoSuccess: 45,
                noSuccessForALongTime: 150
            },
            lotsOfBridgesCount: 60
        },
        message: {
            onboardingMessage: "onboarding_climb_plateau_nudge",
            initialVOPlaceholder: "placeholder_climb_plateau_intro_vo",
            reminderVOPlaceholder: "placeholder_climb_plateau_reminder_vo",
            completeVOPlaceholder: "placeholder_climb_plateau_completed_vo",
            hint: "",
            failSafeMessages: {
                noSuccessForALongTime: "onboarding_climb_plateau_fail_safe_no_success_for_a_long_time"
            }
        },
        music: {
            Stinger: "BAE_mus_stinger_onboarding_02_first_pillar"
        },
        global: {
            onboardingComplete: "gv_climb_plateau_onboarding_complete",
            hintNoLongerNeeded: "gv_climb_plateau_hint_no_longer_needed",
            numberOfBridgesBuilt: "gv_number_of_bridges_built"
        },
        attractorLocationTag: "onboarding_tool_pedestal",
        unlockResources: ["unlock_onboarding_bridge"],
        tutorialKey: "",
        hudItem: ["utility", "badger:stairs_wood"]
    },
    //Spawner Step HERE Phil L
    woodGolem: {
        id: "woodGolem",
        start: () => {
            _StartWoodGolemOnboarding()
        },
        setupTracker: () => {
            _SetupWoodGolemOnboardingTracker()
        },
        onboardingComplete: () => {
            _CompleteWoodGolemOnboarding()
        },
        vo: {
            initialVO: "onboarding_spawngolems_1",
            reminderVO: "onboarding_spawngolems_2",
            completeVO: "onboarding_spawngolems_4",
            flavorVO: ""
        },
        const: {
            timeToPlayFirstVO: 4,
            timeToCallStart: 2,
            timeToShowOnboardingMessage: 4,
            timeToTriggerReminderVO: 50,
            timeToHint: 55,
            timeToFlavourVO: 70,
            timeBetweenSuccessStingerAndVO: 1
        },
        message: {
            onboardingMessage: "onboarding_hero_spawn_nudge",
            initialVOPlaceholder: "placeholder_hero_spawn_intro_vo",
            reminderVOPlaceholder: "placeholder_hero_spawn_reminder_vo",
            completeVOPlaceholder: "placeholder_hero_spawn_completed_vo",
            hint: ""
        },
        music: {
            Stinger: "BAE_mus_stinger_onboarding_03_spawner_build"
        },
        global: {
            onboardingComplete: "gv_wood_golem_onboarding_complete",
            hintNoLongerNeeded: "gv_wood_golem_hint_no_longer_needed"
        },
        unlockResources: ["unlock_spawner_golemwood", "unlock_spawner_golemstone"],
        attractorLocationTag: "",
        tutorialKey: "",
        hudItem: ["mobs", "badger:spawner_wood_golem", "badger:spawner_stone_golem"]
    },
    spawnerInteract: {
        id: "spawnerInteract",
        start: () => {
            _StartSpawnerInteractOnboarding()
        },
        setupTracker: () => {
            _SetupSpawnerInteractOnboardingTracker()
        },
        onboardingComplete: () => {
            _CompleteSpawnerInteractOnboarding()
        },
        vo: {
            initialVO: "onboarding_spawngolems_8",
            reminderVO: "onboarding_spawngolems_9",
            completeVO: "onboarding_spawngolems_14",
            woodGolemSpawnedVO: "onboarding_spawngolems_10",
            stoneGolemSpawnedVO: "onboarding_spawngolems_13",
            woodStoneInQuickSuccession: "onboarding_both_golems",
            flavorVO: ""
        },
        const: {
            timeToPlayFirstVO: 4,
            timeToCallStart: 2,
            timeToShowOnboardingMessage: 3,
            timeToTriggerReminderVO: 50,
            timeToHint: 55,
            timeToFlavourVO: 70,
            timeBetweenQuickSuccession: 10,
            timeBetweenSuccessStingerAndVO: 1
        },
        message: {
            onboardingMessage: "onboarding_spawner_interact_nudge",
            initialVOPlaceholder: "",
            reminderVOPlaceholder: "",
            completeVOPlaceholder: "",
            hint: ""
        },
        music: {
            Stinger: "BAE_mus_stinger_onboarding_04_spawner_interact"
        },
        global: {
            onboardingComplete: "gv_spawner_interact_onboarding_complete",
            hintNoLongerNeeded: "gv_spawner_interact_hint_no_longer_needed",
            numOfGolemsToSpawn: "gv_spawner_interact_num_of_golems_to_spawn",
            finishedIntroVO: "gv_spawner_interact_finished_intro_vo"
        },
        attractorLocationTag: "onboardinggolemspawner",
        unlockResources: [],
        tutorialKey: "",
        hudItem: ["spawn"]
    },
    rallying: {
        id: "rallying",
        start: () => {
            _StartRallyingOnboarding()
        },
        setupTracker: () => {
            _SetupRallyingOnboardingTracker()
        },
        onboardingComplete: () => {
            _CompleteRallyingOnboarding()
        },
        vo: {
            initialVO: "onboarding_lure_1",
            reminderVO: "onboarding_lure_2",
            completeVO: "onboarding_lure_3",
            flavorVO: "onboarding_lure_flavour_1"
        },
        const: {
            timeToPlayFirstVO: 4,
            timeToCallStart: 2,
            timeToShowOnboardingMessage: 8,
            timeToTriggerReminderVO: 50,
            timeToHint: 55,
            timeToFlavourVO: 70,
            mobsNecessaryOnFirstCircle: 1,
            timeBetweenSuccessStingerAndVO: 1
        },
        message: {
            onboardingMessage: "onboarding_hero_lure_nudge",
            initialVOPlaceholder: "placeholder_herolure_intro_vo",
            reminderVOPlaceholder: "placeholder_herolure_reminder_vo",
            completeVOPlaceholder: "placeholder_herolure_completed_vo",
            hint: ""
        },
        music: {
            Stinger: "BAE_mus_stinger_onboarding_05_second_pillar"
        },
        tag: {
            rallyingCircles: "rallyingCircles",
            rallyingCirclesBuildables: "rallyingCirclesBuildables"
        },
        global: {
            onboardingComplete: "gv_rallying_onboarding_complete",
            hintNoLongerNeeded: "gv_rallying_no_longer_needed",
            mobsOnFirstCircle: "gv_amount_of_mobs_on_first_circle",
            completedFirstCircle: "gv_completed_first_circle"
        },
        attractorLocationTag: "onboarding_host_structure_island",
        unlockResources: ["lure_unlock"],
        tutorialKey: "",
        hudItem: ["key.heroLure"]
    },
    stopRallying: {
        id: "stopRallying",
        start: () => {
            _StartStopRallyingOnboarding()
        },
        setupTracker: () => {
            _SetupStopRallyingboardingTracker()
        },
        onboardingComplete: () => {
            _CompleteStopRallyingOnboarding()
        },
        vo: {
            initialVO: "onboarding_lure_4",
            reminderVO: "onboarding_lure_5",
            completeVO: "onboarding_lure_6",
            flavorVO: "onboarding_lure_flavour_2"
        },
        const: {
            timeToPlayFirstVO: 4,
            timeToCallStart: 2,
            timeToShowOnboardingMessage: 6,
            timeToTriggerReminderVO: 50,
            timeToHint: 55,
            timeToFlavourVO: 70,
            timeBetweenSuccessStingerAndVO: 1
        },
        message: {
            onboardingMessage: "onboarding_hero_unlure_nudge",
            initialVOPlaceholder: "placeholder_herounlure_intro_vo",
            reminderVOPlaceholder: "placeholder_herounlure_reminder_vo",
            completeVOPlaceholder: "placeholder_herounlure_completed_vo",
            hint: ""
        },
        music: {
            Stinger: "BAE_mus_stinger_onboarding_06_stop_rally"
        },
        tag: {
            rallyingCircles: "rallyingCircles"
        },
        global: {
            onboardingComplete: "gv_stop_rallying_onboarding_complete",
            hintNoLongerNeeded: "gv_stop_rallying_hint_no_longer_needed"
        },
        attractorLocationTag: "",
        unlockResources: [],
        tutorialKey: "",
        hudItem: ["key.heroLure"]
    },
    directing: {
        id: "directing",
        start: () => {
            _StartDirectingOnboarding()
        },
        setupTracker: () => {
            _SetupDirectingOnboardingTracker()
        },
        onboardingComplete: () => {
            _CompleteDirectingOnboarding()
        },
        vo: {
            initialVO: "onboarding_direct_1",
            reminderVO: "onboarding_direct_2",
            completeVO: "onboarding_direct_3",
            flavorVO: "onboarding_direct_flavour"
        },
        const: {
            timeToPlayFirstVO: 4,
            timeToCallStart: 2,
            timeToShowOnboardingMessage: 5,
            timeToTriggerReminderVO: 50,
            timeToHint: 55,
            timeToFlavourVO: 70,
            mobsNecessaryOnDirectingCircle: 1,
            timeBetweenSuccessStingerAndVO: 1
        },
        message: {
            onboardingMessage: "onboarding_hero_direct_nudge",
            initialVOPlaceholder: "placeholder_hero_direct_intro_vo",
            reminderVOPlaceholder: "placeholder_hero_direct_reminder_vo",
            completeVOPlaceholder: "placeholder_hero_direct_completed_vo",
            hint: ""
        },
        music: {
            Stinger: "BAE_mus_stinger_onboarding_07_direct"
        },
        tag: {
            directingCircle: "directingCircle",
            directed: "mobDirected"
        },
        global: {
            onboardingComplete: "gv_directing_onboarding_complete",
            hintNoLongerNeeded: "gv_directing_hint_no_longer_needed",
            mobsOnDirectingCircle: "gv_amount_of_mobs_on_directing_circle"
        },
        attractorLocationTag: "onboarding_direct_platform",
        unlockResources: ["direct_unlock"],
        tutorialKey: "",
        hudItem: ["key.heroDirect"]
    },
    stoneGolem: {
        id: "stoneGolem",
        start: () => {
            _StartStoneGolemOnboarding()
        },
        setupTracker: () => {
            _SetupStoneGolemOnboardingTracker()
        },
        onboardingComplete: () => {
            _CompleteStoneGolemOnboarding()
        },
        vo: {
            initialVO: "",
            reminderVO: "",
            completeVO: "",
            flavorVO: ""
        },
        const: {
            timeToPlayFirstVO: 4,
            timeToCallStart: 2,
            timeToShowOnboardingMessage: 5,
            timeToTriggerReminderVO: 50,
            timeToHint: 55,
            timeToFlavourVO: 70,
            timeBetweenSuccessStingerAndVO: 1
        },
        message: {
            onboardingMessage: "onboarding_hero_spawn_second_golem_nudge",
            initialVOPlaceholder: "",
            reminderVOPlaceholder: "",
            completeVOPlaceholder: "",
            hint: ""
        },
        music: {
            Stinger: ""
        },
        global: {
            onboardingComplete: "gv_stone_golem_onboarding_complete",
            hintNoLongerNeeded: "gv_stone_golem_hint_no_longer_needed"
        },
        attractorLocationTag: "",
        unlockResources: [],
        tutorialKey: "",
        hudItem: ["mobs", "badger:spawner_stone_golem"]
    },
    combat: {
        id: "combat",
        start: () => {
            _StartCombatOnboarding()
        },
        setupTracker: () => {
            _SetupCombatOnboardingTracker()
        },
        onboardingComplete: () => {
            _CompleteCombatOnboarding()
        },
        vo: {
            initialVO: "onboarding_combat_1",
            reminderVO: "onboarding_combat_2",
            completeVO: "onboarding_combat_3",
            flavorVO: "onboarding_combat_flavour",
            reminderToAttackBarracks: ["onboarding_barracks_1", "onboarding_barracks_2"]
        },
        music: {
            Stinger: "BAE_mus_stinger_onboarding_08_destroy"
        },
        const: {
            timeToPlayFirstVO: 4,
            timeToCallStart: 2,
            timeToShowOnboardingMessage: 7,
            timeToTriggerReminderVO: 50,
            timeToHint: 55,
            timeToFlavourVO: 70,
            amountOfSpawnersToKill: 2,
            timeToRemindPlayerToAttackBarracks: 25,
            timeBetweenSuccessStingerAndVO: 2
        },
        message: {
            onboardingMessage: "onboarding_combat_nudge",
            initialVOPlaceholder: "placeholder_combat_intro_vo",
            reminderVOPlaceholder: "placeholder_combat_reminder_vo",
            completeVOPlaceholder: "placeholder_combat_completed_vo",
            hint: ""
        },
        global: {
            onboardingComplete: "gv_combat_onboarding_complete",
            hintNoLongerNeeded: "gv_combat_hint_no_longer_needed",
            numOfSpawnersDestroyed: "gv_combat_onboarding_numberOfSpawnersDestroyed",
            hasHitBarracks: "gv_has_hit_barracks",
            hasPlayedAllBarracksReminders: "gv_has_played_all_barracks_reminders"
        },
        combatOnly: {
            spawner0: {
                id: "spawner0"
            },
            spawner1: {
                id: "spawner1"
            }
        },
        attractorLocationTag: "onboarding_golem_spawner",
        unlockResources: [],
        tutorialKey: "",
        hudItem: []
    },
    teleport: {
        id: "teleport",
        start: () => {
            _StartTeleportOnboarding()
        },
        setupTracker: () => {
            _SetupTeleportOnboardingTracker()
        },
        onboardingComplete: () => {
            _CompleteTeleportOnboarding()
        },
        vo: {
            initialVO: "onboarding_sendoff_1",
            reminderVO: "onboarding_sendoff_2",
            completeVO: "onboarding_sendoff_3",
            flavorVO: ""
        },
        const: {
            timeToPlayFirstVO: 6,
            timeToCallStart: 2,
            timeToShowOnboardingMessage: 8,
            timeToTriggerReminderVO: 50,
            timeToHint: 55,
            timeToFlavourVO: 70,
            timeBetweenSuccessStingerAndVO: 1,
            timeToSkipOnboarding: 10
        },
        message: {
            onboardingMessage: "onboarding_teleport_nudge",
            initialVOPlaceholder: "placeholder_teleport_intro_vo",
            reminderVOPlaceholder: "placeholder_teleport_reminder_vo",
            completeVOPlaceholder: "placeholder_teleport_completed_vo",
            hint: "",
            skipOnboarding: "onboarding_teleport_skip"
        },
        music: {
            Stinger: "BAE_mus_tutorial_success"
        },
        global: {
            onboardingComplete: "gv_teleport_onboarding_complete",
            hintNoLongerNeeded: "gv_teleport_hint_no_longer_needed",
            skipOnboarding: "gv_teleport_skip_onboarding"
        },
        attractorLocationTag: "attractorPlacementTeleporter",
        unlockResources: [],
        tutorialKey: "",
        hudItem: []
    },
    villageChest: {
        id: "villageChest",
        chestId: "badger:entity_struct_fountain_treasure_chest",
        chestTag: "village_treasure_chest_interact",

        start: () => {
            _StartVillageChestStandalone()
        },
        setupTracker: () => {
            _SetupVillageChestStandaloneTracker()
        },
        onboardingComplete: () => {
            _CompleteVillageChestStandalone()
        },
        vo: {
            initialVO: "onboarding_chest_prompt",
            reminderVO: "onboarding_chest_reminder",
            completeVO: "onboarding_chest_complete",
            flavorVO: ""
        },
        const: {
            timeToPlayFirstVO: 4,
            timeToCallStart: 2,
            timeToShowOnboardingMessage: 8,
            timeToTriggerReminderVO: 50,
            timeToHint: 55,
            timeToFlavourVO: 70,
            timeToFillChest: 5,
            timeBetweenSuccessStingerAndVO: 1,
            timeToTeleportActionToChest: 8
        },
        message: {
            onboardingMessage: "onboarding_village_chest_nudge",
            initialVOPlaceholder: "",
            reminderVOPlaceholder: "",
            completeVOPlaceholder: "",
            hint: ""
        },
        music: {
            Stinger: "BAE_mus_tutorial_success"
        },
        global: {
            onboardingComplete: "gv_village_chest_onboarding_complete",
            hintNoLongerNeeded: "gv_teleport_hint_no_longer_needed"
        },
        attractorLocationTag: "village_treasure_chest_interact",
        unlockResources: [],
        rewards: {
            wood: 1000,
            stone: 1000,
            lapis: 1000
        },
        tutorialKey: "",
        hudItem: []
    }
}

const onboardingOrder = [onboardingVal.moveToAction.id, onboardingVal.gatheringWood.id, onboardingVal.secondMoveToAction.id, onboardingVal.gatheringStone.id, onboardingVal.climbPlateau.id, onboardingVal.villageChest.id, onboardingVal.woodGolem.id, onboardingVal.spawnerInteract.id, onboardingVal.rallying.id, onboardingVal.stopRallying.id, onboardingVal.directing.id, onboardingVal.combat.id, onboardingVal.teleport.id]

const hudRevealDictionary = {
    [onboardingVal.gatheringWood.id]: ["hud_hotbar", "hud_spawner_bar_gather_allays", "hud_resource_bar_core", "hud_resource_bar_other"],
    [onboardingVal.climbPlateau.id]: ["hud_toolbar", "hud_spawner_bar_build_allays"],
    [onboardingVal.woodGolem.id]: ["hud_spawner_bar_spawners"],
    [onboardingVal.spawnerInteract.id]: ["hud_spawner_bar_flames"],
    [onboardingVal.rallying.id]: ["hud_face_buttons"]
}

const _playIntroNIS = () => {
    const player = QUERY_GetAlivePlayers()
    const worldCenter = QUERY_GetEntitiesWithTags("Onboarding_spawn_point")
    Logi("~~~~ lt_intro_nis ~~~~  " + QUERY_GetEntitiesCount(worldCenter))
    const closerSpawnPoint = FILTER_ByClosest(worldCenter, player, 1)
    OUTPUT_TriggerCinematic(cinematics.introNIS, OPER_Append(closerSpawnPoint, player))

    LISTENFOR_LocalTimer({
        snippet: "lt_play_onboarding_intro_vo",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        waitTime: 5
    })
}

SNIPPET_LocalTimer("lt_play_onboarding_intro_vo", () => {
    _PlayIntroNisVO()
})

const _PlayIntroNisVO = () => {
    if (DoOnce(onboardingVal.hasPlayedOnboardingIntroVO)) {
        LISTENFOR_ClientVOCueFinished({
            snippet: "cvcf_onboarding_intro_nis_vo_cue_finished",
            vo_sequence_cue_name: "onboarding_intro_nis_vo_cue",
            ownerVillageId: OWNER_VILLAGE_OPT_OUT
        })
        PlayPresentationActionToAll(onboardingVal.onboardingIntroVO)
    }
}

SNIPPET_ClientVOCueFinished("cvcf_onboarding_intro_nis_vo_cue_finished", (_cueName, _payload) => {
    _SpawnGenericMarkers()
    _StartNextOnboardingStep()
    const teleporterPiece = QUERY_GetEntitiesWithTags("onboarding_world_teleporter_piece")
    const villageID = QUERY_GetVillageIDFromEntity(teleporterPiece)
    const telepTV = SpawnTriggerVolume(teleporterPiece, teleporterPiece, "badger:spatial_trigger_generic_medium", TEAM_BLUE, villageID, true, ["player"], [], ALLIANCE_FRIENDLY)

    LISTENFOR_SpatialPartitionEntered({
        snippet: "spe_player_reached_teleporter",
        ownerVillageId: villageID,
        triggerEntity: telepTV
    })
    LISTENFOR_SpatialPartitionExited({
        snippet: "spex_player_reached_teleporter",
        ownerVillageId: villageID,
        triggerEntity: telepTV
    })
    Once()
})

const _SpawnGenericMarkers = () => {
    Logi("Spawning generic markers")

    const combatArchway = QUERY_GetEntitiesWithTags(["onboarding_host_structure_combat"])
    OUTPUT_SpawnEntityAt(combatArchway, "badger:onboarding_generic_marker")
    OUTPUT_SpawnEntityAt(combatArchway, "badger:onboarding_generic_marker")

    const combatTarget = QUERY_GetEntitiesWithTags(["onboarding_host_structure_combat"])
    _SpawnBuildableNearTargetMarker("badger:onboarding_buildable_blocker", combatTarget, WEST, -16, 0, 12)
    _SpawnBuildableNearTargetMarker("badger:onboarding_buildable_blocker", combatTarget, SOUTH, -4, 0, 21)

    const firstRallyingPlatform = QUERY_GetEntitiesWithTags(["onboarding_host_structure_island"])
    _SpawnBuildableNearTarget("badger:onboarding_buildable_blocker_wide", firstRallyingPlatform, SOUTH, 7, 0, 0)
    _SpawnBuildableNearTarget("badger:onboarding_buildable_blocker_wide", firstRallyingPlatform, SOUTH, -10, 0, 0)
}

const _GetOnboardingData = (onboardingId) => {
    const onboardingData = onboardingVal[onboardingId]
    if (!onboardingData) {
        Loge(`Onboarding Data does not exist for onboardingId ${onboardingId}`)
    }
    return onboardingData
}

const _UnlockHUD = (onboardingId) => {
    if (hudRevealDictionary[onboardingId] !== undefined) {
        const globalVariable = onboardingId + "_resource_unlocked"
        if (QUERY_GetGlobalVariable(globalVariable) === 0) {
            IncrementGlobal(globalVariable)
            hudRevealDictionary[onboardingId].forEach((hudToReveal) => {
                OUTPUT_UpdateHUDVisibility(hudToReveal, true)
            })
        }
    }
}

const _UnlockResources = (onboardingId) => {
    const onboardingData = _GetOnboardingData(onboardingId)
    onboardingData.unlockResources.forEach((res) => {
        if (res !== "") {
            OUTPUT_AddOrRemoveTeamResource(TEAM_BLUE, res, 1, false)
        }
    })
}
const _GetClosestGenericMarker = (centerEntity, getFarMarker) => {
    let closeDistance = 12
    if (getFarMarker) {
        closeDistance = 60
    }
    const allGenericMarkers = QUERY_GetEntitiesWithTagFilter([onboardingVal.genericMarkerTag], ["usedMarker"])

    const tooCloseMarkers = FILTER_ByDistance(allGenericMarkers, centerEntity, closeDistance)
    OUTPUT_AddTag(tooCloseMarkers, "temporarilyDisabledMarkers")
    const possibleMarkers = QUERY_GetEntitiesWithTagFilter([onboardingVal.genericMarkerTag], ["usedMarker", "temporarilyDisabledMarkers"])
    const closestMarker = FILTER_ByClosest(possibleMarkers, centerEntity, 1)
    OUTPUT_RemoveTag(tooCloseMarkers, "temporarilyDisabledMarkers")
    Logi("~~~~~~~~~~~tooCloseMarkers = " + QUERY_GetEntitiesCount(tooCloseMarkers))
    Logi("~~~~~~~~~~~allGenericMarkers = " + QUERY_GetEntitiesCount(allGenericMarkers))
    if (HasEntities(closestMarker)) {
        return closestMarker
    } else {
        return FILTER_ByClosest(allGenericMarkers, centerEntity, 1)
    }
}

const _TeleportAllHostsToTargetStructure = (target) => {
    const action = QUERY_GetEntitiesWithTags(hosts.action.id)
    OUTPUT_RemoveLeash(action)
    const knowledge = QUERY_GetEntitiesWithTags(hosts.knowledge.id)
    const closestPlayer = FILTER_ByClosest(QUERY_GetAlivePlayers(), target, 1)
    //const foresight = QUERY_GetEntitiesWithTags(hosts.foresight.id)
    OUTPUT_TeleportAndOrientToEntity(action, target, closestPlayer)
    OUTPUT_TeleportAndOrientToEntity(knowledge, target, closestPlayer)
    OUTPUT_SetBehavior(knowledge, hosts.knowledge.behaviors.default)

    _TriggerBehaviorOnHost(hosts.action.id, hosts.action.behaviors.beckon)
}

const _TriggerBehaviorOnHost = (hostId, behaviorId) => {
    const host = QUERY_GetEntitiesWithTags(hostId)
    OUTPUT_ResetBehavior(host)
    OUTPUT_SetBehavior(host, behaviorId)

    LISTENFOR_LocalTimer({
        snippet: "lt_reset_host_behavior",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        waitTime: 5,
        payloadString: hostId
    })
}
const _TriggerCelebrationsOnAllHost = () => {
    for (const key in hosts) {
        const hostData = hosts[key]
        if (hostData.id !== undefined) {
            if (hostData.id !== "") {
                const host = QUERY_GetEntitiesWithTags(hostData.id)
                OUTPUT_ResetBehavior(host)
                OUTPUT_SetBehavior(host, hostData.behaviors.celebrate)
                LISTENFOR_LocalTimer({
                    snippet: "lt_reset_host_behavior",
                    ownerVillageId: OWNER_VILLAGE_OPT_OUT,
                    waitTime: 5,
                    payloadString: hostData.id
                })
            }
        }
    }
}

SNIPPET_LocalTimer("lt_reset_host_behavior", (payload) => {
    const currentOnboadingStep = onboardingOrder[QUERY_GetGlobalVariable(onboardingVal.currentOnboardingStep)]

    const host = QUERY_GetEntitiesWithTags(payload.string)
    if (HasEntities(host)) {
        if (currentOnboadingStep !== onboardingVal.teleport.id) {
            if (payload.string === hosts.knowledge.id) {
                OUTPUT_SetBehavior(host, hosts.knowledge.behaviors.follow)
            } else {
                OUTPUT_SetBehavior(host, hosts[payload.string].behaviors.default)
            }
        } else {
            OUTPUT_SetBehavior(host, hosts[payload.string].behaviors.default)
        }
    }
})

const _ResetBehaviorForAllHosts = () => {
    for (const key in hosts) {
        const hostData = hosts[key]
        if (hostData.id !== undefined) {
            if (hostData.id !== "") {
                const host = QUERY_GetEntitiesWithTags(hostData.id)
                OUTPUT_ResetBehavior(host)
                OUTPUT_SetBehavior(host, hostData.behaviors.default)
            }
        }
    }
}

const _InterruptBasicsOnboardingMessage = () => {
    InterruptOnboardingMessage(false)
    OUTPUT_AnnounceInterrupt(0)
}

const _SpawnAttractorFX = (currentOnboardingStepId) => {
    const currentOnboardingStepData = _GetOnboardingData(currentOnboardingStepId)
    Logi("@@@ currentOnboardingStepId @@@ " + currentOnboardingStepId)
    if (currentOnboardingStepId === onboardingVal.gatheringStone.id) {
        const attractoPlacement = QUERY_GetEntitiesWithTags("attractorPlacement")
        const stones = QUERY_GetEntitiesWithTags("actionStone")
        const stone = RandomEntity(stones)
        const activeAttractorPlacement = FILTER_ByClosest(attractoPlacement, stone, 1)
        OUTPUT_SpawnEntityAt(activeAttractorPlacement, "badger:fx_attractor_onbording")
        return
    } else if (currentOnboardingStepData.attractorLocationTag === "") {
        return
    }
    const attractorSpawnLocation = QUERY_GetEntitiesWithTags([currentOnboardingStepData.attractorLocationTag])
    if (HasEntities(attractorSpawnLocation)) {
        OUTPUT_SpawnEntityAt(attractorSpawnLocation, "badger:fx_attractor_onbording")
    }
    Logi("~~~~~~~~ SpawnAttractorFX")
}

const _DespawnAttractorFX = () => {
    const attractorFX = QUERY_GetEntitiesWithTags(onboardingVal.attractorFxTag)
    if (QUERY_GetEntitiesCount(attractorFX) > 0) OUTPUT_DespawnEntities(attractorFX)
}

const _IsThisCurrentOnboardingStep = (onboardingStepId) => {
    const currentOnboadingStep = QUERY_GetGlobalVariable(onboardingVal.currentOnboardingStep)
    return onboardingStepId === onboardingOrder[currentOnboadingStep]
}

const _CompleteCurrentOnboardingStep = () => {
    const currentOnboadingStep = QUERY_GetGlobalVariable(onboardingVal.currentOnboardingStep)
    const currentOnboardingId = onboardingOrder[currentOnboadingStep]
    const currentStepOnboardingData = _GetOnboardingData(currentOnboardingId)
    Logi("!!!!Onboarding Step Completed ID = " + currentStepOnboardingData.id + "   Onboarding Step Completed Number : " + currentOnboadingStep)
    LISTENFOR_LocalTimer({
        snippet: "lt_play_step_complete_vo",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        waitTime: currentStepOnboardingData.const.timeBetweenSuccessStingerAndVO,
        payloadString: currentStepOnboardingData.vo.completeVO
    })

    if (currentStepOnboardingData.music.Stinger !== "") {
        PlayMusicStingerToAll(currentStepOnboardingData.music.Stinger)
    }
    _DespawnAttractorFX()
    currentStepOnboardingData.onboardingComplete()
    DeEmphasizeHUDItem(currentStepOnboardingData.hudItem)
    IncrementGlobal(onboardingVal.currentOnboardingStep)
    _InterruptBasicsOnboardingMessage()
    _TriggerCelebrationsOnAllHost()
    _StartNextOnboardingStep()
}

SNIPPET_LocalTimer("lt_play_step_complete_vo", (payload) => {
    PlayPresentationActionToAll(payload.string)
})

const _StartNextOnboardingStep = () => {
    const currentOnboadingStep = QUERY_GetGlobalVariable(onboardingVal.currentOnboardingStep)

    if (currentOnboadingStep >= onboardingOrder.length) {
        return
    }
    const nextOnboardingId = onboardingOrder[currentOnboadingStep]
    const onboardingData = _GetOnboardingData(nextOnboardingId)
    if (QUERY_GetGlobalVariable(onboardingData.global.onboardingComplete) > 0) {
        Logi("Going to skip: " + nextOnboardingId)
        IncrementGlobal(onboardingVal.currentOnboardingStep)
        _StartNextOnboardingStep()
    }
    _PlayInitialVOAndMessage(nextOnboardingId)
}
const _PlayInitialVOAndMessage = (onboardingId) => {
    _InterruptBasicsOnboardingMessage()
    const onboardingData = _GetOnboardingData(onboardingId)
    LISTENFOR_LocalTimer({
        snippet: "lt_play_onboarding_initial_vo_and_message",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        waitTime: onboardingData.const.timeToPlayFirstVO,
        payloadString: onboardingId
    })
}
SNIPPET_LocalTimer("lt_play_onboarding_initial_vo_and_message", (payload) => {
    const onboardingData = _GetOnboardingData(payload.string)
    if (onboardingData.vo.initialVO !== "") {
        Logi("!!!! lt_play_onboarding_initial_vo_and_message ~~~~~ " + payload.string)
        LISTENFOR_ClientVOCueFinished({
            snippet: "cvcf_onboarding_intro_cue_finished",
            vo_sequence_cue_name: "onboarding_intro_cue",
            ownerVillageId: OWNER_VILLAGE_OPT_OUT,
            payloadString: payload.string
        })
        PlayPresentationActionToAll(onboardingData.vo.initialVO)
    } else {
        ShowOnboardingMessage(onboardingData.message.onboardingMessage, false)
        LISTENFOR_LocalTimer({
            snippet: "lt_start_onboarding_step",
            ownerVillageId: OWNER_VILLAGE_OPT_OUT,
            waitTime: onboardingData.const.timeToCallStart,
            payloadString: payload.string
        })
    }

    Once()
})

SNIPPET_ClientVOCueFinished("cvcf_onboarding_intro_cue_finished", (_cueName, payload) => {
    Logi("~~~~ cvcf_onboarding_intro_cue_finished ~~~~ " + payload.string)
    const onboardingData = _GetOnboardingData(payload.string)
    ShowOnboardingMessage(onboardingData.message.onboardingMessage, false)

    LISTENFOR_LocalTimer({
        snippet: "lt_start_onboarding_step",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        waitTime: onboardingData.const.timeToCallStart,
        payloadString: payload.string
    })
    Once()
})

SNIPPET_LocalTimer("lt_start_onboarding_step", (payload) => {
    const onboardingData = _GetOnboardingData(payload.string)
    onboardingData.start()
    _UnlockResources(onboardingData.id)
    _UnlockHUD(onboardingData.id)
    EmphasizeHUDItem(onboardingData.hudItem)
    onboardingData.setupTracker()

    if (onboardingData.const.timeToTriggerReminderVO !== 0) {
        LISTENFOR_LocalTimer({
            snippet: "lt_play_onboarding_reminder_vo",
            ownerVillageId: OWNER_VILLAGE_OPT_OUT,
            waitTime: onboardingData.const.timeToTriggerReminderVO,
            payloadString: onboardingData.id
        })
    }

    LISTENFOR_LocalTimer({
        snippet: "lt_trigger_tutorial",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        waitTime: onboardingVal.timeToShowTutorial,
        payloadString: payload.string
    })

    /*if (onboardingData.message.hint !== "") {
        LISTENFOR_LocalTimer({
            snippet: "lt_play_onboarding_hint_message",
            ownerVillageId: OWNER_VILLAGE_OPT_OUT,
            waitTime: onboardingData.const.timeToHint,
            payloadString: onboardingData.id
        })
    }*/

    if (onboardingData.vo.flavorVO !== "") {
        LISTENFOR_LocalTimer({
            snippet: "lt_play_onboarding_flavor_message",
            ownerVillageId: OWNER_VILLAGE_OPT_OUT,
            waitTime: onboardingData.const.timeToFlavourVO,
            payloadString: onboardingData.id
        })
    }
})

SNIPPET_LocalTimer("lt_trigger_tutorial", (payload) => {
    const onboardingData = _GetOnboardingData(payload.string)
    if (QUERY_GetGlobalVariable(onboardingData.global.onboardingComplete) === 0) {
        if (onboardingData.tutorialKey !== "") {
            TriggerTutorialForSpecificPlayers(GetAllPlayers(), onboardingData.tutorialKey)
        }
    }
})

SNIPPET_LocalTimer("lt_play_onboarding_reminder_vo", (payload) => {
    const onboardingData = _GetOnboardingData(payload.string)
    if (!_IsThisCurrentOnboardingStep(onboardingData.id)) {
        return
    }

    if (onboardingData.vo.reminderVO !== "") {
        PlayPresentationActionToAll(onboardingData.vo.reminderVO)
    }
    if (onboardingData.attractorLocationTag !== "") {
        const attractorSpawnLocation = QUERY_GetEntitiesWithTags([onboardingData.attractorLocationTag])
        if (QUERY_GetEntitiesCount(attractorSpawnLocation) > 0 && onboardingData.id !== onboardingVal.combat.id) {
            //const waypoint = SpawnEntitiesAt(attractorSpawnLocation, "badger:onboarding_waypoint_marker", 1, TEAM_BLUE)
            //OUTPUT_AddTag(waypoint, "waypoint" + onboardingData.id)
        }
    }
    Once()
})

SNIPPET_LocalTimer("lt_play_onboarding_hint_message", (payload) => {
    const onboardingData = _GetOnboardingData(payload.string)
    if (!_IsThisCurrentOnboardingStep(onboardingData.id)) {
        return
    }
    if (QUERY_GetGlobalVariable(onboardingData.global.hintNoLongerNeeded) > 0) {
        return
    }

    if (onboardingData.message.hint !== "") {
        OUTPUT_Announce(onboardingData.message.hint, [])
    }
    Once()
})

SNIPPET_LocalTimer("lt_play_onboarding_flavor_message", (payload) => {
    const onboardingData = _GetOnboardingData(payload.string)
    if (!_IsThisCurrentOnboardingStep(onboardingData.id)) {
        return
    }

    PlayPresentationActionToAll(onboardingData.vo.flavorVO)

    Once()
})
// ========================= MOVEMENT ONBOARDING =========================
const _StartMoveToActionOnboarding = () => {
    const action = QUERY_GetEntitiesWithTags(hosts.action.id)
    const attractoPlacement = QUERY_GetEntitiesWithTags("attractorPlacement")
    const activeAttractorPlacement = FILTER_ByClosest(attractoPlacement, action, 1)
    OUTPUT_SpawnEntityAt(activeAttractorPlacement, "badger:fx_attractor_onbording")
}

const _SetupMoveToActionOnboardingTracker = () => {
    const action = QUERY_GetEntitiesWithTags(hosts.action.id)
    const moveTV = SpawnTriggerVolume(action, undefined, "badger:spatial_trigger_onboarding_climb_plateau", TEAM_WILD, undefined, true, [TAG_PLAYER], [], ALLIANCE_FRIENDLY)

    LISTENFOR_SpatialPartitionEntered({
        snippet: "spe_player_reached_action",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        triggerEntity: moveTV
    })
}

SNIPPET_SpatialPartitionEntered("spe_player_reached_action", (triggerEntity, _intruderEntity, _payload) => {
    _CompleteCurrentOnboardingStep()
    OUTPUT_DespawnEntities(triggerEntity)
    Once()
})

const _CompleteMoveToActionOnboarding = () => {
    Logi("~~_CompleteGatheringWoodOnboarding")
    IncrementGlobal(onboardingVal.moveToAction.global.onboardingComplete)
    TelemetrySendFunnelEvent(GetAllPlayers(), FunnelSteps.TUTORIAL_REACHOBJECTIVEWOOD)
}
// ========================= GATHERING WOOD ONBOARDING =========================
const _StartGatheringWoodOnboarding = () => {
    OUTPUT_AddOrRemoveTeamResource(TEAM_BLUE, "wood", 1, false)
    OUTPUT_AddOrRemoveTeamResource(TEAM_BLUE, "wood", -1, false)
}

const _SetupGatheringWoodOnboardingTracker = () => {
    LISTENFOR_LocalTimer({
        snippet: "lt_onboarding_passive_tutorial_start",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        waitTime: onboardingVal.gatheringWood.const.timeToStartOnboarding
    })

    LISTENFOR_ResourcesChanged({
        snippet: "rc_gathering_wood_onboarding",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        resourceName: "wood"
    })

    LISTENFOR_LocalTimer({
        snippet: "lt_onboarding_teleport_foresight_for_flavor_vo",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        waitTime: onboardingVal.gatheringWood.const.timeToFlavourVO - 2
    })
}

SNIPPET_LocalTimer("lt_onboarding_passive_tutorial_start", () => {
    OUTPUT_AddOrRemoveTeamResource(TEAM_BLUE, "unlock_onboarding_act0_started", 1, false)
    Logi("Act 0 Onboarding Started Resource Granted!")
})

SNIPPET_LocalTimer("lt_onboarding_teleport_foresight_for_flavor_vo", () => {
    if (QUERY_GetGlobalVariable(onboardingVal.gatheringWood.global.onboardingComplete) > 0) {
        Once()
        return
    }
    const foresight = QUERY_GetEntitiesWithTags(hosts.foresight.id)
    const action = QUERY_GetEntitiesWithTags(hosts.action.id)
    const foresightMarkers = QUERY_GetEntitiesWithTags("onboarding_generic_marker_for_hosts_foresight")
    const target = FILTER_ByClosest(foresightMarkers, action, 1)
    OUTPUT_RemoveLeash(foresight)
    const closestPlayer = FILTER_ByClosest(QUERY_GetAlivePlayers(), target, 1)
    OUTPUT_TeleportAndOrientToEntity(foresight, target, closestPlayer)

    OUTPUT_SetLeashWithReturnWhenNotTargeting(foresight, target, 15, 3)
    IncrementGlobal(onboardingVal.hasTeleportedForesightDuringWood)
})

SNIPPET_ResourcesChanged("rc_gathering_wood_onboarding", (_resourceName, _teamID, _previousAmount, currentAmount) => {
    if (QUERY_GetGlobalVariable(onboardingVal.gatheringWood.global.onboardingComplete) > 0) {
        Once()
        return
    }
    if (currentAmount > 0) {
        IncrementGlobal(onboardingVal.gatheringWood.global.hintNoLongerNeeded)
        const amountOfWood = QUERY_GetCampaignResource("wood")
        if (amountOfWood >= onboardingVal.gatheringWood.const.amountOfWoodNecessary) {
            Logi("rc_gathering_wood_onboarding Completed")
            _CompleteCurrentOnboardingStep()
            Once()
        }
    }
})

const _CompleteGatheringWoodOnboarding = () => {
    Logi("~~_CompleteGatheringWoodOnboarding")
    IncrementGlobal(onboardingVal.gatheringWood.global.onboardingComplete)

    TelemetrySendFunnelEvent(GetAllPlayers(), FunnelSteps.TUTORIAL_GATHERWOOD)

    LISTENFOR_LocalTimer({
        snippet: "lt_move_action_to_stones",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        waitTime: onboardingVal.secondMoveToAction.const.timeToTeleportActionToStones
    })
}

SNIPPET_LocalTimer("lt_move_action_to_stones", () => {
    const attractoPlacement = QUERY_GetEntitiesWithTags("attractorPlacement")
    const action = QUERY_GetEntitiesWithTags(hosts.action.id)
    const stones = QUERY_GetEntitiesWithTags("actionStone")
    const stone = RandomEntity(stones)
    const activeAttractorPlacement = FILTER_ByClosest(attractoPlacement, stone, 1)
    const closestPlayer = FILTER_ByClosest(QUERY_GetAlivePlayers(), activeAttractorPlacement, 1)
    OUTPUT_TeleportAndOrientToEntity(action, activeAttractorPlacement, closestPlayer)
    OUTPUT_SetLeashWithReturnWhenNotTargeting(action, activeAttractorPlacement, 15, 3)
    _SpawnAttractorFX(onboardingVal.gatheringStone.id)
})

// ========================= SECOND MOVEMENT ONBOARDING =========================
const _StartSecondMoveToActionOnboarding = () => {}

const _SetupSecondMoveToActionOnboardingTracker = () => {
    LISTENFOR_LocalTimer({
        snippet: "lt_create_second_move_trigger",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        waitTime: onboardingVal.secondMoveToAction.const.timeToCreateTrigger
    })

    LISTENFOR_LocalTimer({
        snippet: "lt_action_beckon",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        waitTime: hosts.action.behaviors.consts.timeToBeckon,
        payloadString: onboardingVal.secondMoveToAction.id
    })
}

SNIPPET_LocalTimer("lt_create_second_move_trigger", () => {
    const action = QUERY_GetEntitiesWithTags(hosts.action.id)
    const moveTV = SpawnTriggerVolume(action, undefined, "badger:spatial_trigger_onboarding_climb_plateau", TEAM_WILD, undefined, true, [TAG_PLAYER], [], ALLIANCE_FRIENDLY)

    LISTENFOR_SpatialPartitionEntered({
        snippet: "spe_player_reached_action",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        triggerEntity: moveTV
    })
})

const _CompleteSecondMoveToActionOnboarding = () => {
    Logi("~~_CompleteSecondMoveOnboarding")
    IncrementGlobal(onboardingVal.secondMoveToAction.global.onboardingComplete)
    TelemetrySendFunnelEvent(GetAllPlayers(), FunnelSteps.TUTORIAL_REACHOBJECTIVESTONE)
}

// ========================= GATHERING STONE ONBOARDING =========================
const _StartGatheringStoneOnboarding = () => {
    OUTPUT_AddOrRemoveTeamResource(TEAM_BLUE, "stone", 1, false)
    OUTPUT_AddOrRemoveTeamResource(TEAM_BLUE, "stone", -1, false)
}

const _SetupGatheringStoneOnboardingTracker = () => {
    LISTENFOR_ResourcesChanged({
        snippet: "rc_gathering_stone_onboarding",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        resourceName: "stone"
    })
    _TriggerBehaviorOnHost(hosts.action.id, hosts.action.behaviors.beckon)
}

SNIPPET_ResourcesChanged("rc_gathering_stone_onboarding", (_resourceName, _teamID, _previousAmount, currentAmount) => {
    if (QUERY_GetGlobalVariable(onboardingVal.gatheringStone.global.onboardingComplete) > 0) {
        Once()
        return
    }
    if (currentAmount > 0) {
        IncrementGlobal(onboardingVal.gatheringStone.global.hintNoLongerNeeded)
        const amountOfStone = QUERY_GetCampaignResource("stone")
        if (amountOfStone >= onboardingVal.gatheringStone.const.amountOfStoneNecessary) {
            Logi("rc_gathering_stone_onboarding Completed")
            _CompleteCurrentOnboardingStep()
            Once()
        }
    }
})

const _CompleteGatheringStoneOnboarding = () => {
    Logi("~~_CompleteGatheringStoneOnboarding")
    IncrementGlobal(onboardingVal.gatheringStone.global.onboardingComplete)

    TelemetrySendFunnelEvent(GetAllPlayers(), FunnelSteps.TUTORIAL_GATHERSTONE)

    //Move action to flame pedestal
    const targetLoc = QUERY_GetEntitiesWithTags("onboarding_tool_pedestal")
    const action = QUERY_GetEntitiesWithTags(hosts.action.id)
    OUTPUT_RemoveLeash(action)
    const closestPlayer = FILTER_ByClosest(QUERY_GetAlivePlayers(), targetLoc, 1)
    OUTPUT_TeleportAndOrientToEntity(action, targetLoc, closestPlayer)
    OUTPUT_SetLeashWithReturnWhenNotTargeting(action, targetLoc, 15, 3)
}
// ========================= CLIMB PLATEAU ONBOARDING =========================
const _StartClimbPlateauOnboarding = () => {}

const _SetupClimbPlateauOnboardingTracker = () => {
    const flameIslandCentralPiece = QUERY_GetEntitiesWithTags(["onboarding_tool_pedestal"])
    const climbPlateauTV = SpawnTriggerVolume(flameIslandCentralPiece, undefined, "badger:spatial_trigger_onboarding_climb_plateau", TEAM_WILD, undefined, true, [TAG_PLAYER], [], ALLIANCE_FRIENDLY)

    if (QUERY_GetGlobalVariable(onboardingVal.hasTeleportedForesightDuringWood) > 0) {
        const foresight = QUERY_GetEntitiesWithTags(hosts.foresight.id)
        OUTPUT_RemoveLeash(foresight)
        const firstRallyingPlatform = QUERY_GetEntitiesWithTags(["onboarding_host_structure_island"])
        const foresightMarkers = QUERY_GetEntitiesWithTags("onboarding_generic_marker_for_hosts_foresight")
        const target = FILTER_ByClosest(foresightMarkers, firstRallyingPlatform, 1)
        const closestPlayer = FILTER_ByClosest(QUERY_GetAlivePlayers(), target, 1)
        OUTPUT_TeleportAndOrientToEntity(foresight, target, closestPlayer)
        OUTPUT_SetLeashWithReturnWhenNotTargeting(foresight, target, 15, 3)
    }

    LISTENFOR_SpatialPartitionEntered({
        snippet: "spe_player_climbed_plateau",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        triggerEntity: climbPlateauTV
    })

    LISTENFOR_BuildingStart({
        snippet: "bc_built_stairs",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        includeTags: ["stairs"]
    })

    LISTENFOR_LocalTimer({
        snippet: "lt_no_bridge_at_all",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        waitTime: onboardingVal.climbPlateau.const.failSafeDelays.noBridgeAtAll
    })

    LISTENFOR_LocalTimer({
        snippet: "lt_no_success_for_a_long_time",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        waitTime: onboardingVal.climbPlateau.const.failSafeDelays.noSuccessForALongTime
    })

    _SpawnAttractorFX(onboardingVal.climbPlateau.id)
    //OUTPUT_TriggerPresentationEvent(action, hosts.events.fastTravelEvent)

    _TriggerBehaviorOnHost(hosts.action.id, hosts.action.behaviors.beckon)
    LISTENFOR_LocalTimer({
        snippet: "lt_action_beckon",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        waitTime: hosts.action.behaviors.consts.timeToBeckon,
        payloadString: onboardingVal.climbPlateau.id
    })
}

SNIPPET_BuildingStart("bc_built_stairs", () => {
    if (!_IsThisCurrentOnboardingStep(onboardingVal.climbPlateau.id)) {
        Once()
        return
    }
    const value = IncrementGlobal(onboardingVal.climbPlateau.global.numberOfBridgesBuilt)
    Logi("@@@@ VALUE @@@@ " + value)
    if (value === onboardingVal.climbPlateau.const.lotsOfBridgesCount) {
        LISTENFOR_LocalTimer({
            snippet: "lt_lots_of_bridges_no_success",
            ownerVillageId: OWNER_VILLAGE_OPT_OUT,
            waitTime: onboardingVal.climbPlateau.const.failSafeDelays.lotsOfBridgesNoSuccess
        })
    }
})

SNIPPET_SpatialPartitionEntered("spe_player_climbed_plateau", (triggerEntity, _intruderEntity, _payload) => {
    _CompleteCurrentOnboardingStep()
    OUTPUT_DespawnEntities(triggerEntity)
    Once()
})

const _CompleteClimbPlateauOnboarding = () => {
    Logi("~~_CompleteClimbPlateauOnboarding")
    IncrementGlobal(onboardingVal.climbPlateau.global.onboardingComplete)

    TelemetrySendFunnelEvent(GetAllPlayers(), FunnelSteps.TUTORIAL_REACHOBJECTIVEONPLATFORM)

    LISTENFOR_LocalTimer({
        snippet: "lt_teleport_action_to_chest",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        waitTime: onboardingVal.villageChest.const.timeToTeleportActionToChest
    })
}

SNIPPET_LocalTimer("lt_teleport_action_to_chest", () => {
    const villageChest = QUERY_GetEntitiesWithTags("village_treasure_chest_interact")
    const action = QUERY_GetEntitiesWithTags(hosts.action.id)
    const foresight = QUERY_GetEntitiesWithTags(hosts.foresight.id)
    OUTPUT_RemoveLeash(action)
    //OUTPUT_TeleportWithOffset(action, villageChest, 0, 0, 8)

    // hack using OUTPUT_EXT_SpawnEntityRelative to tp and orient the entity in the same snippet
    const closestPlayer = FILTER_ByClosest(QUERY_GetAlivePlayers(), villageChest, 1)
    const tpLocation = OUTPUT_EXT_SpawnEntityRelative("badger:onboarding_action_waypoint_marker", villageChest, 0, 0, 8)
    OUTPUT_TeleportAndOrientToEntity(action, tpLocation, closestPlayer)
    OUTPUT_DespawnEntities(tpLocation)

    OUTPUT_OrientEntitiesToEntity(foresight, closestPlayer)
    OUTPUT_SetLeashWithReturnWhenNotTargeting(action, villageChest, 15, 3)
})

//----Fail safe

SNIPPET_LocalTimer("lt_no_bridge_at_all", () => {
    if (_IsThisCurrentOnboardingStep(onboardingVal.climbPlateau.id)) {
        if (QUERY_GetGlobalVariable(onboardingVal.climbPlateau.global.numberOfBridgesBuilt) === 0) {
            PlayPresentationActionToAll(onboardingVal.climbPlateau.vo.failSafeVOs.noBridgeAtAll)
            Logi("@@@@ lt_no_bridge_at_all @@@@")
        }
    }
})

SNIPPET_LocalTimer("lt_lots_of_bridges_no_success", () => {
    if (_IsThisCurrentOnboardingStep(onboardingVal.climbPlateau.id)) {
        PlayPresentationActionToAll(onboardingVal.climbPlateau.vo.failSafeVOs.lotsOfBridgesNoSuccess)
        Logi("@@@@ lt_lots_of_bridges_no_success @@@@")
    }
})

SNIPPET_LocalTimer("lt_no_success_for_a_long_time", () => {
    if (_IsThisCurrentOnboardingStep(onboardingVal.climbPlateau.id)) {
        PlayPresentationActionToAll(onboardingVal.climbPlateau.vo.failSafeVOs.noSuccessForALongTime)
        _InterruptBasicsOnboardingMessage()
        ShowOnboardingMessage(onboardingVal.climbPlateau.message.failSafeMessages.noSuccessForALongTime)
        Logi("@@@@ lt_no_success_for_a_long_time @@@@")
    }
})

//----Fail safe

// ========================= Village chest =========================

const _StartVillageChestStandalone = () => {
    const villageChest = QUERY_GetEntitiesWithTags("village_treasure_chest_interact")
    if (HasEntities(villageChest)) {
        OUTPUT_SetInteractionState(villageChest, true)
    }
}
const _SetupVillageChestStandaloneTracker = () => {
    _SpawnAttractorFX(onboardingVal.villageChest.id)
    LISTENFOR_PlayerInteracted({
        snippet: "pi_village_chest_interacted_onboarding",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        includeTags: ["village_treasure_chest_interact"]
    })

    LISTENFOR_LocalTimer({
        snippet: "lt_spawn_chest_waypoint",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        waitTime: onboardingVal.villageChest.const.timeToTriggerReminderVO
    })
}

SNIPPET_LocalTimer("lt_spawn_chest_waypoint", () => {
    if (QUERY_GetGlobalVariable(onboardingVal.villageChest.global.onboardingComplete) === 0) {
        //const chest = QUERY_GetEntitiesWithTags("village_treasure_chest_interact")
        //const waypoint = SpawnEntitiesAt(chest, "badger:onboarding_waypoint_marker", 1, TEAM_BLUE)
        //OUTPUT_AddTag(waypoint, "waypoint_chest")
    }
})

const _CompleteVillageChestStandalone = () => {
    //const waypoint = QUERY_GetEntitiesWithTags("waypoint_chest")
    //if (HasEntities(waypoint)) {
    //    OUTPUT_DespawnEntities(waypoint)
    //}
}

const _GrantOnboarindChestResources = (playerEntity) => {
    Logi("Collecting rewards for onboarding")

    const newWoodAmount = QUERY_GetTeamResourceMax(TEAM_BLUE, "wood") - QUERY_GetTeamResource(TEAM_BLUE, "wood")
    const newStoneAmount = QUERY_GetTeamResourceMax(TEAM_BLUE, "stone") - QUERY_GetTeamResource(TEAM_BLUE, "stone")
    const newEmeraldAmount = QUERY_GetTeamResourceMax(TEAM_BLUE, "emerald") - QUERY_GetTeamResource(TEAM_BLUE, "emerald")

    let rewardsContentString = ""
    if (newWoodAmount > 0) {
        rewardsContentString += `${newWoodAmount}|+[key.item.wood]|`
    }
    if (newStoneAmount > 0) {
        rewardsContentString += `${newStoneAmount}|+[key.item.stone]|`
    }
    if (newEmeraldAmount > 0) {
        rewardsContentString += `${newEmeraldAmount}|+[key.item.emerald]|`
    }

    OUTPUT_AddOrRemoveResource(playerEntity, "wood", onboardingVal.villageChest.rewards.wood, false)
    OUTPUT_AddOrRemoveResource(playerEntity, "stone", onboardingVal.villageChest.rewards.stone, false)
    OUTPUT_AddOrRemoveResource(playerEntity, "emerald", onboardingVal.villageChest.rewards.lapis, false)

    if (rewardsContentString !== "") {
        OUTPUT_Announce("village_chest_rewards_tutorial", [rewardsContentString])
    } else {
        OUTPUT_Announce("village_chest_rewards_tutorial_excess", [])
    }
}
SNIPPET_PlayerInteracted("pi_village_chest_interacted_onboarding", (playerEntity, interactedEntity, _payload) => {
    OUTPUT_AddVisualState(interactedEntity, "open_chest")
    OUTPUT_SetInteractionState(interactedEntity, false)

    _GrantOnboarindChestResources(playerEntity)
    LISTENFOR_LocalTimer({
        snippet: "lt_fill_onboarding_chest",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        waitTime: onboardingVal.villageChest.const.timeToFillChest,
        payloadEntities: interactedEntity
    })

    if (QUERY_GetGlobalVariable(onboardingVal.villageChest.global.onboardingComplete) === 0) {
        const currentOnboadingStep = QUERY_GetGlobalVariable(onboardingVal.currentOnboardingStep)
        if (currentOnboadingStep >= onboardingOrder.length) {
            return
        }
        Logi("~~~~ " + onboardingOrder[currentOnboadingStep])
        if (onboardingOrder[currentOnboadingStep] === onboardingVal.villageChest.id) {
            IncrementGlobal(onboardingVal.villageChest.global.onboardingComplete)
            _CompleteCurrentOnboardingStep()

            TelemetrySendFunnelEvent(GetAllPlayers(), FunnelSteps.TUTORIAL_OPENCHEST)
        }
    }
})

SNIPPET_LocalTimer("lt_fill_onboarding_chest", (payload) => {
    const chest = RandomEntity(payload.entities)
    OUTPUT_RemoveVisualState(chest, "open_chest")
    OUTPUT_SetInteractionState(chest, true)
})
// ========================= GOLEM ONBOARDING (Modified from Wood Golem) =========================
const _StartWoodGolemOnboarding = () => {}

const _SetupWoodGolemOnboardingTracker = () => {
    OUTPUT_SetTicketCap(TICKET_SPAWN, 0)

    LISTENFOR_BuildingComplete({
        snippet: "bc_golem_spawner",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        includeTags: ["onboardinggolemspawner"]
    })
}

SNIPPET_BuildingComplete("bc_golem_spawner", (spawner, _spawnedUnit) => {
    Logi("bc_golem_spawner Completed")
    if (_IsThisCurrentOnboardingStep(onboardingVal.woodGolem.id)) {
        TelemetrySendFunnelEvent(GetAllPlayers(), FunnelSteps.TUTORIAL_BUILDSPAWNERGOLEM)
        _CompleteCurrentOnboardingStep()
    }

    if (QUERY_GetGlobalVariable(onboardingVal.spawnerInteract.global.finishedIntroVO) > 0) {
        Once()
    } else {
        OUTPUT_SetInteractionState(spawner, false)
    }
})

const _CompleteWoodGolemOnboarding = () => {
    Logi("~~_CompleteGolemOnboarding")
    IncrementGlobal(onboardingVal.woodGolem.global.onboardingComplete)
}
// ========================= SPAWNER INTERACT ONBOARDING =========================
const _StartSpawnerInteractOnboarding = () => {
    IncrementGlobal(onboardingVal.spawnerInteract.global.finishedIntroVO)
    OUTPUT_SetTicketCap(TICKET_SPAWN, 20)

    let allSpawners = QUERY_GetEntitiesWithTags(["onboardinggolemspawner"])
    while (HasEntities(allSpawners)) {
        const spawner = RandomEntity(allSpawners)
        OUTPUT_SetInteractionState(spawner, true)
        allSpawners = OPER_Difference(allSpawners, spawner)
    }
}

const _SetupSpawnerInteractOnboardingTracker = () => {
    _SpawnAttractorFX(onboardingVal.spawnerInteract.id)

    LISTENFOR_EntitySpawned({
        snippet: "es_spawner_interact_onboarding",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        includeTags: ["wood golem"]
    })
    LISTENFOR_EntitySpawned({
        snippet: "es_spawner_interact_onboarding",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        includeTags: ["stone_golem"]
    })

    LISTENFOR_BuildingComplete({
        snippet: "bc_golem_spawner_spawner_interact",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        includeTags: ["onboardinggolemspawner"]
    })

    LISTENFOR_DeconstructionStarted({
        snippet: "ds_removing_spawner",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        includeTags: ["onboardinggolemspawner"]
    })
}

SNIPPET_EntitySpawned("es_spawner_interact_onboarding", (playerMob) => {
    Logi("es_spawner_interact_onboarding Completed")
    IncrementGlobal(onboardingVal.spawnerInteract.global.numOfGolemsToSpawn)
    OUTPUT_ApplyBuff(playerMob, "badger:buff_onboarding")

    switch (QUERY_GetGlobalVariable(onboardingVal.spawnerInteract.global.numOfGolemsToSpawn)) {
        case 1: {
            TelemetrySendFunnelEvent(GetAllPlayers(), FunnelSteps.TUTORIAL_SPAWNGOLEM1)
            break
        }
        case 2: {
            TelemetrySendFunnelEvent(GetAllPlayers(), FunnelSteps.TUTORIAL_SPAWNGOLEM2)
            break
        }
        case 3: {
            TelemetrySendFunnelEvent(GetAllPlayers(), FunnelSteps.TUTORIAL_SPAWNGOLEM3)
            const currentOnboadingStep = QUERY_GetGlobalVariable(onboardingVal.currentOnboardingStep)
            const currentStepOnboardingData = _GetOnboardingData(onboardingOrder[currentOnboadingStep])
            if (currentStepOnboardingData !== undefined) {
                if (currentStepOnboardingData.id === onboardingVal.spawnerInteract.id) {
                    _CompleteCurrentOnboardingStep()
                }
            }
            break
        }
    }
})

SNIPPET_BuildingComplete("bc_golem_spawner_spawner_interact", (spawner, _spawnedUnit) => {
    if (QUERY_GetGlobalVariable(onboardingVal.spawnerInteract.global.onboardingComplete) > 0) {
        Once()
        return
    }
    OUTPUT_SpawnEntityAt(spawner, "badger:fx_attractor_onbording")
})

SNIPPET_DeconstructionStarted("ds_removing_spawner", (deconstructedEntity) => {
    if (QUERY_GetGlobalVariable(onboardingVal.spawnerInteract.global.onboardingComplete) > 0) {
        Once()
        return
    }
    let attractorFX = QUERY_GetEntitiesWithTags(onboardingVal.attractorFxTag)
    if (QUERY_GetEntitiesCount(attractorFX) > 0) {
        attractorFX = FILTER_ByClosest(attractorFX, deconstructedEntity, 1)
        OUTPUT_DespawnEntities(attractorFX)
    }
})

const _CompleteSpawnerInteractOnboarding = () => {
    Logi("~~_CompleteSpawnerInteractOnboarding")
    IncrementGlobal(onboardingVal.spawnerInteract.global.onboardingComplete)

    const firstRallyingPlatform = QUERY_GetEntitiesWithTags(["onboarding_host_structure_island"])
    const rallyingTrigger01 = SpawnTriggerVolume(firstRallyingPlatform, undefined, "badger:spatial_trigger_rallying_onboarding", TEAM_WILD, undefined, true, ["mob", "luredirect"], [], ALLIANCE_FRIENDLY)
    OUTPUT_AddTag(rallyingTrigger01, onboardingVal.rallying.tag.rallyingCircles)
    OUTPUT_AddTag(firstRallyingPlatform, onboardingVal.rallying.tag.rallyingCirclesBuildables)
    const action = QUERY_GetEntitiesWithTags(hosts.action.id)
    OUTPUT_RemoveLeash(action)
    const closestPlayer = FILTER_ByClosest(QUERY_GetAlivePlayers(), firstRallyingPlatform, 1)
    OUTPUT_TeleportAndOrientToEntity(action, firstRallyingPlatform, closestPlayer)
    OUTPUT_SetLeashWithReturnWhenNotTargeting(action, firstRallyingPlatform, 15, 3)
}

// ========================= RALLYING ONBOARDING =========================
const _StartRallyingOnboarding = () => {}

const _SetupFirstRallyingPlatform = () => {
    _SpawnAttractorFX(onboardingVal.rallying.id)
    //OUTPUT_TriggerPresentationEvent(action, hosts.events.fastTravelEvent)
    _TriggerBehaviorOnHost(hosts.action.id, hosts.action.behaviors.beckon)
    LISTENFOR_LocalTimer({
        snippet: "lt_action_beckon",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        waitTime: hosts.action.behaviors.consts.timeToBeckon,
        payloadString: onboardingVal.rallying.id
    })
    const firstRallyingPlatform = QUERY_GetEntitiesWithTags(["onboarding_host_structure_island"])
    const rallyingTrigger01 = SpawnTriggerVolume(firstRallyingPlatform, undefined, "badger:spatial_trigger_rallying_onboarding", TEAM_WILD, undefined, true, ["mob", "luredirect"], [], ALLIANCE_FRIENDLY)
    LISTENFOR_SpatialPartitionEntered({
        snippet: "spe_rallying_trigger_01",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        triggerEntity: rallyingTrigger01
    })

    LISTENFOR_SpatialPartitionExited({
        snippet: "spex_rallying_trigger_01",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        triggerEntity: rallyingTrigger01
    })
}

SNIPPET_SpatialPartitionEntered("spe_rallying_trigger_01", (_triggerEntity, _intruderEntity, _payload) => {
    IncrementGlobal(onboardingVal.rallying.global.mobsOnFirstCircle)
    const mobsOnFirstCircle = QUERY_GetGlobalVariable(onboardingVal.rallying.global.mobsOnFirstCircle)
    if (mobsOnFirstCircle >= onboardingVal.rallying.const.mobsNecessaryOnFirstCircle && QUERY_GetGlobalVariable(onboardingVal.rallying.global.onboardingComplete) === 0) {
        _CompleteCurrentOnboardingStep()
    }
})

SNIPPET_SpatialPartitionExited("spex_rallying_trigger_01", (_triggerEntity, _exitingEntity, _exitReason, _payload) => {
    if (QUERY_GetGlobalVariable(onboardingVal.rallying.global.mobsOnFirstCircle) > 0) {
        DecrementGlobal(onboardingVal.rallying.global.mobsOnFirstCircle)
    }
})

const _SetupRallyingOnboardingTracker = () => {
    _SetupFirstRallyingPlatform()
}

const _CompleteRallyingOnboarding = () => {
    Logi("~~_CompleteRallyingOnboarding")
    IncrementGlobal(onboardingVal.rallying.global.onboardingComplete)
    //Mobs celebration
    TriggerRippleCelebration(QUERY_GetAlivePlayers(), CELEBRATION_NAMES.MOBS)

    TelemetrySendFunnelEvent(GetAllPlayers(), FunnelSteps.TUTORIAL_RALLYGOLEMTOOBJECTIVE)
}

// ========================= STOP RALLYING ONBOARDING =========================
const _StartStopRallyingOnboarding = () => {}

const _SetupStopRallyingboardingTracker = () => {
    LISTENFOR_InfluenceLureChanged({
        snippet: "ilc_hero_stop_rallying_onboarding",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        includeTags: ["mob", "luredirect"],
        excludeTags: ["animal", "neutral"]
    })
}

SNIPPET_InfluenceLureChanged("ilc_hero_stop_rallying_onboarding", (_entity, wasStarted, _payload) => {
    Logi("ilc_hero_stop_rallying_onboarding = " + wasStarted)
    _CompleteCurrentOnboardingStep()
    Once()
})

const _CompleteStopRallyingOnboarding = () => {
    IncrementGlobal(onboardingVal.stopRallying.global.onboardingComplete)
    //Mobs celebration
    TriggerRippleCelebration(QUERY_GetAlivePlayers(), CELEBRATION_NAMES.MOBS)

    TelemetrySendFunnelEvent(GetAllPlayers(), FunnelSteps.TUTORIAL_STOPRALLYING)

    const action = QUERY_GetEntitiesWithTags(hosts.action.id)
    //Move action to the red platform
    const targetLoc = QUERY_GetEntitiesWithTags("onboarding_direct_platform")
    OUTPUT_RemoveLeash(action)
    const closestPlayer = FILTER_ByClosest(QUERY_GetAlivePlayers(), targetLoc, 1)
    OUTPUT_TeleportAndOrientToEntity(action, targetLoc, closestPlayer)
    OUTPUT_SetLeashWithReturnWhenNotTargeting(action, targetLoc, 20, 3)
}

// ========================= DIRECTING ONBOARDING =========================
const _StartDirectingOnboarding = () => {}

const _SetupDirectingPlatform = () => {
    const directingPlatform = QUERY_GetEntitiesWithTags(["onboarding_direct_platform"])
    const directingTriggerV = SpawnTriggerVolume(directingPlatform, undefined, "badger:spatial_trigger_rallying_onboarding", TEAM_WILD, undefined, true, ["mob", "luredirect", onboardingVal.directing.tag.directed], [], ALLIANCE_FRIENDLY)
    OUTPUT_AddTag(directingTriggerV, onboardingVal.directing.tag.directingCircle)

    LISTENFOR_SpatialPartitionEntered({
        snippet: "spe_directing_onboarding",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        triggerEntity: directingTriggerV
    })

    LISTENFOR_InfluenceDirectorChanged({
        snippet: "ilc_hero_directing_onboarding",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        includeTags: ["mob", "luredirect"],
        excludeTags: ["animal", "neutral"]
    })

    _SpawnAttractorFX(onboardingVal.directing.id)
    //OUTPUT_TriggerPresentationEvent(action, hosts.events.fastTravelEvent)
    _TriggerBehaviorOnHost(hosts.action.id, hosts.action.behaviors.beckon)
    LISTENFOR_LocalTimer({
        snippet: "lt_action_beckon",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        waitTime: hosts.action.behaviors.consts.timeToBeckon,
        payloadString: onboardingVal.directing.id
    })
}

SNIPPET_SpatialPartitionEntered("spe_directing_onboarding", (_triggerEntity, _intruderEntity, _payload) => {
    IncrementGlobal(onboardingVal.directing.global.mobsOnDirectingCircle)
    const mobsOnDirectingCircle = QUERY_GetGlobalVariable(onboardingVal.directing.global.mobsOnDirectingCircle)
    Logi("spe_directing_onboarding = " + mobsOnDirectingCircle)
    if (mobsOnDirectingCircle >= onboardingVal.directing.const.mobsNecessaryOnDirectingCircle && QUERY_GetGlobalVariable(onboardingVal.directing.global.onboardingComplete) === 0) {
        _CompleteCurrentOnboardingStep()
        OUTPUT_DespawnEntities(QUERY_GetEntitiesWithTags([onboardingVal.directing.tag.directingCircle]))
    }
})

SNIPPET_InfluenceDirectorChanged("ilc_hero_directing_onboarding", (entity, wasStarted, _payload) => {
    if (!_IsThisCurrentOnboardingStep(onboardingVal.directing.id)) {
        Once()
        return
    }
    if (wasStarted) {
        OUTPUT_AddTag(entity, onboardingVal.directing.tag.directed)
        Logi("Added Tag")
    } else {
        OUTPUT_RemoveTag(entity, onboardingVal.directing.tag.directed)
        Logi("Removed Tag")
    }
})

const _SetupDirectingOnboardingTracker = () => {
    _SetupDirectingPlatform()
}

const _CompleteDirectingOnboarding = () => {
    Logi("~~_CompleteDirectingOnboarding")
    IncrementGlobal(onboardingVal.directing.global.onboardingComplete)
    //Mobs celebration
    TriggerRippleCelebration(QUERY_GetAlivePlayers(), CELEBRATION_NAMES.MOBS)

    TelemetrySendFunnelEvent(GetAllPlayers(), FunnelSteps.TUTORIAL_DIRECTGOLEMTOOBJECTIVE)
}
// ========================= STONE GOLEM ONBOARDING =========================
const _StartStoneGolemOnboarding = () => {
    const recallTarget = QUERY_GetEntitiesWithTags(["onboarding_host_structure_combat"])
    const action = QUERY_GetEntitiesWithTags(hosts.action.id)
    OUTPUT_RemoveLeash(action)
    const closestPlayer = FILTER_ByClosest(QUERY_GetAlivePlayers(), recallTarget, 1)
    OUTPUT_TeleportAndOrientToEntity(action, recallTarget, closestPlayer)
    OUTPUT_SetLeashWithReturnWhenNotTargeting(action, recallTarget, 15, 3)
    const golems = OUTPUT_SpawnEntitiesAt(recallTarget, "badger:mob_golem_stone", 5)
    OUTPUT_SetTeam(golems, TEAM_BLUE)
}

const _SetupStoneGolemOnboardingTracker = () => {
    LISTENFOR_BuildingComplete({
        snippet: "bc_stone_golem_spawner",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        includeTags: ["stonegolemspawner"]
    })
}

SNIPPET_BuildingComplete("bc_stone_golem_spawner", (_spawner, _spawnedUnit) => {
    OUTPUT_SetTicketCap(TICKET_SPAWN, 15)

    LISTENFOR_LocalTimer({
        snippet: "lt_assign_mobs_to_spawner",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        waitTime: 0.5
    })
    Once()
})

SNIPPET_LocalTimer("lt_assign_mobs_to_spawner", (_payload) => {
    const stoneGolems = QUERY_GetEntitiesWithTags(["stone_golem"])
    const stoneGolemSpawner = QUERY_GetEntitiesWithTags(["stonegolemspawner"])
    if (HasEntities(stoneGolems) && HasEntities(stoneGolemSpawner)) {
        OUTPUT_AssignTicketsToMobsIfAble(GetAllPlayers()[0], stoneGolems, "spawn")
        OUTPUT_AssociateMobWithSpawner(RandomEntity(stoneGolemSpawner), stoneGolems)
    }
    _CompleteCurrentOnboardingStep()
})

const _CompleteStoneGolemOnboarding = () => {
    Logi("~~_CompleteStoneGolemOnboarding")
    IncrementGlobal(onboardingVal.stoneGolem.global.onboardingComplete)
}
// ========================= COMBAT ONBOARDING =========================
const _StartCombatOnboarding = () => {
    _ResetBehaviorForAllHosts()
    const actionTelep = QUERY_GetEntitiesWithTags("onboarding_generic_marker_for_hosts_action")
    const knowledgeTelep = QUERY_GetEntitiesWithTags("onboarding_generic_marker_for_hosts_knowledge")
    const teleportor = QUERY_GetEntitiesWithTags("onboarding_world_teleporter_piece")
    const foresightTelep = QUERY_GetEntitiesWithTags("onboarding_generic_marker_for_hosts_foresight")
    const foresightTarget = FILTER_ByClosest(foresightTelep, teleportor, 1)

    const action = QUERY_GetEntitiesWithTags(hosts.action.id)
    const knowledge = QUERY_GetEntitiesWithTags(hosts.knowledge.id)
    const foresight = QUERY_GetEntitiesWithTags(hosts.foresight.id)

    OUTPUT_RemoveLeash(action)
    OUTPUT_RemoveLeash(knowledge)
    OUTPUT_RemoveLeash(foresight)

    const closestPlayer = FILTER_ByClosest(QUERY_GetAlivePlayers(), actionTelep, 1)

    OUTPUT_TeleportAndOrientToEntity(action, actionTelep, closestPlayer)
    OUTPUT_TeleportAndOrientToEntity(knowledge, knowledgeTelep, closestPlayer)
    OUTPUT_TeleportAndOrientToEntity(foresight, foresightTarget, closestPlayer)
    OUTPUT_SetLeashWithReturnWhenNotTargeting(foresight, foresightTarget, 15, 3)

    const combatTarget = QUERY_GetEntitiesWithTags(["onboarding_host_structure_combat"])
    OUTPUT_SetTeam(combatTarget, TEAM_BLUE)
    // Starts Melee onboarding
    OUTPUT_AddOrRemoveTeamResource(TEAM_BLUE, "unlock_onboarding_act0_melee_tut_start", 1, false)
    LISTENFOR_BuildingComplete({
        snippet: "bc_enemy_spawners",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        includeTags: ["barracks"]
    })
    const buildableBlockers = QUERY_GetEntitiesWithTags(["onboarding_buildable_blocker"])
    if (HasEntities(buildableBlockers)) {
        OUTPUT_DespawnEntities(buildableBlockers)
    }
    _SpawnBuildableNearTargetMarker("badger:onboarding_golem_spawner", combatTarget, WEST, -16, -2, 12)
    _SpawnBuildableNearTargetMarker("badger:onboarding_golem_spawner", combatTarget, SOUTH, -4, -2, 21)

    LISTENFOR_EntitySpawned({
        snippet: "es_onboarding_golems",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        includeTags: ["piglin"]
    })

    Logi("~~~bc_onboarding_island_host_structure")

    LISTENFOR_LocalTimer({
        snippet: "lt_remind_to_hit_barracks",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        waitTime: onboardingVal.combat.const.timeToRemindPlayerToAttackBarracks
    })
}

const _SpawnBuildableNearTargetMarker = (buildable, spawnTarget, facingDirection, offsetX, offsetY, offsetZ) => {
    OUTPUT_SpawnBuildableAtWithOffset(buildable, _GetClosestGenericMarker(spawnTarget, false), TEAM_ORANGE, facingDirection, true, false, offsetX, offsetY, offsetZ, CALLBACK_NONE)
}

const _SpawnBuildableNearTarget = (buildable, spawnTarget, facingDirection, offsetX, offsetY, offsetZ) => {
    OUTPUT_SpawnBuildableAtWithOffset(buildable, spawnTarget, TEAM_ORANGE, facingDirection, true, false, offsetX, offsetY, offsetZ, CALLBACK_NONE)
}

SNIPPET_LocalTimer("lt_remind_to_hit_barracks", () => {
    if (QUERY_GetGlobalVariable(onboardingVal.combat.global.hasHitBarracks) === 0 && QUERY_GetGlobalVariable(onboardingVal.combat.global.hasPlayedAllBarracksReminders) < onboardingVal.combat.vo.reminderToAttackBarracks.length) {
        PlayPresentationActionToAll(ChooseFromArray(onboardingVal.combat.vo.reminderToAttackBarracks))
        IncrementGlobal(onboardingVal.combat.global.hasPlayedAllBarracksReminders)
        LISTENFOR_LocalTimer({
            snippet: "lt_remind_to_hit_barracks",
            ownerVillageId: OWNER_VILLAGE_OPT_OUT,
            waitTime: onboardingVal.combat.const.timeToRemindPlayerToAttackBarracks
        })
    }
})

SNIPPET_BuildingComplete("bc_enemy_spawners", (buildableEntity, _payload) => {
    Logi("~~~~ bc_enemy_spawners ~~~~")
    //OUTPUT_SetSpawnerAddLootOverride(buildableEntity, "act1")
    OUTPUT_ApplyBuff(buildableEntity, "badger:buff_onboarding")
    LISTENFOR_HealthChanged({
        snippet: "hc_enemy_spawners_damaged",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        entities: buildableEntity,
        normalizedThreshold: 0.99,
        triggerMode: HEALTH_TRIGGER_MODE.CROSS,
        direction: HEALTH_DIRECTION.DAMAGE
    })
})

SNIPPET_HealthChanged("hc_enemy_spawners_damaged", (_buildable) => {
    IncrementGlobal(onboardingVal.combat.global.hasHitBarracks)
    Once()
})

SNIPPET_EntitySpawned("es_onboarding_golems", (entitySpawned, _payload) => {
    OUTPUT_TriggerPresentationEvent(entitySpawned, "ghost_runt")
    const hostStructure = QUERY_GetEntitiesWithTags(["onboarding_host_structure_combat"])
    OUTPUT_MoveAttackEntity(entitySpawned, hostStructure, CALLBACK_NONE)
    OUTPUT_ApplyBuff(entitySpawned, "badger:buff_onboarding")
})

const _SetupCombatOnboardingTracker = () => {
    LISTENFOR_NonPopCappedEntityDestroyed({
        snippet: "ed_onboarding_corrupted_spawner",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        includeTags: ["onboarding_golem_spawner"],
        despawned: false
    })
}

SNIPPET_NonPopCappedEntityDestroyed("ed_onboarding_corrupted_spawner", (_destroyedEntity, _payload) => {
    IncrementGlobal(onboardingVal.combat.global.numOfSpawnersDestroyed)
    //const waypoint = QUERY_GetEntitiesWithTags("waypoint_combat")
    //if (QUERY_GetEntitiesCount(waypoint) > 0) OUTPUT_DespawnEntities(waypoint)
    if (QUERY_GetGlobalVariable(onboardingVal.combat.global.numOfSpawnersDestroyed) >= 2) {
        _CompleteCurrentOnboardingStep()
        Once()
    }
})

const _CompleteCombatOnboarding = () => {
    Logi("~~_CompleteCombatOnboarding")
    IncrementGlobal(onboardingVal.combat.global.onboardingComplete)

    const enemyGolems = QUERY_GetEntitiesWithTags("piglin")
    if (QUERY_GetEntitiesCount(enemyGolems) > 0) OUTPUT_DamageEntities(enemyGolems, 100)

    //Mobs celebration
    TriggerRippleCelebration(QUERY_GetAlivePlayers(), CELEBRATION_NAMES.MOBS)
    TelemetrySendFunnelEvent(GetAllPlayers(), FunnelSteps.TUTORIAL_DEFEATPIGLINS)
}

// ========================= TELEPORT ONBOARDING =========================
const _StartTeleportOnboarding = () => {}

const _SetupTeleportOnboardingTracker = () => {
    const action = QUERY_GetEntitiesWithTags(hosts.action.id)
    OUTPUT_SetIconOn(action)
    _SpawnAttractorFX(onboardingVal.teleport.id)

    _TriggerBehaviorOnHost(hosts.action.id, hosts.action.behaviors.beckon)
    LISTENFOR_LocalTimer({
        snippet: "lt_action_beckon",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        waitTime: hosts.action.behaviors.consts.timeToBeckon,
        payloadString: onboardingVal.climbPlateau.id
    })
}

SNIPPET_SpatialPartitionEntered("spe_player_reached_teleporter", (triggerEntity, _intruderEntity, _payload) => {
    const currentOnboadingStep = QUERY_GetGlobalVariable(onboardingVal.currentOnboardingStep)
    const currentOnboardingId = onboardingOrder[currentOnboadingStep]
    if (currentOnboardingId === onboardingVal.teleport.id) {
        _CompleteCurrentOnboardingStep()
        OUTPUT_DespawnEntities(triggerEntity)
        Once()
    } else {
        _InterruptBasicsOnboardingMessage()
        OUTPUT_Announce(onboardingVal.teleport.message.skipOnboarding, [])
        IncrementGlobal(onboardingVal.teleport.global.skipOnboarding)
        LISTENFOR_LocalTimer({
            snippet: "lt_skip_onboarding",
            ownerVillageId: OWNER_VILLAGE_OPT_OUT,
            waitTime: onboardingVal.teleport.const.timeToSkipOnboarding
        })
    }
})

SNIPPET_LocalTimer("lt_skip_onboarding", () => {
    if (QUERY_GetGlobalVariable(onboardingVal.teleport.global.skipOnboarding) > 0) {
        const currentOnboadingStep = QUERY_GetGlobalVariable(onboardingVal.currentOnboardingStep)
        const currentOnboardingId = onboardingOrder[currentOnboadingStep]
        if (currentOnboardingId !== onboardingVal.combat.id) {
            _ResetBehaviorForAllHosts()
            const actionTelep = QUERY_GetEntitiesWithTags("onboarding_generic_marker_for_hosts_action")
            const knowledgeTelep = QUERY_GetEntitiesWithTags("onboarding_generic_marker_for_hosts_knowledge")
            const teleportor = QUERY_GetEntitiesWithTags("onboarding_world_teleporter_piece")
            const foresightTelep = QUERY_GetEntitiesWithTags("onboarding_generic_marker_for_hosts_foresight")
            const foresightTarget = FILTER_ByClosest(foresightTelep, teleportor, 1)

            const action = QUERY_GetEntitiesWithTags(hosts.action.id)
            const knowledge = QUERY_GetEntitiesWithTags(hosts.knowledge.id)
            const foresight = QUERY_GetEntitiesWithTags(hosts.foresight.id)

            OUTPUT_RemoveLeash(action)
            OUTPUT_RemoveLeash(knowledge)
            OUTPUT_RemoveLeash(foresight)

            const closestPlayer = FILTER_ByClosest(QUERY_GetAlivePlayers(), actionTelep, 1)
            OUTPUT_TeleportAndOrientToEntity(action, actionTelep, closestPlayer)
            OUTPUT_TeleportAndOrientToEntity(knowledge, knowledgeTelep, closestPlayer)
            OUTPUT_TeleportAndOrientToEntity(foresight, foresightTarget, closestPlayer)

            OUTPUT_SetLeashWithReturnWhenNotTargeting(foresight, foresightTarget, 15, 3)
        }
        _CompleteTeleportOnboarding()
    }
})

SNIPPET_SpatialPartitionExited("spex_player_reached_teleporter", (_triggerEntity, _exitingEntity, _exitReason, _payload) => {
    OUTPUT_SetGlobalVariable(onboardingVal.teleport.global.skipOnboarding, 0)
    const currentOnboadingStep = QUERY_GetGlobalVariable(onboardingVal.currentOnboardingStep)
    const currentOnboardingId = onboardingOrder[currentOnboadingStep]
    if (currentOnboardingId === onboardingVal.teleport.id) {
        return
    }

    const currentStepOnboardingData = _GetOnboardingData(currentOnboardingId)
    _InterruptBasicsOnboardingMessage()
    OUTPUT_Announce(currentStepOnboardingData.message.onboardingMessage, [])
})

const _CompleteTeleportOnboarding = () => {
    Logi("~~_CompleteTeleportOnboarding")
    IncrementGlobal(onboardingVal.teleport.global.onboardingComplete)
    const teleporterPiece = QUERY_GetEntitiesWithTags("onboarding_world_teleporter_piece")
    const player = QUERY_GetAlivePlayers()
    const mount = QUERY_GetEntitiesWithTags("cavalry")
    const firstGroup = OPER_Append(teleporterPiece, player)
    OUTPUT_TriggerCinematic(cinematics.outroNIS, OPER_Append(firstGroup, mount))

    TelemetrySendFunnelEvent(GetAllPlayers(), FunnelSteps.TUTORIAL_COMPLETE)

    LISTENFOR_CinematicFinished({
        snippet: "cf_onboarding_nis_outro",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        cinematicName: cinematics.outroNIS
    })
}

SNIPPET_CinematicFinished("cf_onboarding_nis_outro", () => {
    OUTPUT_TriggerCinematic(cinematics.outroFMV, [])

    LISTENFOR_CinematicFinished({
        snippet: "cf_onboarding_fmv_outro",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        cinematicName: cinematics.outroFMV
    })
    Once()
})

SNIPPET_CinematicFinished("cf_onboarding_fmv_outro", () => {
    LISTENFOR_LocalTimer({
        snippet: "lt_exit_onboarding",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        waitTime: 1
    })
    Once()
})

SNIPPET_LocalTimer("lt_exit_onboarding", () => {
    _exitOnboarding()
    Once()
})

const _exitOnboarding = () => {
    Logi("~~~~~ Daniel tech to go to campagin ~~~~~")
    OUTPUT_HaveClientExitTutorial(QUERY_GetAlivePlayers())
}

//==========================================================================================================================================
SNIPPET_RuleInitialized(GAME_RULE_NAMES.GAME_MODE, (ruleValue) => {
    if (ruleValue.value === "onboarding") {
        OUTPUT_TriggerCinematic(cinematics.introFMV, [])
        //Wait for The Coming War cinematic to finish, before playing Opening transition NIS
        LISTENFOR_CinematicFinished({
            snippet: "cf_onboarding_fmv_intro",
            ownerVillageId: OWNER_VILLAGE_OPT_OUT,
            cinematicName: cinematics.introFMV
        })
        LISTENFOR_VillageGenerated({
            snippet: "vg_onboarding",
            ownerVillageId: OWNER_VILLAGE_OPT_OUT,
            factionName: onboardingVal.onboardingFaction
        })
        LISTENFOR_ExternalEvent({
            snippet: "ee_start_basics_onboarding",
            ownerVillageId: OWNER_VILLAGE_OPT_OUT,
            eventName: "start_basics_onboarding"
        })

        LISTENFOR_ExternalEvent({
            snippet: "ee_skip_current_onboarding",
            ownerVillageId: OWNER_VILLAGE_OPT_OUT,
            eventName: "complete_current_step"
        })

        LISTENFOR_ExternalEvent({
            snippet: "ee_skip_to_teleporter",
            ownerVillageId: OWNER_VILLAGE_OPT_OUT,
            eventName: "skip_to_teleporter"
        })

        LISTENFOR_BuildingComplete({
            snippet: "bc_central_onboarding_piece",
            ownerVillageId: OWNER_VILLAGE_OPT_OUT,
            includeTags: [onboardingVal.centralOnboardingPieceTag]
        })
        OUTPUT_SetSkyState(onboardingVal.skyState)
        OUTPUT_AddOrRemoveTeamResource(TEAM_BLUE, "lure_unlock", -1, false)
        OUTPUT_AddOrRemoveTeamResource(TEAM_BLUE, "direct_unlock", -1, false)

        //Telemetry
        OUTPUT_CollectTelemetryInfo("GameAct", "Onboarding")
        OUTPUT_TelemetryRecordGameZoneData(GetAllPlayers(), 10, "Onboarding")
    }
})
SNIPPET_LocalTimer("lt_action_beckon", (payload) => {
    const currentOnboardingID = QUERY_GetGlobalVariable(onboardingVal.currentOnboardingStep)
    const onboardingId = onboardingOrder[currentOnboardingID]
    //Only repeat the beckon animation if we haven't moved on to the next step
    if (onboardingId === payload.string) {
        _TriggerBehaviorOnHost(hosts.action.id, hosts.action.behaviors.beckon)

        LISTENFOR_LocalTimer({
            snippet: "lt_action_beckon",
            ownerVillageId: OWNER_VILLAGE_OPT_OUT,
            waitTime: hosts.action.behaviors.consts.timeToBeckon,
            payloadString: onboardingId
        })
    }
})

SNIPPET_CinematicFinished("cf_onboarding_fmv_intro", () => {
    _playIntroNIS()
    //Wait for The Coming War cinematic to finish, before playing Opening transition NIS
    LISTENFOR_CinematicFinished({
        snippet: "cf_onboarding_nis_intro",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        cinematicName: cinematics.introNIS
    })

    //Telemetry
    OUTPUT_TelemetryRecordGameZoneData(GetAllPlayers(), 10, "Onboarding")
    Once()
})

SNIPPET_ExternalEvent("ee_start_basics_onboarding", () => {
    OUTPUT_PlacementStart()
    OUTPUT_PlacementSetPrimaryProximityRule(QUERY_GetAlivePlayers(), 11, 15)
    if (OUTPUT_PlacementExecute()) {
        OUTPUT_SpawnVillage(QUERY_PlacementResultPosition(), "badger:onboarding_village", VILLAGE_SIZE_DEFAULT, "faction.onboarding", TEAM_BLUE)
    }
    /*
    _HideBasicsOnboardingHUD()
    _StartNextOnboardingStep()
    */
})

SNIPPET_ExternalEvent("ee_skip_current_onboarding", () => {
    _CompleteCurrentOnboardingStep()
})

SNIPPET_ExternalEvent("ee_skip_to_teleporter", () => {
    _SetupTeleportOnboardingTracker()
})

SNIPPET_ExternalEvent("spawn_rallying_platform", () => {
    _StartDirectingOnboarding()
    OUTPUT_SpawnPlayerBuildable(GetPlayers(), "badger:temp_onboarding_spawn_ticket", NORTH, false, GetPlayers(), false)
})

SNIPPET_BuildingComplete("bc_central_onboarding_piece", (buildableEntity, _payload) => {
    OUTPUT_SetInteractionState(buildableEntity, false)

    const respawnPointEntity = QUERY_GetEntitiesWithTags(["respawn_point"])
    OUTPUT_FlagEntityAsVisited(respawnPointEntity)
})
//VILLAGE GEN
SNIPPET_VillageGenerated("vg_onboarding", (villageId, _payload) => {
    const baseDeck = DECK_Empty()

    const centerLayer = LayerOfZonesCard("addLayerOfZones", 3)
    DECK_MultiplyByMultipleRules(centerLayer, [PlacementPreferenceCard(PLACEMENT_CLOSE_TO_VILLAGE_START)])
    DECK_PutOnBottomOf(centerLayer, baseDeck)

    const centerZone = ZonesCard("addZone", 5)

    const centralPiece = BuildableCard("onboardingWorldCentralPiece", 1)
    DECK_MultiplyByMultipleRules(centralPiece, [PlacementPreferenceCard(PLACEMENT_CLOSE_TO_VILLAGE_START)])
    DECK_PutOnBottomOf(centerZone, baseDeck)
    DECK_PutOnBottomOf(centralPiece, baseDeck)

    OUTPUT_SetNamedDeck(INSTANT_BUILD_DECK_NAME + villageId, baseDeck)
})

SNIPPET_CinematicFinished("cf_onboarding_nis_intro", () => {
    Logi("@@@@  cf_onboarding_nis_intro @@@@")
    const action = QUERY_GetEntitiesWithTags(hosts.action.id)
    const attractoPlacement = QUERY_GetEntitiesWithTags("attractorPlacement")
    const activeAttractorPlacement = FILTER_ByClosest(attractoPlacement, action, 1)
    OUTPUT_SetLeashWithReturnWhenNotTargeting(action, activeAttractorPlacement, 15, 3)
    LISTENFOR_LocalTimer({
        snippet: "lt_start_onboarding",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        waitTime: 3
    })
    _InitializeHosts()
    TelemetrySendFunnelEvent(GetAllPlayers(), FunnelSteps.TUTORIAL_START)
    const villageChest = QUERY_GetEntitiesWithTags("village_treasure_chest_interact")
    if (HasEntities(villageChest)) {
        OUTPUT_SetInteractionState(villageChest, false)
    }
    Once()
})

SNIPPET_LocalTimer("lt_start_onboarding", () => {
    _PlayIntroNisVO()
})

const _InitializeHosts = () => {
    if (DoOnce(hosts.haveBeenInitialized)) {
        const allHosts = QUERY_GetEntitiesWithTags("host")
        const action = QUERY_GetEntitiesWithTags(hosts.action.id)
        _TriggerBehaviorOnHost(hosts.action.id, hosts.action.behaviors.beckon)
        LISTENFOR_LocalTimer({
            snippet: "lt_action_beckon",
            ownerVillageId: OWNER_VILLAGE_OPT_OUT,
            waitTime: hosts.action.behaviors.consts.timeToBeckon,
            payloadString: onboardingVal.moveToAction.id
        })
        OUTPUT_TriggerPresentationEvent(action, hosts.events.removeSkinsEvent)
        OUTPUT_AddWaypointIconByExistingEntityArchetype(hosts.action.misc.waypointMarker, action)

        const foresight = QUERY_GetEntitiesWithTags(hosts.foresight.id)
        OUTPUT_RemoveLeash(foresight)
        const firstRallyingPlatform = QUERY_GetEntitiesWithTags(["onboarding_host_structure_island"])
        const foresightMarkers = QUERY_GetEntitiesWithTags("onboarding_generic_marker_for_hosts_foresight")
        const target = FILTER_ByClosest(foresightMarkers, firstRallyingPlatform, 1)

        const closestPlayer = FILTER_ByClosest(QUERY_GetAlivePlayers(), target, 1)
        OUTPUT_TeleportAndOrientToEntity(foresight, target, closestPlayer)

        OUTPUT_SetLeashWithReturnWhenNotTargeting(foresight, target, 15, 3)
        OUTPUT_TriggerPresentationEvent(foresight, hosts.events.removeSkinsEvent)

        const knowledge = QUERY_GetEntitiesWithTags(hosts.knowledge.id)
        OUTPUT_RemoveLeash(knowledge)
        OUTPUT_SetBehavior(knowledge, hosts.knowledge.behaviors.follow)
        OUTPUT_TriggerPresentationEvent(knowledge, hosts.events.removeSkinsEvent)

        OUTPUT_ApplyBuff(allHosts, "badger:buff_onboarding")
        OUTPUT_ApplyBuff(GetAllPlayers(), "badger:buff_onboarding")
        OUTPUT_ApplyBuff(QUERY_GetEntitiesWithTags("cavalry"), "badger:buff_onboarding")
    }
}
