import {expect, test} from 'vitest'
import {seedBrand} from "../../../../../../_toolbox/dbSeeding/brands/nodes/seedBrand"
import {Brand} from "../../../../../../../src/models/brands/Brand"
import {seedImage} from "../../../../../../_toolbox/dbSeeding/images/nodes/seedImage"
import {RelationshipNotFoundError} from "../../../../../../../src/models/types/RelationshipNotFoundError"

test('Both nodes exist, but have no ›has-image‹ relationship', async () => {
    const brand = await seedBrand()
    const image = await seedImage()

    await expect(Brand.getSpecificHasImageRelationship(brand.id, image.id))
        .rejects
        .toThrow(RelationshipNotFoundError)
})
