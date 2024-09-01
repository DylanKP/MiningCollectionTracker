import { makeObjectDraggable } from "../../Draggable";
import { global_vars, display_pet_data, calculate_data} from "./global_vars";
import { collection_timers } from "./timer";
import settings from "../settings";


let display_pet = new Text("", 10, 220);
let display_obby = new Text("", 10, 10);
let display_gold = new Text("", 10, 10);
let display_quartz = new Text("", 10, 10);
let display_umber = new Text("", 10, 10);
let display_tungsten = new Text("", 10, 10);
let display_glacite = new Text("", 10, 10);
let display_mithril = new Text("", 10, 10);

const pet_gui = new Gui();
const obby_gui = new Gui();
const gold_gui = new Gui();
const quartz_gui = new Gui();
const umber_gui = new Gui();
const tungsten_gui = new Gui();
const glacite_gui = new Gui();
const mithril_gui = new Gui();

makeObjectDraggable("Pet Tracker", display_pet, () => pet_gui.isOpen());
makeObjectDraggable("Obby Tracker", display_obby, () => obby_gui.isOpen());
makeObjectDraggable("Gold Tracker", display_gold, () => gold_gui.isOpen());
makeObjectDraggable("Quartz Tracker", display_quartz, () => quartz_gui.isOpen());
makeObjectDraggable("Umber Tracker", display_umber, () => umber_gui.isOpen());
makeObjectDraggable("Tungsten Tracker", display_tungsten, () => tungsten_gui.isOpen());
makeObjectDraggable("Glacite Tracker", display_glacite, () => glacite_gui.isOpen());
makeObjectDraggable("Mithril Tracker", display_mithril, () => mithril_gui.isOpen());

register("command", () => {pet_gui.open()}).setName("petgui");
register("command", () => {obby_gui.open()}).setName("obbygui");
register("command", () => {gold_gui.open()}).setName("goldgui");
register("command", () => {quartz_gui.open()}).setName("quartzgui");
register("command", () => {umber_gui.open()}).setName("umbergui");
register("command", () => {tungsten_gui.open()}).setName("tungstengui");
register("command", () => {glacite_gui.open()}).setName("glacitegui");
register("command", () => {mithril_gui.open()}).setName("mithrilgui");


register("tick", move_gui);


function move_gui() {
    if (global_vars.move_pet == true) {
        global_vars.move_pet = false;
        pet_gui.open()
    } else if (global_vars.move_obby == true) {
        global_vars.move_obby = false;
        obby_gui.open()
    } else if (global_vars.move_gold == true) {
        global_vars.move_gold = false;
        gold_gui.open()
    } else if (global_vars.move_quartz == true) {
        global_vars.move_quartz = false;
        quartz_gui.open()
    } else if (global_vars.move_umber == true) {
        global_vars.move_umber = false;
        umber_gui.open()
    } else if (global_vars.move_tungsten == true) {
        global_vars.move_tungsten = false;
        tungsten_gui.open()
    } else if (global_vars.move_glacite == true) {
        global_vars.move_glacite = false;
        glacite_gui.open()
    } else if (global_vars.move_mithril == true) {
        global_vars.move_mithril = false;
        mithril_gui.open()
    }
}


