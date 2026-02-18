import {expect, test} from 'vitest'
import {createRelationship} from "../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../src/db/types/RelationshipType"
import assert from "assert"
import {FakeNodeInput} from "../../../../_toolbox/fixtures/nodes/FakeNodeInput"
import {NodeTypeEnum} from "../../../../../src/controllers/nodes/types/NodeTypeEnum"
import type {InputBrandCreate} from "../../../../../src/db/nodes/brands/types/InputBrandCreate"
import type {InputCarModelCreate} from "../../../../../src/db/nodes/car-models/types/InputCarModelCreate"
import {createNode as createBrandNode} from "../../../../../src/db/nodes/brands/createNode"
import {createNode as createCarModelNode} from "../../../../../src/db/nodes/car-models/createNode"

test('ID is added when creating a relationship', async () => {
    const brand = await createBrandNode(FakeNodeInput(NodeTypeEnum.BRAND) as InputBrandCreate)
    const carModel = await createCarModelNode(FakeNodeInput(NodeTypeEnum.CAR_MODEL) as InputCarModelCreate)
    const relationship = await createRelationship(brand.id, carModel.id, RelationshipType.BrandHasCarModel)

    if (!relationship) {
        assert.fail('Relationship creation failed')
    }

    expect(relationship.relationship_id)
        .toBeGreaterThanOrEqual(12000000)
    expect(relationship.relationship_id)
        .toBeLessThanOrEqual(99999999)
})
