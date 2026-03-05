import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {MagazineIssue} from "../../../../../../../../src/models/node-types/magazine-issues/MagazineIssue"
import {RelAlreadyExistsError} from "../../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›covers-racing-event‹ relationship again', async () => {
    const magazineIssue = await seedNode(DbNodeType.MagazineIssue)
    const racingEvent = await seedNode(DbNodeType.RacingEvent)

    await expect(MagazineIssue.createCoversRacingEventRelationship(magazineIssue.properties.id, racingEvent.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(MagazineIssue.createCoversRacingEventRelationship(magazineIssue.properties.id, racingEvent.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
