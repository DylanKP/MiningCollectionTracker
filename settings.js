import Settings from "../Amaterasu/core/Settings"
import DefaultConfig from "../Amaterasu/core/DefaultConfig"
import { getBazaarItems } from "./functions/other";
import { global_vars } from "./functions/global_vars";

const defaultConf = new DefaultConfig("MiningCollectionTracker", "./data/settings.json");
const version = JSON.parse(FileLib.read("MiningCollectionTracker", "metadata.json")).version


defaultConf
    .addButton({
        category: "Util",
        configName: "reset",
        title: "Reset Collection Tracker",
        description: "Resets the collection tracker to initial values. Or just use /retrack in chat.",
        subcategory: "QOL",
        tags: ["reset"],
        onClick() {
            global_vars.reset = true;
            ChatLib.chat("&7[&bCollection Tracker&7] &r&fResetting Collection Tracker...")
        }
    })
    .addButton({
        category: "Util",
        configName: "afk_obby",
        title: "Force AFK",
        description: "Temporarily sends the calculator into afk status, stopping all calculations and tracking.",
        subcategory: "QOL",
        tags: ["afk"],
        onClick() {
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
        onClick() {
            getBazaarItems();
        }
    })
    .addSlider({
        category: "Util",
        configName: "bazaar_update_rate",
        title: "Bazaar Update Rate",
        description: "How often in minutes should the bazaar data be updated.",
        subcategory: "Bazaar",
        options: [1, 180],
        value: 60
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
        configName: "tracker_pet_enable",
        title: "Enable Pet Tracker",
        description: "Enables the pet tracker to track pet xp and levels.",
        subcategory: "Tracker",
    })
    .addButton({ 
        category: "Pet",
        configName: "get_pet_profit",
        title: "Get New Pet Profit",
        description: "Gets the new pet profit if pet profit is not accurate. This will cause some temporary lag so dont spam it.",
        subcategory: "Tracker",
        onClick(setting) {
            ChatLib.chat("&7[&bCollection Tracker&7] &r&fGetting new pet profit...");
            global_vars.get_new_pet_profit = true;
        }
    })
    .addButton({ 
        category: "Pet",
        configName: "move_pet_gui",
        title: "Move Pet GUI",
        description: "Moves the pet GUI to a new location. Or just use /petgui in chat.",
        subcategory: "GUI",
        tags: ["GUI"],
        onClick(setting) {
            Client.currentGui.close();
            global_vars.move_pet = true;
        }
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
        description: "Displays pet profit.",
        subcategory: "Display",
    })
    .addSwitch({
        category: "Pet",
        configName: "integrate_profit",
        title: "Integrate Pet Profit",
        description: "Integrates the pet profit into the other profit displays instead of being separate.",
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
        description: "Toggles the formatting of pet net profits into millions.",
        subcategory: "Formatting",
    })
    



    .addSwitch({ 
        category: "Obsidian",
        configName: "tracker_obby_enable",
        title: "Enable Obsidian Tracker",
        description: "Enables the obsidian tracker to track obsidian collection and profits.",
        subcategory: "Tracker",
    })
    .addButton({ 
        category: "Obsidian",
        configName: "move_obby_gui",
        title: "Move Obsidian GUI",
        description: "Moves the obsidian GUI to a new location. Or just use /obbygui in chat.",
        subcategory: "GUI",
        tags: ["GUI"],
        onClick(setting) {
            Client.currentGui.close();
            global_vars.move_obby = true;
        }
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
    })



    .addSwitch({ 
        category: "Gold",
        configName: "tracker_gold_enable",
        title: "Enable Gold Tracker",
        description: "Enables the gold tracker to track gold collection and profits. --not implemented yet--",
        subcategory: "Tracker",
    })
    .addSwitch({ 
        category: "Quartz",
        configName: "tracker_quartz_enable",
        title: "Enable Quartz Tracker",
        description: "Enables the quartz tracker to track quartz collection and profits. --not implemented yet--",
        subcategory: "Tracker",
    })
    .addSwitch({ 
        category: "Umber",
        configName: "tracker_umber_enable",
        title: "Enable Umber Tracker",
        description: "Enables the umber tracker to track umber collection and profits. --not implemented yet--",
        subcategory: "Tracker",
    })
    .addSwitch({ 
        category: "Tungsten",
        configName: "tracker_tungsten_enable",
        title: "Enable Tungsten Tracker",
        description: "Enables the tungsten tracker to track tungsten collection and profits. --not implemented yet--",
        subcategory: "Tracker",
    })
    .addSwitch({ 
        category: "Glacite",
        configName: "tracker_glacite_enable",
        title: "Enable Glacite Tracker",
        description: "Enables the glacite tracker to track glacite collection and profits. --not implemented yet--",
        subcategory: "Tracker",
    })
    .addSwitch({ 
        category: "Mithril",
        configName: "tracker_mithril_enable",
        title: "Enable Mithril Tracker",
        description: "Enables the mithril tracker to track mithril collection and profits. --not implemented yet--",
        subcategory: "Tracker",
    });

const config = new Settings("MiningCollectionTracker", defaultConf, "data/ColorScheme.json", "Mining Collection Tracker v" + version)
    .setCommand("collection-tracker", ["ctrack"])

config
    .setSize(60, 55)
    .apply()
export default () => config.settings