export function build_gui(in_hypixel) {
    let pet_lines = [];
    let obby_lines = [];
    let gold_lines = [];
    let quartz_lines = [];
    let umber_lines = [];
    let tungsten_lines = [];
    let glacite_lines = [];
    let mithril_lines = [];

    
    if ((collection_timers.Pet.is_afk == false && settings().tracker_pet_enable == true && in_hypixel == true) || pet_gui.isOpen()) {
        if (settings().display_pet_xp == true || pet_gui.isOpen()) {
            pet_lines.push("Pet XP p/h: " + display_pet_data.display_pet_xp_ph);
            pet_lines.push("Total Pet XP: " + display_pet_data.display_total_xp);
            pet_lines.push("");
        }

        if (settings().display_pet_lvl_time == true || pet_gui.isOpen()) {
            pet_lines.push("Time to next level: " + display_pet_data.display_next_lvl_time);
            if (display_pet_data.display_100_lvl_time != 0){
                pet_lines.push("Time to lvl 100: " + display_pet_data.display_100_lvl_time);
            }
            if (display_pet_data.display_max_lvl_time != 0){
                pet_lines.push("Time to lvl 200: " + display_pet_data.display_max_lvl_time);
            }
            pet_lines.push("");
        }

        if (settings().display_pet_profit == true || pet_gui.isOpen()) {
            pet_lines.push("Profit Per Pet: " + display_pet_data.display_pet_profit);
            if (settings().integrate_profit == false) {
                pet_lines.push("Profit Per Pet p/h: " + display_pet_data.display_pet_profit_ph);
                pet_lines.push("Net Profit Per Pet: " + display_pet_data.display_pet_profit_net);
            }
        }

        if (global_vars.pet_widget_alert == true && settings().hide_widget_alerts == false) {
            pet_lines.push("Pet Widget Not Available. Check /tablist");
        }
    }

    if ((collection_timers.Obsidian.is_afk == false && settings().tracker_obby_enable == true && in_hypixel == true) || obby_gui.isOpen()) {
        if (settings().display_obby_block == true || obby_gui.isOpen()) {
            obby_lines.push("Total Blocks Broken: " + calculate_data.Obsidian.display.blocks_net);
            obby_lines.push("Average Blocks Broken p/h: " + calculate_data.Obsidian.display.blocks_ph);
            obby_lines.push("");
        }

        if (settings().display_obby_collected == true || obby_gui.isOpen()) {
            obby_lines.push("Aprox. Obby Collected: " + calculate_data.Obsidian.display.collection_net);
            obby_lines.push("Aprox. Obby p/h: " + calculate_data.Obsidian.display.collection_ph);
            obby_lines.push("");
        }

        if (settings().display_obby_time == true || obby_gui.isOpen()) {
            obby_lines.push("Total time obby mining: " + calculate_data.Obsidian.display.runtime);
            obby_lines.push("");
        }

        if (settings().display_obby_profit_e == true || obby_gui.isOpen()) {
            obby_lines.push("E-Obby Profit p/h: " + calculate_data.Obsidian.display.profit_ph);
            obby_lines.push("E-Obby Net Profit: " + calculate_data.Obsidian.display.profit_net);
            obby_lines.push("");
        }

        if (settings().display_obby_profit_o == true || obby_gui.isOpen()) {
            obby_lines.push("Ovoid Profit p/h: " + calculate_data.Obsidian.display.alt_profit_ph);
            obby_lines.push("Ovoid Net Profit: " + calculate_data.Obsidian.display.alt_profit_net);
            obby_lines.push("");
        }

        if (global_vars.event_widget_alert == true && settings().hide_widget_alerts == false) {
            obby_lines.push("Event Widget Not Available. Check /tablist");
        }

        if (global_vars.fortune_widget_alert == true && settings().hide_widget_alerts == false) {
            obby_lines.push("Fortune Widget Not Available. Check /tablist");
        }
    }

    if ((collection_timers.Gold.is_afk == false && settings().tracker_gold_enable == true && in_hypixel == true) || gold_gui.isOpen()) {
        if (settings().display_gold_block == true || gold_gui.isOpen()) {
            gold_lines.push("Total Blocks Broken: " + calculate_data.Gold.display.blocks_net);
            gold_lines.push("Average Blocks Broken p/h: " + calculate_data.Gold.display.blocks_ph);
            gold_lines.push("");
        }

        if (settings().display_gold_collected == true || gold_gui.isOpen()) {
            gold_lines.push("Aprox. Gold Collected: " + calculate_data.Gold.display.collection_net);
            gold_lines.push("Aprox. Gold p/h: " + calculate_data.Gold.display.collection_ph);
            gold_lines.push("");
        }

        if (settings().display_gold_time == true || gold_gui.isOpen()) {
            if (calculate_data.Gold.display.time_to_goal != null || gold_gui.isOpen()) {
                gold_lines.push("Time to 1 Billion: " + calculate_data.Gold.display.time_to_goal);
            }
            gold_lines.push("Total time gold mining: " + calculate_data.Gold.display.runtime);
            gold_lines.push("");
        }

        if (settings().display_gold_profit == true || gold_gui.isOpen()) {
            gold_lines.push("Gold Profit p/h: " + calculate_data.Gold.display.profit_ph);
            gold_lines.push("Gold Net Profit: " + calculate_data.Gold.display.profit_net);
            gold_lines.push("");
        }
    }

    if ((collection_timers.Quartz.is_afk == false && settings().tracker_quartz_enable == true && in_hypixel == true) || quartz_gui.isOpen()) {
        if (settings().display_quartz_block == true || quartz_gui.isOpen()) {
            quartz_lines.push("Total Blocks Broken: " + calculate_data.Quartz.display.blocks_net);
            quartz_lines.push("Average Blocks Broken p/h: " + calculate_data.Quartz.display.blocks_ph);
            quartz_lines.push("");
        }

        if (settings().display_quartz_collected == true || quartz_gui.isOpen()) {
            quartz_lines.push("Aprox. Quartz Collected: " + calculate_data.Quartz.display.collection_net);
            quartz_lines.push("Aprox. Quartz p/h: " + calculate_data.Quartz.display.collection_ph);
            quartz_lines.push("");
        }

        if (settings().display_quartz_time == true || quartz_gui.isOpen()) {
            quartz_lines.push("Total time quartz mining: " + calculate_data.Quartz.display.runtime);
            quartz_lines.push("");
        }

        if (settings().display_quartz_profit == true || quartz_gui.isOpen()) {
            quartz_lines.push("Quartz Profit p/h: " + calculate_data.Quartz.display.profit_ph);
            quartz_lines.push("Quartz Net Profit: " + calculate_data.Quartz.display.profit_net);
            quartz_lines.push("");
        }
    }

    if ((collection_timers.Umber.is_afk == false && settings().tracker_umber_enable == true && in_hypixel == true) || umber_gui.isOpen()) {
        if (settings().display_umber_block == true || umber_gui.isOpen()) {
            umber_lines.push("Total Blocks Broken: " + calculate_data.Umber.display.blocks_net);
            umber_lines.push("Average Blocks Broken p/h: " + calculate_data.Umber.display.blocks_ph);
            umber_lines.push("");
        }

        if (settings().display_umber_collected == true || umber_gui.isOpen()) {
            umber_lines.push("Aprox. Umber Collected: " + calculate_data.Umber.display.collection_net);
            umber_lines.push("Aprox. Umber p/h: " + calculate_data.Umber.display.collection_ph);
            umber_lines.push("");
        }

        if (settings().display_umber_time == true || umber_gui.isOpen()) {
            umber_lines.push("Total time umber mining: " + calculate_data.Umber.display.runtime);
            umber_lines.push("");
        }

        if (settings().display_umber_profit == true || umber_gui.isOpen()) {
            umber_lines.push("Umber Profit p/h: " + calculate_data.Umber.display.profit_ph);
            umber_lines.push("Umber Net Profit: " + calculate_data.Umber.display.profit_net);
            umber_lines.push("");
        }
    }

    if ((collection_timers.Tungsten.is_afk == false && settings().tracker_tungsten_enable == true && in_hypixel == true) || tungsten_gui.isOpen()) {
        if (settings().display_tungsten_block == true || tungsten_gui.isOpen()) {
            tungsten_lines.push("Total Blocks Broken: " + calculate_data.Tungsten.display.blocks_net);
            tungsten_lines.push("Average Blocks Broken p/h: " + calculate_data.Tungsten.display.blocks_ph);
            tungsten_lines.push("");
        }

        if (settings().display_tungsten_collected == true || tungsten_gui.isOpen()) {
            tungsten_lines.push("Aprox. Tungsten Collected: " + calculate_data.Tungsten.display.collection_net);
            tungsten_lines.push("Aprox. Tungsten p/h: " + calculate_data.Tungsten.display.collection_ph);
            tungsten_lines.push("");
        }

        if (settings().display_tungsten_time == true || tungsten_gui.isOpen()) {
            tungsten_lines.push("Total time tungsten mining: " + calculate_data.Tungsten.display.runtime);
            tungsten_lines.push("");
        }

        if (settings().display_tungsten_profit == true || tungsten_gui.isOpen()) {
            tungsten_lines.push("Tungsten Profit p/h: " + calculate_data.Tungsten.display.profit_ph);
            tungsten_lines.push("Tungsten Net Profit: " + calculate_data.Tungsten.display.profit_net);
            tungsten_lines.push("");
        }
    }

    if ((collection_timers.Glacite.is_afk == false && settings().tracker_glacite_enable == true && in_hypixel == true) || glacite_gui.isOpen()) {
        if (settings().display_glacite_block == true || glacite_gui.isOpen()) {
            glacite_lines.push("Total Blocks Broken: " + calculate_data.Glacite.display.blocks_net);
            glacite_lines.push("Average Blocks Broken p/h: " + calculate_data.Glacite.display.blocks_ph);
            glacite_lines.push("");
        }

        if (settings().display_glacite_collected == true || glacite_gui.isOpen()) {
            glacite_lines.push("Aprox. Glacite Collected: " + calculate_data.Glacite.display.collection_net);
            glacite_lines.push("Aprox. Glacite p/h: " + calculate_data.Glacite.display.collection_ph);
            glacite_lines.push("");
        }

        if (settings().display_glacite_time == true || glacite_gui.isOpen()) {
            glacite_lines.push("Total time glacite mining: " + calculate_data.Glacite.display.runtime);
            glacite_lines.push("");
        }

        if (settings().display_glacite_profit == true || glacite_gui.isOpen()) {
            glacite_lines.push("Glacite Profit p/h: " + calculate_data.Glacite.display.profit_ph);
            glacite_lines.push("Glacite Net Profit: " + calculate_data.Glacite.display.profit_net);
            glacite_lines.push("");
        }
    }

    if ((collection_timers.Mithril.is_afk == false && settings().tracker_mithril_enable == true && in_hypixel == true) || mithril_gui.isOpen()) {
        if (settings().display_mithril_block == true || mithril_gui.isOpen()) {
            mithril_lines.push("Total Blocks Broken: " + calculate_data.Mithril.display.blocks_net);
            mithril_lines.push("Average Blocks Broken p/h: " + calculate_data.Mithril.display.blocks_ph);
            mithril_lines.push("");
        }

        if (settings().display_mithril_collected == true || mithril_gui.isOpen()) {
            mithril_lines.push("Aprox. Mithril Collected: " + calculate_data.Mithril.display.collection_net);
            mithril_lines.push("Aprox. Mithril p/h: " + calculate_data.Mithril.display.collection_ph);
            mithril_lines.push("");
        }

        if (settings().display_mithril_time == true || mithril_gui.isOpen()) {
            mithril_lines.push("Total time mithril mining: " + calculate_data.Mithril.display.runtime);
            mithril_lines.push("");
        }

        if (settings().display_mithril_profit == true || mithril_gui.isOpen()) {
            mithril_lines.push("Mithril Profit p/h: " + calculate_data.Mithril.display.profit_ph);
            mithril_lines.push("Mithril Net Profit: " + calculate_data.Mithril.display.profit_net);
            mithril_lines.push("");
        }
    }


    display_pet.setString(pet_lines.join("\n"));
    display_pet.draw();

    display_obby.setString(obby_lines.join("\n"));
    display_obby.draw();

    display_gold.setString(gold_lines.join("\n"));
    display_gold.draw();

    display_quartz.setString(quartz_lines.join("\n"));
    display_quartz.draw();

    display_umber.setString(umber_lines.join("\n"));
    display_umber.draw();

    display_tungsten.setString(tungsten_lines.join("\n"));
    display_tungsten.draw();

    display_glacite.setString(glacite_lines.join("\n"));
    display_glacite.draw();

    display_mithril.setString(mithril_lines.join("\n"));
    display_mithril.draw();
}