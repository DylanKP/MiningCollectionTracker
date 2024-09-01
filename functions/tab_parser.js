import { global_vars } from "./global_vars";


export function get_area(data) {
    let tab_area = data.map(a => a.removeFormatting()).filter(a => a.includes('Area: '))[0];
    let area = null;
    if (tab_area != null) {
        area = tab_area.split('Area: ')[1];
    }
    return area;
}


let fiesta = false;
function fiesta_check(data) {
    let raw_tab_data = data.map(a => a.removeFormatting());
    let tab_event_index = raw_tab_data.findIndex(a => a.includes('Event: '));

    if (tab_event_index !== -1 && raw_tab_data[tab_event_index + 1].includes('Starts In:') == false) {
        let event = raw_tab_data[tab_event_index].split('Event: ')[1];

        if (event === "Mining Fiesta") {
            fiesta = true;
        } else {
            fiesta = false;
        }

    } else if(tab_event_index == -1) {
        global_vars.event_widget_alert = true;
    }
    
    return fiesta;
}

let fortune = 1;
export function get_fortune(data) {
    let fiesta = fiesta_check(data);
    let tab_fortune_raw = data.map(a => a.removeFormatting()).filter(a => a.includes('Mining Fortune: '))[0];
    if (tab_fortune_raw != null) {
        global_vars.fortune_widget_alert = false;

        let tab_fortune = Number(tab_fortune_raw.split('Mining Fortune: ☘')[1]);
        if (isNaN(tab_fortune) == false) {
            fortune = (tab_fortune / 100) + 1;
            if (fiesta == true) {
                fortune = fortune * 2;
            }
        }
        return fortune;
    } else {
        global_vars.fortune_widget_alert = true;
        return fortune;
    }
}


export function get_pet_data(data) {
    let processed_tab_data = data.map(a => a.removeFormatting());
    let pet_index = processed_tab_data.indexOf("Pet:");
    if (pet_index !== -1 && processed_tab_data[pet_index + 1].trim() !== "No pet selected") {
        global_vars.pet_widget_alert = false;

        let pet_lvl_name_tier = data[pet_index + 1];
        
        let pet_lvl = pet_lvl_name_tier.split('] ')[0];
        pet_lvl = pet_lvl.removeFormatting();
        pet_lvl = pet_lvl.split(' [Lvl ')[1];
        pet_lvl = Number(pet_lvl);
        
        let pet_name_tier = pet_lvl_name_tier.split('] ')[1];

        let pet_name = pet_name_tier.removeFormatting();
        
        let pet_color = pet_name_tier.match(/§[0-9a-fA-F]/g)[0];
        let pet_tier = getRarityFromColorCode(pet_color);

        let pet_exp = processed_tab_data[pet_index + 2];
        pet_exp = pet_exp.split('/')[0].trim();
        pet_exp = pet_exp.replace(/,/g, '');

        if (pet_exp == "MAX LEVEL") {
            pet_exp = 0;
        }
        pet_exp = Number(pet_exp);

        return [pet_name, pet_tier, pet_lvl, pet_exp]
    } else {
        global_vars.pet_widget_alert = true;
        return [null, null, null, null];
    }
}

function getRarityFromColorCode(colorCode) {
    switch(colorCode) {
        case '§f': return "COMMON";
        case '§a': return "UNCOMMON";
        case '§9': return "RARE";
        case '§5': return "EPIC";
        case '§6': return "LEGENDARY";
        case '§d': return "LEGENDARY";
    }
};