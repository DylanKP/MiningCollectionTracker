let uuid = null;
let previous_block_count = null;

export function drill_tracker() {
    try {
        let tags = get_tag_data();
        let compact_block_count = tags[0];
        let item_id = tags[1];

        if (compact_block_count != null) {
            if (uuid != item_id) {
                uuid = item_id;
                previous_block_count = compact_block_count;
                return 0;
            }

            if (compact_block_count != previous_block_count) {
                let additional_blocks_broken = compact_block_count - previous_block_count;
                previous_block_count = compact_block_count;

                return additional_blocks_broken;
            } else {
                return 0;
            }
        } else {
            return 0;
        }
    } catch (error) {
        // Log the error and return 0 to prevent crashes
        ChatLib.chat("Error in drill_tracker: ", error);
        return 0;
    }
}

function get_tag_data() {
    try {
        let item = Player.getHeldItem();
        if (item == null) {
            return [null, null];
        }

        let nbt = item.getNBT()?.toObject();
        if (nbt && nbt.tag && nbt.tag.ExtraAttributes) {
            let compact_block_count = nbt.tag.ExtraAttributes.compact_blocks;
            let item_id = nbt.tag.ExtraAttributes.uuid;
            return [compact_block_count, item_id];
        } else {
            return [null, null];
        }
    } catch (error) {
        // Log the error and return [null, null] to prevent crashes
        ChatLib.chat("Error in get_tag_data: ", error);
        return [null, null];
    }
}