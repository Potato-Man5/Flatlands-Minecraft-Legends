/**
 * This file is resonsible playing VO related to witches and village attacks. It's to help
 * the player understand how they're unlocked and can be utilized within their campaign.
 */

const witchVillageAttackVal = {
    delayUntilDefenseFailedVo: 6,
    VO: {
        witchesFailWhilePlayerIsPresent: "witches_fail_village_attack_while_players_present",
        witchesSuccessWhilePlayerIsAway: "witches_succeed_village_attack_while_players_away",
        witchesFailWhilePlayerIsAway: "witches_fail_village_attack_while_players_away"
    },
    global: {
        witchesFailWhilePlayerIsPresent: "gv_played_witches_fail_village_attack_while_players_present",
        witchesSuccessWhilePlayerIsAway: "gv_played_witches_succeed_village_attack_while_players_away",
        witchesFailWhilePlayerIsAway: "gv_played_witches_fail_village_attack_while_players_away"
    }
}

// When we start a campaign game, listen for when Act 2 starts
SNIPPET_InheritsFromGameMode("campaign", () => {
    //If the player has disabled witches in their campaign, then stop this chain of events from spawning them
    if (witchHutEnabled.defaultValue === 1) {
        // Listen for when Act 2 starts to set up VO for village attacks
        LISTENFOR_GlobalVariableChanged({
            variableName: GV_STARTED_ACT_2,
            ownerVillageId: OWNER_VILLAGE_OPT_OUT,
            snippet: "enable_witch_campaign_vo"
        })
    }
})

// Hook up witch VO when we start Act 2
SNIPPET_GlobalVariableChanged("enable_witch_campaign_vo", (_oldValue, newValue, _payload) => {
    // Don't perform this logic if we're setting the new value to zero (for some hypothetical debugging scenario)
    if (newValue === 0) {
        return
    }

    LISTENFOR_InvasionAttackV2Ended({
        ownerVillageId: OWNER_VILLAGE_OPT_OUT,
        snippet: "iae_handle_witch_vo"
    })
})

// When the player fails to defend a village, play some VO indicating that they have not gained the witches
SNIPPET_InvasionAttackV2Ended("iae_handle_witch_vo", (invasionData, _success, _payload) => {
    // If the player's team has unlocked the witches, we don't need to perfom this logic anymore
    if (QUERY_GetGlobalVariable("gv_witch_unlocked") >= 1) {
        Once()
        return
    }

    const villageId = invasionData.villageId
    const structures = GetVillageCentralStructures(villageId)
    if (!HasEntities(structures)) {
        return
    }
    const centralStructure = RandomEntity(structures)
    const defenseSuccess = !(QUERY_IsVillageDestroyed(villageId) || QUERY_IsEntityDisabled(centralStructure) || QUERY_IsVillageOccupied(villageId))
    const arePlayersPresentInTheVillage = QUERY_VillagePlayerPresenceCount(villageId) > 0

    //If players are in the villages, there's no need to play a VO on success and on fail, we should wait for the NIS to finish
    if (arePlayersPresentInTheVillage) {
        if (!defenseSuccess) {
            LISTENFOR_CinematicFinished({
                snippet: "cf_play_defense_failed_vo",
                ownerVillageId: villageId,
                cinematicName: "vil01_c09w_fountain_disable"
            })
        }
    } //Otherwise, play success or fail VOs accordingly
    else {
        if (defenseSuccess) {
            if (DoOnce(witchVillageAttackVal.global.witchesSuccessWhilePlayerIsAway)) {
                PlayPresentationActionToAll(witchVillageAttackVal.VO.witchesSuccessWhilePlayerIsAway)
            }
        } else {
            if (DoOnce(witchVillageAttackVal.global.witchesFailWhilePlayerIsAway)) {
                PlayPresentationActionToAll(witchVillageAttackVal.VO.witchesFailWhilePlayerIsAway)
            }
        }
    }
    const playedAllVOs = QUERY_GetGlobalVariable(witchVillageAttackVal.global.witchesSuccessWhilePlayerIsAway) > 0 && QUERY_GetGlobalVariable(witchVillageAttackVal.global.witchesFailWhilePlayerIsAway) > 0 && QUERY_GetGlobalVariable(witchVillageAttackVal.global.witchesFailWhilePlayerIsPresent) > 0
    if (playedAllVOs) {
        Once()
    }
})

SNIPPET_CinematicFinished("cf_play_defense_failed_vo", (payload) => {
    LISTENFOR_LocalTimer({
        snippet: "lt_play_defense_failed_witches_while_players_are_present",
        ownerVillageId: payload.ownerVillageId,
        waitTime: witchVillageAttackVal.delayUntilDefenseFailedVo
    })
})

SNIPPET_LocalTimer("lt_play_defense_failed_witches_while_players_are_present", (payload) => {
    if (DoOnce(witchVillageAttackVal.global.witchesFailWhilePlayerIsPresent)) {
        const players = QUERY_GetPlayersInVillage(payload.ownerVillageId)
        if (HasEntities(players)) {
            PlayPresentationActionToPlayers(witchVillageAttackVal.VO.witchesFailWhilePlayerIsPresent, players)
        } else {
            PlayPresentationActionToAll(witchVillageAttackVal.VO.witchesFailWhilePlayerIsPresent)
        }
    }
})
