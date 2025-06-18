import {seedBrand} from "../../../../../../dbSeeding/brands/nodes/seedBrand"
import {seedCarModels} from "../../../../../../dbSeeding/car-models/nodes/seedCarModels"
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {DbRelationship} from "../../../../../../../src/types/DbRelationship"
import {findRelationships} from "../../../../../../../src/db/relationships/findRelationships"

test('Requesting a relationship list for all CAR MODELs that are connected to the BRAND', async () => {
    const brand = await seedBrand()
    const carModels = await seedCarModels(3)

    for (const carModel of carModels) {
        await createRelationship(
            brand.id as number,
            carModel.id as number,
            DbRelationship.BrandHasCarModel,
        )
    }

    const relationships = await findRelationships(
        brand.id as number,
        DbRelationship.BrandHasCarModel,
    )

    expect(relationships.length)
        .toBe(3)
})
