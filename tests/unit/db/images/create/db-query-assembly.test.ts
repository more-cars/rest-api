import {expect, test} from 'vitest'
import {createNodeQuery} from "../../../../../src/db/nodes/images/createNode"
import {InputImageCreate} from "../../../../../src/db/nodes/images/types/InputImageCreate"

test('database query for creating an IMAGE node', async () => {
    const data: InputImageCreate = {
        external_id: "54570839725",
        image_provider: "flickr",
        name: "1989 Porsche 911 Turbo",
        description: "Engine: 3.3L B6Power: 221 kW→ <a href=\"https://more-cars.net/porsche-911-turbo-33-g50-930__974483\" rel=\"noreferrer nofollow\">more-cars.net/porsche-911-turbo-33-g50-930__974483</a>",
        creator: "More Cars",
        license: "CC BY 2.0",
        tags: "1989, Porsche, 911, Turbo, G50, 930",
        source: "https://www.flickr.com/photos/more-cars/54570839725/",
        image_url_original: "https://live.staticflickr.com/65535/54570839725_652073f374_z.jpg",
        image_url_xxl: "https://live.staticflickr.com/65535/54570839725_054676cdd8_o.jpg",
        image_url_xl: null,
        image_url_l: "https://live.staticflickr.com/65535/54570839725_652073f374_b.jpg",
        image_url_m: "https://live.staticflickr.com/65535/54570839725_652073f374_z.jpg",
        image_url_s: "https://live.staticflickr.com/65535/54570839725_652073f374_n.jpg",
        image_url_xs: "https://live.staticflickr.com/65535/54570839725_652073f374_t.jpg",
    }
    const query = createNodeQuery(data)

    expect(query)
        .toEqual(
            "CREATE (node:Image {\n" +
            "  image_provider:     'flickr',\n" +
            "  external_id:        '54570839725',\n" +
            "  name:               '1989 Porsche 911 Turbo',\n" +
            "  description:        'Engine: 3.3L B6Power: 221 kW→ <a href=\"https://more-cars.net/porsche-911-turbo-33-g50-930__974483\" rel=\"noreferrer nofollow\">more-cars.net/porsche-911-turbo-33-g50-930__974483</a>',\n" +
            "  creator:            'More Cars',\n" +
            "  license:            'CC BY 2.0',\n" +
            "  tags:               '1989, Porsche, 911, Turbo, G50, 930',\n" +
            "  source:             'https://www.flickr.com/photos/more-cars/54570839725/',\n" +
            "  image_url_original: 'https://live.staticflickr.com/65535/54570839725_652073f374_z.jpg',\n" +
            "  image_url_xxl:      'https://live.staticflickr.com/65535/54570839725_054676cdd8_o.jpg',\n" +
            "  image_url_xl:       null,\n" +
            "  image_url_l:        'https://live.staticflickr.com/65535/54570839725_652073f374_b.jpg',\n" +
            "  image_url_m:        'https://live.staticflickr.com/65535/54570839725_652073f374_z.jpg',\n" +
            "  image_url_s:        'https://live.staticflickr.com/65535/54570839725_652073f374_n.jpg',\n" +
            "  image_url_xs:       'https://live.staticflickr.com/65535/54570839725_652073f374_t.jpg'\n" +
            "})\n" +
            "RETURN node\n" +
            "  LIMIT 1")
})
