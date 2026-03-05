import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {MagazineIssue} from "../../../../../../../../src/models/node-types/magazine-issues/MagazineIssue"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›covers-racing-event‹ relationship with nodes that do not exist', async () => {
    const magazineIssue = await seedNode(DbNodeType.MagazineIssue)
    const racingEvent = await seedNode(DbNodeType.RacingEvent)

    await expect(MagazineIssue.createCoversRacingEventRelationship(-42, racingEvent.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(MagazineIssue.createCoversRacingEventRelationship(magazineIssue.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(MagazineIssue.createCoversRacingEventRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
