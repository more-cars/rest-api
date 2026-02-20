import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {CarModel} from "../../../../../../../src/models/node-types/car-models/CarModel"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

test('A CAR MODEL can have multiple ›has-variant‹ relationships', async () => {
    const carModel = await seedNode(ControllerNodeType.CAR_MODEL)
    const carModelVariantsAmount = 3
    const carModelVariants = await seedNodes(ControllerNodeType.CAR_MODEL_VARIANT, carModelVariantsAmount)

    for (const carModelVariant of carModelVariants) {
        await CarModel.createHasVariantRelationship(carModel.properties.id, carModelVariant.properties.id)
    }

    const relationships = await getRelationshipCollection(
        carModel.properties.id,
        RelationshipType.CarModelHasVariant,
        DbNodeType.CarModelVariant,
    )

    expect(relationships.length)
        .toBe(carModelVariantsAmount)
})
