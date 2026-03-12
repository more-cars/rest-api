import {expect, test, vi} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {ProgrammeEpisode} from "../../../../../../../../src/models/node-types/programme-episodes/ProgrammeEpisode"

test('A completely valid request, but the database call fails (e.g. one of the nodes was deleted just a moment ago)', async () => {
    vi.mock("../../../../../../../../src/db/relationships/createRelationship", async () => {
        return {
            createRelationship: () => false
        }
    })

    const programmeEpisode = await seedNode(DbNodeType.ProgrammeEpisode)
    const carModel = await seedNode(DbNodeType.CarModel)

    await expect(ProgrammeEpisode.createCoversCarModelRelationship(programmeEpisode.properties.id, carModel.properties.id))
        .rejects
        .toThrow(Error)
})
