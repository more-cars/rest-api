import {expect, test} from 'vitest'
import {seedBrand} from "../../../../../../_toolbox/dbSeeding/brands/nodes/seedBrand"
import {Brand} from "../../../../../../../src/models/brands/Brand"
import assert from "assert"
import {validateJson} from "../../../../../../_toolbox/validateJson"
import {seedImage} from "../../../../../../_toolbox/dbSeeding/images/nodes/seedImage"
import {RelationshipSchema} from "../../../../../../_toolbox/schemas/RelationshipSchema"

test('Both nodes and a ›has-image‹ relationship exist',
    async () => {
        const brand = await seedBrand()
        const image = await seedImage()

        await Brand.createHasImageRelationship(brand.id, image.id)

        const relationship = await Brand.getSpecificHasImageRelationship(brand.id, image.id)

        if (!relationship) {
            assert.fail(`Relationship creation failed.`)
        }

        validateJson(relationship, RelationshipSchema)

        expect(relationship.origin.id)
            .toBe(brand.id)

        expect(relationship.destination.id)
            .toBe(image.id)
    })
