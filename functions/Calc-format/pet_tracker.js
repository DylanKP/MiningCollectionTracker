import settings from "../../settings";
import { sumlevel } from "./petLevelDict";
import { global_vars, display_pet_data } from "../global_vars";
import { getPetprofit } from "../other";

register("chat", chat_parser);

function chat_parser(event) {
    let message = ChatLib.getChatMessage(event);
    if(message.startsWith('You summoned your')){
        pet_data_reset = true;
        get_pet_profit = true;
        ChatLib.chat("&7[&bCollection Tracker&7] &r&fPet data reset...")
    }
};

let previous_pet_name = null;
let previous_pet_tier = "COMMON";
let previous_pet_lvl = 2;
let previous_pet_exp = 0;

let pet_xp_gained = 0;
let total_pet_xp = 0;

let previous_session_time = 0;
let pet_afk_start = null;

let pet_data_reset = false;
let already_afk = true;

let pet_profit = 0;
let pet_exp_to_coin = 0;

let afk_threshold = 15;

let first_pet = true;
let get_pet_profit = true;

export function pet_calculate(name, tier, lvl, exp, reset) {
    if (global_vars.pet_widget_alert === true) {
        name = previous_pet_name;
        tier = previous_pet_tier;
        lvl = previous_pet_lvl;
        exp = previous_pet_exp;
    }
    
    if (settings().tracker_pet_enable == true) {
        set_initial_pet_data(name, tier, lvl, exp, reset);

        // Reset pet_afk_start only when pet experience changes, indicating activity
        if (previous_pet_exp != exp) {
            if (pet_afk_start != null) {
                // Calculate the AFK time and add it to the previous session time
                previous_session_time += Date.now() - pet_afk_start;
            }
            pet_afk_start = Date.now();
            global_vars.pet_afk = false;
            already_afk = false;
        }

        if (isNaN(settings().afk_threshold) === false && settings().afk_threshold > 0) {
            afk_threshold = settings().afk_threshold;
        }
        // If the pet_afk_start is set and the AFK time is more than 15 seconds, update the session time
        if (pet_afk_start != null && (Date.now() - pet_afk_start > afk_threshold * 1000) && settings().disable_afk === false) {
            global_vars.pet_afk = true;
        }
        if (global_vars.pet_afk === true && already_afk === false) {
            previous_session_time += Date.now() - pet_afk_start;
            pet_afk_start = null;
            pet_data_reset = true;
            ChatLib.chat("&7[&bCollection Tracker&7] &r&fIdle for "+afk_threshold+"s. Pet tracker AFK...");
            already_afk = true;
        }
        
        if (previous_pet_lvl !== lvl) { // If lvl changes, calculate exp gained
            let sum = sumlevel(previous_pet_lvl, lvl - 1, tier);
            pet_xp_gained += exp + (sum - previous_pet_exp);
            total_pet_xp += exp + (sum - previous_pet_exp);
            global_vars.total_pet_pofit += (exp + (sum - previous_pet_exp)) * pet_exp_to_coin;
            previous_pet_lvl = lvl; // Set new previous pet lvl for the next tick
            previous_pet_exp = exp; // Set new previous pet exp for the next tick
        } else {
            // If no lvl change, add exp gained to the total
            pet_xp_gained += (exp - previous_pet_exp); // Calculate exp gained (will be 0 if no change)
            total_pet_xp += (exp - previous_pet_exp); // Add exp gained to the total
            global_vars.total_pet_pofit += (exp - previous_pet_exp) * pet_exp_to_coin; // Add profit gained to the total
            previous_pet_exp = exp;
        }
        
        let exp_next_lvl = Math.floor(sumlevel(lvl, lvl, tier) - exp); // Calculate exp needed to level up
        let exp_100_lvl = exp_100_lvl = sumlevel(lvl, 100, tier) - exp;
        let exp_max_lvl = 0;

        if (lvl > 100){
            exp_100_lvl = 0;
        }
        if (name === "Golden Dragon" || name === "Golden Dragon Egg") {
            exp_max_lvl = sumlevel(lvl, 200, tier) - exp;
        }

        // Calculate elapsed time correctly considering pet_afk_start
        let elapsed_time = (pet_afk_start != null ? Date.now() - pet_afk_start : 0) + previous_session_time;
        if (elapsed_time === 0) {
            elapsed_time = 1; // Prevent division by zero
        }

        let pet_xp_ph = pet_xp_gained / (elapsed_time / 3600000); // Calculate pet xp per hour
        global_vars.pet_profit_ph = pet_xp_ph * pet_exp_to_coin; // Calculate profit per hour
        let exp_next_lvl_time = exp_next_lvl / pet_xp_ph; // Calculate time to level up
        let exp_100_lvl_time = exp_100_lvl / pet_xp_ph; // Calculate time to reach lvl 100
        let exp_max_lvl_time = exp_max_lvl / pet_xp_ph; // Calculate time to max level

        format_pet(exp_next_lvl_time, exp_100_lvl_time, exp_max_lvl_time, pet_xp_ph, total_pet_xp, global_vars.pet_profit_ph, global_vars.total_pet_pofit);
    } else {
        pet_data_reset = true;
        global_vars.pet_afk = true;
        already_afk = true;
        pet_xp_gained = 0;
        total_pet_xp = 0;
        global_vars.total_pet_pofit = 0;
    }
}

