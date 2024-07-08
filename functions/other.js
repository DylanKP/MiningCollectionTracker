import { global_vars } from "./global_vars";

export function getBazaarItems() {//updates the bazaar data every so often
    try {//trys code but doesnt stop the script if it fails
        let bazaar_json = FileLib.getUrlContent("https://api.hypixel.net/skyblock/bazaar");
        if (bazaar_json) {//if it gets data from the website i.e the website is not down
            let bazaar_data = JSON.parse(bazaar_json);
            if (bazaar_data && bazaar_data.products) {//parses and updates relevant variables to the correct values
                global_vars.e_obby_data = bazaar_data.products.ENCHANTED_OBSIDIAN.quick_status.sellPrice;
                global_vars.ovoid_data = bazaar_data.products.NULL_OVOID.quick_status.buyPrice;
                global_vars.null_sphere_data = bazaar_data.products.NULL_SPHERE.quick_status.buyPrice;
                ChatLib.chat("Bazaar data updated.");
            } else {
                ChatLib.chat("Failed to parse bazaar products.");
            }
        } else {
            ChatLib.chat("Failed to fetch bazaar data.");
        }
    } catch (error) {//this it what it does instead in case of error
        ChatLib.chat("Error in bazaar_update: " + error);
    }
};