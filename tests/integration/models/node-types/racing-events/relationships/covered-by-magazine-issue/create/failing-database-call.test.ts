import {expect, test, vi} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {RacingEvent} from "../../../../../../../../src/models/node-types/racing-events/RacingEvent"

vi.mock("../../../../../../../../src/db/relationships/createRelationship", async () => {
    return {
        createRelationship: () => false
    }
})

test('A completely valid request, but the database call fails (e.g. one of the nodes was deleted just a moment ago)', async () => {
    const racingEvent = await seedNode(DbNodeType.RacingEvent)
    const magazineIssue = await seedNode(DbNodeType.MagazineIssue)

    await expect(RacingEvent.createCoveredByMagazineIssueRelationship(racingEvent.properties.id, magazineIssue.properties.id))
        .rejects
        .toThrow(Error)
})
