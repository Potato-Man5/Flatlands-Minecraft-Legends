/* eslint-disable @typescript-eslint/no-unused-vars */

// order matters for array below
const buildBaseSizes = [BASE_SIZE_LARGE, BASE_SIZE_MEDIUM, BASE_SIZE_SMALL] //TODO: Jesse Replace with boss base size

const BuildCard = (type, count) => {
    if (count !== undefined) {
        return DECK_MakeFromLibraryFilteredWithCopies("buildCosts", type, count)
    } else {
        return DECK_MakeFromLibraryFiltered("buildCosts", type)
    }
}

const BuildableCard = (type, count) => {
    if (count !== undefined) {
        return DECK_MakeFromLibraryFilteredWithCopies("buildable_card_library", type, count)
    } else {
        return DECK_MakeFromLibraryFiltered("buildable_card_library", type)
    }
}

const HangingDecorationCard = (type, count) => {
    if (count !== undefined) {
        return DECK_MakeFromLibraryFilteredWithCopies("hanging_decoration_card_library", type, count)
    } else {
        return DECK_MakeFromLibraryFiltered("hanging_decoration_card_library", type)
    }
}

const DistrictCard = (type, count) => {
    if (count !== undefined) {
        return DECK_MakeFromLibraryFilteredWithCopies("district_card_library", type, count)
    } else {
        return DECK_MakeFromLibraryFiltered("district_card_library", type)
    }
}

const PathCard = (type, count) => {
    if (count !== undefined) {
        return DECK_MakeFromLibraryFilteredWithCopies("path_card_library", type, count)
    } else {
        return DECK_MakeFromLibraryFiltered("path_card_library", type)
    }
}

const CreatePathRequestOnBottomOf = (type, pathStartArrayOfRules, pathEndArrayOfRules, destDeck) => {
    const pathStartCard = PathCard(type)
    DECK_MultiplyByMultipleRules(pathStartCard, pathStartArrayOfRules)

    const pathEndCard = PathCard(type)
    DECK_MultiplyByMultipleRules(pathEndCard, pathEndArrayOfRules)

    DECK_PutOnBottomOf(pathStartCard, destDeck)
    DECK_PutOnBottomOf(pathEndCard, destDeck)
}

const CreatePathFromZoneRequestOnBottomOf = (type, pathStartArrayOfRules, destDeck) => {
    const pathStartCard = PathCard(type)
    DECK_MultiplyBySingle(pathStartCard, PlacementPreferenceCard("connectToPath"))
    DECK_MultiplyByMultipleRules(pathStartCard, pathStartArrayOfRules)

    DECK_PutOnBottomOf(pathStartCard, destDeck)
}

const PlacementPreferenceCard = (type, count) => {
    if (count !== undefined) {
        return DECK_MakeFromLibraryFilteredWithCopies("placement_preference_card_library", type, count)
    } else {
        return DECK_MakeFromLibraryFiltered("placement_preference_card_library", type)
    }
}

const ZoneFilterCard = (type, count) => {
    if (count !== undefined) {
        return DECK_MakeFromLibraryFilteredWithCopies("zone_filter_card_library", type, count)
    } else {
        return DECK_MakeFromLibraryFiltered("zone_filter_card_library", type)
    }
}

const ZoneTagCard = (type, count) => {
    if (count !== undefined) {
        return DECK_MakeFromLibraryFilteredWithCopies("zone_tag_card_library", type, count)
    } else {
        return DECK_MakeFromLibraryFiltered("zone_tag_card_library", type)
    }
}

const ZoneHeightChangeCard = (type, count) => {
    if (count !== undefined) {
        return DECK_MakeFromLibraryFilteredWithCopies("zone_height_change_card_library", type, count)
    } else {
        return DECK_MakeFromLibraryFiltered("zone_height_change_card_library", type)
    }
}

const TagCard = (type, count) => {
    if (count !== undefined) {
        return DECK_MakeFromLibraryFilteredWithCopies("tag_card_library", type, count)
    } else {
        return DECK_MakeFromLibraryFiltered("tag_card_library", type)
    }
}

