import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../../_toolbox/dbSeeding/seedNodes"
import {MotorShow} from "../../../../../../../../src/models/node-types/motor-shows/MotorShow"
import {getRelationshipCollection} from "../../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"

test('A MOTOR SHOW can have multiple ›presents-car-model-variant‹ relationships', async () => {
    const motorShow = await seedNode(DbNodeType.MotorShow)
    const carModelVariantsAmount = 3
    const carModelVariants = await seedNodes(DbNodeType.CarModelVariant, carModelVariantsAmount)

    for (const carModelVariant of carModelVariants) {
        await MotorShow.createPresentsCarModelVariantRelationship(motorShow.properties.id, carModelVariant.properties.id)
    }

    const relationships = await getRelationshipCollection(motorShow.properties.id, RelationshipType.MotorShowPresentsCarModelVariant)

    expect(relationships.length)
        .toBe(carModelVariantsAmount)
})
