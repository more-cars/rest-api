import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RacingEvent} from "../../../../../../../src/models/racing-events/RacingEvent"
import {RacingEventRelationship} from "../../../../../../../src/models/racing-events/types/RacingEventRelationship"

test('Creating a ›has-prime-image‹ relationship with valid data', async () => {
    const racingEvent = await seedNode(NodeTypeEnum.RACING_EVENT)
    const image = await seedNode(NodeTypeEnum.IMAGE)

    const createdRelationship = await RacingEvent.createHasPrimeImageRelationship(racingEvent.id, image.id)

    expect(createdRelationship.origin.id)
        .toEqual(racingEvent.id)
    expect(createdRelationship.destination.id)
        .toEqual(image.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RacingEventRelationship.hasPrimeImage)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
