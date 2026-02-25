import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {RacingGame} from "../../../../../../../../src/models/node-types/racing-games/RacingGame"
import {RelType} from "../../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›has-prime-image‹ relationship with valid data', async () => {
    const racingGame = await seedNode(DbNodeType.RacingGame)
    const image = await seedNode(DbNodeType.Image)

    const createdRelationship = await RacingGame.createHasPrimeImageRelationship(racingGame.properties.id, image.properties.id)

    expect(createdRelationship.origin.attributes.id)
        .toEqual(racingGame.properties.id)
    expect(createdRelationship.destination.attributes.id)
        .toEqual(image.properties.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.RacingGameHasPrimeImage)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
