import {expect, test} from 'vitest'
import {createRelationship} from "../../../../../src/db/relationships/createRelationship"
import {DbRelationship} from "../../../../../src/db/types/DbRelationship"
import assert from "assert"
import {FakeNodeInput} from "../../../../_toolbox/fixtures/nodes/FakeNodeInput"
import {NodeTypeEnum} from "../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {InputBrandCreate} from "../../../../../src/db/nodes/brands/types/InputBrandCreate"
import FakeCarModel from "../../../../_toolbox/fixtures/nodes/FakeCarModel"
import {createNode as createBrandNode} from "../../../../../src/db/nodes/brands/createNode"
import {createNode as createCarModelNode} from "../../../../../src/db/nodes/car-models/createNode"

test('ID is added when creating a relationship', async () => {
    const brand = await createBrandNode(FakeNodeInput(NodeTypeEnum.BRAND) as InputBrandCreate)
    const carModel = await createCarModelNode(FakeCarModel)
    const relationship = await createRelationship(brand.id, carModel.id, DbRelationship.BrandHasCarModel)

    if (!relationship) {
        assert.fail('Relationship creation failed')
    }

    expect(relationship.relationship_id)
        .toBeGreaterThanOrEqual(12000000)
    expect(relationship.relationship_id)
        .toBeLessThanOrEqual(99999999)
})
