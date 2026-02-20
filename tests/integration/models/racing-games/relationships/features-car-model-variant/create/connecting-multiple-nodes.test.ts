import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {RacingGame} from "../../../../../../../src/models/node-types/racing-games/RacingGame"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

test('A RACING GAME can have multiple ›features-car-model-variant‹ relationships', async () => {
    const racingGame = await seedNode(ControllerNodeType.RACING_GAME)
    const carModelVariantsAmount = 3
    const carModelVariants = await seedNodes(ControllerNodeType.CAR_MODEL_VARIANT, carModelVariantsAmount)

    for (const carModelVariant of carModelVariants) {
        await RacingGame.createFeaturesCarModelVariantRelationship(racingGame.id, carModelVariant.id)
    }

    const relationships = await getRelationshipCollection(
        racingGame.id,
        RelationshipType.RacingGameFeaturesCarModelVariant,
        DbNodeType.CarModelVariant,
    )

    expect(relationships.length)
        .toBe(carModelVariantsAmount)
})
