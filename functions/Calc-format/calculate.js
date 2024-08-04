import settings from "../../settings";
import { global_vars, calculate_data } from "../global_vars";
import { collection_timers } from "../timer";
import { get_area, get_fortune } from "../tab_parser";

register("chat", ()=>{
    if (area == "The End") {
        compact_count = compact_count + 1;
    }
}).setChatCriteria(/&r&b&lCOMPACT! &r&fYou found an &r&aEnchanted Obsidian&r&f!&r/g);


let compact_count = 0;
let area = null;

export function calculate(blocks, tab_data) {
    for (let key in calculate_data) {  
        let settings = get_settings(key);
        let tracker_enable_setting = settings[0];
        let format_blocks_setting = settings[1];
        let format_collection_setting = settings[2];
        let format_profits_setting = settings[3];

        if (tracker_enable_setting == true) {
            area = get_area(tab_data);
            let fortune = get_fortune(tab_data);

            let time = collection_timers[key].total_time;
            let ph = time / 3600000;


            // calculate player activity by tracking the blocks broken and assigning them to the correct collection tracker
            calculate_blocks(key, blocks, area, time, fortune);


            let base_collection = calculate_data[key].sack_collection.base + calculate_data[key].sack_collection.enchanted*160 + calculate_data[key].sack_collection.enchanted_block*25600;
            let aproximate_collection = calculate_data[key].aprox_collection.base + calculate_data[key].aprox_collection.enchanted*160 + calculate_data[key].aprox_collection.enchanted_block*25600;

            let collection = Math.floor(base_collection + aproximate_collection);
            let collection_ph = Math.floor(collection / ph);


            // sets the net profit to 0
            let profit_net = 0;
            // adds the profit from the sum of sacks and aprox collections multiplied by the going rate of the variant
            profit_net += (calculate_data[key].sack_collection.base + calculate_data[key].aprox_collection.base) * calculate_data[key].bz_prices.base; // this is the profit from the base collection
            profit_net += (calculate_data[key].sack_collection.enchanted + calculate_data[key].aprox_collection.enchanted) * calculate_data[key].bz_prices.enchanted; // this is the profit from all the enchanted collection
            profit_net +=(calculate_data[key].sack_collection.enchanted_block + calculate_data[key].aprox_collection.enchanted_block) * calculate_data[key].bz_prices.enchanted_block; // this is the profit from all the enchanted block collection. for items that have no enchanted block collection the bazaa price is 0 so this will not add to the profit
            profit_net = Math.floor(profit_net);

            // sets the profit per hour to 0
            let profit_ph = 0;
            // adds the profit per hour from the sum of sacks and aprox collections multiplied by the going rate of the variant
            profit_ph += ((calculate_data[key].sack_collection.base + calculate_data[key].aprox_collection.base) / ph) * calculate_data[key].bz_prices.base;
            profit_ph += ((calculate_data[key].sack_collection.enchanted + calculate_data[key].aprox_collection.enchanted) / ph) * calculate_data[key].bz_prices.enchanted;
            profit_ph += ((calculate_data[key].sack_collection.enchanted_block + calculate_data[key].aprox_collection.enchanted_block) / ph) * calculate_data[key].bz_prices.enchanted_block;
            profit_ph = Math.floor(profit_ph);


            // calculate ovoid profit doesnt matter what collection it is tracking and apllying ovoid stuff to as only the obsidian tracker will display this data
            let count_ovoid_net = collection / 5120;
            let count_ovoid_ph = collection_ph / 5120;

            let ovoid_net = (count_ovoid_net * global_vars.Ovoid) - (count_ovoid_net * global_vars.Null_Sphere * 128);
            let ovoid_ph = (count_ovoid_ph * global_vars.Ovoid) - (count_ovoid_ph * global_vars.Null_Sphere * 128);

            // calculate what the profits would be if pet profits are included or not and output the final profits as a list
            let profits = calculate_pet_profits(profit_net, profit_ph, ovoid_net, ovoid_ph);

            format_blocks(key, time, format_blocks_setting);
            format_collection(collection, collection_ph, key, format_collection_setting);
            format_profits(profits, key, format_profits_setting);
            format_time(time, key);
        } else {

        }
    }
}



function get_settings(key) {
    let tracker_enable_setting = null;
    let format_blocks_setting = null;
    let format_collection_setting = null;
    let format_profits_setting = null;
    if (key == "Obsidian") {
        tracker_enable_setting = settings().tracker_obby_enable;
        format_blocks_setting = settings().format_blocks_m_Obsidian;
        format_collection_setting = settings().format_collection_m_Obsidian;
        format_profits_setting = settings().format_profit_m_Obsidian;
    } else if (key == "Gold") {
        tracker_enable_setting = settings().tracker_gold_enable;
        format_blocks_setting = false;
        format_collection_setting = false;
        format_profits_setting = false;
    } else if (key == "Quartz") {
        tracker_enable_setting = settings().tracker_quartz_enable;
        format_blocks_setting = false;
        format_collection_setting = false;
        format_profits_setting = false;
    } else if (key == "Umber") {
        tracker_enable_setting = settings().tracker_umber_enable;
        format_blocks_setting = false;
        format_collection_setting = false;
        format_profits_setting = false;
    } else if (key == "Tungsten") {
        tracker_enable_setting = settings().tracker_tungsten_enable;
        format_blocks_setting = false;
        format_collection_setting = false;
        format_profits_setting = false;
    } else if (key == "Glacite") {
        tracker_enable_setting = settings().tracker_glacite_enable;
        format_blocks_setting = false;
        format_collection_setting = false;
        format_profits_setting = false;
    } else if (key == "Mithril") {
        tracker_enable_setting = settings().tracker_mithril_enable;
        format_blocks_setting = false;
        format_collection_setting = false;
        format_profits_setting = false;
    }
    return [tracker_enable_setting, format_blocks_setting, format_collection_setting, format_profits_setting];
}


