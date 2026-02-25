import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../../_toolbox/dbSeeding/seedNodes"
import {CarModelVariant} from "../../../../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {getRelationshipCollection} from "../../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"

test('A CAR MODEL VARIANT can have multiple ›is-featured-in-racing-game‹ relationships', async () => {
    const carModelVariant = await seedNode(DbNodeType.CarModelVariant)
    const racingGamesAmount = 3
    const racingGames = await seedNodes(DbNodeType.RacingGame, racingGamesAmount)

    for (const racingGame of racingGames) {
        await CarModelVariant.createIsFeaturedInRacingGameRelationship(carModelVariant.properties.id, racingGame.properties.id)
    }

    const relationships = await getRelationshipCollection(
        carModelVariant.properties.id,
        RelationshipType.CarModelVariantIsFeaturedInRacingGame,
        DbNodeType.RacingGame,
    )

    expect(relationships.length)
        .toBe(racingGamesAmount)
})
