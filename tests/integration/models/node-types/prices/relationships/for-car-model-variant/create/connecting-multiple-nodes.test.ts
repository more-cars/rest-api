import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../../_toolbox/dbSeeding/seedNodes"
import {Price} from "../../../../../../../../src/models/node-types/prices/Price"
import {getRelationshipCollection} from "../../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"

test('A PRICE cannot have multiple ›for-car-model-variant‹ relationships', async () => {
    const price = await seedNode(DbNodeType.Price)
    const carModelVariantsAmount = 3
    const carModelVariants = await seedNodes(DbNodeType.CarModelVariant, carModelVariantsAmount)

    for (const carModelVariant of carModelVariants) {
        await Price.createForCarModelVariantRelationship(price.properties.id, carModelVariant.properties.id)
    }

    const relationships = await getRelationshipCollection(price.properties.id, RelationshipType.PriceForCarModelVariant)

    expect(relationships.length)
        .toBe(1)
})
