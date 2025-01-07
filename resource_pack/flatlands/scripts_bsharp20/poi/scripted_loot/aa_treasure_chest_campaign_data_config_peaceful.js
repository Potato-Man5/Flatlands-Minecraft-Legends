const TREASURE_CHEST_CAMPAIGN_DATA_PEACEFUL = {
    phaseMultiplier: [1, 1.05, 1.1, 1.2, 1.3, 1.4, 1.5],
    rewardTable: [
        //Do not delete comment, necessary for linter to not autoformat array
        {
            weight: 10,
            rewards: [{ resource: "iron", value: campaignSizeAmountsTreasureChest.uncommonHigh}]
        },
        {
            weight: 10,
            rewards: [{ resource: "coal", value: campaignSizeAmountsTreasureChest.uncommonHigh}]
        },
        {
            weight: 10,
            rewards: [{ resource: "diamond", value: campaignSizeAmountsTreasureChest.uncommonHigh}]
        },
        {
            weight: 10,
            rewards: [{ resource: "redstone", value: campaignSizeAmountsTreasureChest.uncommonHigh}]
        },
        {
            weight: 10,
            rewards: [{ resource: "emerald", value: campaignSizeAmountsTreasureChest.emeraldHigh}]
        },
        {
            weight: 10,
            rewards: [{ resource: "build_allay", value: campaignSizeAmountsTreasureChest.rewardAllays}]
        },
        {
            weight: 10,
            rewards: [{ resource: "gather_allay", value: campaignSizeAmountsTreasureChest.rewardAllays}]
        }
    ],
    rewardTableUncapped: [
        //Do not delete comment, necessary for linter to not autoformat array
        {
            weight: 10,
            rewards: [{ resource: "xp_common", value: campaignSizeAmountsTreasureChest.xpCommonHigh }]
        }
    ]
}

RegisterDifficultyConfig("treasure_chest_campaign_data_config", TREASURE_CHEST_CAMPAIGN_DATA_PEACEFUL, GAME_DIFFICULTY.peaceful)