import {expect, test} from 'vitest'
import {seedBrand} from "../../../../../../_toolbox/dbSeeding/brands/nodes/seedBrand"
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {
        getRelationshipsForSpecificNode
} from "../../../../../../../src/db/relationships/getRelationshipsForSpecificNode"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {seedCarModel} from "../../../../../../_toolbox/dbSeeding/car-models/nodes/seedCarModel"

test('Requesting the relationship between BRAND and attached CAR MODEL',
    async () => {
        const brand = await seedBrand()
        const carModel = await seedCarModel()

        await createRelationship(
            brand.id,
            carModel.id,
            DbRelationship.BrandHasCarModel,
        )

        const relationships = await getRelationshipsForSpecificNode(
            brand.id,
            DbRelationship.BrandHasCarModel,
        )

        expect(relationships.length)
            .toBe(1)

        expect(relationships[0].start_node_id)
            .toBe(brand.id)

        expect(relationships[0].end_node_id)
            .toBe(carModel.id)
    })
