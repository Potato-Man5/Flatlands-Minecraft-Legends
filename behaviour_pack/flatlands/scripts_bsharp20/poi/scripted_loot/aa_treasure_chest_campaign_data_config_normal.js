const TREASURE_CHEST_CAMPAIGN_DATA_NORMAL = {
    phaseMultiplier: [1, 1.05, 1.1, 1.2, 1.3, 1.4, 1.5],
    rewardTable: [
        //Do not delete comment, necessary for linter to not autoformat array
        {
            weight: 10,
            rewards: [{ resource: "iron", value: campaignSizeAmountsTreasureChest.uncommon}]
        },
        {
            weight: 10,
            rewards: [{ resource: "coal", value: campaignSizeAmountsTreasureChest.uncommon}]
        },
        {
            weight: 10,
            rewards: [{ resource: "diamond", value: campaignSizeAmountsTreasureChest.uncommon}]
        },
        {
            weight: 10,
            rewards: [{ resource: "redstone", value: campaignSizeAmountsTreasureChest.uncommon}]
        },
        {
            weight: 10,
            rewards: [{ resource: "emerald", value: campaignSizeAmountsTreasureChest.emerald}]
        },
        {
            weight: 5,
            rewards: [{ resource: "build_allay", value: campaignSizeAmountsTreasureChest.rewardAllays}]
        },
        {
            weight: 5,
            rewards: [{ resource: "gather_allay", value: campaignSizeAmountsTreasureChest.rewardAllays}]
        }
    ],
    rewardTableUncapped: [
        {
            weight: 10,
            rewards: [{ resource: "xp_common", value: campaignSizeAmountsTreasureChest.xpCommon }]
        }
    ]
}

RegisterDifficultyConfig("treasure_chest_campaign_data_config", TREASURE_CHEST_CAMPAIGN_DATA_NORMAL, GAME_DIFFICULTY.normal)
