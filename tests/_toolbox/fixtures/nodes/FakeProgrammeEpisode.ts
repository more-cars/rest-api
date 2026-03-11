import {faker} from "@faker-js/faker"
import type {InputProgrammeEpisodeCreate} from "../../../../src/db/node-types/programme-episodes/types/InputProgrammeEpisodeCreate"
import {ModelNodeType} from "../../../../src/models/types/ModelNodeType"
import type {ProgrammeEpisodeNode} from "../../../../src/models/node-types/programme-episodes/types/ProgrammeEpisodeNode"

export const FakeProgrammeEpisode = {
    dbInput: {
        title: faker.word.noun(),
        season_number: faker.number.int({min: 1000, max: 3000}),
        season_episode_number: faker.number.int({min: 1000, max: 3000}),
        original_air_date: faker.word.noun(),
        duration: faker.word.noun(),
    } as InputProgrammeEpisodeCreate,

    dbInputMinimal: {
        title: faker.word.noun(),
    } as InputProgrammeEpisodeCreate,

    modelOutput: {
        node_type: ModelNodeType.ProgrammeEpisode,
        attributes: {
            id: faker.number.int({min: 12_000_000, max: 20_000_000}),
            title: faker.word.noun(),
            season_number: faker.number.int({min: 1000, max: 3000}),
            season_episode_number: faker.number.int({min: 1000, max: 3000}),
            original_air_date: faker.word.noun(),
            duration: faker.word.noun(),
            created_at: faker.date.past().toISOString(),
            updated_at: faker.date.past().toISOString(),
        },
    } satisfies ProgrammeEpisodeNode
}
