import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {RacingEvent} from "../../../../../../../../src/models/node-types/racing-events/RacingEvent"
import {RelAlreadyExistsError} from "../../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›covered-by-magazine-issue‹ relationship again', async () => {
    const racingEvent = await seedNode(DbNodeType.RacingEvent)
    const magazineIssue = await seedNode(DbNodeType.MagazineIssue)

    await expect(RacingEvent.createCoveredByMagazineIssueRelationship(racingEvent.properties.id, magazineIssue.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(RacingEvent.createCoveredByMagazineIssueRelationship(racingEvent.properties.id, magazineIssue.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
