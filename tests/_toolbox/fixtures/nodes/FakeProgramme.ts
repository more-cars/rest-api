import {faker} from "@faker-js/faker"
import type {InputProgrammeCreate} from "../../../../src/db/node-types/programmes/types/InputProgrammeCreate"
import {ModelNodeType} from "../../../../src/models/types/ModelNodeType"
import type {ProgrammeNode} from "../../../../src/models/node-types/programmes/types/ProgrammeNode"

export const FakeProgramme = {
    dbInput: {
        name: faker.word.noun(),
        aired_from_year: faker.number.int({min: 1000, max: 3000}),
        aired_until_year: faker.number.int({min: 1000, max: 3000}),
        channel: faker.word.noun(),
        total_seasons: faker.number.int({min: 1000, max: 3000}),
        total_episodes: faker.number.int({min: 1000, max: 3000}),
        regular_episode_running_time: faker.word.noun(),
        country_code: faker.location.countryCode(),
    } as InputProgrammeCreate,

    dbInputMinimal: {
        name: faker.word.noun(),
    } as InputProgrammeCreate,

    modelOutput: {
        node_type: ModelNodeType.Programme,
        attributes: {
            id: faker.number.int({min: 12_000_000, max: 20_000_000}),
            name: faker.word.noun(),
            aired_from_year: faker.number.int({min: 1000, max: 3000}),
            aired_until_year: faker.number.int({min: 1000, max: 3000}),
            channel: faker.word.noun(),
            total_seasons: faker.number.int({min: 1000, max: 3000}),
            total_episodes: faker.number.int({min: 1000, max: 3000}),
            regular_episode_running_time: faker.word.noun(),
            country_code: faker.location.countryCode(),
            created_at: faker.date.past().toISOString(),
            updated_at: faker.date.past().toISOString(),
        },
    } satisfies ProgrammeNode
}
