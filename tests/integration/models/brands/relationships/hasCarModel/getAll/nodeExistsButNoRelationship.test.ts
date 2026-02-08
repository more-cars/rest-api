import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {Brand} from "../../../../../../../src/models/brands/Brand"

test('BRAND exists, but has no ›has-car-model‹ relationships', async () => {
    const brand = await seedNode(NodeTypeEnum.BRAND)

    const relationships = await Brand.getAllHasCarModelRelationships(brand.id)

    expect(relationships.length)
        .toBe(0)
})
