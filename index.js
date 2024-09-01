import { drill_tracker } from "./functions/drill_tracker";
import { global_vars, in_hypixel } from "./functions/global_vars";
import { getBazaarItems } from "./functions/api_data";
import { timer } from "./functions/timer";
import { pet_calculate } from "./functions/Calc-format/pet_tracker";
import { calculate } from "./functions/Calc-format/mining_tracker"; 
import { build_gui } from "./functions/build_gui";
import settings from "./settings";
import { sack_parser } from "./functions/sack_parser";

register("renderOverlay", () => {
    build_gui(in_hypixel);
});
register("tick", on_tick);
register('chat', sack_parser );
register("worldLoad", loading_message);

import { get_gui } from "./functions/chest_gui_parser";

register("command", () => {
    global_vars.reset = true;
    ChatLib.chat("&7[&bCollection Tracker&7] &r&fResetting Collection Tracker...");
}).setCommandName("retrack");

register("step", () => {
    get_gui();
}).setFps(20);


let minutes = 0;
register("step", () => {
    minutes++;

    if (minutes >= settings().bazaar_update_rate) {
        minutes = 0;
        getBazaarItems();
    }
}).setDelay(60)


function on_tick() {
    check_server();

    if (in_hypixel == true) {
        let reset = false;
        if (global_vars.reset == true) { // ensures that the reset is only called at the start of the tick, might be pointless
            reset = global_vars.reset;
            global_vars.reset = false;
        }
        timer(reset);


        let tab_data = TabList.getNames();
        let additional_blocks_broken = drill_tracker();


        pet_calculate(reset, tab_data);
        calculate(additional_blocks_broken, tab_data, reset);
    } else {
        timer(true);
    }
}

let loaded = false;
function loading_message() { // this is the loading message that is displayed when the script is loaded
    if (loaded == false && in_hypixel == true) {
        ChatLib.chat("&7[&bCollection Tracker&7] &r&fFully loaded!");
        ChatLib.chat("&7[&bCollection Tracker&7] &r&fUse &b/ctrack &fto open the tracker gui.");
        loaded = true;
    }
}

function check_server() {
    let ip = Server?.getIP();
    if (ip == "hypixel.net" ) { // || ip == "alpha.hypixel.net"
        in_hypixel = true;
    } else {
        in_hypixel = false;
    }
    return
}

getBazaarItems();