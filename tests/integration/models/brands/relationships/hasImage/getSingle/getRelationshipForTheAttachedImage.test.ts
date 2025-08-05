import {expect, test} from 'vitest'
import {seedBrand} from "../../../../../../_toolbox/dbSeeding/brands/nodes/seedBrand"
import {Brand} from "../../../../../../../src/models/brands/Brand"
import assert from "assert"
import {validateJson} from "../../../../../../_toolbox/validateJson"
import {seedImage} from "../../../../../../_toolbox/dbSeeding/images/nodes/seedImage"
import {BrandHasImageSchema} from "../../../../../../_toolbox/schemas/BrandHasImageSchema"

test('Requesting the relationship between BRAND and attached IMAGE',
    async () => {
        const brand = await seedBrand()
        const image = await seedImage()

        await Brand.createHasImageRelationship(brand.id, image.id)

        const relationship = await Brand.getRelationshipForHasImage(brand.id, image.id)

        if (!relationship) {
            assert.fail(`Brand #${brand.id} not found.`)
        }

        validateJson(relationship, BrandHasImageSchema)

        expect(relationship.brand_id)
            .toBe(brand.id)

        expect(relationship.image_id)
            .toBe(image.id)
    })
