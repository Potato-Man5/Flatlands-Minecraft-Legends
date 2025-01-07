const TREASURE_CHEST_CAMPAIGN_DATA_HARD = {
    phaseMultiplier: [1, 1.05, 1.1, 1.2, 1.3, 1.4, 1.5],
    rewardTable: [
        //Do not delete comment, necessary for linter to not autoformat array
        {
            weight: 10,
            rewards: [{ resource: "iron", value: campaignSizeAmountsTreasureChest.uncommonLow}]
        },
        {
            weight: 10,
            rewards: [{ resource: "coal", value: campaignSizeAmountsTreasureChest.uncommonLow}]
        },
        {
            weight: 10,
            rewards: [{ resource: "diamond", value: campaignSizeAmountsTreasureChest.uncommonLow}]
        },
        {
            weight: 10,
            rewards: [{ resource: "redstone", value: campaignSizeAmountsTreasureChest.uncommonLow}]
        },
        {
            weight: 10,
            rewards: [{ resource: "emerald", value: campaignSizeAmountsTreasureChest.emeraldLow}]
        },
        {
            weight: 2,
            rewards: [{ resource: "build_allay", value: campaignSizeAmountsTreasureChest.rewardAllays}]
        },
        {
            weight: 2,
            rewards: [{ resource: "gather_allay", value: campaignSizeAmountsTreasureChest.rewardAllays}]
        }
    ],
    rewardTableUncapped: [
        //Do not delete comment, necessary for linter to not autoformat array
        {
            weight: 10,
            rewards: [{ resource: "xp_common", value: campaignSizeAmountsTreasureChest.xpCommonLow }]
        }
    ]
}

RegisterDifficultyConfig("treasure_chest_campaign_data_config", TREASURE_CHEST_CAMPAIGN_DATA_HARD, GAME_DIFFICULTY.hard)