import {expect, test, vi} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {RacingSeries} from "../../../../../../../../src/models/node-types/racing-series/RacingSeries"

test('A completely valid request, but the database call fails (e.g. one of the nodes was deleted just a moment ago)', async () => {
    vi.mock("../../../../../../../src/db/relationships/createRelationship", async () => {
        return {
            createRelationship: () => false
        }
    })

    const racingSeries = await seedNode(DbNodeType.RacingSeries)
    const racingEvent = await seedNode(DbNodeType.RacingEvent)

    await expect(RacingSeries.createHasRacingEventRelationship(racingSeries.properties.id, racingEvent.properties.id))
        .rejects
        .toThrow(Error)
})
