import settings from "../../settings";
import { collection_timers } from "../timer";
import { sumlevel } from "./petLevelDict";
import { global_vars, display_pet_data } from "../global_vars";
import { getPetprofit } from "../api_data";
import { get_pet_data } from "../tab_parser";

register("chat", chat_parser);

function chat_parser(event) {
    let message = ChatLib.getChatMessage(event);
    if(message.startsWith('You summoned your') || message.startsWith('Your pet is now holding')) {
        pet_data_reset = true;
        get_pet_profit = true;
        collection_timers.Pet = { start_time: null, total_time: 1, previous_session_time: 1, is_afk: true, afk_offset: null };
        if (settings().tracker_pet_enable == true) {
            ChatLib.chat("&7[&bCollection Tracker&7] &r&fPet Change! Adjusting Pet Progression...");
        }
    }
};

let previous_pet_name = null;
let previous_pet_tier = "COMMON";
let previous_pet_lvl = 2;
let previous_pet_exp = 0;

let pet_xp_gained = 0;
let total_pet_xp = 0;

let pet_data_reset = false;

let pet_profit = 0;
let pet_exp_to_coin = 0;

let first_pet = true;
let get_pet_profit = true;

export function pet_calculate(reset, tab_data) {
    if (settings().tracker_pet_enable == true) {

        // Get pet data
        let pet_prog = get_pet_data(tab_data);
        let name = pet_prog[0];
        let tier = pet_prog[1];
        let lvl = pet_prog[2];
        let exp = pet_prog[3];


        // If pet widget alert is true, set pet data to previous pet data
        if (global_vars.pet_widget_alert === true) {
            name = previous_pet_name;
            tier = previous_pet_tier;
            lvl = previous_pet_lvl;
            exp = previous_pet_exp;
        }


        set_initial_pet_data(name, tier, lvl, exp, reset); // Set previous pet data for comparison against next tick


        let exp_gain = 0;
        if (previous_pet_lvl !== lvl) { // If lvl changes, calculate exp gained
            exp_gain = exp + (sumlevel(previous_pet_lvl, lvl - 1, tier) - previous_pet_exp);
        } else { // If lvl doesn't change, calculate exp gained
            exp_gain = exp - previous_pet_exp;
        }


        if (exp_gain != 0 && isNaN(exp_gain) === false) { // If exp gain is not 0 and valid number, add it to the total exp gained
            collection_timers.Pet.is_afk = false;
            collection_timers.Pet.afk_offset = collection_timers.Pet.total_time;

            pet_xp_gained += exp_gain; 
            total_pet_xp += exp_gain; 
            global_vars.total_pet_pofit += exp_gain * pet_exp_to_coin;
            previous_pet_lvl = lvl; // Set new previous pet lvl for the next tick
            previous_pet_exp = exp; // Set new previous pet exp for the next tick
        }


        
        let exp_next_lvl = Math.floor(sumlevel(lvl, lvl, tier) - exp); // Calculate exp needed to level up
        let exp_100_lvl = 0;
        let exp_max_lvl = 0;

        if (lvl < 100){
            exp_100_lvl = exp_100_lvl = sumlevel(lvl, 100, tier) - exp;
        }
        if (name === "Golden Dragon" || name === "Golden Dragon Egg") {
            exp_max_lvl = sumlevel(lvl, 200, tier) - exp;
        }

        let pet_xp_ph = pet_xp_gained / (collection_timers.Pet.total_time / 3600000); // Calculate pet xp per hour
        global_vars.pet_profit_ph = pet_xp_ph * pet_exp_to_coin; // Calculate profit per hour
        let exp_next_lvl_time = exp_next_lvl / pet_xp_ph; // Calculate time to level up
        let exp_100_lvl_time = exp_100_lvl / pet_xp_ph; // Calculate time to reach lvl 100
        let exp_max_lvl_time = exp_max_lvl / pet_xp_ph; // Calculate time to max level

        format_pet(exp_next_lvl_time, exp_100_lvl_time, exp_max_lvl_time, pet_xp_ph, total_pet_xp, global_vars.pet_profit_ph, global_vars.total_pet_pofit);
    } else {
        pet_data_reset = true;
        pet_xp_gained = 0;
        total_pet_xp = 0;
        global_vars.total_pet_pofit = 0;
        collection_timers.Pet.is_afk = true;
    }
}

function set_initial_pet_data(name, tier, lvl, exp, reset) {
    if (reset == true) {
        pet_data_reset = true;
        pet_xp_gained = 0;
        total_pet_xp = 0;
        global_vars.total_pet_pofit = 0;
    }
    if (pet_data_reset === true && (name !== previous_pet_name || tier !== previous_pet_tier || lvl !== previous_pet_lvl || exp !== previous_pet_exp)) {
        previous_pet_name = name;
        previous_pet_tier = tier;
        previous_pet_lvl = lvl;
        previous_pet_exp = exp;

        pet_xp_gained = 0;

        pet_data_reset = false;
        if (first_pet === true || get_pet_profit === true) { // If it's the first pet or the pet profit needs to be recalculated
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