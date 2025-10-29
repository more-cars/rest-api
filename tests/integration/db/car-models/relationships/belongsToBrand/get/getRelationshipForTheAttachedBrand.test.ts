import {expect, test} from 'vitest'
import {seedCarModel} from "../../../../../../_toolbox/dbSeeding/car-models/nodes/seedCarModel"
import {seedBrand} from "../../../../../../_toolbox/dbSeeding/brands/nodes/seedBrand"
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {
        getRelationshipCollection
} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

test('Requesting the relationship between CAR MODEL and attached BRAND',
    async () => {
        const carModel = await seedCarModel()
        const brand = await seedBrand()

        await createRelationship(
            brand.id,
            carModel.id,
            DbRelationship.BrandHasCarModel,
        )

        const relationships = await getRelationshipCollection(
            carModel.id,
            DbRelationship.BrandHasCarModel,
            true,
        )

        expect(relationships.length)
            .toBe(1)

        expect(relationships[0].start_node_id)
            .toBe(brand.id)

        expect(relationships[0].end_node_id)
            .toBe(carModel.id)
    })
