import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {CarModel} from "../../../../../../../src/models/node-types/car-models/CarModel"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

test('A CAR MODEL cannot have multiple ›belongs-to-brand‹ relationships', async () => {
    const carModel = await seedNode(DbNodeType.CarModel)
    const brandsAmount = 3
    const brands = await seedNodes(DbNodeType.Brand, brandsAmount)

    for (const brand of brands) {
        await CarModel.createBelongsToBrandRelationship(carModel.properties.id, brand.properties.id)
    }

    const relationships = await getRelationshipCollection(
        carModel.properties.id,
        RelationshipType.CarModelBelongsToBrand,
        DbNodeType.Brand,
    )

    expect(relationships.length)
        .toBe(1)
})
