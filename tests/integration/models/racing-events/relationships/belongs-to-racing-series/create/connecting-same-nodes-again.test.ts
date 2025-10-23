import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RacingEvent} from "../../../../../../../src/models/racing-events/RacingEvent"
import {RelationshipAlreadyExistsError} from "../../../../../../../src/models/types/RelationshipAlreadyExistsError"

test('Trying to create the same ›belongs-to-racing-series‹ relationship again', async () => {
    const racingEvent = await seedNode(NodeTypeEnum.RACING_EVENT)
    const racingSeries = await seedNode(NodeTypeEnum.RACING_SERIES)

    await expect(RacingEvent.createBelongsToRacingSeriesRelationship(racingEvent.id, racingSeries.id))
        .resolves
        .not.toThrow(RelationshipAlreadyExistsError)

    await expect(RacingEvent.createBelongsToRacingSeriesRelationship(racingEvent.id, racingSeries.id))
        .rejects
        .toThrow(RelationshipAlreadyExistsError)
})
