import { calculate_data } from "./global_vars";

let msg_toggle = false;

export function get_gui() {
    try {
        let gui = Player.getContainer();
        let gui_name = gui?.getName();

        if (gui_name == "Gold Ingot Collection") {
            let raw_collection_data = gui.getStackInSlot(4).getLore()
            let collection_data = Number(raw_collection_data[4].removeFormatting().replace(/\D+/g, ""));

            if (msg_toggle == false && isNaN(collection_data) == false) {
                calculate_data.Gold.true_collection = collection_data;

                msg_toggle = true;
                ChatLib.chat("&7[&bCollection Tracker&7] &r&fGold Collection Updated!");
            }
        } else {
            msg_toggle = false;
        }
    } catch (error) {
        console.log("MiningCollectionTracker, get_gui error: " + error);
    }
}