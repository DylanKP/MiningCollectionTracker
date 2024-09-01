export const global_vars = {
    reset: true,

    area: null,

    timer_afk: false,

    Ovoid: 0,
    Null_Sphere: 0,
    
    get_new_pet_profit: false,
    pet_profit_ph: 0,
    total_pet_pofit: 0,

    move_pet: false,
    move_obby: false,
    move_gold: false,
    move_quartz: false,
    move_umber: false,
    move_tungsten: false,
    move_glacite: false,
    move_mithril: false,

    event_widget_alert: false,
    fortune_widget_alert: false,
    pet_widget_alert: false,
}

export let in_hypixel = true;

export const calculate_data = {
    Obsidian: {

        sack_collection: 0,
        aprox_collection: 0,
        bz_rate: 0, // the rate of the collection in the bazaar

        blocks_broken: 0,
        true_collection: 0,
        compact_rate: 160, // 160 obby makes an enchanted obby

        collection_world: {
            "The End": {
                "minecraft:obsidian": 1,
            },
        },

        display: { // the display data for the tracker
            blocks_net: 0, 
            blocks_ph: 0, 
            collection_net: 0, 
            collection_ph: 0, 
            profit_net: 0, 
            profit_ph: 0, 
            alt_profit_net: 0,  // value for ovoids
            alt_profit_ph: 0,
            time_to_goal: "0s",
            runtime: "0s",
        }
    },



    Gold: {

        sack_collection: 0,
        aprox_collection: 0,
        bz_rate: 0, // the rate of the collection in the bazaar

        blocks_broken: 0,
        true_collection: 0,
        compact_rate: 25600, // 25600 gold ingots makes an enchanted block

        collection_world: {
            "Crystal Hollows": {
                "minecraft:gold_block": 6,
                "minecraft:gold_ore": 1,
            },
        },

        display: {
            blocks_net: 0, 
            blocks_ph: 0, 
            collection_net: 0, 
            collection_ph: 0, 
            profit_net: 0,
            profit_ph: 0,
            alt_profit_net: 0,  // null, should never actually be displayed
            alt_profit_ph: 0,
            time_to_goal: "0s",
            runtime: "0s",
        },
    },



    Quartz: {

        sack_collection: 0,
        aprox_collection: 0,
        bz_rate: 0, // the rate of the collection in the bazaar

        blocks_broken: 0,
        true_collection: 0,
        compact_rate: 25600,

        collection_world: {
            "Crimson Ilse": {
                "minecraft:quartz_ore": 1, // dont acutally  know if this is correct
            },
        },

        display: {
            blocks_net: 0, 
            blocks_ph: 0, 
            collection_net: 0, 
            collection_ph: 0, 
            profit_net: 0,
            profit_ph: 0,
            alt_profit_net: 0,  // maybe the value for netherack gained from the collection i dunno
            alt_profit_ph: 0,
            time_to_goal: "0s",
            runtime: "0s",
        },
    },


    // GOT RID OF TUNGSTEN AND UMBER BECUASE MINING THIS INVOLVES A LOT OF LOBBY SWAPPING AND EFFECIENT MINING BLOCKS WITH DIFFERENT YEILDS
    // WHICH THE TRACKER CANT TRACK AND LOBBY SWAPPING EN SURE THAT THE TRACKER CANT GET THE SACK DATA
    // 
    // Umber: {

    //     sack_collection: 0,
    //     aprox_collection: 0,
    //     bz_rate: 0, // the rate of the collection in the bazaar

    //     blocks_broken: 0,
    //     true_collection: 0,
    //     compact_rate: 160,

    //     collection_world: {
    //         "Dwarven Mines": {
    //             "minecraft:hardened_clay": 1,
    //             "minecraft:stained_hardened_clay[color=brown]": 2,
    //             "minecraft:double_stone_slab2[seamless=true,variant=red_sandstone]": 3,
    //         },
    //     },

    //     display: {
    //         blocks_net: 0, 
    //         blocks_ph: 0, 
    //         collection_net: 0, 
    //         collection_ph: 0, 
    //         profit_net: 0,
    //         profit_ph: 0,
    //         alt_profit_net: 0, // null, should never actually be displayed
    //         alt_profit_ph: 0,
    //         time_to_goal: "0s",
    //         runtime: "0s",
    //     },
    // },



    // Tungsten: {

    //     sack_collection: 0,
    //     aprox_collection: 0,
    //     bz_rate: 0, // the rate of the collection in the bazaar

    //     blocks_broken: 0,
    //     true_collection: 0,
    //     compact_rate: 160,

    //     collection_world: {
    //         "Dwarven Mines": {
    //             "minecraft:cobblestone": 1,
    //             "minecraft:clay": 3,
    //         },
    //     },

    //     display: {
    //         blocks_net: 0, 
    //         blocks_ph: 0, 
    //         collection_net: 0, 
    //         collection_ph: 0, 
    //         profit_net: 0,
    //         profit_ph: 0,
    //         alt_profit_net: 0, // null, should never actually be displayed
    //         alt_profit_ph: 0,
    //         time_to_goal: "0s",
    //         runtime: "0s",
    //     },
    // },



    Glacite: {

        sack_collection: 0,
        aprox_collection: 0,
        bz_rate: 0, // the rate of the collection in the bazaar

        blocks_broken: 0,
        true_collection: 0,
        compact_rate: 160,

        collection_world: {
            "Dwarven Mines": {
                "minecraft:packed_ice": 1,
            }
        },

        display: {
            blocks_net: 0, 
            blocks_ph: 0, 
            collection_net: 0, 
            collection_ph: 0, 
            profit_net: 0,
            profit_ph: 0,
            alt_profit_net: 0, // null, should never actually be displayed
            alt_profit_ph: 0,
            time_to_goal: "0s",
            runtime: "0s",
        },
    },



    Mithril: {

        sack_collection: 0,
        aprox_collection: 0,
        bz_rate: 0, // the rate of the collection in the bazaar

        blocks_broken: 0,
        true_collection: 0,
        compact_rate: 160,

        collection_world: {
            "Dwarven Mines": {
                "minecraft:wool[color=gray]" : 1,
                "minecraft:stained_hardened_clay[color=cyan]" : 1,

                "minecraft:prismarine[variant=dark_prismarine]" : 2,
                "minecraft:prismarine[variant=prismarine_bricks]" : 2,
                "minecraft:prismarine[variant=prismarine]" : 2,

                "minecraft:wool[color=light_blue]" : 5,
            },

            "Crystal Hollows": {
                "minecraft:prismarine[variant=dark_prismarine]" : 2,
                "minecraft:prismarine[variant=prismarine_bricks]" : 2,
                "minecraft:prismarine[variant=prismarine]" : 2,

                "minecraft:wool[color=light_blue]" : 5,
            },
        },

        display: {
            blocks_net: 0, 
            blocks_ph: 0, 
            collection_net: 0, 
            collection_ph: 0, 
            profit_net: 0,
            profit_ph: 0,
            alt_profit_net: 0, // null, should never actually be displayed
            alt_profit_ph: 0,
            time_to_goal: "0s",
            runtime: "0s",
        },
    }
}

export const display_pet_data = {

    display_next_lvl_time: "",
    display_100_lvl_time: "",
    display_max_lvl_time: "",
    display_pet_xp_ph: 0,
    display_total_xp: 0,
    display_pet_profit: 0,
    display_pet_profit_ph: 0,
    display_pet_profit_net: 0,
}