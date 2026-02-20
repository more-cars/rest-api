import {faker} from "@faker-js/faker"
import type {InputImageCreate} from "../../../../src/db/nodes/images/types/InputImageCreate"
import type {ImageNode} from "../../../../src/models/node-types/images/types/ImageNode"
import {ModelNodeType} from "../../../../src/models/types/ModelNodeType"

export const FakeImage = {
    dbInput() {
        return {
            external_id: faker.string.uuid(),
            image_provider: faker.lorem.word(),
        } as InputImageCreate
    },

    modelOutput() {
        const output: ImageNode = {
            node_type: ModelNodeType.Image,
            attributes: {
                id: faker.number.int({min: 12_000_000, max: 20_000_000}),
                external_id: faker.string.uuid(),
                image_provider: faker.lorem.word(),
                name: faker.commerce.productName(),
                description: faker.commerce.productDescription(),
                creator: faker.person.fullName(),
                license: "CC BY",
                tags: faker.lorem.words(5),
                source: faker.internet.url(),
                image_url_original: faker.image.url(),
                image_url_xxl: faker.image.url(),
                image_url_xl: faker.image.url(),
                image_url_l: faker.image.url(),
                image_url_m: faker.image.url(),
                image_url_s: faker.image.url(),
                image_url_xs: faker.image.url(),
                created_at: faker.date.past().toISOString(),
                updated_at: faker.date.past().toISOString(),
            }
        }

        return output
    },
}
