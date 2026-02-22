import {expect, test, vi} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {RacingSeries} from "../../../../../../../src/models/node-types/racing-series/RacingSeries"

test('A completely valid request, but the database call fails (e.g. one of the nodes was deleted just a moment ago)', async () => {
    vi.mock("../../../../../../../src/db/relationships/createRelationship", async () => {
        return {
            createRelationship: () => false
        }
    })

    const racingSeries = await seedNode(DbNodeType.RacingSeries)
    const image = await seedNode(DbNodeType.Image)

    await expect(RacingSeries.createHasPrimeImageRelationship(racingSeries.properties.id, image.properties.id))
        .rejects
        .toThrow(Error)
})
