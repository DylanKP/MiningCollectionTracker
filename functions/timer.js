import settings from "../settings";
import { global_vars } from "./global_vars";


export const collection_timers = {
    Pet: { start_time: null, total_time: 1, previous_session_time: 1, is_afk: true, afk_offset: null },
    Obsidian: { start_time: null, total_time: 1, previous_session_time: 1, is_afk: true, afk_offset: null },
    Gold: { start_time: null, total_time: 1, previous_session_time: 1, is_afk: true, afk_offset: null },
    Quartz: { start_time: null, total_time: 1, previous_session_time: 1, is_afk: true, afk_offset: null },
    Umber: { start_time: null, total_time: 1, previous_session_time: 1, is_afk: true, afk_offset: null },
    Tungsten: { start_time: null, total_time: 1, previous_session_time: 1, is_afk: true, afk_offset: null },
    Glacite: { start_time: null, total_time: 1, previous_session_time: 1, is_afk: true, afk_offset: null },
    Mithril: { start_time: null, total_time: 1, previous_session_time: 1, is_afk: true, afk_offset: null },
};


let afk_threshold = 15;
export function timer(reset) {
    if (isNaN(settings().afk_threshold) === false && settings().afk_threshold > 0) { // Check if afk threshold is a valid number
        afk_threshold = settings().afk_threshold;
    }

    if (reset) { // Reset all timers
        for (let key in collection_timers) {
            collection_timers[key] = { start_time: null, total_time: 1, previous_session_time: 1, is_afk: true, afk_offset: null };
        }
    } else if (global_vars.timer_afk == true) { // Sets all timers to afk
        for (let key in collection_timers) {
            collection_timers[key].is_afk = true;
        }
        global_vars.timer_afk = false;
    }

    for (let key in collection_timers) { // Check if afk
        if (
            collection_timers[key].is_afk === false &&
            collection_timers[key].afk_offset !== null &&
            collection_timers[key].total_time - collection_timers[key].afk_offset > afk_threshold * 1000 &&
            settings().disable_afk === false
        ) {
            collection_timers[key].is_afk = true;
        }
    }


    for (let key in collection_timers) { // Calculate time
        if (collection_timers[key].is_afk == false) {
            if (collection_timers[key].start_time === null) {
                collection_timers[key].start_time = Date.now();
                ChatLib.chat("&7[&bCollection Tracker&7] &r&fTracking "+ key +"...")
            }

            let session_time = Date.now() - collection_timers[key].start_time;
            collection_timers[key].total_time = collection_timers[key].previous_session_time + session_time;

        } else {
            if (collection_timers[key].start_time !== null) {
                collection_timers[key].previous_session_time = collection_timers[key].total_time;
                collection_timers[key].start_time = null;
                ChatLib.chat("&7[&bCollection Tracker&7] &r&fIdle for "+afk_threshold+"s. "+ key +" tracker AFK...")
            }
        }
    }
}
