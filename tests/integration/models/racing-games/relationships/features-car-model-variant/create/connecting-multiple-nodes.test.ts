import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RacingGame} from "../../../../../../../src/models/racing-games/RacingGame"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

test('A RACING GAME can have multiple ›features-car-model-variant‹ relationships', async () => {
    const racingGame = await seedNode(NodeTypeEnum.RACING_GAME)
    const carModelVariantsAmount = 3
    const carModelVariants = await seedNodes(NodeTypeEnum.CAR_MODEL_VARIANT, carModelVariantsAmount)

    for (const carModelVariant of carModelVariants) {
        await RacingGame.createFeaturesCarModelVariantRelationship(racingGame.id, carModelVariant.id)
    }

    const relationships = await getRelationshipCollection(racingGame.id, DbRelationship.RacingGameFeaturesCarModelVariant)

    expect(relationships.length)
        .toBe(carModelVariantsAmount)
})
