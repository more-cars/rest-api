import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import {FakePrice} from "../../../../../_toolbox/fixtures/nodes/FakePrice"
import {updateDbNode} from "../../../../../../src/db/nodes/updateDbNode"
import type {InputPriceCreate} from "../../../../../../src/db/node-types/prices/types/InputPriceCreate"
import type {PriceNode} from "../../../../../../src/db/node-types/prices/types/PriceNode"

describe('Updating PRICE', () => {
    test('with valid data', async () => {
        const createdNode = await seedNode(DbNodeType.Price)
        const inputData = FakePrice.dbInput()
        const updatedNode = await updateDbNode(DbNodeType.Price, createdNode.properties.id, inputData)

        expect(updatedNode.properties)
            .not.toEqual(expect.objectContaining(createdNode.properties))

        expect(updatedNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })

    test('with the same data', async () => {
        const createdNode = await seedNode(DbNodeType.Price)
        const inputData = createdNode.properties as unknown as InputPriceCreate
        const updatedNode = await updateDbNode(DbNodeType.Price, createdNode.properties.id, inputData)

        expect(updatedNode.properties)
            .not.toEqual(createdNode.properties.updated_at)

        createdNode.properties.updated_at = ''
        updatedNode.properties.updated_at = ''

        expect(updatedNode.properties)
            .toEqual(expect.objectContaining(createdNode.properties))

        expect(updatedNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })

    test('removing a field', async () => {
        const createdNode = await seedNode(DbNodeType.Price)
        const inputData = createdNode.properties as unknown as InputPriceCreate
        // @ts-ignore
        inputData.price = null
        const updatedNode = await updateDbNode(DbNodeType.Price, createdNode.properties.id, inputData) as PriceNode

        expect(updatedNode.properties.price)
            .toBeNull()
    })
})
