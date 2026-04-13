import {expect, test, vi} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {ProgrammeEpisode} from "../../../../../../../../src/models/node-types/programme-episodes/ProgrammeEpisode"

vi.mock("../../../../../../../../src/db/relationships/createRelationship", async () => {
    return {
        createRelationship: () => false
    }
})

test('A completely valid request, but the database call fails (e.g. one of the nodes was deleted just a moment ago)', async () => {
    const programmeEpisode = await seedNode(DbNodeType.ProgrammeEpisode)
    const image = await seedNode(DbNodeType.Image)

    await expect(ProgrammeEpisode.createHasImageRelationship(programmeEpisode.properties.id, image.properties.id))
        .rejects
        .toThrow(Error)
})
