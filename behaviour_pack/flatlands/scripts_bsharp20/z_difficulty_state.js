const _SetConfigToDifficulty = (configId, difficulty) => {
    // Baseline is EASY difficulty, and it should always exist
    if (allDifficultyConfigs[configId][GAME_DIFFICULTY.easy] === undefined) {
        Loge(`Couldn't find EASY difficulty configuration for ${configId}, but it needs to be defined. Will not set config to specified difficulty.`)
        return
    }

    const easyDifficultyIndex = GAME_DIFFICULTY_PROGRESSION.indexOf(GAME_DIFFICULTY.easy)

    // Some configs will always be set to the original difficulty, regardless whether the difficulty changes later or not
    // In particular applies to any configs related to the world size in any fashion
    const targetDifficultyIndex = allDifficultyConfigs[configId].respectFirstGameLoadDifficulty ? QUERY_GetGlobalVariable(GV_FIRST_LOAD_GAME_DIFFICULTY) : GAME_DIFFICULTY_PROGRESSION.indexOf(difficulty)
    const targetDifficulty = GAME_DIFFICULTY_PROGRESSION[targetDifficultyIndex]

    // We step either from Easy in positive direction to make game harder or to negative to make the game easier
    // We apply overrides on each step so that each layer gets all the changes from the previous layer
    const step = targetDifficultyIndex < easyDifficultyIndex ? -1 : 1
    for (let i = easyDifficultyIndex; i !== targetDifficultyIndex; i += step) {
        const difficultyAtIndex = GAME_DIFFICULTY_PROGRESSION[i]
        if (allDifficultyConfigs[configId][difficultyAtIndex] !== undefined) {
            ObjectAssignRecursive(allDifficultyConfigs[configId].core, allDifficultyConfigs[configId][difficultyAtIndex])
        }
    }

    // Finally apply the target difficulty if it exists - but if it doesn't, we at least get all overrides from the previous layers
    if (allDifficultyConfigs[configId][targetDifficulty] !== undefined) {
        ObjectAssignRecursive(allDifficultyConfigs[configId].core, allDifficultyConfigs[configId][targetDifficulty])
    }
}

const _SetAllDifficultyConfigsToDifficulty = (difficulty) => {
    Logi(`[DIFFICULTY B#] Setting all configs for difficulty ${difficulty}`)

    for (const configId in allDifficultyConfigs) {
        _SetConfigToDifficulty(configId, difficulty)
    }

    if (difficulty === "Custom") {
        IncrementGlobal(CUSTOM_OPTIONS.SKIP_ACT_1)
    }
}

SNIPPET_LaunchFromLobby("", (firstLaunch) => {
    if (firstLaunch) {
        // Set listener
        LISTENFOR_DifficultyChanged({
            snippet: "dc_swap_difficulty_configs",
            ownerVillageId: OWNER_VILLAGE_OPT_OUT
        })

        // Initialize
        const firstGameLoadDifficulty = QUERY_GameDifficulty()
        OUTPUT_SetGlobalVariable(GV_FIRST_LOAD_GAME_DIFFICULTY, GAME_DIFFICULTY_PROGRESSION.indexOf(firstGameLoadDifficulty))
        _SetAllDifficultyConfigsToDifficulty(firstGameLoadDifficulty)
        Logi(`[DIFFICULTY B#] Bootstrap running! Difficulty: ` + firstGameLoadDifficulty)

        // DEBUG
        LISTENFOR_ExternalEvent({
            snippet: "ee_check_difficulty_values",
            ownerVillageId: OWNER_VILLAGE_OPT_OUT,
            eventName: "checkValues"
        })

        const gamemode = QUERY_GetGameMode()
        switch (gamemode) {
            case GAMEMODE_CAMPAIGN:
                SetWorldGenDefinition(campaignWorldGenDefinition, false)
                break
            case GAMEMODE_CAMPAIGN_CUSTOM:
                SetWorldGenDefinition(customCampaignWorldGenDefinition, false)
                break
            case GAMEMODE_ONBOARDING:
                SetWorldGenDefinition(onboardingWorldGenDefinition)
                break
            default:
                Loge(`No world definition set for given gamemode '${gamemode}'`)
        }
    }
})

SNIPPET_GameLoadBootstrap("", (_isSavedLoaded) => {
    Logi(`[DIFFICULTY B#] GameLoad running!`)
    _SetAllDifficultyConfigsToDifficulty(QUERY_GameDifficulty())
})

SNIPPET_DifficultyChanged("dc_swap_difficulty_configs", (prevDifficulty, newDifficulty, _payload) => {
    Logi(`[DIFFICULTY B#] Difficulty was changed from ${prevDifficulty} to ${newDifficulty}, changing the configs!!`)
    _SetAllDifficultyConfigsToDifficulty(newDifficulty)
})

// DEBUG
SNIPPET_ExternalEvent("ee_check_difficulty_values", (_variant, _payload) => {
    Logi(`[DIFFICULTY B#] Checking values, current difficulty is ${QUERY_GameDifficulty()}`)

    Logi(`myConfig.val1 is ${myConfig.val1}`)
    Logi(`myConfig.val2 is ${myConfig.val2}`)
    Logi(`myConfig.val3 is ${myConfig.val3}`)
})