import {seedBrand} from "../../../../../../dbSeeding/brands/nodes/seedBrand"
import {
    getRelationshipsForSpecificNode
} from "../../../../../../../src/db/relationships/getRelationshipsForSpecificNode"
import {DbRelationship} from "../../../../../../../src/types/DbRelationship"

test('An empty list should be returned when no CAR MODEL is connected to the BRAND', async () => {
    const brand = await seedBrand()

    const relationships = await getRelationshipsForSpecificNode(
        brand.id as number,
        DbRelationship.BrandHasCarModel,
    )

    expect(relationships.length)
        .toBe(0)
})
