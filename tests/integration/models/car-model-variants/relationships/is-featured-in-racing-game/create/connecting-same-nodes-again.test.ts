import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {CarModelVariant} from "../../../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {RelAlreadyExistsError} from "../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›is-featured-in-racing-game‹ relationship again', async () => {
    const carModelVariant = await seedNode(ControllerNodeType.CarModelVariant)
    const racingGame = await seedNode(ControllerNodeType.RacingGame)

    await expect(CarModelVariant.createIsFeaturedInRacingGameRelationship(carModelVariant.properties.id, racingGame.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(CarModelVariant.createIsFeaturedInRacingGameRelationship(carModelVariant.properties.id, racingGame.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
