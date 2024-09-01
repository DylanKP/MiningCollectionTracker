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

    // adds the sack collection values to the total collection values
    calculate_data.Obsidian.sack_collection += sack_collection.obsidian + sack_collection.enchanted_obsidian * 160;
    calculate_data.Gold.sack_collection += sack_collection.gold_ingot + sack_collection.enchanted_gold * 160 + sack_collection.enchanted_gold_block * 25600;
    calculate_data.Quartz.sack_collection += sack_collection.nether_quartz + sack_collection.enchanted_quartz * 160 + sack_collection.enchanted_quartz_block * 25600;
    calculate_data.Umber.sack_collection += sack_collection.umber + sack_collection.enchanted_umber * 160;
    calculate_data.Tungsten.sack_collection += sack_collection.tungsten + sack_collection.enchanted_tungsten * 160;
    calculate_data.Glacite.sack_collection += sack_collection.glacite + sack_collection.enchanted_glacite * 160;
    calculate_data.Mithril.sack_collection += sack_collection.mithril + sack_collection.enchanted_mithril * 160;

    // sets the approximate collection values to 0 as they were only an aproximation of what was going into the sack
    // and now that the more accurate values are known, the aproximation is no longer needed
    for (let key in calculate_data) {
        calculate_data[key].aprox_collection = 0;
    }

    if (calculate_data.Gold.true_collection > 0) {
        calculate_data.Gold.true_collection += sack_collection.gold_ingot + sack_collection.enchanted_gold * 160 + sack_collection.enchanted_gold_block * 25600;
    }
}