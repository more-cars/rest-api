import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {CarModelVariant} from "../../../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›is-featured-in-racing-game‹ relationship with nodes that do not exist', async () => {
    const carModelVariant = await seedNode(ControllerNodeType.CAR_MODEL_VARIANT)
    const racingGame = await seedNode(ControllerNodeType.RACING_GAME)

    await expect(CarModelVariant.createIsFeaturedInRacingGameRelationship(-42, racingGame.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(CarModelVariant.createIsFeaturedInRacingGameRelationship(carModelVariant.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(CarModelVariant.createIsFeaturedInRacingGameRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
