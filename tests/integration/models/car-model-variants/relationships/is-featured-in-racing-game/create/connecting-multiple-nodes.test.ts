import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {CarModelVariant} from "../../../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

test('A CAR MODEL VARIANT can have multiple ›is-featured-in-racing-game‹ relationships', async () => {
    const carModelVariant = await seedNode(ControllerNodeType.CAR_MODEL_VARIANT)
    const racingGamesAmount = 3
    const racingGames = await seedNodes(ControllerNodeType.RACING_GAME, racingGamesAmount)

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
