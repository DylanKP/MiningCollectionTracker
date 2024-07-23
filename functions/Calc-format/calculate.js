import settings from "../../settings";
import { global_vars, display_obsidian } from "../global_vars";
import { collection_timers } from "../timer";
import { get_area, get_fortune } from "../tab_parser";

register("chat", ()=>{
    if (area == "The End") {
        compact_count = compact_count + 1;
    }
}).setChatCriteria(/&r&b&lCOMPACT! &r&fYou found an &r&aEnchanted Obsidian&r&f!&r/g);




let total_blocks = 0;
let total_obby = 0;
let compact_count = 0;

let area = null;

export function obby_calculate(reset, blocks, tab_data) {
    if (settings().tracker_obby_enable == true) {
        if (reset == true) {
            total_blocks = 0;
            total_obby = 0;
            compact_count = 0;
            return;
        }

        area = get_area(tab_data);
        let fortune = get_fortune(tab_data);

        if (blocks != 0 && area == "The End") {
            collection_timers.Obsidian.is_afk = false;
            collection_timers.Obsidian.afk_offset = collection_timers.Obsidian.total_time;

            total_blocks += blocks;

            let obby = (blocks - compact_count) * fortune + (compact_count * 160);
            compact_count = 0;

            total_obby += obby;
        }

        let blocks_per_hour = total_blocks / (collection_timers.Obsidian.total_time / 3600000);
        let obby_per_hour = total_obby / (collection_timers.Obsidian.total_time / 3600000);

        let e_obby_net = total_obby / 160;
        let e_obby_ph = obby_per_hour / 160;

        let e_obby_profit_net = (e_obby_net * global_vars.e_obby_data);
        let e_obby_profit_ph = e_obby_ph * global_vars.e_obby_data;


        let ovoid_net = total_obby / 5120;
        let ovoid_ph = obby_per_hour / 5120;

        let ovoid_profit_net = ((ovoid_net * global_vars.ovoid_data) - (ovoid_net * global_vars.null_sphere_data * 128));
        let ovoid_profit_ph = ((ovoid_ph * global_vars.ovoid_data) - (ovoid_ph * global_vars.null_sphere_data * 128));

        if (settings().integrate_profit == true && settings().tracker_pet_enable == true) {
            e_obby_profit_net = (e_obby_profit_net + global_vars.total_pet_pofit).toFixed(0);
            e_obby_profit_ph += global_vars.pet_profit_ph;

            ovoid_profit_net = (ovoid_profit_net + global_vars.total_pet_pofit).toFixed(0);
            ovoid_profit_ph += global_vars.pet_profit_ph;
        } else {
            e_obby_profit_net = e_obby_profit_net.toFixed(0);

            ovoid_profit_net = ovoid_profit_net.toFixed(0);
        }

        format_obby(blocks_per_hour, obby_per_hour, e_obby_profit_net, e_obby_profit_ph, ovoid_profit_net, ovoid_profit_ph);
        display_obsidian.runtime = format_time(collection_timers.Obsidian.total_time);
    } else {
        collection_timers.Obsidian.is_afk = true;
    }
}
function format_obby(blocks_per_hour, obby_per_hour, e_obby_profit_net, e_obby_profit_ph, ovoid_profit_net, ovoid_profit_ph) {
    let format_blocks = settings().format_blocks_m;
    if (format_blocks == true) {
        display_obsidian.blocks_net = (total_blocks / 1000000).toFixed(2) + "M";
        display_obsidian.blocks_ph = (blocks_per_hour / 1000000).toFixed(2) + "M";
    } else {
        display_obsidian.blocks_net = total_blocks.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        display_obsidian.blocks_ph = blocks_per_hour.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    let format_obby = settings().format_obby_m;
    if (format_obby == true) {
        display_obsidian.obby_net = (total_obby / 1000000).toFixed(2) + "M";
        display_obsidian.obby_ph = (obby_per_hour / 1000000).toFixed(2) + "M";
    } else {
        display_obsidian.obby_net = total_obby.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        display_obsidian.obby_ph = obby_per_hour.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    let format_obby_profit = settings().format_obby_profit_m;
    if (format_obby_profit == true) {
        display_obsidian.e_profit_net = (e_obby_profit_net / 1000000).toFixed(2) + "M";
        display_obsidian.e_profit_ph = (e_obby_profit_ph / 1000000).toFixed(2) + "M";

        display_obsidian.o_profit_net = (ovoid_profit_net / 1000000).toFixed(2) + "M";
        display_obsidian.o_profit_ph = (ovoid_profit_ph / 1000000).toFixed(2) + "M";
    } else {
        display_obsidian.e_profit_net = e_obby_profit_net.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        display_obsidian.e_profit_ph = e_obby_profit_ph.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        
        display_obsidian.o_profit_net = ovoid_profit_net.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        display_obsidian.o_profit_ph = ovoid_profit_ph.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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