import {expect, test} from 'vitest'
import {InputImageCreate} from "../../../../../src/db/nodes/images/types/InputImageCreate"
import {createNodeQuery} from "../../../../../src/db/nodes/createDbNode"
import {Neo4jNodeType} from "../../../../../src/db/types/Neo4jNodeType"
import {appInstanceId} from "../../../../../src/db/getNamespacedNodeTypeLabel"

test('single quotes are correctly escaped', async () => {
    const data: InputImageCreate = {
        external_id: "'54570839725'",
        image_provider: "flic'kr",
        name: "1989 Po'rsche 911 Turbo",
        description: "Engine: 3.3L 'B6'Power: 221 kW→ <a href=\"https://more-cars.net/porsche-911-turbo-33-g50-930__974483\" rel=\"noreferrer nofollow\">more-cars.net/porsche-911-turbo-33-g50-930__974483</a>",
        creator: "More' 'Cars",
        license: "CC BY'' 2.0",
        tags: "1989, Porsche, 911, Turbo, G50, 930",
        source: "https://www.flickr.com/photos/more-cars/54570839725/''",
        image_url_original: "https://live.staticflickr.com/65535/54570839725_652073f374_z.jpg''",
        image_url_xxl: "https://live.staticflickr.com/65535/54570839725_054676cdd8_o.jpg''",
        image_url_xl: null,
        image_url_l: "''https://live.staticflickr.com/65535/54570839725_652073f374_b.jpg",
        image_url_m: "''https://live.staticflickr.com/65535/54570839725_652073f374_z.jpg",
        image_url_s: "''https://live.staticflickr.com/65535/54570839725_652073f374_n.jpg",
        image_url_xs: "''https://live.staticflickr.com/65535/54570839725_652073f374_t.jpg",
    }
    const query = createNodeQuery(Neo4jNodeType.Image, data)

    expect(query)
        .toEqual(
            "CREATE (node:Image_" + appInstanceId + " {\n" +
            "  image_provider: 'flic\\'kr',\n" +
            "  external_id: '\\'54570839725\\'',\n" +
            "  name: '1989 Po\\'rsche 911 Turbo',\n" +
            "  description: 'Engine: 3.3L \\'B6\\'Power: 221 kW→ <a href=\"https://more-cars.net/porsche-911-turbo-33-g50-930__974483\" rel=\"noreferrer nofollow\">more-cars.net/porsche-911-turbo-33-g50-930__974483</a>',\n" +
            "  creator: 'More\\' \\'Cars',\n" +
            "  license: 'CC BY\\'\\' 2.0',\n" +
            "  tags: '1989, Porsche, 911, Turbo, G50, 930',\n" +
            "  source: 'https://www.flickr.com/photos/more-cars/54570839725/\\'\\'',\n" +
            "  image_url_original: 'https://live.staticflickr.com/65535/54570839725_652073f374_z.jpg\\'\\'',\n" +
            "  image_url_xxl: 'https://live.staticflickr.com/65535/54570839725_054676cdd8_o.jpg\\'\\'',\n" +
            "  image_url_xl: null,\n" +
            "  image_url_l: '\\'\\'https://live.staticflickr.com/65535/54570839725_652073f374_b.jpg',\n" +
            "  image_url_m: '\\'\\'https://live.staticflickr.com/65535/54570839725_652073f374_z.jpg',\n" +
            "  image_url_s: '\\'\\'https://live.staticflickr.com/65535/54570839725_652073f374_n.jpg',\n" +
            "  image_url_xs: '\\'\\'https://live.staticflickr.com/65535/54570839725_652073f374_t.jpg'\n" +
            "})\n" +
            "RETURN node\n" +
            "  LIMIT 1")
})
