import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {CarModel} from "../../../../../../../src/models/node-types/car-models/CarModel"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

test('A CAR MODEL can have multiple ›has-variant‹ relationships', async () => {
    const carModel = await seedNode(DbNodeType.CarModel)
    const carModelVariantsAmount = 3
    const carModelVariants = await seedNodes(DbNodeType.CarModelVariant, carModelVariantsAmount)

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
