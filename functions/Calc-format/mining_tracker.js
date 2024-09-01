import settings from "../../settings";
import { global_vars, calculate_data } from "../global_vars";
import { collection_timers } from "../timer";
import { get_area, get_fortune } from "../tab_parser";

register("chat", ()=>{
    if (area == "The End") {
        compact_count = compact_count + 1;
    }
}).setChatCriteria(/&r&b&lCOMPACT! &r&fYou found an &r&aEnchanted Obsidian&r&f!&r/g);

register("clicked", () => {
    let block = Player.lookingAt()?.getState();
    if (block != null && block != "minecraft:bedrock") {
        current_block = block;
    }
})


let compact_count = 0;
let area = null;
let current_block = null;

export function calculate(additional_blocks, tab_data, reset) {
    area = get_area(tab_data);
    let fortune = get_fortune(tab_data);

    for (let key in calculate_data) {  
        let settings = get_settings(key);
        let tracker_enable_setting = settings[0];
        let format_blocks_setting = settings[1];
        let format_collection_setting = settings[2];
        let format_profits_setting = settings[3];

        if (tracker_enable_setting == true) {
            reset_data(key, reset);

            let time = collection_timers[key].total_time;
            let ph = time / 3600000;

            let blocks = 0;
            let drop_rate = 0;
            if(additional_blocks > 0 && area in calculate_data[key].collection_world && current_block in calculate_data[key].collection_world[area]) {
                drop_rate = calculate_data[key].collection_world[area][current_block];
                blocks = additional_blocks;
            }


            // calculate player activity by tracking the blocks broken and assigning them to the correct collection tracker
            calculate_blocks(key, blocks, area, time);
            // Calculate the aprox collection from the blocks broken and fortune
            calculate_aprox_collection(key, blocks, fortune, area, drop_rate);


            let collection = Math.floor(calculate_data[key].sack_collection + calculate_data[key].aprox_collection);
            let collection_ph = Math.floor(collection / ph);

            if (calculate_data[key].true_collection != 0) {
                let total = calculate_data[key].true_collection + calculate_data[key].aprox_collection;
                calculate_data[key].display.time_to_goal = billion_calculator(1000000000, total, collection_ph);
            }

            let profit_net = Math.floor((collection / calculate_data[key].compact_rate) * calculate_data[key].bz_rate);
            let profit_ph = Math.floor((collection_ph / calculate_data[key].compact_rate) * calculate_data[key].bz_rate);


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
            calculate_data[key].display.runtime = format_time(time, key);
        } else {
            reset_data(key, true);
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
        format_blocks_setting = settings().format_blocks_m_Gold;
        format_collection_setting = settings().format_collection_m_Gold;
        format_profits_setting = settings().format_profit_m_Gold;
    } else if (key == "Quartz") {
        tracker_enable_setting = settings().tracker_quartz_enable;
        format_blocks_setting = settings().format_blocks_m_Quartz;
        format_collection_setting = settings().format_collection_m_Quartz;
        format_profits_setting = settings().format_profit_m_Quartz;
    } else if (key == "Umber") {
        tracker_enable_setting = settings().tracker_umber_enable;
        format_blocks_setting = settings().format_blocks_m_Umber;
        format_collection_setting = settings().format_collection_m_Umber;
        format_profits_setting = settings().format_profit_m_Umber;
    } else if (key == "Tungsten") {
        tracker_enable_setting = settings().tracker_tungsten_enable;
        format_blocks_setting = settings().format_blocks_m_Tungsten;
        format_collection_setting = settings().format_collection_m_Tungsten;
        format_profits_setting = settings().format_profit_m_Tungsten;
    } else if (key == "Glacite") {
        tracker_enable_setting = settings().tracker_glacite_enable;
        format_blocks_setting = settings().format_blocks_m_Glacite;
        format_collection_setting = settings().format_collection_m_Glacite;
        format_profits_setting = settings().format_profit_m_Glacite;
    } else if (key == "Mithril") {
        tracker_enable_setting = settings().tracker_mithril_enable;
        format_blocks_setting = settings().format_blocks_m_Mithril;
        format_collection_setting = settings().format_collection_m_Mithril;
        format_profits_setting = settings().format_profit_m_Mithril;
    }

    return [tracker_enable_setting, format_blocks_setting, format_collection_setting, format_profits_setting];
}

function reset_data(key, reset) {
    if (reset === true) {
        calculate_data[key].sack_collection = 0,
        calculate_data[key].aprox_collection = 0,
    
        calculate_data[key].block_and_enchant = {
                block: false,
                enchant: false,
        },
    
        calculate_data[key].blocks_broken = 0,
    
        calculate_data[key].display = { 
                blocks_net: 0, 
                blocks_ph: 0, 
                collection_net: 0, 
                collection_ph: 0, 
                profit_net: 0, 
                profit_ph: 0, 
                alt_profit_net: 0,  
                alt_profit_ph: 0,
                runtime: "0s",
        }
    }
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


function calculate_blocks(key, blocks, area, time) {
    if (blocks > 0) {
        collection_timers[key].is_afk = false;
        collection_timers[key].afk_offset = time;
        calculate_data[key].blocks_broken += blocks;
    }
}
function calculate_aprox_collection(key, blocks, fortune, area, drop_rate) {
    // how much of an an item is dropped per block broken

    if (area in calculate_data[key].collection_world) {
        calculate_data[key].aprox_collection += (blocks - compact_count) * fortune * drop_rate + (compact_count * 160);
        compact_count = 0;
        
    } else {
        calculate_data[key].sack_collection += calculate_data[key].aprox_collection;
        calculate_data[key].aprox_collection = 0;

    }
}

function billion_calculator(goal, current, gain_ph) {
    let time_to_goal = (goal - current) / gain_ph;

    let total_hours = Math.floor(time_to_goal);
    let total_minutes = Math.floor((time_to_goal - total_hours) * 60);
    let total_seconds = Math.floor(((time_to_goal - total_hours) * 60 - total_minutes) * 60);

    let total_time_formatted = "";
    if (total_hours > 0) {
        total_time_formatted += total_hours + "h ";
    }
    if (total_minutes > 0 || total_hours > 0) {
        total_time_formatted += total_minutes + "m ";
    }
    total_time_formatted += total_seconds + "s";

    return total_time_formatted;
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
function format_time(time) {
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

    return total_time_formatted;
}