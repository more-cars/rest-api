import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {RacingGame} from "../../../../../../../src/models/node-types/racing-games/RacingGame"
import {RelType} from "../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›features-track-layout‹ relationship with valid data', async () => {
    const racingGame = await seedNode(ControllerNodeType.RACING_GAME)
    const trackLayout = await seedNode(ControllerNodeType.TRACK_LAYOUT)

    const createdRelationship = await RacingGame.createFeaturesTrackLayoutRelationship(racingGame.properties.id, trackLayout.properties.id)

    expect(createdRelationship.origin.attributes.id)
        .toEqual(racingGame.properties.id)
    expect(createdRelationship.destination.attributes.id)
        .toEqual(trackLayout.properties.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.RacingGameFeaturesTrackLayout)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