function calculate_pet_profits(profit_net, profit_ph, ovoid_net, ovoid_ph) {
    if (settings().integrate_profit == true && settings().tracker_pet_enable == true) {
        profit_net += global_vars.total_pet_pofit;
        profit_ph += global_vars.pet_profit_ph;

        ovoid_net += global_vars.total_pet_pofit;
        ovoid_ph += global_vars.pet_profit_ph;
    }
    return [profit_net, profit_ph, ovoid_net, ovoid_ph];
}


function calculate_blocks(key, blocks, area, time, fortune) {
    if (area == calculate_data[key].collection_world && blocks > 0) {
        collection_timers[key].is_afk = false;
        collection_timers[key].afk_offset = time;
        calculate_data[key].blocks_broken += blocks;
    } else if (area != calculate_data[key].collection_world) {
        calculate_data[key].sack_collection.base += calculate_data[key].aprox_collection.base;
        calculate_data[key].sack_collection.enchanted += calculate_data[key].aprox_collection.enchanted;
        calculate_data[key].sack_collection.enchanted_block += calculate_data[key].aprox_collection.enchanted_block;

        calculate_data[key].aprox_collection.raw = 0;
        calculate_data[key].aprox_collection.base = 0;
        calculate_data[key].aprox_collection.enchanted = 0;
        calculate_data[key].aprox_collection.enchanted_block = 0;
    }

    // Calculate the aprox collection from the blocks broken and fortune
    calculate_aprox_collection(key, blocks, fortune);
}
function calculate_aprox_collection(key, blocks, fortune) {
    // every dwarven gold block gives 6 gold ingots
    let drop_rate = 1;
    if (key == "Gold") {
        drop_rate = 6;
    }
    calculate_data[key].aprox_collection.raw += (blocks - compact_count) * fortune * drop_rate + (compact_count * 160);
    if (calculate_data[key].block_and_enchant.block == true) {
        calculate_data[key].aprox_collection.base = calculate_data[key].aprox_collection.raw % 160;
        calculate_data[key].aprox_collection.enchanted = Math.floor((calculate_data[key].aprox_collection.raw / 160) % 160);
        calculate_data[key].aprox_collection.enchanted_block = Math.floor(calculate_data[key].aprox_collection.raw / 25600);
    } else if (calculate_data[key].block_and_enchant.enchant == true) {
        calculate_data[key].aprox_collection.base = calculate_data[key].aprox_collection.raw % 160;
        calculate_data[key].aprox_collection.enchanted = Math.floor(calculate_data[key].aprox_collection.raw / 160);
    } else {
        calculate_data[key].aprox_collection.base = calculate_data[key].aprox_collection.raw;
    }
    compact_count = 0;
}


function format_blocks(key, time, setting) {
    let blocks = calculate_data[key].blocks_broken;
    let blocks_ph = blocks / (time / 3600000);

    if (setting == true) {
        calculate_data[key].display.blocks_net = (blocks / 1000000).toFixed(2) + "M";
        calculate_data[key].display.blocks_ph = (blocks_ph / 1000000).toFixed(2) + "M";
    } else {
        calculate_data[key].display.blocks_net = blocks.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        calculate_data[key].display.blocks_ph = blocks_ph.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}
function format_collection(collection, collection_ph, key, setting) {
    if (setting == true) {
        calculate_data[key].display.collection_net = (collection / 1000000).toFixed(2) + "M";
        calculate_data[key].display.collection_ph = (collection_ph / 1000000).toFixed(2) + "M";
    } else {
        calculate_data[key].display.collection_net = collection.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        calculate_data[key].display.collection_ph = collection_ph.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}
function format_profits(profits, key, setting) {
    let profit_net = profits[0];
    let profit_ph = profits[1];
    let ovoid_net = profits[2];
    let ovoid_ph = profits[3];

    if (setting == true) {
        calculate_data[key].display.profit_net = (profit_net / 1000000).toFixed(2) + "M";
        calculate_data[key].display.profit_ph = (profit_ph / 1000000).toFixed(2) + "M";

        // even though this data is assinged to the display const it will never be displayed unless the key is obsidian
        // so effectively only the obsidian tracker version of this data will see the light of day
        calculate_data[key].display.alt_profit_net = (ovoid_net / 1000000).toFixed(2) + "M";
        calculate_data[key].display.alt_profit_ph = (ovoid_ph / 1000000).toFixed(2) + "M";
    } else {
        calculate_data[key].display.profit_net = profit_net.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        calculate_data[key].display.profit_ph = profit_ph.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        calculate_data[key].display.alt_profit_net = ovoid_net.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        calculate_data[key].display.alt_profit_ph = ovoid_ph.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

}
function format_time(time, key) {
    let total_seconds = Math.floor(time / 1000);
    let seconds = total_seconds % 60;

    let total_minutes = Math.floor(total_seconds / 60);
    let minutes = total_minutes % 60;

    let hours = Math.floor(total_minutes / 60);


    let total_time_formatted = "";
    if (hours > 0) {
        total_time_formatted += hours + "h ";
    }
    if (minutes > 0 || hours > 0) {
        total_time_formatted += minutes + "m ";
    }
    total_time_formatted += seconds + "s";

    calculate_data[key].display.runtime = total_time_formatted;
}