function set_initial_pet_data(name, tier, lvl, exp, reset) {
    if (reset == true) {
        pet_data_reset = true;
        global_vars.pet_afk = true;
        already_afk = true;
        pet_xp_gained = 0;
        total_pet_xp = 0;
        global_vars.total_pet_pofit = 0;
    }
    if (pet_data_reset === true && (name !== previous_pet_name || tier !== previous_pet_tier || lvl !== previous_pet_lvl || exp !== previous_pet_exp)) {
        previous_pet_name = name;
        previous_pet_tier = tier;
        previous_pet_lvl = lvl;
        previous_pet_exp = exp;

        pet_afk_start = null;
        previous_session_time = 0;
        pet_xp_gained = 0;

        pet_data_reset = false;
        if (first_pet === true || get_pet_profit === true) {
            first_pet = false;
            get_pet_profit = false;
            global_vars.get_new_pet_profit = true;
        }
    }
    if (global_vars.get_new_pet_profit == true) {
        if (name === "Golden Dragon" || name === "Golden Dragon Egg") {
            getPetprofit("Golden Dragon", "LEGENDARY", (net_profit) => {
                pet_profit = net_profit;
                pet_exp_to_coin = pet_profit / sumlevel(1, 200, "LEGENDARY");
            });
        } else {
            getPetprofit(name, tier, (net_profit) => {
                pet_profit = net_profit;
                pet_exp_to_coin = pet_profit / sumlevel(1, 100, tier);
            });
        }
        global_vars.get_new_pet_profit = false;
    }
}





