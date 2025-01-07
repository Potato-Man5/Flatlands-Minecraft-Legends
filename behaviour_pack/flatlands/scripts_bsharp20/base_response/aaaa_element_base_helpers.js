const elementDistricts = {
    northeastDistrict: {
        name: "piglinNorthEastDistrict",
        card: "piglinNorthEastDistrict",
        id: 4,
        zoneTag: "northEastElement",
        placement: "placeInDirectionNorthEastWithRectangleBrush15",
        spacer: true,
        deck: DECK_Empty()
    },
    southwestDistrict: {
        name: "piglinNorthWestDistrict",
        card: "piglinNorthWestDistrict",
        id: 6,
        zoneTag: "southWestElement",
        placement: "placeInDirectionSouthWestWithRectangleBrush15",
        spacer: true,
        deck: DECK_Empty()
    },
    northwestDistrict: {
        name: "piglinSouthWestDistrict",
        card: "piglinSouthWestDistrict",
        id: 7,
        zoneTag: "northWestElement",
        placement: "placeInDirectionNorthWestWithRectangleBrush15",
        spacer: false,
        deck: DECK_Empty()
    },
    southeastDistrict: {
        name: "piglinSouthEastDistrict",
        card: "piglinSouthEastDistrict",
        id: 5,
        zoneTag: "southEastElement",
        placement: "placeInDirectionSouthEastWithRectangleBrush15",
        spacer: false,
        deck: DECK_Empty()
    },
    northDistrict: {
        name: "piglinNorthDistrict",
        card: "piglinNorthDistrict",
        id: 0,
        zoneTag: "northElement",
        placement: "placeInDirectionNorthWithRectangleBrush15",
        spacer: false,
        deck: DECK_Empty()
    },
    eastDistrict: {
        name: "piglinEastDistrict",
        card: "piglinEastDistrict",
        id: 1,
        zoneTag: "eastElement",
        placement: "placeInDirectionEastWithRectangleBrush15",
        spacer: false,
        deck: DECK_Empty()
    },
    southDistrict: {
        name: "piglinSouthDistrict",
        card: "piglinSouthDistrict",
        id: 2,
        zoneTag: "southElement",
        placement: "placeInDirectionSouthWithRectangleBrush15",
        spacer: false,
        deck: DECK_Empty()
    },
    westDistrict: {
        name: "piglinWestDistrict",
        card: "piglinWestDistrict",
        id: 3,
        zoneTag: "westElement",
        placement: "placeInDirectionWestWithRectangleBrush15",
        spacer: false,
        deck: DECK_Empty()
    }
}

const raisedPlatformElementsSmall = [
    {
        name: PIGLIN_BASE_ELEMENTS.RAISED_PLATFORM,
        zoneHeights: ["elementHeight4", "elementHeight0", "elementHeight5", "elementHeight6", "elementHeight0", "elementHeight8", "elementHeight8", "elementHeight0"],
        partialZoneHeights: ["elementHeight4", "elementHeight5", "elementHeight6", "elementHeight7"]
    }
]

const raisedPlatformElementsMedium = [
    {
        name: PIGLIN_BASE_ELEMENTS.RAISED_PLATFORM,
        zoneHeights: ["elementHeight5", "elementHeight0", "elementHeight6", "elementHeight0", "elementHeight8", "elementHeight8", "elementHeight8"],
        partialZoneHeights: ["elementHeight4", "elementHeight5", "elementHeight6", "elementHeight7"]
    }
]

const raisedPlatformElementsLarge = [
    {
        name: PIGLIN_BASE_ELEMENTS.RAISED_PLATFORM,
        zoneHeights: ["elementHeight0", "elementHeight5", "elementHeight0", "elementHeight8", "elementHeight8", "elementHeight0", "elementHeight9", "elementHeight9"],
        partialZoneHeights: ["elementHeight4", "elementHeight5", "elementHeight6", "elementHeight8"]
    }
]

const raisedPlatformElementsMobAlliance = [
    {
        name: PIGLIN_BASE_ELEMENTS.RAISED_PLATFORM,
        zoneHeights: ["elementHeight0", "elementHeight5", "elementHeight0", "elementHeight8", "elementHeight8", "elementHeight0", "elementHeight9", "elementHeight9"],
        partialZoneHeights: ["elementHeight4", "elementHeight5", "elementHeight6", "elementHeight8"]
    }
]
