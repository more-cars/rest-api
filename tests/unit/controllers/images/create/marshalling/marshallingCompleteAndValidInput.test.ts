import {expect, test} from 'vitest'
import {ImageNode} from "../../../../../../src/models/images/types/ImageNode"
import {marshal} from "../../../../../../src/controllers/images/marshal"

test('marshalling a complete and valid request', async () => {
    const node: ImageNode = {
        id: 975725,
        created_at: "2025-05-14T11:05:07.793Z",
        updated_at: "2025-05-14T11:05:07.793Z",
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

    const mappedNode = marshal(node)

    expect(mappedNode)
        .toStrictEqual({
            id: 975725,
            created_at: "2025-05-14T11:05:07.793Z",
            updated_at: "2025-05-14T11:05:07.793Z",
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
        })
})
