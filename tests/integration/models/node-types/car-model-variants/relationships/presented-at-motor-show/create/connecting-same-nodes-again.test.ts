import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {CarModelVariant} from "../../../../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {RelAlreadyExistsError} from "../../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›presented-at-motor-show‹ relationship again', async () => {
    const carModelVariant = await seedNode(DbNodeType.CarModelVariant)
    const motorShow = await seedNode(DbNodeType.MotorShow)

    await expect(CarModelVariant.createPresentedAtMotorShowRelationship(carModelVariant.properties.id, motorShow.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(CarModelVariant.createPresentedAtMotorShowRelationship(carModelVariant.properties.id, motorShow.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
