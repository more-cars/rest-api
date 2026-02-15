import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RacingGame} from "../../../../../../../src/models/racing-games/RacingGame"
import {RelationshipType} from "../../../../../../../src/models/relationships/types/RelationshipType"

test('Creating a ›has-image‹ relationship with valid data', async () => {
    const racingGame = await seedNode(NodeTypeEnum.RACING_GAME)
    const image = await seedNode(NodeTypeEnum.IMAGE)

    const createdRelationship = await RacingGame.createHasImageRelationship(racingGame.id, image.id)

    expect(createdRelationship.origin.id)
        .toEqual(racingGame.id)
    expect(createdRelationship.destination.id)
        .toEqual(image.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelationshipType.RacingGameHasImage)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
