import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {TrackLayout} from "../../../../../../../src/models/track-layouts/TrackLayout"
import {RelationshipType} from "../../../../../../../src/models/relationships/types/RelationshipType"

test('Creating a ›is-featured-in-racing-game‹ relationship with valid data', async () => {
    const trackLayout = await seedNode(NodeTypeEnum.TRACK_LAYOUT)
    const racingGame = await seedNode(NodeTypeEnum.RACING_GAME)

    const createdRelationship = await TrackLayout.createIsFeaturedInRacingGameRelationship(trackLayout.id, racingGame.id)

    expect(createdRelationship.origin.id)
        .toEqual(trackLayout.id)
    expect(createdRelationship.destination.id)
        .toEqual(racingGame.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelationshipType.TrackLayoutIsFeaturedInRacingGame)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
