import {seedBrand} from "../../../../../../_toolbox/dbSeeding/brands/nodes/seedBrand"
import {
    getRelationshipsForSpecificNode
} from "../../../../../../../src/db/relationships/getRelationshipsForSpecificNode"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

test('An empty list should be returned when no IMAGE is connected to the BRAND', async () => {
    const brand = await seedBrand()

    const relationships = await getRelationshipsForSpecificNode(
        brand.id,
        DbRelationship.NodeHasImage,
    )

    expect(relationships.length)
        .toBe(0)
})
