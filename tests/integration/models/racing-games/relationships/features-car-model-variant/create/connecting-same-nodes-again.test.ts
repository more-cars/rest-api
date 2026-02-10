import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RacingGame} from "../../../../../../../src/models/racing-games/RacingGame"
import {RelationshipAlreadyExistsError} from "../../../../../../../src/models/types/RelationshipAlreadyExistsError"

test('Trying to create the same ›features-car-model-variant‹ relationship again', async () => {
    const racingGame = await seedNode(NodeTypeEnum.RACING_GAME)
    const carModelVariant = await seedNode(NodeTypeEnum.CAR_MODEL_VARIANT)

    await expect(RacingGame.createFeaturesCarModelVariantRelationship(racingGame.id, carModelVariant.id))
        .resolves
        .not.toThrow(RelationshipAlreadyExistsError)

    await expect(RacingGame.createFeaturesCarModelVariantRelationship(racingGame.id, carModelVariant.id))
        .rejects
        .toThrow(RelationshipAlreadyExistsError)
})
