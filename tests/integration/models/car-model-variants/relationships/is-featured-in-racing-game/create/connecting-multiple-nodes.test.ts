import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {CarModelVariant} from "../../../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeTypeLabel} from "../../../../../../../src/db/NodeTypeLabel"

test('A CAR MODEL VARIANT can have multiple ›is-featured-in-racing-game‹ relationships', async () => {
    const carModelVariant = await seedNode(ControllerNodeType.CAR_MODEL_VARIANT)
    const racingGamesAmount = 3
    const racingGames = await seedNodes(ControllerNodeType.RACING_GAME, racingGamesAmount)

    for (const racingGame of racingGames) {
        await CarModelVariant.createIsFeaturedInRacingGameRelationship(carModelVariant.id, racingGame.id)
    }

    const relationships = await getRelationshipCollection(
        carModelVariant.id,
        RelationshipType.CarModelVariantIsFeaturedInRacingGame,
        NodeTypeLabel.RacingGame,
    )

    expect(relationships.length)
        .toBe(racingGamesAmount)
})
