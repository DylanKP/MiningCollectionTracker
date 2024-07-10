import { drill_tracker } from "./functions/drill_tracker";
import { global_vars, display_obsidian } from "./functions/global_vars";
import { getBazaarItems } from "./functions/other";
import { pet_tracker } from "./functions/pet_tracker";
import { get_area, get_fortune, get_pet_data } from "./functions/tab_parser"; 
import { check_afk, timer } from "./functions/timer";
import { obby_calculate, format_pet } from "./functions/calculate"; 
import { build_obby_gui } from "./functions/build_gui";


register("tick", on_tick);
register("command", reset).setCommandName("retrack");
register("command", test).setCommandName("test");
register("renderOverlay", build_obby_gui);

getBazaarItems();

function reset() {
    global_vars.reset = true;
    ChatLib.chat("&7[&bCollection Tracker&7] &r&fResetting Collection Tracker...");
}

function on_tick() {
    let reset = false;
    if (global_vars.reset == true) {
        reset = global_vars.reset;
        global_vars.reset = false;
    }

    let additional_blocks_broken = drill_tracker();
    global_vars.area = get_area();    
    let fortune = get_fortune();

    let pet_data = get_pet_data();
    let pet_stats = pet_tracker(pet_data[0], pet_data[1], pet_data[2], pet_data[3], reset);



    check_afk(reset, global_vars.area, additional_blocks_broken, 0, 0, 0, 0, 0, 0);
    let time = timer();
    let obby_time = time[0];
    let gold_time = time[1];
    let quartz_time = time[2];
    let umber_time = time[3];
    let tungsten_time = time[4];
    let glacite_time = time[5];
    let mithril_time = time[6];

    
    format_pet(pet_stats[0], pet_stats[1], pet_stats[2], pet_stats[3], pet_stats[4])
    obby_calculate(reset, additional_blocks_broken, global_vars.area, obby_time, fortune);
}

function test() {
    for (let key in display_obsidian) {
        ChatLib.chat(key + ": " + display_obsidian[key]);
    }
}

ChatLib.chat("&7[&bCollection Tracker&7] &r&fFully loaded! Use &b/ctrack &fto open the tracker gui.");
