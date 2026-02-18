import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RacingEvent} from "../../../../../../../src/models/node-types/racing-events/RacingEvent"
import {RelType} from "../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›has-image‹ relationship with valid data', async () => {
    const racingEvent = await seedNode(NodeTypeEnum.RACING_EVENT)
    const image = await seedNode(NodeTypeEnum.IMAGE)

    const createdRelationship = await RacingEvent.createHasImageRelationship(racingEvent.id, image.id)

    expect(createdRelationship.origin.id)
        .toEqual(racingEvent.id)
    expect(createdRelationship.destination.id)
        .toEqual(image.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.RacingEventHasImage)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
