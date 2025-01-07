/* eslint-disable @typescript-eslint/no-unused-vars */
const GlobalOnboardingVal = {
    isCampaignOnboardingMessageUp: "gv_is_campaign_onboarding_message_up",
    isBasicsOnboardingMessageUp: "gv_is_basics_onboarding_message_up"
}

const SetTutorialFlag = (name, enabled) => {
    OUTPUT_AddOrRemoveTeamResource(TEAM_BLUE, name, enabled ? 1 : 0, false)
}

const GetTutorialFlag = (name) => {
    return QUERY_GetTeamResource(TEAM_BLUE, name) === 0 ? false : true
}

const DoTutorialFlagOnce = (name) => {
    if (!GetTutorialFlag(name)) {
        SetTutorialFlag(name, true)
        return true
    }

    return false
}

const ShowOnboardingMessage = (message, isCampaignOnboarding) => {
    if (isCampaignOnboarding) {
        OUTPUT_SetGlobalVariable(GlobalOnboardingVal.isCampaignOnboardingMessageUp, 1)
    } else {
        OUTPUT_SetGlobalVariable(GlobalOnboardingVal.isBasicsOnboardingMessageUp, 1)
    }

    OUTPUT_Announce(message, [])
}

const InterruptOnboardingMessage = (isCampaignOnboarding) => {
    if (isCampaignOnboarding) {
        OUTPUT_SetGlobalVariable(GlobalOnboardingVal.isCampaignOnboardingMessageUp, 0)
    } else {
        OUTPUT_SetGlobalVariable(GlobalOnboardingVal.isBasicsOnboardingMessageUp, 0)
    }

    OUTPUT_AnnounceInterrupt(ONBOARDING_MESSAGE_PRIORITY)
}

const TriggerTutorialHintAndGrantUnlock = (tutorialKey, tutorialHintUnlock, bypassTutorial) => {
    if (tutorialKey !== "") {
        OUTPUT_TriggerTutorialHint(tutorialKey)
    }

    if (tutorialHintUnlock !== "") {
        if (QUERY_GetCampaignResource(tutorialHintUnlock) === 0) {
            OUTPUT_AddOrRemoveTeamResource(TEAM_BLUE, tutorialHintUnlock, 1, false)
        }
    }
    if (bypassTutorial) {
        if (tutorialKey !== "") {
            OUTPUT_TriggerTutorialBypass(tutorialKey)
        }
    }
}

const TriggerTutorialForSpecificPlayers = (players, tutorialKey, grantRes = "", bypass = false, skipIfAlreadySeen = true, dontMarkCompleted = false) => {
    if (!HasEntities(players)) {
        return
    }
    let skip = skipIfAlreadySeen
    if (QUERY_GetGlobalVariable("gv_do_not_skip_seen_tutorials") === 1) {
        skip = false
    }
    OUTPUT_TriggerTutorialForSpecificPlayers(tutorialKey, bypass, skip, dontMarkCompleted, players)

    if (grantRes !== "") {
        if (QUERY_GetCampaignResource(grantRes) === 0) {
            OUTPUT_AddOrRemoveTeamResource(TEAM_BLUE, grantRes, 1, false)
        }
    }
}

const TriggerTutorialForSpecificPlayersNearAnEntity = (entity, tutorialKey, distance = 100, grantRes = "", bypass = false, skipIfAlreadySeen = true, dontMarkCompleted = false) => {
    if (!HasEntities(entity)) {
        return
    }
    let skip = skipIfAlreadySeen
    if (QUERY_GetGlobalVariable("gv_do_not_skip_seen_tutorials") === 1) {
        skip = false
    }
    const players = FILTER_ByDistance(GetAllPlayers(), entity, distance)
    OUTPUT_TriggerTutorialForSpecificPlayers(tutorialKey, bypass, skipIfAlreadySeen, dontMarkCompleted, players)

    if (grantRes !== "") {
        if (QUERY_GetCampaignResource(grantRes) === 0) {
            OUTPUT_AddOrRemoveTeamResource(TEAM_BLUE, grantRes, 1, false)
        }
    }
}

const EmphasizeHUDItem = (hudItems = []) => {
    hudItems.forEach((hi) => {
        if (hi !== "") {
            Logi("~~~ Emphasizing ~~~ " + hi)
            OUTPUT_SetEmphasizedHUDItem(hi, true)
        }
    })
}

const DeEmphasizeHUDItem = (hudItems = []) => {
    hudItems.forEach((hi) => {
        if (hi !== "") {
            Logi("~~~ DeEmphasizing ~~~ " + hi)
            OUTPUT_SetEmphasizedHUDItem(hi, false)
        }
    })
}