const HeartCard = () => {
    return DECK_MakeFromLibrary("heart_card_library")
}

const MoatCard = (type, count) => {
    if (count !== undefined) {
        return DECK_MakeFromLibraryFilteredWithCopies("moat_card_library", type, count)
    } else {
        return DECK_MakeFromLibraryFiltered("moat_card_library", type)
    }
}

const WallsCard = (type, count) => {
    if (count !== undefined) {
        return DECK_MakeFromLibraryFilteredWithCopies("walls_card_library", type, count)
    } else {
        return DECK_MakeFromLibraryFiltered("walls_card_library", type)
    }
}

const ZonesCard = (type, count) => {
    if (count !== undefined) {
        return DECK_MakeFromLibraryFilteredWithCopies("zones_card_library", type, count)
    } else {
        return DECK_MakeFromLibraryFiltered("zones_card_library", type)
    }
}

const LayerOfZonesCard = (type, count) => {
    if (count !== undefined) {
        return DECK_MakeFromLibraryFilteredWithCopies("layer_of_zones_card_library", type, count)
    } else {
        return DECK_MakeFromLibraryFiltered("layer_of_zones_card_library", type)
    }
}

const TerrainWeatheringCard = (type, count) => {
    if (count !== undefined) {
        return DECK_MakeFromLibraryFilteredWithCopies("terrain_weathering_card_library", type, count)
    } else {
        return DECK_MakeFromLibraryFiltered("terrain_weathering_card_library", type)
    }
}

const EntityClearingCard = (type, count) => {
    if (count !== undefined) {
        return DECK_MakeFromLibraryFilteredWithCopies("entity_clearing_card_library", type, count)
    } else {
        return DECK_MakeFromLibraryFiltered("entity_clearing_card_library", type)
    }
}

const ForceBuildingPlacementCard = (type, count) => {
    if (count !== undefined) {
        return DECK_MakeFromLibraryFilteredWithCopies("force_building_placement_card_library", type, count)
    } else {
        return DECK_MakeFromLibraryFiltered("force_building_placement_card_library", type)
    }
}

const AppearanceOverrideCard = (type, count) => {
    if (count !== undefined) {
        return DECK_MakeFromLibraryFilteredWithCopies("appearance_override_card_library", type, count)
    } else {
        return DECK_MakeFromLibraryFiltered("appearance_override_card_library", type)
    }
}

const StepwiseGenerationCard = (type, count) => {
    if (count !== undefined) {
        return DECK_MakeFromLibraryFilteredWithCopies("stepwise_generation_card_library", type, count)
    } else {
        return DECK_MakeFromLibraryFiltered("stepwise_generation_card_library", type)
    }
}

const StompPlayerStructuresCard = (type, count) => {
    if (count !== undefined) {
        return DECK_MakeFromLibraryFilteredWithCopies("stomp_player_structures_card_library", type, count)
    } else {
        return DECK_MakeFromLibraryFiltered("stomp_player_structures_card_library", type)
    }
}

//  returns deck of buildings for size-phase (and no other), without shuffling
const MakeAbsolutePhaseBuildDeck = (factionData, baseSize, phase) => {
    const outputDeck = DECK_Empty()
    const list = factionData[phase][baseSize]
    _AddBuildingsToDeck(outputDeck, list)
    return outputDeck
}

const _AddBuildingsToDeck = (destDeck, list) => {
    list.forEach((buildingEntry) => {
        let deck
        if (buildingEntry.length === 2) {
            deck = BuildCard(buildingEntry[0], buildingEntry[1])
        } else if (buildingEntry.length === 3) {
            deck = BuildCard(buildingEntry[0], buildingEntry[1])
            buildingEntry[2].forEach((tags) => {
                DECK_MultiplyBySingle(deck, TagCard(tags))
            })
        } else {
            deck = BuildCard(buildingEntry)
        }
        DECK_PutOnTopOf(deck, destDeck)
    })
}

