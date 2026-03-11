import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {MotorShow} from "../../../../../../../../src/models/node-types/motor-shows/MotorShow"
import {RelAlreadyExistsError} from "../../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›presents-car-model-variant‹ relationship again', async () => {
    const motorShow = await seedNode(DbNodeType.MotorShow)
    const carModelVariant = await seedNode(DbNodeType.CarModelVariant)

    await expect(MotorShow.createPresentsCarModelVariantRelationship(motorShow.properties.id, carModelVariant.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(MotorShow.createPresentsCarModelVariantRelationship(motorShow.properties.id, carModelVariant.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
