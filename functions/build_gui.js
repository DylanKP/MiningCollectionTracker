import { makeObjectDraggable } from "../../Draggable";
import { global_vars, display_pet_data, calculate_data } from "./global_vars";
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


export function build_gui() {
    let pet_lines = [];
    let obby_lines = [];
    let gold_lines = [];
    let quartz_lines = [];
    let umber_lines = [];
    let tungsten_lines = [];
    let glacite_lines = [];
    let mithril_lines = [];

    if ((collection_timers.Obsidian.is_afk == false && settings().tracker_obby_enable == true) || obby_gui.isOpen()) {
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

    if ((collection_timers.Pet.is_afk == false && settings().tracker_pet_enable == true) || pet_gui.isOpen()) {
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
    display_obby.setString(obby_lines.join("\n"));
    display_obby.draw();

    display_pet.setString(pet_lines.join("\n"));
    display_pet.draw();
}