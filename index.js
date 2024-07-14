import { drill_tracker } from "./functions/drill_tracker";
import { global_vars } from "./functions/global_vars";
import { getBazaarItems, getPetprofit } from "./functions/other";
import { get_area, get_fortune, get_pet_data } from "./functions/tab_parser"; 
import { check_afk, timer } from "./functions/timer";
import { pet_calculate } from "./functions/Calc-format/pet_tracker";
import { obby_calculate } from "./functions/Calc-format/calculate"; 
import { build_obby_gui } from "./functions/build_gui";
import settings from "./settings";


register("tick", on_tick);
register("command", reset).setCommandName("retrack");
register("renderOverlay", build_obby_gui);
register("step", () => {
    minutes++;

    if (minutes >= settings().bazaar_update_rate) {
        minutes = 0;
        getBazaarItems();
    }
}).setDelay(60)

getBazaarItems();

let minutes = 0;

function reset() {
    global_vars.reset = true;
    ChatLib.chat("&7[&bCollection Tracker&7] &r&fResetting Collection Tracker...");
}

function on_tick() {
    let reset = false;
    if (global_vars.reset == true) { 
        // dont know if it would be an actual issue but this should prevent reset being triggered halfway 
        // through the code and then only reseting some of the values
        reset = global_vars.reset;
        global_vars.reset = false;
    }

    let additional_blocks_broken = drill_tracker();

    let tab_data = TabList.getNames();

    global_vars.area = get_area(tab_data);    
    let fortune = get_fortune(tab_data);
    let pet_data = get_pet_data(tab_data);



    check_afk(reset, additional_blocks_broken, 0, 0, 0, 0, 0, 0);
    let time = timer();
    let obby_time = time[0];
    let gold_time = time[1];
    let quartz_time = time[2];
    let umber_time = time[3];
    let tungsten_time = time[4];
    let glacite_time = time[5];
    let mithril_time = time[6];

    
    pet_calculate(pet_data[0], pet_data[1], pet_data[2], pet_data[3], reset);
    obby_calculate(reset, additional_blocks_broken, global_vars.area, obby_time, fortune);
}

ChatLib.chat("&7[&bCollection Tracker&7] &r&fFully loaded! Use &b/ctrack &fto open the tracker gui.");
