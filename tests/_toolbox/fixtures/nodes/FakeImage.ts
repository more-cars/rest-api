import {faker} from "@faker-js/faker"

export default {
    external_id: faker.string.uuid(),
    image_provider: faker.lorem.word(),
}
