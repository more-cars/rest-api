import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RacingGame} from "../../../../../../../src/models/racing-games/RacingGame"
import {RelationshipType} from "../../../../../../../src/models/relationships/types/RelationshipType"

test('Creating a ›features-track-layout‹ relationship with valid data', async () => {
    const racingGame = await seedNode(NodeTypeEnum.RACING_GAME)
    const trackLayout = await seedNode(NodeTypeEnum.TRACK_LAYOUT)

    const createdRelationship = await RacingGame.createFeaturesTrackLayoutRelationship(racingGame.id, trackLayout.id)

    expect(createdRelationship.origin.id)
        .toEqual(racingGame.id)
    expect(createdRelationship.destination.id)
        .toEqual(trackLayout.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelationshipType.RacingGameFeaturesTrackLayout)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
