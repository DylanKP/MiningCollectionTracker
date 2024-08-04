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

export const calculate_data = {
    Obsidian: {
        sack_collection: { // sack collection is what it know you have in your sack from chat messages
            base: 0,
            enchanted: 0,
            enchanted_block: 0,
        },

        aprox_collection: { // aprox collection is what you have aproximataly collected in between chat messages based on blocks broken and fortune
            raw: 0,
            base: 0,
            enchanted: 0,
            enchanted_block: 0,
        },

        bz_prices: { // the rates of the different varients of this collection
            base: 0,
            enchanted: 0,
            enchanted_block: 0,
        },

        block_and_enchant: { // for accurate pricing of the aprox collection it need to know if the play has the collection in block form or enchanted form
            block: false,
            enchant: false,
        },

        blocks_broken: 0,
        collection_world: "The End", // the only valid world for obsidian collection

        display: { // the display data for the tracker
            blocks_net: 0, 
            blocks_ph: 0, 
            collection_net: 0, 
            collection_ph: 0, 
            profit_net: 0, 
            profit_ph: 0, 
            alt_profit_net: 0,  // value for ovoids
            alt_profit_ph: 0,
            runtime: "0s",
        }
    },



    Gold: {
        sack_collection: {
            base: 0,
            enchanted: 0,
            enchanted_block: 0,
        },

        aprox_collection: {
            raw: 0,
            base: 0,
            enchanted: 0,
            enchanted_block: 0,
        },

        bz_prices: {
            base: 0,
            enchanted: 0,
            enchanted_block: 0,
        },

        block_and_enchant: {
            block: false,
            enchant: false,
        },

        blocks_broken: 0,
        collection_world: "TBD",

        display: {
            blocks_net: 0, 
            blocks_ph: 0, 
            collection_net: 0, 
            collection_ph: 0, 
            profit_net: 0,
            profit_ph: 0,
            alt_profit_net: 0,  // null, should never actually be displayed
            alt_profit_ph: 0,
            runtime: "0s",
        }
    },



    Quartz: {
        sack_collection: {
            base: 0,
            enchanted: 0,
            enchanted_block: 0,
        },

        aprox_collection: {
            raw: 0,
            base: 0,
            enchanted: 0,
            enchanted_block: 0,
        },

        bz_prices: {
            base: 0,
            enchanted: 0,
            enchanted_block: 0,
        },
        
        block_and_enchant: {
            block: false,
            enchant: false,
        },

        blocks_broken: 0,
        collection_world: "TBD",

        display: {
            blocks_net: 0, 
            blocks_ph: 0, 
            collection_net: 0, 
            collection_ph: 0, 
            profit_net: 0,
            profit_ph: 0,
            alt_profit_net: 0,  // maybe the value for netherack gained from the collection i dunno
            alt_profit_ph: 0,
            runtime: "0s",
        }
    },



    Umber: {
        sack_collection: {
            base: 0,
            enchanted: 0,
            enchanted_block: 0,
        },

        aprox_collection: {
            raw: 0,
            base: 0,
            enchanted: 0,
            enchanted_block: 0,
        },

        bz_prices: {
            base: 0,
            enchanted: 0,
            enchanted_block: 0,
        },

        block_and_enchant: {
            block: false,
            enchant: false,
        },

        blocks_broken: 0,
        collection_world: "TBD",

        display: {
            blocks_net: 0, 
            blocks_ph: 0, 
            collection_net: 0, 
            collection_ph: 0, 
            profit_net: 0,
            profit_ph: 0,
            alt_profit_net: 0, // null, should never actually be displayed
            alt_profit_ph: 0,
            runtime: "0s",
        }
    },



    Tungsten: {
        sack_collection: {
            base: 0,
            enchanted: 0,
            enchanted_block: 0,
        },

        aprox_collection: {
            raw: 0,
            base: 0,
            enchanted: 0,
            enchanted_block: 0,
        },

        bz_prices: {
            base: 0,
            enchanted: 0,
            enchanted_block: 0,
        },

        block_and_enchant: {
            block: false,
            enchant: false,
        },

        blocks_broken: 0,
        collection_world: "TBD",

        display: {
            blocks_net: 0, 
            blocks_ph: 0, 
            collection_net: 0, 
            collection_ph: 0, 
            profit_net: 0,
            profit_ph: 0,
            alt_profit_net: 0, // null, should never actually be displayed
            alt_profit_ph: 0,
            runtime: "0s",
        }
    },



    Glacite: {
        sack_collection: {
            base: 0,
            enchanted: 0,
            enchanted_block: 0,
        },

        aprox_collection: {
            raw: 0,
            base: 0,
            enchanted: 0,
            enchanted_block: 0,
        },

        bz_prices: {
            base: 0,
            enchanted: 0,
            enchanted_block: 0,
        },

        block_and_enchant: {
            block: false,
            enchant: false,
        },

        blocks_broken: 0,
        collection_world: "TBD",

        display: {
            blocks_net: 0, 
            blocks_ph: 0, 
            collection_net: 0, 
            collection_ph: 0, 
            profit_net: 0,
            profit_ph: 0,
            alt_profit_net: 0, // null, should never actually be displayed
            alt_profit_ph: 0,
            runtime: "0s",
        }
    },



    Mithril: {
        sack_collection: {
            base: 0,
            enchanted: 0,
            enchanted_block: 0,
        },
        
        aprox_collection: {
            raw: 0,
            base: 0,
            enchanted: 0,
            enchanted_block: 0,
        },

        bz_prices: {
            base: 0,
            enchanted: 0,
            enchanted_block: 0,
        },

        block_and_enchant: {
            block: false,
            enchant: false,
        },

        blocks_broken: 0,
        collection_world: "TBD",

        display: {
            blocks_net: 0, 
            blocks_ph: 0, 
            collection_net: 0, 
            collection_ph: 0, 
            profit_net: 0,
            profit_ph: 0,
            alt_profit_net: 0, // null, should never actually be displayed
            alt_profit_ph: 0,
            runtime: "0s",
        }
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