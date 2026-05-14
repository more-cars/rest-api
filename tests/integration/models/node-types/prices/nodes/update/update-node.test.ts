import {describe, expect, test} from 'vitest'
import {Price} from "../../../../../../../src/models/node-types/prices/Price"
import {FakePrice} from "../../../../../../_toolbox/fixtures/nodes/FakePrice"
import type {PriceInput} from "../../../../../../../src/models/node-types/prices/types/PriceInput"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

describe('Updating a PRICE', () => {
    test('Node does not exist', async () => {
        await expect(Price.update(-42, FakePrice.dbInput() as PriceInput))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('Node exists', async () => {
        const createdNode = await seedNode(DbNodeType.Price)
        const inputData = FakePrice.dbInput()
        const updatedNode = await Price.update(createdNode.properties.id, inputData as PriceInput)

        expect(updatedNode.attributes)
            .toEqual(expect.objectContaining(inputData))
    })

    test('Trying to override read-only properties', async () => {
        const createdNode = await seedNode(DbNodeType.Price)
        const validData = FakePrice.dbInput()
        const readOnlyData = {
            id: 9999,
            created_at: "NOT_ALLOWED_TO_OVERWRITE",
            updated_at: "NOT_ALLOWED_TO_OVERWRITE",
        }
        const inputData = Object.assign({}, validData, readOnlyData)

        const updatedNode = await Price.update(createdNode.properties.id, inputData as PriceInput)

        expect(updatedNode.attributes)
            .not.toEqual(expect.objectContaining(readOnlyData))
    })
})
