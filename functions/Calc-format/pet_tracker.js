import settings from "../../settings";
import { sumlevel } from "./petLevelDict";
import { global_vars, display_pet_data } from "../global_vars";

register("chat", chat_parser);

function chat_parser(event) {
    let message = ChatLib.getChatMessage(event);
    if(message.startsWith('You summoned your')){
        pet_data_reset = true;
        ChatLib.chat("&7[&bCollection Tracker&7] &r&fPet data reset...")
    }
};

let previous_pet_name = null;
let previous_pet_tier = "common";
let previous_pet_lvl = 2;
let previous_pet_exp = 0;

let pet_xp_gained = 0;
let total_pet_xp = 0;

let previous_session_time = 0;
let pet_afk_start = null;

let pet_data_reset = false;
let already_afk = true;

export function pet_calculate(name, tier, lvl, exp, reset) {
    if (global_vars.pet_widget_alert === true) {
        name = previous_pet_name;
        tier = previous_pet_tier;
        lvl = previous_pet_lvl;
        exp = previous_pet_exp;
    }

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

    // If the pet_afk_start is set and the AFK time is more than 15 seconds, update the session time
    if (pet_afk_start != null && (Date.now() - pet_afk_start > 15000)) {
        global_vars.pet_afk = true;
    }
    if (global_vars.pet_afk === true && already_afk === false) {
        previous_session_time += Date.now() - pet_afk_start;
        pet_afk_start = null;
        pet_data_reset = true;
        ChatLib.chat("&7[&bCollection Tracker&7] &r&fPet tracker AFK...");
        already_afk = true;
    }
    
    if (previous_pet_lvl !== lvl) { // If lvl changes, calculate exp gained
        let sum = sumlevel(previous_pet_lvl, lvl - 1, tier);
        pet_xp_gained += exp + (sum - previous_pet_exp);
        total_pet_xp += exp + (sum - previous_pet_exp);
        previous_pet_lvl = lvl; // Set new previous pet lvl for the next tick
        previous_pet_exp = exp; // Set new previous pet exp for the next tick
    } else {
        // If no lvl change, add exp gained to the total
        pet_xp_gained += (exp - previous_pet_exp); // Calculate exp gained (will be 0 if no change)
        total_pet_xp += (exp - previous_pet_exp); // Add exp gained to the total
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
    let exp_next_lvl_time = exp_next_lvl / pet_xp_ph; // Calculate time to level up
    let exp_100_lvl_time = exp_100_lvl / pet_xp_ph; // Calculate time to reach lvl 100
    let exp_max_lvl_time = exp_max_lvl / pet_xp_ph; // Calculate time to max level

    format_pet(exp_next_lvl_time, exp_100_lvl_time, exp_max_lvl_time, pet_xp_ph, total_pet_xp);
}

function set_initial_pet_data(name, tier, lvl, exp, reset) {
    if (reset == true) {
        pet_data_reset = true;
        global_vars.pet_afk = true;
        already_afk = true;
        pet_xp_gained = 0;
        total_pet_xp = 0;
    }
    if (pet_data_reset === true && (name !== previous_pet_name || tier !== previous_pet_tier || lvl !== previous_pet_lvl || exp !== previous_pet_exp)) {
        previous_pet_name = name;
        previous_pet_tier = tier;
        previous_pet_lvl = lvl;
        previous_pet_exp = exp;

        pet_afk_start = null;
        previous_session_time = 0;

        pet_data_reset = false;
    }
}





function format_pet(exp_next_lvl, exp_100_lvl, exp_max_lvl, pet_xp_ph, total_xp) {

    
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

    
    
    if (settings().format_pet_xp_m == true) {
        display_pet_data.display_pet_xp_ph = (pet_xp_ph / 1000000).toFixed(2) + "M";
        display_pet_data.display_total_xp = (total_xp / 1000000).toFixed(2) + "M";
    } else {
        display_pet_data.display_pet_xp_ph = pet_xp_ph.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        display_pet_data.display_total_xp = total_xp.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}