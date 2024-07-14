import { global_vars } from "./global_vars";
import request from "requestV2";
import { Promise } from 'PromiseV2';


export function getBazaarItems() {
    request({
        url: "https://api.hypixel.net/v2/skyblock/bazaar",
        json: true
    }).then((res) => {
        if (res && res.products) {
            global_vars.e_obby_data = res.products.ENCHANTED_OBSIDIAN.quick_status.sellPrice;
            global_vars.ovoid_data = res.products.NULL_OVOID.quick_status.buyPrice;
            global_vars.null_sphere_data = res.products.NULL_SPHERE.quick_status.buyPrice;
            ChatLib.chat("Bazaar data updated.");
        } else{
            ChatLib.chat("Failed to update bazaar data.");
        }
    })
}



export function getPetprofit(pet_name, alt_name, pet_tier, callback) {
    const baseUrl = "https://api.hypixel.net/v2/skyblock/auctions";
    let total_pages = 0;

    let lowest_lvl = 201;
    let lowest_lvl_pet = null;

    let highest_lvl = 0;
    let highest_lvl_pet = null;

    let net_profit = 0;

    request({
        url: baseUrl,
        json: true
    }).then((res) => {
        if (res && res.totalPages) {
            total_pages = res.totalPages;
            let pagePromises = [];
            
            for (let page = 0; page < total_pages; page++) {
                pagePromises.push(
                    request({
                        url: `${baseUrl}?page=${page}`,
                        json: true
                    }).then((pageRes) => {
                        if (pageRes && pageRes.auctions) {
                            for (let i = 0; i < pageRes.auctions.length; i++) {
                                let auction_data = pageRes.auctions[i];
                                if (auction_data && auction_data.bin && auction_data.item_name.startsWith("[Lvl ")) {
                                    let item_id = auction_data.item_name;
                                    let item_lvl = parseInt(item_id.split("] ")[0].match(/\d+/g)[0]);
                                    let item_name = item_id.split("] ")[1].trim();
                                    let item_tier = auction_data.tier;
                                    let cost = auction_data.starting_bid;

                                    if ((item_name === pet_name || item_name === alt_name) && item_tier === pet_tier) {
                                        if (item_lvl > highest_lvl) {
                                            highest_lvl = item_lvl;
                                            highest_lvl_pet = cost;
                                        } else if (item_lvl === highest_lvl && cost < highest_lvl_pet) {
                                            highest_lvl_pet = cost;
                                        }

                                        if (item_lvl < lowest_lvl) {
                                            lowest_lvl = item_lvl;
                                            lowest_lvl_pet = cost;
                                        } else if (item_lvl === lowest_lvl && cost < lowest_lvl_pet) {
                                            lowest_lvl_pet = cost;
                                        }
                                    }
                                }
                            }
                        }
                    }).catch((err) => {
                        ChatLib.chat("Error fetching page " + page + ": " + err);
                    })
                );
            }

            Promise.all(pagePromises).then(() => {
                if (lowest_lvl_pet !== null && highest_lvl_pet !== null) {
                    net_profit = highest_lvl_pet - lowest_lvl_pet;
                    net_profit = Number(net_profit);
                } else {
                    net_profit = NaN;
                }
                ChatLib.chat("Net profit: " + net_profit);
                callback(net_profit);
            }).catch((err) => {
                ChatLib.chat("Error processing pages: " + err);
                callback(NaN);
            });
        } else {
            callback(NaN);
        }
    }).catch((err) => {
        ChatLib.chat("Error fetching total pages: " + err);
        callback(NaN);
    });
}
