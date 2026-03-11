import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {MotorShow} from "../../../../../../../../src/models/node-types/motor-shows/MotorShow"
import {RelType} from "../../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›presents-car-model-variant‹ relationship with valid data', async () => {
    const motorShow = await seedNode(DbNodeType.MotorShow)
    const carModelVariant = await seedNode(DbNodeType.CarModelVariant)

    const createdRelationship = await MotorShow.createPresentsCarModelVariantRelationship(motorShow.properties.id, carModelVariant.properties.id)

    expect(createdRelationship.origin.attributes.id)
        .toEqual(motorShow.properties.id)
    expect(createdRelationship.destination.attributes.id)
        .toEqual(carModelVariant.properties.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.MotorShowPresentsCarModelVariant)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
