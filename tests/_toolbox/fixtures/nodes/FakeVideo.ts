import {faker} from "@faker-js/faker"
import type {InputVideoCreate} from "../../../../src/db/node-types/videos/types/InputVideoCreate"
import {ModelNodeType} from "../../../../src/models/types/ModelNodeType"
import type {VideoNode} from "../../../../src/models/node-types/videos/types/VideoNode"

export const FakeVideo = {
    dbInput: {
        video_provider: faker.lorem.word(),
        external_id: faker.string.uuid(),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        creator: faker.person.fullName(),
        license: faker.word.noun(),
        tags: faker.lorem.words(5),
        source: faker.internet.url(),
        duration: faker.word.noun(),
        thumbnail_url_l: faker.internet.url(),
        thumbnail_url_m: faker.internet.url(),
        thumbnail_url_s: faker.internet.url(),
        thumbnail_url_xs: faker.internet.url(),
    } as InputVideoCreate,

    dbInputMinimal: {
        video_provider: faker.lorem.word(),
        external_id: faker.string.uuid(),
    } as InputVideoCreate,

    modelOutput: {
        node_type: ModelNodeType.Video,
        attributes: {
            id: faker.number.int({min: 12_000_000, max: 20_000_000}),
            video_provider: faker.lorem.word(),
            external_id: faker.string.uuid(),
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            creator: faker.person.fullName(),
            license: faker.word.noun(),
            tags: faker.lorem.words(5),
            source: faker.internet.url(),
            duration: faker.word.noun(),
            thumbnail_url_l: faker.internet.url(),
            thumbnail_url_m: faker.internet.url(),
            thumbnail_url_s: faker.internet.url(),
            thumbnail_url_xs: faker.internet.url(),
            created_at: faker.date.past().toISOString(),
            updated_at: faker.date.past().toISOString(),
        },
    } satisfies VideoNode
}