const _AddBuildablesToDeck = (destDeck, list, villageId) => {
    list.forEach((buildingEntry) => {
        let deck = null
        if (buildingEntry.length === 2) {
            deck = BuildableCard(buildingEntry[0], buildingEntry[1])
        } else if (buildingEntry.length === 3) {
            deck = BuildableCard(buildingEntry[0], buildingEntry[1])
            buildingEntry[2].forEach((tag) => {
                DECK_MultiplyBySingle(deck, TagCard(tag))
            })
        } else {
            // if this is a function call it
            if (buildingEntry && buildingEntry.constructor && buildingEntry.call && buildingEntry.apply) {
                const value = buildingEntry(villageId)
                if (value !== null) {
                    deck = BuildableCard(value[0], value[1])
                }
            } else {
                deck = BuildableCard(buildingEntry)
            }
        }
        if (deck !== null) {
            DECK_PutOnTopOf(deck, destDeck)
        }
    })
}

const CreateBuildableGenMinidecksForSize = (nameList, factionData, baseSize, villageId, group = null) => {
    const miniDecks = {}
    nameList.forEach((type) => {
        miniDecks[type] = DECK_Empty()
    })

    const factionSizeData = factionData[baseSize]
    if (factionSizeData === undefined) {
        Loge(`CreateBuildableGenMinidecksForSize no entry in factionData for base size of ${baseSize}`)
        return miniDecks
    }

    //if the base is a boss base don't layer other sizes
    nameList.forEach((type) => {
        const list = factionSizeData[type]
        if (list === undefined) {
            Logi(`Error: ${type} missing from factiondata but is present in namelist`)
        } else {
            _AddBuildablesToDeck(miniDecks[type], list, villageId)
        }
    })

    if (group !== null) {
        nameList.forEach((type) => {
            DECK_ShuffleGroup(miniDecks[type], group)
        })
    }
    return miniDecks
}

const CreateBuildableGenMiniDecks = (nameList, factionData, baseSize, villageId, group = null) => {
    const miniDecks = {}
    nameList.forEach((type) => {
        miniDecks[type] = DECK_Empty()
    })
    let sizeFound = false
    buildBaseSizes.forEach((testSize) => {
        if (sizeFound || testSize === baseSize) {
            sizeFound = true
            nameList.forEach((type) => {
                const list = factionData[testSize][type]
                _AddBuildablesToDeck(miniDecks[type], list, villageId)
            })
        }
    })
    if (group !== null) {
        nameList.forEach((type) => {
            DECK_ShuffleGroup(miniDecks[type], group)
        })
    }

    return miniDecks
}

const SetupBasicVillageClearingCards = (mainDeck) => {
    Logi("basic clear")
    DECK_PutOnTopOf(EntityClearingCard("clearPiglinInvisibleSpawners"), mainDeck)
    DECK_PutOnTopOf(EntityClearingCard("clearPiglins"), mainDeck)
    DECK_PutOnTopOf(EntityClearingCard("clearAnimalSpawners"), mainDeck)
    DECK_PutOnTopOf(EntityClearingCard("clearAnimals"), mainDeck)
    DECK_PutOnTopOf(EntityClearingCard("clearWorldMobSpawners"), mainDeck)
}

const SetupWoFClearingCards = (mainDeck) => {
    Logi("wof clear")
    DECK_PutOnTopOf(EntityClearingCard("clearVillagers"), mainDeck)
    DECK_PutOnTopOf(EntityClearingCard("clearAlliedMobs"), mainDeck)
    DECK_PutOnTopOf(EntityClearingCard("clearPiglinInvisibleSpawners"), mainDeck)
    DECK_PutOnTopOf(EntityClearingCard("clearPiglins"), mainDeck)
    DECK_PutOnTopOf(EntityClearingCard("clearAnimalSpawners"), mainDeck)
    DECK_PutOnTopOf(EntityClearingCard("clearAnimals"), mainDeck)
    DECK_PutOnTopOf(EntityClearingCard("clearWorldMobSpawners"), mainDeck)
}
