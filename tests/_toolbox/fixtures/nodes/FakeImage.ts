import {faker} from "@faker-js/faker"
import type {InputImageCreate} from "../../../../src/db/nodes/images/types/InputImageCreate"

export default {
    external_id: faker.string.uuid(),
    image_provider: faker.lorem.word(),
} as InputImageCreate
