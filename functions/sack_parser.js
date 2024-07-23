export function sack_parser(event) {
    let msg = new Message(EventLib.getMessage(event)).getMessageParts();

    if (msg[0].getText().startsWith("§6§6[Sacks] §r§r")) {
        let parsed_data = msg[1].getHoverValue().removeFormatting().replace(/^(Added items:|Removed items:|This message can be disabled in the settings\.)\n?/gm, "").trim();
        if (msg.length > 5) {
            parsed_data += "\n" + msg[5].getHoverValue().removeFormatting().replace(/^(Added items:|Removed items:|This message can be disabled in the settings\.)\n?/gm, "").trim();
        }
        let sack_data = parsed_data.split("\n");

        let sack_dict = {};

        for (let i = 0; i < sack_data.length; i++) {
            let item_data = sack_data[i].replace(/\([^()]*\)/g, '').replace(/\s{2,}/g, ' ').trim();
            let item_count = Number(item_data.split(" ")[0]);
            let item_name = item_data.split(" ").slice(1).join(" ");
            sack_dict[item_name] = item_count;
        }
        
        return sack_dict;
    }
};