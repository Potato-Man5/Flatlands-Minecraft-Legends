// custom scripts for flatlands

const VILLAGE_SIZE_DEBUG = "debug"

SNIPPET_InheritsFromGameMode("editor", () => {
    LISTENFOR_VillageGenerated({
        snippet: "vg_editor",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        factionName: FACTION_NAME_ATTACK,
        villageSize: VILLAGE_SIZE_DEBUG
    })

    LISTENFOR_VillageGenerated({
        snippet: "vg_editor",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        factionName: FACTION_NAME_DEFEND,
        villageSize: VILLAGE_SIZE_DEBUG
    })

    LISTENFOR_VillageGenerated({
        snippet: "vg_editor",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        factionName: FACTION_NAME_OBSTACLE,
        villageSize: VILLAGE_SIZE_DEBUG
    })

    LISTENFOR_PlayersReady({
        snippet: "pr_editor",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT
    })
})

SNIPPET_PlayersReady("pr_editor", () => {
    // create three invisible villages that `/pv` can use right away.
    const player = GetPlayers()
    OUTPUT_SpawnVillage(player, "badger:piglin_attack", VILLAGE_SIZE_DEBUG, FACTION_NAME_ATTACK, TEAM_ORANGE)
    OUTPUT_SpawnVillage(player, "badger:piglin_defend", VILLAGE_SIZE_DEBUG, FACTION_NAME_DEFEND, TEAM_ORANGE)
    OUTPUT_SpawnVillage(player, "badger:piglin_obstacle", VILLAGE_SIZE_DEBUG, FACTION_NAME_OBSTACLE, TEAM_ORANGE)
})

SNIPPET_VillageGenerated("vg_editor", (villageId) => {
    const baseDeck = DECK_Empty()

    // note: can be any card
    const portal = BuildableCard("piglinVillageAttackSpawnLocation")
    DECK_MultiplyByMultipleRules(portal, [PlacementPreferenceCard(PLACEMENT_CLOSE_TO_VILLAGE_START), ZoneFilterCard("placeInsideVillageAlways"), ForceBuildingPlacementCard("forceBuildingPlacement")])

    // intentionally do not place a zone so the buildable fails to place (this avoids the assert as a card was drawn.)
    // const firstZone = ZonesCard("addZone", 1)
    // DECK_PutOnBottomOf(firstZone, baseDeck)

    //buildings
    DECK_PutOnBottomOf(portal, baseDeck)

    // SetupBasicVillageClearingCards(baseDeck)

    OUTPUT_SetNamedDeck(INSTANT_BUILD_DECK_NAME + villageId, baseDeck)
})
