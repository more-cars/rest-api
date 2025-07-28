import {expect, test} from 'vitest'
import {seedBrand} from "../../../../../../_toolbox/dbSeeding/brands/nodes/seedBrand"
import {Brand} from "../../../../../../../src/models/brands/Brand"
import {seedImage} from "../../../../../../_toolbox/dbSeeding/images/nodes/seedImage"

test('The relationship ID should not change when creating the same relationship again', async () => {
    const brand = await seedBrand()
    const image = await seedImage()

    const relationshipBefore =
        await Brand.createHasImageRelationship(brand.id, image.id)
    expect(relationshipBefore)
        .not.toBe(false)

    const relationshipAfter =
        await Brand.createHasImageRelationship(brand.id, image.id)
    expect(relationshipAfter)
        .not.toBe(false)

    if (relationshipAfter && relationshipBefore) {
        expect(relationshipAfter.relationship_id)
            .toEqual(relationshipBefore.relationship_id)
    }
})
