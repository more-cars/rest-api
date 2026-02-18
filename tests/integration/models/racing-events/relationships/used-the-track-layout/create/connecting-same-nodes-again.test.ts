import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RacingEvent} from "../../../../../../../src/models/node-types/racing-events/RacingEvent"
import {RelationshipAlreadyExistsError} from "../../../../../../../src/models/types/RelationshipAlreadyExistsError"

test('Trying to create the same ›used-the-track-layout‹ relationship again', async () => {
    const racingEvent = await seedNode(NodeTypeEnum.RACING_EVENT)
    const trackLayout = await seedNode(NodeTypeEnum.TRACK_LAYOUT)

    await expect(RacingEvent.createUsedTheTrackLayoutRelationship(racingEvent.id, trackLayout.id))
        .resolves
        .not.toThrow(RelationshipAlreadyExistsError)

    await expect(RacingEvent.createUsedTheTrackLayoutRelationship(racingEvent.id, trackLayout.id))
        .rejects
        .toThrow(RelationshipAlreadyExistsError)
})
