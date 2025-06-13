import {seedBrand} from "../../../../../../dbSeeding/brands/nodes/seedBrand"
import {findRelationships} from "../../../../../../../src/db/findRelationships"
import {DbRelationship} from "../../../../../../../src/types/DbRelationship"

test('An empty list should be returned when no CAR MODEL is connected to the BRAND', async () => {
    const brand = await seedBrand()

    const relationships = await findRelationships(
        brand.id as number,
        DbRelationship.BrandHasCarModel,
    )

    expect(relationships.length)
        .toBe(0)
})
