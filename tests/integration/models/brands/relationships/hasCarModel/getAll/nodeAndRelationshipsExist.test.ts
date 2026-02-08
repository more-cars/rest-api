import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {Brand} from "../../../../../../../src/models/brands/Brand"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"

test('BRAND exists and has ›has-car-model‹ relationships', async () => {
    const brand = await seedNode(NodeTypeEnum.BRAND)
    const carModels = await seedNodes(NodeTypeEnum.CAR_MODEL, 3)

    for (const carModel of carModels) {
        await Brand.createHasCarModelRelationship(brand.id, carModel.id)
    }

    const relationships = await Brand.getAllHasCarModelRelationships(brand.id)

    expect(relationships.length)
        .toBe(3)
})
