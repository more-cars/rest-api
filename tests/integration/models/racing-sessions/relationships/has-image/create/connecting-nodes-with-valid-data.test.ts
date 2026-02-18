import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RacingSession} from "../../../../../../../src/models/node-types/racing-sessions/RacingSession"
import {RelType} from "../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›has-image‹ relationship with valid data', async () => {
    const racingSession = await seedNode(NodeTypeEnum.RACING_SESSION)
    const image = await seedNode(NodeTypeEnum.IMAGE)

    const createdRelationship = await RacingSession.createHasImageRelationship(racingSession.id, image.id)

    expect(createdRelationship.origin.id)
        .toEqual(racingSession.id)
    expect(createdRelationship.destination.id)
        .toEqual(image.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.RacingSessionHasImage)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
