import Settings from "../Amaterasu/core/Settings"
import DefaultConfig from "../Amaterasu/core/DefaultConfig"
import { getBazaarItems } from "./functions/other";
import { global_vars } from "./functions/global_vars";

const defaultConf = new DefaultConfig("MiningCollectionTracker", "./data/settings.json");

defaultConf
    .addSwitch({ 
        category: "Trackers",
        configName: "tracker_pet_enable",
        title: "Enable Pet Tracker",
        description: "Enables the pet tracker to track pet xp and levels.",
    })
    .addSwitch({ 
        category: "Trackers",
        configName: "tracker_obby_enable",
        title: "Enable Obsidian Tracker",
        description: "Enables the obsidian tracker to track obsidian collection and profits.",
    })
    .addSwitch({ 
        category: "Trackers",
        configName: "tracker_gold_enable",
        title: "Enable Gold Tracker",
        description: "Enables the gold tracker to track gold collection and profits.",
    })
    .addSwitch({ 
        category: "Trackers",
        configName: "tracker_quartz_enable",
        title: "Enable Quartz Tracker",
        description: "Enables the quartz tracker to track quartz collection and profits.",
    })
    .addSwitch({ 
        category: "Trackers",
        configName: "tracker_umber_enable",
        title: "Enable Umber Tracker",
        description: "Enables the umber tracker to track umber collection and profits.",
    })
    .addSwitch({ 
        category: "Trackers",
        configName: "tracker_tungsten_enable",
        title: "Enable Tungsten Tracker",
        description: "Enables the tungsten tracker to track tungsten collection and profits.",
    })
    .addSwitch({ 
        category: "Trackers",
        configName: "tracker_glacite_enable",
        title: "Enable Glacite Tracker",
        description: "Enables the glacite tracker to track glacite collection and profits.",
    })
    .addSwitch({ 
        category: "Trackers",
        configName: "tracker_mithril_enable",
        title: "Enable Mithril Tracker",
        description: "Enables the mithril tracker to track mithril collection and profits.",
    })



    .addButton({
        category: "Util",
        configName: "reset",
        title: "Reset Collection Tracker",
        description: "Resets the collection tracker to initial values. Or just use /retrack in chat. -- not implemented yet --",
        subcategory: "QOL",
        tags: ["reset"],
        onClick(setting) {
            global_vars.reset = true;
            ChatLib.chat("&7[&bCollection Tracker&7] &r&fResetting Collection Tracker...")
        }
    })
    .addButton({
        category: "Util",
        configName: "afk_obby",
        title: "Stop Obsidian Calculator",
        description: "Temporarily sends the calculator into afk status, stopping all calculations and tracking.",
        subcategory: "QOL",
        tags: ["afk"],
        onClick(setting) {
            global_vars.timer_afk = true;
            global_vars.pet_afk = true;
        }
    })
    .addSwitch({ 
        category: "Util",
        configName: "disable_afk",
        title: "Disable AFK Mode",
        description: "Disables the calculator from going into AFK mode after a certain amount of inactivity.",
        subcategory: "AFK",
    })
    .addTextInput({ 
        category: "Util",
        configName: "afk_threshold",
        title: "Calculator AFK Threshold",
        description: "How long in seconds should you be inactive before the calculator goes into AFK mode. --need to ct load to apply--",
        subcategory: "AFK",
        value: "15",
        placeHolder: "15",
    })
    .addButton({ 
        category: "Util",
        configName: "update_bazaar",
        title: "Updates Bazaar Data",
        description: "Updates bazaar immediately.",
        subcategory: "Bazaar",
        tags: ["bazaar"],
        onClick(setting) {
            getBazaarItems();
        }
    })
    .addSwitch({
        category: "Util",
        configName: "hide_widget_alerts",
        title: "Hide Widget Alerts",
        description: "Stops the tracker from showing alerts if widget data is not available.",
        subcategory: "Widget",
    })



    .addSwitch({
        category: "Pet",
        configName: "display_pet_xp",
        title: "Enable Pet Display",
        description: "Displays pet xp gained and pet xp per hour.",
        subcategory: "Display",
    })
    .addSwitch({
        category: "Pet",
        configName: "display_pet_lvl_time",
        title: "Enable Pet Display",
        description: "Displays time to next nevel and max level.",
        subcategory: "Display",
    })
    .addSwitch({
        category: "Pet",
        configName: "display_pet_profit",
        title: "Enable Pet Profit",
        description: "Displays the amount of net pet profit made and profit per hour. -- Not implemented yet --",
        subcategory: "Display",
    })
    .addSwitch({
        category: "Pet",
        configName: "format_pet_xp_m",
        title: "Format Pet Xp Per Hour",
        description: "Toggles the formatting of pet xp gained per hour to millions.",
        subcategory: "Formatting",
    })
    .addSwitch({
        category: "Pet",
        configName: "lvl_seconds_enable",
        title: "Pet Level Seconds Toggle",
        description: "Formats the pet level time into displaying seconds.",
        subcategory: "Formatting",
    })
    .addSwitch({
        category: "Pet",
        configName: "format_pet_profit_m",
        title: "Format Profits Per Hour",
        description: "Toggles the formatting of pet net profits and profits per hour to millions.",
        subcategory: "Formatting",
    })



    .addSwitch({
        category: "Obsidian",
        configName: "display_obby_block",
        title: "Enable Block Display",
        description: "Displays the amount of blocks broken and aprox. blocks broken in an hour in the GUI.",
        subcategory: "Display",
    })
    .addSwitch({
        category: "Obsidian",
        configName: "display_obby_collected",
        title: "Enable Obsidian Display",
        description: "Displays the amount of blocks obsidian collected and aprox. obsidian collected in an hour in the GUI.",
        subcategory: "Display",
    })
    .addSwitch({
        category: "Obsidian",
        configName: "display_obby_time",
        title: "Enable Time Display",
        description: "Displays the runtime of the obby calculator and average cycle time.",
        subcategory: "Display",
    })
    .addSwitch({
        category: "Obsidian",
        configName: "display_obby_profit_e",
        title: "Enable E-Obby Profit Display",
        description: "Displays the amount of net enchanted obsidian profit made and profit per hour",
        subcategory: "Display",
    })
    .addSwitch({
        category: "Obsidian",
        configName: "display_obby_profit_o",
        title: "Enable Ovoid Profit Display",
        description: "Displays the amount of net ovoid profit made and profit per hour",
        subcategory: "Display",
    })
    .addTextInput({
        category: "Obsidian",
        configName: "desired_e_price",
        title: "Set desired E_Obby Price",
        description: "Calculate how much profit you would make if the price of E_Obby was this value.",
        subcategory: "Desired Rates",
        value: "4000",
        placeHolder: "4000",
    })
    .addSwitch({
        category: "Obsidian",
        configName: "display_obby_profit_e_desired",
        title: "Enable Desired E-Obby Profit Display",
        description: "Displays the amount of net enchanted obsidian profit made and profit per hour if you were selling at a set price.",
        subcategory: "Desired Rates",
    })
    .addTextInput({
        category: "Obsidian",
        configName: "desired_o_price",
        title: "Set desired Ovoid Price",
        description: "Calculate how much profit you would make if the price of Ovoid was this value.",
        subcategory: "Desired Rates",
        value: "130000",
        placeHolder: "130000",
    })
    .addSwitch({
        category: "Obsidian",
        configName: "display_obby_profit_o_desired",
        title: "Enable Desired Ovoid Profit Display",
        description: "Displays the amount of net ovoid profit made and profit per hour if you were selling at a set price.",
        subcategory: "Desired Rates",
    })
    .addSwitch({
        category: "Obsidian",
        configName: "format_blocks_m",
        title: "Format Blocks Broken",
        description: "Toggles the formatting of blocks broken to millions.",
        subcategory: "Formatting",
    })
    .addSwitch({
        category: "Obsidian",
        configName: "format_obby_m",
        title: "Format Obby Collected",
        description: "Toggles the formatting of the obby collection to millions.",
        subcategory: "Formatting",
    })
    .addSwitch({
        category: "Obsidian",
        configName: "format_obby_profit_m",
        title: "Format Profits Per Hour",
        description: "Toggles the formatting of obsidian net profits and profits per hour to millions.",
        subcategory: "Formatting",
    });

const config = new Settings("MiningCollectionTracker", defaultConf, "data/ColorScheme.json")
    .setCommand("collection-tracker", ["ctrack"])

config
    .apply()
export default () => config.settings