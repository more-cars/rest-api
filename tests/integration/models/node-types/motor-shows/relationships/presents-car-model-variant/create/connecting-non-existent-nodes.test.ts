import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {MotorShow} from "../../../../../../../../src/models/node-types/motor-shows/MotorShow"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›presents-car-model-variant‹ relationship with nodes that do not exist', async () => {
    const motorShow = await seedNode(DbNodeType.MotorShow)
    const carModelVariant = await seedNode(DbNodeType.CarModelVariant)

    await expect(MotorShow.createPresentsCarModelVariantRelationship(-42, carModelVariant.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(MotorShow.createPresentsCarModelVariantRelationship(motorShow.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(MotorShow.createPresentsCarModelVariantRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
