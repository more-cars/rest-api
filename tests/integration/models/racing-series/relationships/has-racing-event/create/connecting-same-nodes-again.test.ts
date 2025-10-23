import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RacingSeries} from "../../../../../../../src/models/racing-series/RacingSeries"
import {RelationshipAlreadyExistsError} from "../../../../../../../src/models/types/RelationshipAlreadyExistsError"

test('Trying to create the same ›has-racing-event‹ relationship again', async () => {
    const racingSeries = await seedNode(NodeTypeEnum.RACING_SERIES)
    const racingEvent = await seedNode(NodeTypeEnum.RACING_EVENT)

    await expect(RacingSeries.createHasRacingEventRelationship(racingSeries.id, racingEvent.id))
        .resolves
        .not.toThrow(RelationshipAlreadyExistsError)

    await expect(RacingSeries.createHasRacingEventRelationship(racingSeries.id, racingEvent.id))
        .rejects
        .toThrow(RelationshipAlreadyExistsError)
})
