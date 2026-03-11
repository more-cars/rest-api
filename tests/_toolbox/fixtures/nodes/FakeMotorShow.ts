import {faker} from "@faker-js/faker"
import type {InputMotorShowCreate} from "../../../../src/db/node-types/motor-shows/types/InputMotorShowCreate"
import {ModelNodeType} from "../../../../src/models/types/ModelNodeType"
import type {MotorShowNode} from "../../../../src/models/node-types/motor-shows/types/MotorShowNode"

export const FakeMotorShow = {
    dbInput: {
        name: faker.word.noun(),
        date_from: faker.word.noun(),
        date_until: faker.word.noun(),
        location: faker.word.noun(),
        target_audience: faker.word.noun(),
        focus: faker.word.noun(),
    } as InputMotorShowCreate,

    dbInputMinimal: {
        name: faker.word.noun(),
    } as InputMotorShowCreate,

    modelOutput: {
        node_type: ModelNodeType.MotorShow,
        attributes: {
            id: faker.number.int({min: 12_000_000, max: 20_000_000}),
            name: faker.word.noun(),
            date_from: faker.word.noun(),
            date_until: faker.word.noun(),
            location: faker.word.noun(),
            target_audience: faker.word.noun(),
            focus: faker.word.noun(),
            created_at: faker.date.past().toISOString(),
            updated_at: faker.date.past().toISOString(),
        },
    } satisfies MotorShowNode
}
