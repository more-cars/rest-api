import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {TrackLayout} from "../../../../../../../src/models/node-types/track-layouts/TrackLayout"
import {RelType} from "../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›is-featured-in-racing-game‹ relationship with valid data', async () => {
    const trackLayout = await seedNode(ControllerNodeType.TRACK_LAYOUT)
    const racingGame = await seedNode(ControllerNodeType.RACING_GAME)

    const createdRelationship = await TrackLayout.createIsFeaturedInRacingGameRelationship(trackLayout.id, racingGame.id)

    expect(createdRelationship.origin.properties.id)
        .toEqual(trackLayout.id)
    expect(createdRelationship.destination.properties.id)
        .toEqual(racingGame.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.TrackLayoutIsFeaturedInRacingGame)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
