import { calculate_data } from "./global_vars";

export function sack_parser(event) {
    let msg = new Message(EventLib.getMessage(event)).getMessageParts();

    if (msg[0].getText().startsWith("§6§6[Sacks] §r§r")) {
        let parsed_data = "";
        for (let i = 1; i < msg.length; i++) {
            if ((msg[i].getText().startsWith("§a") || msg[i].getText().startsWith("§c")) && parsed_data === "") {
                if (parsed_data !== "") {
                    parsed_data += "\n";
                }
                parsed_data += msg[i].getHoverValue().removeFormatting().replace(/^(Added items:|Removed items:|This message can be disabled in the settings\.)\n?/gm, "").trim();
            }
        }
        let sack = parsed_data.split("\n");


        let sack_dict = {};


        for (let i = 0; i < sack.length; i++) {
            let item_data = sack[i].replace(/\([^()]*\)/g, '').replace(/\s{2,}/g, ' ').trim();
            let item_count = Number(item_data.split(" ")[0].replace(/,/g, ""));
            let item_name = item_data.split(" ").slice(1).join(" ").replace(/ /g, "_").toLowerCase();
            sack_dict[item_name] = item_count;
        }
        
        // for (let key in sack_dict) {
        //     console.log(key + " " + sack_dict[key]);
        // }

        sack_tracking(sack_dict);
    }
};

function sack_tracking(sack_dict) {
    let sack_collection = {
        obsidian: 0,
        enchanted_obsidian: 0,

        gold_ingot: 0,
        enchanted_gold: 0,
        enchanted_gold_block: 0,
    
        nether_quartz: 0,
        enchanted_quartz: 0,
        enchanted_quartz_block: 0,
    
        umber: 0,
        enchanted_umber: 0,
    
        tungsten: 0,
        enchanted_tungsten: 0,
    
        glacite: 0,
        enchanted_glacite: 0,
    
        mithril: 0,
        enchanted_mithril: 0
    };

    for (let key in sack_dict) { // Update values
        if (sack_collection.hasOwnProperty(key) && sack_dict[key] > 0) {
            sack_collection[key] += sack_dict[key];
        }
    };

    /// Check if the future items in the sack are enchanted or not
    if (sack_collection.enchanted_obsidian > 0) {
        calculate_data.Obsidian.block_and_enchant.enchant = true;
        // block_and_enchant.Obsidian.enchant = true;
    } else {
        calculate_data.Obsidian.block_and_enchant.enchant = false;
        // block_and_enchant.Obsidian.enchant = false;
    }


    if (sack_collection.enchanted_gold_block > 0) {
        calculate_data.Gold.block_and_enchant.block = true;
        // block_and_enchant.Gold.block = true;
    } else if (sack_collection.enchanted_gold > 0 && sack_collection.enchanted_gold_block === 0) {
        calculate_data.Gold.block_and_enchant.block = false;
        calculate_data.Gold.block_and_enchant.enchant = true;
        // block_and_enchant.Gold.block = false;
        // block_and_enchant.Gold.enchant = true;
    } else {
        calculate_data.Gold.block_and_enchant.block = false;
        calculate_data.Gold.block_and_enchant.enchant = false;
        // block_and_enchant.Gold.block = false;
        // block_and_enchant.Gold.enchant = false;
    }


    if (sack_collection.enchanted_quartz_block > 0) {
        calculate_data.Quartz.block_and_enchant.block = true;
        // block_and_enchant.Quartz.block = true;
    } else if (sack_collection.enchanted_quartz > 0 && sack_collection.enchanted_quartz_block === 0) {
        calculate_data.Quartz.block_and_enchant.block = false;
        calculate_data.Quartz.block_and_enchant.enchant = true;
        // block_and_enchant.Quartz.block = false;
        // block_and_enchant.Quartz.enchant = true;
    } else {
        calculate_data.Quartz.block_and_enchant.block = false;
        calculate_data.Quartz.block_and_enchant.enchant = false;
        // block_and_enchant.Quartz.block = false;
        // block_and_enchant.Quartz.enchant = false;
    }


    if (sack_collection.enchanted_umber > 0) {
        calculate_data.Umber.block_and_enchant.enchant = true;
        // block_and_enchant.Umber.enchant = true;
    } else {
        calculate_data.Umber.block_and_enchant.enchant = false;
        // block_and_enchant.Umber.enchant = false;
    }


    if (sack_collection.enchanted_tungsten > 0) {
        calculate_data.Tungsten.block_and_enchant.enchant = true;
        // block_and_enchant.Tungsten.enchant = true;
    } else {
        calculate_data.Tungsten.block_and_enchant.enchant = false;
        // block_and_enchant.Tungsten.enchant = false;
    }


    if (sack_collection.enchanted_glacite > 0) {
        calculate_data.Glacite.block_and_enchant.enchant = true;
        // block_and_enchant.Glacite.enchant = true;
    } else {
        calculate_data.Glacite.block_and_enchant.enchant = false;
        // block_and_enchant.Glacite.enchant = false;
    }


    if (sack_collection.enchanted_mithril > 0) {
        calculate_data.Mithril.block_and_enchant.enchant = true;
        // block_and_enchant.Mithril.enchant = true;
    } else {
        calculate_data.Mithril.block_and_enchant.enchant = false;
        // block_and_enchant.Mithril.enchant = false;
    }

    // adds the sack collection values to the total collection values
    calculate_data.Obsidian.sack_collection.base += sack_collection.obsidian;
    calculate_data.Obsidian.sack_collection.enchanted += sack_collection.enchanted_obsidian;

    calculate_data.Gold.sack_collection.base += sack_collection.gold_ingot;
    calculate_data.Gold.sack_collection.enchanted += sack_collection.enchanted_gold;
    calculate_data.Gold.sack_collection.enchanted_block += sack_collection.enchanted_gold_block;

    calculate_data.Quartz.sack_collection.base += sack_collection.nether_quartz;
    calculate_data.Quartz.sack_collection.enchanted += sack_collection.enchanted_quartz;
    calculate_data.Quartz.sack_collection.enchanted_block += sack_collection.enchanted_quartz_block;

    calculate_data.Umber.sack_collection.base += sack_collection.umber;
    calculate_data.Umber.sack_collection.enchanted += sack_collection.enchanted_umber;

    calculate_data.Tungsten.sack_collection.base += sack_collection.tungsten;
    calculate_data.Tungsten.sack_collection.enchanted += sack_collection.enchanted_tungsten;

    calculate_data.Glacite.sack_collection.base += sack_collection.glacite;
    calculate_data.Glacite.sack_collection.enchanted += sack_collection.enchanted_glacite;

    calculate_data.Mithril.sack_collection.base += sack_collection.mithril;
    calculate_data.Mithril.sack_collection.enchanted += sack_collection.enchanted_mithril;

    // sets the approximate collection values to 0 as they were only an aproximation of what was going into the sack
    // and now that the more accurate values are known, the aproximation is no longer needed
    for (let key in calculate_data) {
        for (let key2 in calculate_data[key].aprox_collection) {
            calculate_data[key].aprox_collection[key2] = 0;
        }
    }
}