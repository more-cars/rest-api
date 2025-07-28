import {expect, test} from 'vitest'
import {seedBrand} from "../../../../../../_toolbox/dbSeeding/brands/nodes/seedBrand"
import {seedCarModels} from "../../../../../../_toolbox/dbSeeding/car-models/nodes/seedCarModels"
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {
    getRelationshipsForSpecificNode
} from "../../../../../../../src/db/relationships/getRelationshipsForSpecificNode"

test('Requesting a relationship list for all CAR MODELs that are connected to the BRAND', async () => {
    const brand = await seedBrand()
    const carModels = await seedCarModels(3)

    for (const carModel of carModels) {
        await createRelationship(
            brand.id,
            carModel.id,
            DbRelationship.BrandHasCarModel,
        )
    }

    const relationships = await getRelationshipsForSpecificNode(
        brand.id,
        DbRelationship.BrandHasCarModel,
    )

    expect(relationships.length)
        .toBe(3)
})
