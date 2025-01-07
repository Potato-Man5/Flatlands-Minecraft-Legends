SNIPPET_RuleInitialized(GAME_RULE_NAMES.teamCount, (ruleValue) => {
    SetGameRuleVariable(GAME_RULE_NAMES.teamCount, ruleValue.value)
})

SNIPPET_RuleInitialized(GAME_RULE_NAMES.invasionEnabled, (ruleValue) => {
    SetGameRuleVariable(GAME_RULE_NAMES.invasionEnabled, ruleValue.value ? 1 : 0)
})

SNIPPET_RuleInitialized(GAME_RULE_NAMES.campaignActsEnabled, (ruleValue) => {
    SetGameRuleVariable(GAME_RULE_NAMES.campaignActsEnabled, ruleValue.value ? 1 : 0)
})
