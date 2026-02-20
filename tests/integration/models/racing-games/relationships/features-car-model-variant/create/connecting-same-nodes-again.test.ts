import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {RacingGame} from "../../../../../../../src/models/node-types/racing-games/RacingGame"
import {RelAlreadyExistsError} from "../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›features-car-model-variant‹ relationship again', async () => {
    const racingGame = await seedNode(ControllerNodeType.RACING_GAME)
    const carModelVariant = await seedNode(ControllerNodeType.CAR_MODEL_VARIANT)

    await expect(RacingGame.createFeaturesCarModelVariantRelationship(racingGame.id, carModelVariant.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(RacingGame.createFeaturesCarModelVariantRelationship(racingGame.id, carModelVariant.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
