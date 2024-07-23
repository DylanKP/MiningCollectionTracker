import { global_vars } from "./global_vars";
import request from "requestV2";


export function getBazaarItems() {
    request({
        url: "https://api.hypixel.net/v2/skyblock/bazaar",
        json: true,
        headers: {
            'User-Agent': 'Mozilla/5.0'
        },
    }).then((res) => {
        if (res && res.products) {
            global_vars.e_obby_data = res.products.ENCHANTED_OBSIDIAN.quick_status.sellPrice;
            global_vars.ovoid_data = res.products.NULL_OVOID.quick_status.buyPrice;
            global_vars.null_sphere_data = res.products.NULL_SPHERE.quick_status.buyPrice;
            ChatLib.chat("&7[&bCollection Tracker&7] &r&fBazaar data updated...");
        } else{
            ChatLib.chat("Failed to update bazaar data.");
        }
    }).catch((err) => {
        ChatLib.chat("Failed to update bazaar data.");
        ChatLib.chat(err);
    });
}

export function getPetprofit(pet_name, pet_tier, callback) {
    const processed_pet_name = pet_name.replace(/ /g, "_").toUpperCase();
    const processed_pet_tier = convert_rarity(pet_tier);

    let lowest_lvl_pet = null;
    let highest_lvl_pet = null;

    let net_profit = 0;


    request({
        url: "https://moulberry.codes/lowestbin.json",
        json: true,
    }).then((auctions) => {
        if (auctions) {
            let pet_search_lowest = `${processed_pet_name};${processed_pet_tier}`;
            let pet_search_highest
            if (pet_name == "Golden Dragon") {
                pet_search_highest = `${processed_pet_name};${processed_pet_tier}+200`;
            } else {
                pet_search_highest = `${processed_pet_name};${processed_pet_tier}+100`;
            }
            lowest_lvl_pet = auctions[pet_search_lowest];
            highest_lvl_pet = auctions[pet_search_highest];

            net_profit = highest_lvl_pet - lowest_lvl_pet;
            callback(net_profit);
        } else {
            ChatLib.chat("Failed to fetch auction data.");
            callback(0);
        }
    }).catch((err) => {
        ChatLib.chat("Failed to fetch auction data.");
        ChatLib.chat(err);
        callback(0);
    });
}
function convert_rarity(tier) {
    switch(tier) {
        case 'COMMON': return "0";
        case 'UNCOMMON': return "1";
        case 'RARE': return "2";
        case 'EPIC': return "3";
        case 'LEGENDARY': return "4";
    }
};

function getCollectionData() {
    const base_url = "https://sky.shiiyu.moe/api/v2/profile/";
    const player_id = Player.getName();

    request({
        url: `${base_url}${player_id}`,
        json: true,
        headers: {
            'User-Agent': 'Mozilla/5.0'
        },
    }).then((res) => {
        if (res && res.profiles) {
            for (let profile in res.profiles) {
                let profile_data = res.profiles[profile];
                if (profile_data.current = true) {
                    let obsidian = profile_data.raw.collection.OBSIDIAN;
                    ChatLib.chat(`Obsidian: ${obsidian}`);
                }
            }
        } else {
            ChatLib.chat("Failed to fetch collection data.");
        }
    }).catch((err) => {
        ChatLib.chat("Failed to fetch collection data.");
        ChatLib.chat(err);
    });
}
//getCollectionData();