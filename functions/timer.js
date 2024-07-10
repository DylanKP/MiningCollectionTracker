


export const collection_timers = {
    Obsidian: { start_time: null, total_time: 0, previous_session_time: 0, is_afk: true, afk_offset: null },
    Gold: { start_time: null, total_time: 0, previous_session_time: 0, is_afk: true, afk_offset: null },
    Quartz: { start_time: null, total_time: 0, previous_session_time: 0, is_afk: true, afk_offset: null },
    Umber: { start_time: null, total_time: 0, previous_session_time: 0, is_afk: true, afk_offset: null },
    Tungsten: { start_time: null, total_time: 0, previous_session_time: 0, is_afk: true, afk_offset: null },
    Glacite: { start_time: null, total_time: 0, previous_session_time: 0, is_afk: true, afk_offset: null },
    Mithril: { start_time: null, total_time: 0, previous_session_time: 0, is_afk: true, afk_offset: null },
};

export function timer() {
    for (let key in collection_timers) {
        if (!collection_timers[key].is_afk) {
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
                ChatLib.chat("&7[&bCollection Tracker&7] &r&f"+ key +" tracker AFK...")
            }
        }
    }
    return [
        collection_timers.Obsidian.total_time,
        collection_timers.Gold.total_time,
        collection_timers.Quartz.total_time,
        collection_timers.Umber.total_time,
        collection_timers.Tungsten.total_time,
        collection_timers.Glacite.total_time,
        collection_timers.Mithril.total_time,
    ];
}

let afk_threshold = 7;
export function check_afk(reset, in_end, blocks_broken, compact, gold_gain, quartz_gain, umber_gain, tungsten_gain, glacite_gain, mithril_gain) {
    if (reset) {
        for (let key in collection_timers) {
            collection_timers[key] = { start_time: null, total_time: 0, previous_session_time: 0, is_afk: true, afk_offset: null };
        }
        return;
    }

    if ((blocks_broken !== 0 || compact !== 0) && in_end === "The End") {
        collection_timers.Obsidian.is_afk = false;
        collection_timers.Obsidian.afk_offset = collection_timers.Obsidian.total_time;
    }

    for (let key in collection_timers) {
        if (
            collection_timers[key].is_afk === false &&
            collection_timers[key].afk_offset !== null &&
            collection_timers[key].total_time - collection_timers[key].afk_offset > 15000 //settings().afk_threshold * 1000 &&
            //settings().disable_afk === false
        ) {
            collection_timers[key].is_afk = true;
        }
    }
}
