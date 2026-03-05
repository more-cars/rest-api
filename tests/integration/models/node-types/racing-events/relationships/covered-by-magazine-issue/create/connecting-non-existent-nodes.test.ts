import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {RacingEvent} from "../../../../../../../../src/models/node-types/racing-events/RacingEvent"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›covered-by-magazine-issue‹ relationship with nodes that do not exist', async () => {
    const racingEvent = await seedNode(DbNodeType.RacingEvent)
    const magazineIssue = await seedNode(DbNodeType.MagazineIssue)

    await expect(RacingEvent.createCoveredByMagazineIssueRelationship(-42, magazineIssue.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(RacingEvent.createCoveredByMagazineIssueRelationship(racingEvent.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(RacingEvent.createCoveredByMagazineIssueRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
