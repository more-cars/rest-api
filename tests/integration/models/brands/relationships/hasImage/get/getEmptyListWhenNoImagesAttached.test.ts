import {seedBrand} from "../../../../../../_toolbox/dbSeeding/brands/nodes/seedBrand"
import {Brand} from "../../../../../../../src/models/brands/Brand"
import assert from "assert"

test('An empty list should be returned when no IMAGE is connected to the BRAND', async () => {
    const brand = await seedBrand()

    const relationships = await Brand.getRelationshipsForHasImage(brand.id)

    if (!relationships) {
        assert.fail('Brand not found.')
    }

    expect(relationships.length)
        .toBe(0)
})
