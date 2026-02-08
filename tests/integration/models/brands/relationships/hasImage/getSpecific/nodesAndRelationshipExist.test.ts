import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {Brand} from "../../../../../../../src/models/brands/Brand"
import assert from "assert"
import {validateJson} from "../../../../../../_toolbox/validateJson"
import {RelationshipSchema} from "../../../../../../_toolbox/schemas/model/RelationshipSchema"

test('Both nodes and a ›has-image‹ relationship exist',
    async () => {
        const brand = await seedNode(NodeTypeEnum.BRAND)
        const image = await seedNode(NodeTypeEnum.IMAGE)

        await Brand.createHasImageRelationship(brand.id, image.id)

        const relationship = await Brand.getSpecificHasImageRelationship(brand.id, image.id)

        if (!relationship) {
            assert.fail(`Relationship creation failed.`)
        }

        expect(validateJson(relationship, RelationshipSchema))
            .toBeTruthy()

        expect(relationship.origin.id)
            .toBe(brand.id)

        expect(relationship.destination.id)
            .toBe(image.id)
    })
