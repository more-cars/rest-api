import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {CarModelVariant} from "../../../../../../../src/models/car-model-variants/CarModelVariant"
import {RelationshipAlreadyExistsError} from "../../../../../../../src/models/types/RelationshipAlreadyExistsError"

test('Trying to create the same ›is-featured-in-racing-game‹ relationship again', async () => {
    const carModelVariant = await seedNode(NodeTypeEnum.CAR_MODEL_VARIANT)
    const racingGame = await seedNode(NodeTypeEnum.RACING_GAME)

    await expect(CarModelVariant.createIsFeaturedInRacingGameRelationship(carModelVariant.id, racingGame.id))
        .resolves
        .not.toThrow(RelationshipAlreadyExistsError)

    await expect(CarModelVariant.createIsFeaturedInRacingGameRelationship(carModelVariant.id, racingGame.id))
        .rejects
        .toThrow(RelationshipAlreadyExistsError)
})
