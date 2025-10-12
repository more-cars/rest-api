import {expect, test} from 'vitest'
import {seedBrand} from "../../../../../../_toolbox/dbSeeding/brands/nodes/seedBrand"
import {Brand} from "../../../../../../../src/models/brands/Brand"
import {seedImage} from "../../../../../../_toolbox/dbSeeding/images/nodes/seedImage"
import {RelationshipAlreadyExistsError} from "../../../../../../../src/models/types/RelationshipAlreadyExistsError"

test('Trying to create the same ›has-image‹ relationship again', async () => {
    const brand = await seedBrand()
    const image = await seedImage()

    await expect(Brand.createHasImageRelationship(brand.id, image.id))
        .resolves
        .not.toThrow(RelationshipAlreadyExistsError)

    await expect(Brand.createHasImageRelationship(brand.id, image.id))
        .rejects
        .toThrow(RelationshipAlreadyExistsError)
})
