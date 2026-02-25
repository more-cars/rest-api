import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {TrackLayout} from "../../../../../../../../src/models/node-types/track-layouts/TrackLayout"
import {RelType} from "../../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›is-featured-in-racing-game‹ relationship with valid data', async () => {
    const trackLayout = await seedNode(DbNodeType.TrackLayout)
    const racingGame = await seedNode(DbNodeType.RacingGame)

    const createdRelationship = await TrackLayout.createIsFeaturedInRacingGameRelationship(trackLayout.properties.id, racingGame.properties.id)

    expect(createdRelationship.origin.attributes.id)
        .toEqual(trackLayout.properties.id)
    expect(createdRelationship.destination.attributes.id)
        .toEqual(racingGame.properties.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.TrackLayoutIsFeaturedInRacingGame)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
