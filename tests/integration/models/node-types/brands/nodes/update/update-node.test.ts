import {describe, expect, test} from 'vitest'
import {Brand} from "../../../../../../../src/models/node-types/brands/Brand"
import {FakeBrand} from "../../../../../../_toolbox/fixtures/nodes/FakeBrand"
import type {BrandInput} from "../../../../../../../src/models/node-types/brands/types/BrandInput"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

describe('Updating a BRAND', () => {
    test('Node does not exist', async () => {
        await expect(Brand.update(-42, FakeBrand.dbInput() as BrandInput))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('Node exists', async () => {
        const createdNode = await seedNode(DbNodeType.Brand)
        const inputData = FakeBrand.dbInput()
        const updatedNode = await Brand.update(createdNode.properties.id, inputData as BrandInput)

        expect(updatedNode.attributes)
            .toEqual(expect.objectContaining(inputData))
    })

    test('Trying to override read-only properties', async () => {
        const createdNode = await seedNode(DbNodeType.Brand)
        const validData = FakeBrand.dbInput()
        const readOnlyData = {
            id: 9999,
            created_at: "NOT_ALLOWED_TO_OVERWRITE",
            updated_at: "NOT_ALLOWED_TO_OVERWRITE",
        }
        const inputData = Object.assign({}, validData, readOnlyData)

        const updatedNode = await Brand.update(createdNode.properties.id, inputData as BrandInput)

        expect(updatedNode.attributes)
            .not.toEqual(expect.objectContaining(readOnlyData))
    })
})
