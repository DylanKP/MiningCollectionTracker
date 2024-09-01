import Settings from "../Amaterasu/core/Settings"
import DefaultConfig from "../Amaterasu/core/DefaultConfig"
import { getBazaarItems } from "./functions/api_data";
import { global_vars } from "./functions/global_vars";

const defaultConf = new DefaultConfig("MiningCollectionTracker", "./data/settings.json");
const version = JSON.parse(FileLib.read("MiningCollectionTracker", "metadata.json")).version


defaultConf
    .addButton({
        category: "Util",
        configName: "reset",
        title: "Reset Collection Tracker",
        description: "Resets the collection tracker to initial values. \nOr just use /retrack in chat.",
        subcategory: "QOL",
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
        description: "How long in seconds should you be inactive before the calculator goes into AFK mode.",
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
        description: "Gets the new pet profit if pet profit is not accurate.",
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
        configName: "format_blocks_m_Obsidian",
        title: "Format Blocks Broken",
        description: "Toggles the formatting of blocks broken to millions.",
        subcategory: "Formatting",
    })
    .addSwitch({
        category: "Obsidian",
        configName: "format_collection_m_Obsidian",
        title: "Format Obby Collected",
        description: "Toggles the formatting of the obby collection to millions.",
        subcategory: "Formatting",
    })
    .addSwitch({
        category: "Obsidian",
        configName: "format_profit_m_Obsidian",
        title: "Format Profits Per Hour",
        description: "Toggles the formatting of obsidian net profits and profits per hour to millions.",
        subcategory: "Formatting",
    })



    .addSwitch({ 
        category: "Gold",
        configName: "tracker_gold_enable",
        title: "Enable Gold Tracker",
        description: "Enables the gold tracker to track gold collection and profits.",
        subcategory: "Tracker",
    })
    .addButton({ 
        category: "Gold",
        configName: "move_gold_gui",
        title: "Move Gold GUI",
        description: "Moves the gold GUI to a new location.",
        subcategory: "GUI",
        onClick(setting) {
            Client.currentGui.close();
            global_vars.move_gold = true;
        }
    })
    .addSwitch({
        category: "Gold",
        configName: "display_gold_block",
        title: "Enable Block Display",
        description: "Displays the amount of blocks broken and aprox. blocks broken in an hour in the GUI.",
        subcategory: "Display",
    })
    .addSwitch({
        category: "Gold",
        configName: "display_gold_collected",
        title: "Enable Gold Display",
        description: "Displays the amount of blocks gold collected and aprox. gold collected in an hour in the GUI.",
        subcategory: "Display",
    })
    .addSwitch({
        category: "Gold",
        configName: "display_gold_time",
        title: "Enable Time Display",
        description: "Displays the runtime of the gold calculator and average cycle time.",
        subcategory: "Display",
    })
    .addSwitch({
        category: "Gold",
        configName: "display_gold_profit",
        title: "Enable Gold Profit Display",
        description: "Displays the amount of net gold profit made and profit per hour",
        subcategory: "Display",
    })
    .addSwitch({
        category: "Gold",
        configName: "format_blocks_m_Gold",
        title: "Format Blocks Broken",
        description: "Toggles the formatting of blocks broken to millions.",
        subcategory: "Formatting",
    })
    .addSwitch({
        category: "Gold",
        configName: "format_collection_m_Gold",
        title: "Format Gold Collected",
        description: "Toggles the formatting of the gold collection to millions.",
        subcategory: "Formatting",
    })
    .addSwitch({
        category: "Gold",
        configName: "format_profit_m_Gold",
        title: "Format Profits Per Hour",
        description: "Toggles the formatting of gold net profits and profits per hour to millions.",
        subcategory: "Formatting",
    })



    .addSwitch({ 
        category: "Quartz",
        configName: "tracker_quartz_enable",
        title: "Enable Quartz Tracker",
        description: "Enables the quartz tracker to track quartz collection and profits. --not implemented yet--",
        subcategory: "Tracker",
    })
    .addButton({ 
        category: "Quartz",
        configName: "move_quartz_gui",
        title: "Move Quartz GUI",
        description: "Moves the quartz GUI to a new location.",
        subcategory: "GUI",
        onClick(setting) {
            Client.currentGui.close();
            global_vars.move_quartz = true;
        }
    })
    .addSwitch({
        category: "Quartz",
        configName: "display_quartz_block",
        title: "Enable Block Display",
        description: "Displays the amount of blocks broken and aprox. blocks broken in an hour in the GUI.",
        subcategory: "Display",
    })
    .addSwitch({
        category: "Quartz",
        configName: "display_quartz_collected",
        title: "Enable Quartz Display",
        description: "Displays the amount of blocks quartz collected and aprox. quartz collected in an hour in the GUI.",
        subcategory: "Display",
    })
    .addSwitch({
        category: "Quartz",
        configName: "display_quartz_time",
        title: "Enable Time Display",
        description: "Displays the runtime of the quartz calculator and average cycle time.",
        subcategory: "Display",
    })
    .addSwitch({
        category: "Quartz",
        configName: "display_quartz_profit",
        title: "Enable Quartz Profit Display",
        description: "Displays the amount of net quartz profit made and profit per hour",
        subcategory: "Display",
    })
    .addSwitch({
        category: "Quartz",
        configName: "format_blocks_m_Quartz",
        title: "Format Blocks Broken",
        description: "Toggles the formatting of blocks broken to millions.",
        subcategory: "Formatting",
    })
    .addSwitch({
        category: "Quartz",
        configName: "format_collection_m_Quartz",
        title: "Format Quartz Collected",
        description: "Toggles the formatting of the quartz collection to millions.",
        subcategory: "Formatting",
    })
    .addSwitch({
        category: "Quartz",
        configName: "format_profit_m_Quartz",
        title: "Format Profits Per Hour",
        description: "Toggles the formatting of quartz net profits and profits per hour to millions.",
        subcategory: "Formatting",
    })



    // GOT RID OF TUNGSTEN AND UMBER BECUASE MINING THIS INVOLVES A LOT OF LOBBY SWAPPING AND EFFECIENT MINING BLOCKS WITH DIFFERENT YEILDS
    // WHICH THE TRACKER CANT TRACK AND LOBBY SWAPPING EN SURE THAT THE TRACKER CANT GET THE SACK DATA
    //
    // .addSwitch({ 
    //     category: "Umber",
    //     configName: "tracker_umber_enable",
    //     title: "Enable Umber Tracker",
    //     description: "Enables the umber tracker to track umber collection and profits. --not implemented yet--",
    //     subcategory: "Tracker",
    // })
    // .addButton({ 
    //     category: "Umber",
    //     configName: "move_umber_gui",
    //     title: "Move Umber GUI",
    //     description: "Moves the umber GUI to a new location.",
    //     subcategory: "GUI",
    //     onClick(setting) {
    //         Client.currentGui.close();
    //         global_vars.move_umber = true;
    //     }
    // })
    // .addSwitch({
    //     category: "Umber",
    //     configName: "display_umber_block",
    //     title: "Enable Block Display",
    //     description: "Displays the amount of blocks broken and aprox. blocks broken in an hour in the GUI.",
    //     subcategory: "Display",
    // })
    // .addSwitch({
    //     category: "Umber",
    //     configName: "display_umber_collected",
    //     title: "Enable Umber Display",
    //     description: "Displays the amount of blocks umber collected and aprox. umber collected in an hour in the GUI.",
    //     subcategory: "Display",
    // })
    // .addSwitch({
    //     category: "Umber",
    //     configName: "display_umber_time",
    //     title: "Enable Time Display",
    //     description: "Displays the runtime of the umber calculator and average cycle time.",
    //     subcategory: "Display",
    // })
    // .addSwitch({
    //     category: "Umber",
    //     configName: "display_umber_profit",
    //     title: "Enable Umber Profit Display",
    //     description: "Displays the amount of net umber profit made and profit per hour",
    //     subcategory: "Display",
    // })
    // .addSwitch({
    //     category: "Umber",
    //     configName: "format_blocks_m_Umber",
    //     title: "Format Blocks Broken",
    //     description: "Toggles the formatting of blocks broken to millions.",
    //     subcategory: "Formatting",
    // })
    // .addSwitch({
    //     category: "Umber",
    //     configName: "format_collection_m_Umber",
    //     title: "Format Umber Collected",
    //     description: "Toggles the formatting of the umber collection to millions.",
    //     subcategory: "Formatting",
    // })
    // .addSwitch({
    //     category: "Umber",
    //     configName: "format_profit_m_Umber",
    //     title: "Format Profits Per Hour",
    //     description: "Toggles the formatting of umber net profits and profits per hour to millions.",
    //     subcategory: "Formatting",
    // })



    // .addSwitch({ 
    //     category: "Tungsten",
    //     configName: "tracker_tungsten_enable",
    //     title: "Enable Tungsten Tracker",
    //     description: "Enables the tungsten tracker to track tungsten collection and profits. --not implemented yet--",
    //     subcategory: "Tracker",
    // })
    // .addButton({ 
    //     category: "Tungsten",
    //     configName: "move_tungsten_gui",
    //     title: "Move Tungsten GUI",
    //     description: "Moves the tungsten GUI to a new location.",
    //     subcategory: "GUI",
    //     onClick(setting) {
    //         Client.currentGui.close();
    //         global_vars.move_tungsten = true;
    //     }
    // })
    // .addSwitch({
    //     category: "Tungsten",
    //     configName: "display_tungsten_block",
    //     title: "Enable Block Display",
    //     description: "Displays the amount of blocks broken and aprox. blocks broken in an hour in the GUI.",
    //     subcategory: "Display",
    // })
    // .addSwitch({
    //     category: "Tungsten",
    //     configName: "display_tungsten_collected",
    //     title: "Enable Tungsten Display",
    //     description: "Displays the amount of blocks tungsten collected and aprox. tungsten collected in an hour in the GUI.",
    //     subcategory: "Display",
    // })
    // .addSwitch({
    //     category: "Tungsten",
    //     configName: "display_tungsten_time",
    //     title: "Enable Time Display",
    //     description: "Displays the runtime of the tungsten calculator and average cycle time.",
    //     subcategory: "Display",
    // })
    // .addSwitch({
    //     category: "Tungsten",
    //     configName: "display_tungsten_profit",
    //     title: "Enable Tungsten Profit Display",
    //     description: "Displays the amount of net tungsten profit made and profit per hour",
    //     subcategory: "Display",
    // })
    // .addSwitch({
    //     category: "Tungsten",
    //     configName: "format_blocks_m_Tungsten",
    //     title: "Format Blocks Broken",
    //     description: "Toggles the formatting of blocks broken to millions.",
    //     subcategory: "Formatting",
    // })
    // .addSwitch({
    //     category: "Tungsten",
    //     configName: "format_collection_m_Tungsten",
    //     title: "Format Tungsten Collected",
    //     description: "Toggles the formatting of the tungsten collection to millions.",
    //     subcategory: "Formatting",
    // })
    // .addSwitch({
    //     category: "Tungsten",
    //     configName: "format_profit_m_Tungsten",
    //     title: "Format Profits Per Hour",
    //     description: "Toggles the formatting of tungsten net profits and profits per hour to millions.",
    //     subcategory: "Formatting",
    // })



    .addSwitch({ 
        category: "Glacite",
        configName: "tracker_glacite_enable",
        title: "Enable Glacite Tracker",
        description: "Enables the glacite tracker to track glacite collection and profits. --not implemented yet--",
        subcategory: "Tracker",
    })
    .addButton({ 
        category: "Glacite",
        configName: "move_glacite_gui",
        title: "Move Glacite GUI",
        description: "Moves the glacite GUI to a new location.",
        subcategory: "GUI",
        onClick(setting) {
            Client.currentGui.close();
            global_vars.move_glacite = true;
        }
    })
    .addSwitch({
        category: "Glacite",
        configName: "display_glacite_block",
        title: "Enable Block Display",
        description: "Displays the amount of blocks broken and aprox. blocks broken in an hour in the GUI.",
        subcategory: "Display",
    })
    .addSwitch({
        category: "Glacite",
        configName: "display_glacite_collected",
        title: "Enable Glacite Display",
        description: "Displays the amount of blocks glacite collected and aprox. glacite collected in an hour in the GUI.",
        subcategory: "Display",
    })
    .addSwitch({
        category: "Glacite",
        configName: "display_glacite_time",
        title: "Enable Time Display",
        description: "Displays the runtime of the glacite calculator and average cycle time.",
        subcategory: "Display",
    })
    .addSwitch({
        category: "Glacite",
        configName: "display_glacite_profit",
        title: "Enable Glacite Profit Display",
        description: "Displays the amount of net glacite profit made and profit per hour",
        subcategory: "Display",
    })
    .addSwitch({
        category: "Glacite",
        configName: "format_blocks_m_Glacite",
        title: "Format Blocks Broken",
        description: "Toggles the formatting of blocks broken to millions.",
        subcategory: "Formatting",
    })
    .addSwitch({
        category: "Glacite",
        configName: "format_collection_m_Glacite",
        title: "Format Glacite Collected",
        description: "Toggles the formatting of the glacite collection to millions.",
        subcategory: "Formatting",
    })
    .addSwitch({
        category: "Glacite",
        configName: "format_profit_m_Glacite",
        title: "Format Profits Per Hour",
        description: "Toggles the formatting of glacite net profits and profits per hour to millions.",
        subcategory: "Formatting",
    })



    .addSwitch({ 
        category: "Mithril",
        configName: "tracker_mithril_enable",
        title: "Enable Mithril Tracker",
        description: "Enables the mithril tracker to track mithril collection and profits. --not implemented yet--",
        subcategory: "Tracker",
    })
    .addButton({
        category: "Mithril",
        configName: "move_mithril_gui",
        title: "Move Mithril GUI",
        description: "Moves the mithril GUI to a new location.",
        subcategory: "GUI",
        onClick(setting) {
            Client.currentGui.close();
            global_vars.move_mithril = true;
        }
    })
    .addSwitch({
        category: "Mithril",
        configName: "display_mithril_block",
        title: "Enable Block Display",
        description: "Displays the amount of blocks broken and aprox. blocks broken in an hour in the GUI.",
        subcategory: "Display",
    })
    .addSwitch({
        category: "Mithril",
        configName: "display_mithril_collected",
        title: "Enable Mithril Display",
        description: "Displays the amount of blocks mithril collected and aprox. mithril collected in an hour in the GUI.",
        subcategory: "Display",
    })
    .addSwitch({
        category: "Mithril",
        configName: "display_mithril_time",
        title: "Enable Time Display",
        description: "Displays the runtime of the mithril calculator and average cycle time.",
        subcategory: "Display",
    })
    .addSwitch({
        category: "Mithril",
        configName: "display_mithril_profit",
        title: "Enable Mithril Profit Display",
        description: "Displays the amount of net mithril profit made and profit per hour",
        subcategory: "Display",
    })
    .addSwitch({
        category: "Mithril",
        configName: "format_blocks_m_Mithril",
        title: "Format Blocks Broken",
        description: "Toggles the formatting of blocks broken to millions.",
        subcategory: "Formatting",
    })
    .addSwitch({
        category: "Mithril",
        configName: "format_collection_m_Mithril",
        title: "Format Mithril Collected",
        description: "Toggles the formatting of the mithril collection to millions.",
        subcategory: "Formatting",
    })
    .addSwitch({
        category: "Mithril",
        configName: "format_profit_m_Mithril",
        title: "Format Profits Per Hour",
        description: "Toggles the formatting of mithril net profits and profits per hour to millions.",
        subcategory: "Formatting",
    });

const config = new Settings("MiningCollectionTracker", defaultConf, "data/ColorScheme.json", "Mining Collection Tracker v" + version)
    .setCommand("collection-tracker", ["ctrack"])

config
    .setSize(60, 55)
    .apply()
export default () => config.settings