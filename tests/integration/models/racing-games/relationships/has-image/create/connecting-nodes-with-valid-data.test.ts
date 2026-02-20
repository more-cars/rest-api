import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {RacingGame} from "../../../../../../../src/models/node-types/racing-games/RacingGame"
import {RelType} from "../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›has-image‹ relationship with valid data', async () => {
    const racingGame = await seedNode(ControllerNodeType.RACING_GAME)
    const image = await seedNode(ControllerNodeType.IMAGE)

    const createdRelationship = await RacingGame.createHasImageRelationship(racingGame.properties.id, image.properties.id)

    expect(createdRelationship.origin.properties.id)
        .toEqual(racingGame.properties.id)
    expect(createdRelationship.destination.properties.id)
        .toEqual(image.properties.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.RacingGameHasImage)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
