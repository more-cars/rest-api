import {describe, expect, test} from 'vitest'
import {Brand} from "../../../../../../../src/models/brands/Brand"
import {seedBrand} from "../../../../../../_toolbox/dbSeeding/brands/nodes/seedBrand"
import {seedImage} from "../../../../../../_toolbox/dbSeeding/images/nodes/seedImage"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting a specific ›has-image‹ relationship', () => {
    test('with a BRAND that does not exist', async () => {
        const image = await seedImage()

        await expect(Brand.getSpecificHasImageRelationship(-42, image.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('with an IMAGE that does not exist', async () => {
        const brand = await seedBrand()

        await expect(Brand.getSpecificHasImageRelationship(brand.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('with a BRAND and IMAGE that do not exist', async () => {
        await expect(Brand.getSpecificHasImageRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
