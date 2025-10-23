import {expect, test, vi} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RacingSeries} from "../../../../../../../src/models/racing-series/RacingSeries"

test('A completely valid request, but the database call fails (e.g. one of the nodes was deleted just a moment ago)', async () => {
    vi.mock("../../../../../../../src/db/relationships/createRelationship", async () => {
        return {
            createRelationship: () => false
        }
    })

    const racingSeries = await seedNode(NodeTypeEnum.RACING_SERIES)
    const image = await seedNode(NodeTypeEnum.IMAGE)

    await expect(RacingSeries.createHasPrimeImageRelationship(racingSeries.id, image.id))
        .rejects
        .toThrow(Error)
})