function format_pet(exp_next_lvl, exp_100_lvl, exp_max_lvl, pet_xp_ph, total_xp, pet_profit_per_hour) {

    
    let total_hours_exp_n = exp_next_lvl;
    let exp_next_lvl_h = Math.floor(total_hours_exp_n);
    let total_minutes_exp_n = (total_hours_exp_n - exp_next_lvl_h) * 60;
    let exp_next_lvl_m = Math.floor(total_minutes_exp_n);
    let total_seconds_exp_n = (total_minutes_exp_n - exp_next_lvl_m) * 60;
    let exp_next_lvl_s = Math.floor(total_seconds_exp_n);

    display_pet_data.display_next_lvl_time = "";
    if (exp_next_lvl_h > 0) {
        display_pet_data.display_next_lvl_time = exp_next_lvl_h + "h ";
    }
    if (exp_next_lvl_m > 0 || exp_next_lvl_h > 0) {
        display_pet_data.display_next_lvl_time += exp_next_lvl_m + "m ";
    }
    if (settings().lvl_seconds_enable == true) {
        display_pet_data.display_next_lvl_time += exp_next_lvl_s + "s";
    }
    if (display_pet_data.display_next_lvl_time == "") { //for there to be no time at this point means it cant show seconds and no minutes or hours so 0m is displayed
        display_pet_data.display_next_lvl_time = "0m";
    }

    
    if (exp_100_lvl != 0) {
        let total_hours_exp_m = exp_100_lvl;
        let exp_max_lvl_h = Math.floor(total_hours_exp_m);
        let total_minutes_exp_m = (total_hours_exp_m - exp_max_lvl_h) * 60;
        let exp_max_lvl_m = Math.floor(total_minutes_exp_m);
        let total_seconds_exp_m = (total_minutes_exp_m - exp_max_lvl_m) * 60;
        let exp_max_lvl_s = Math.floor(total_seconds_exp_m);
        display_pet_data.display_100_lvl_time = "";
        if (exp_max_lvl_h > 0) {
            display_pet_data.display_100_lvl_time = exp_max_lvl_h + "h ";
        }
        if (exp_max_lvl_m > 0 || exp_max_lvl_h > 0) {
            display_pet_data.display_100_lvl_time += exp_max_lvl_m + "m ";
        }
        if (settings().lvl_seconds_enable == true) {
            display_pet_data.display_100_lvl_time += exp_max_lvl_s + "s";
        }
        if (display_pet_data.display_100_lvl_time == "") { //for there to be no time at this point means it cant show seconds and no minutes or hours so 0m is displayed
            display_pet_data.display_100_lvl_time = "0m";
        }
    } else {
        display_pet_data.display_100_lvl_time = 0;
    }

    
    if (exp_max_lvl != 0) {
        let total_hours_exp_x = exp_max_lvl;
        let exp_max_lvl_h = Math.floor(total_hours_exp_x);
        let total_minutes_exp_x = (total_hours_exp_x - exp_max_lvl_h) * 60;
        let exp_max_lvl_m = Math.floor(total_minutes_exp_x);
        let total_seconds_exp_x = (total_minutes_exp_x - exp_max_lvl_m) * 60;
        let exp_max_lvl_s = Math.floor(total_seconds_exp_x);
        display_pet_data.display_max_lvl_time = "";
        if (exp_max_lvl_h > 0) {
            display_pet_data.display_max_lvl_time = exp_max_lvl_h + "h ";
        }
        if (exp_max_lvl_m > 0 || exp_max_lvl_h > 0) {
            display_pet_data.display_max_lvl_time += exp_max_lvl_m + "m ";
        }
        if (settings().lvl_seconds_enable == true) {
            display_pet_data.display_max_lvl_time += exp_max_lvl_s + "s";
        }
        if (display_pet_data.display_max_lvl_time == "") { //for there to be no time at this point means it cant show seconds and no minutes or hours so 0m is displayed
            display_pet_data.display_max_lvl_time = "0m";
        }
    } else {
        display_pet_data.display_max_lvl_time = 0;
    }

    if (settings().format_pet_profit_m == true) {
        display_pet_data.display_pet_profit = (pet_profit / 1000000).toFixed(2) + "M";
        display_pet_data.display_pet_profit_ph = (pet_profit_per_hour / 1000000).toFixed(2) + "M";
        display_pet_data.display_pet_profit_net = (global_vars.total_pet_pofit / 1000000).toFixed(2) + "M";
    } else {
        display_pet_data.display_pet_profit = pet_profit.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        display_pet_data.display_pet_profit_ph = pet_profit_per_hour.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        display_pet_data.display_pet_profit_net = global_vars.total_pet_pofit.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    if (settings().format_pet_xp_m == true) {
        display_pet_data.display_pet_xp_ph = (pet_xp_ph / 1000000).toFixed(2) + "M";
        display_pet_data.display_total_xp = (total_xp / 1000000).toFixed(2) + "M";
    } else {
        display_pet_data.display_pet_xp_ph = pet_xp_ph.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        display_pet_data.display_total_xp = total_xp.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}