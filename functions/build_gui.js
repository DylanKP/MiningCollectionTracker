import { makeObjectDraggable } from "../../Draggable";
import { global_vars, display_obsidian, display_pet_data } from "./global_vars";
import { collection_timers } from "./timer";
import settings from "../settings";

let display_obby = new Text("", 10, 10);
let display_pet = new Text("", 10, 220);
const obby_gui = new Gui();
const pet_gui = new Gui();
makeObjectDraggable("Obby Tracker", display_obby, () => obby_gui.isOpen());
makeObjectDraggable("Pet Tracker", display_pet, () => pet_gui.isOpen());
register("command", () => {obby_gui.open()}).setName("obbygui");
register("command", () => {pet_gui.open()}).setName("petgui");
register("tick", move_gui);


function move_gui() {
    if (global_vars.move_pet == true) {
        global_vars.move_pet = false;
        pet_gui.open()
    } else if (global_vars.move_obby == true) {
        global_vars.move_obby = false;
        obby_gui.open()
    }
}


export function build_gui() {
    let pet_lines = [];
    let obby_lines = [];
    if ((collection_timers.Obsidian.is_afk == false && settings().tracker_obby_enable == true) || obby_gui.isOpen()) {
        if (settings().display_obby_block == true || obby_gui.isOpen()) {
            obby_lines.push("Total Blocks Broken: " + display_obsidian.blocks_net);
            obby_lines.push("Average Blocks Broken p/h: " + display_obsidian.blocks_ph);
            obby_lines.push("");
        }

        if (settings().display_obby_collected == true || obby_gui.isOpen()) {
            obby_lines.push("Aprox. Obby Collected: " + display_obsidian.obby_net);
            obby_lines.push("Aprox. Obby p/h: " + display_obsidian.obby_ph);
            obby_lines.push("");
        }

        if (settings().display_obby_time == true || obby_gui.isOpen()) {
            obby_lines.push("Total time obby mining: " + display_obsidian.runtime);
            obby_lines.push("");
        }

        if (settings().display_obby_profit_e == true || obby_gui.isOpen()) {
            obby_lines.push("E-Obby Profit p/h: " + display_obsidian.e_profit_ph);
            obby_lines.push("E-Obby Net Profit: " + display_obsidian.e_profit_net);
            obby_lines.push("");
        }

        if (settings().display_obby_profit_o == true || obby_gui.isOpen()) {
            obby_lines.push("Ovoid Profit p/h: " + display_obsidian.o_profit_ph);
            obby_lines.push("Ovoid Net Profit: " + display_obsidian.o_profit_net);
            obby_lines.push("");
        }

        if (global_vars.event_widget_alert == true && settings().hide_widget_alerts == false) {
            obby_lines.push("Event Widget Not Available. Check /tablist");
        }

        if (global_vars.fortune_widget_alert == true && settings().hide_widget_alerts == false) {
            obby_lines.push("Fortune Widget Not Available. Check /tablist");
        }
        display_obby.setString("test");
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