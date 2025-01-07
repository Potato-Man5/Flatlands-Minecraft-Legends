const animalsGatheringVal = {
    pig: {
        gatheringMobTag: "gathering_pig",
        gatheringBehaviour: "badger:behavior_animal_pig_mudpool"
    }
}

SNIPPET_Bootstrap("", () => {
    LISTENFOR_EntitySpawned({
        snippet: "es_set_behaviour_to_gathering_pigs",
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        includeTags: [animalsGatheringVal.pig.gatheringMobTag]
    })
})

SNIPPET_EntitySpawned("es_set_behaviour_to_gathering_pigs", (spawnedAnimal) => {
    OUTPUT_SetBehavior(spawnedAnimal, animalsGatheringVal.pig.gatheringBehaviour)
})
