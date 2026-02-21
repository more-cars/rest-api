import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {RacingGame} from "../../../../../../../src/models/node-types/racing-games/RacingGame"
import {RelAlreadyExistsError} from "../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›features-car-model-variant‹ relationship again', async () => {
    const racingGame = await seedNode(ControllerNodeType.RacingGame)
    const carModelVariant = await seedNode(ControllerNodeType.CarModelVariant)

    await expect(RacingGame.createFeaturesCarModelVariantRelationship(racingGame.properties.id, carModelVariant.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(RacingGame.createFeaturesCarModelVariantRelationship(racingGame.properties.id, carModelVariant.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
