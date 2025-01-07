/* eslint-disable @typescript-eslint/no-unused-vars */

const GetGameRuleVariable = (ruleName) => {
    return QUERY_GetGlobalVariable("gv_game_rule_" + ruleName)
}
const SetGameRuleVariable = (ruleName, value) => {
    OUTPUT_SetGlobalVariable("gv_game_rule_" + ruleName, value)
}

const HasMatchStarted = () => {
    return QUERY_GetGlobalVariable(GAME_MODE_GLOBAL.matchStarted) === 1
}
const HasMatchEnded = () => {
    return QUERY_GetGlobalVariable(GAME_MODE_GLOBAL.matchEnded) === 1
}

const OnceIfMatchStarted = () => {
    if (HasMatchStarted()) {
        Once()
        return true
    }
    return false
}
const OnceIfMatchEnded = () => {
    if (HasMatchEnded()) {
        Once()
        return true
    }
    return false
}
const StartMatch = () => {
    if (HasMatchStarted()) {
        return
    }
    OUTPUT_DebugLog("Match started!", 2)
    OUTPUT_SetGlobalVariable(GAME_MODE_GLOBAL.matchStarted, 1)
}
const EndMatch = (winningTeam) => {
    if (HasMatchEnded()) {
        return
    }
    OUTPUT_SetGlobalVariable(GAME_MODE_GLOBAL.matchEnded, 1)
    OUTPUT_EndMatch(winningTeam)
}
