import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {RacingEvent} from "../../../../../../../src/models/node-types/racing-events/RacingEvent"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›has-image‹ relationship with nodes that do not exist', async () => {
    const racingEvent = await seedNode(DbNodeType.RacingEvent)
    const image = await seedNode(DbNodeType.Image)

    await expect(RacingEvent.createHasImageRelationship(-42, image.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(RacingEvent.createHasImageRelationship(racingEvent.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(RacingEvent.createHasImageRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
