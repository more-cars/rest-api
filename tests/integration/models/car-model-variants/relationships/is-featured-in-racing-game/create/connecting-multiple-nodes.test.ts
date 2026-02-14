import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {CarModelVariant} from "../../../../../../../src/models/car-model-variants/CarModelVariant"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {NodeTypeLabel} from "../../../../../../../src/db/NodeTypeLabel"
import {RelationshipDirection} from "../../../../../../../src/db/types/RelationshipDirection"

test('A CAR MODEL VARIANT can have multiple ›is-featured-in-racing-game‹ relationships', async () => {
    const carModelVariant = await seedNode(NodeTypeEnum.CAR_MODEL_VARIANT)
    const racingGamesAmount = 3
    const racingGames = await seedNodes(NodeTypeEnum.RACING_GAME, racingGamesAmount)

    for (const racingGame of racingGames) {
        await CarModelVariant.createIsFeaturedInRacingGameRelationship(carModelVariant.id, racingGame.id)
    }

    const relationships = await getRelationshipCollection(
        carModelVariant.id,
        DbRelationship.CarModelVariantIsFeaturedInRacingGame,
        NodeTypeLabel.RacingGame,
        RelationshipDirection.REVERSE,
    )

    expect(relationships.length)
        .toBe(racingGamesAmount)
})
