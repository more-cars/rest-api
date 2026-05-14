import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import {FakeBrand} from "../../../../../_toolbox/fixtures/nodes/FakeBrand"
import {updateDbNode} from "../../../../../../src/db/nodes/updateDbNode"
import type {InputBrandCreate} from "../../../../../../src/db/node-types/brands/types/InputBrandCreate"
import type {BrandNode} from "../../../../../../src/db/node-types/brands/types/BrandNode"

describe('Updating BRAND', () => {
    test('with valid data', async () => {
        const createdNode = await seedNode(DbNodeType.Brand)
        const inputData = FakeBrand.dbInput()
        const updatedNode = await updateDbNode(DbNodeType.Brand, createdNode.properties.id, inputData)

        expect(updatedNode.properties)
            .not.toEqual(expect.objectContaining(createdNode.properties))

        expect(updatedNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })

    test('with the same data', async () => {
        const createdNode = await seedNode(DbNodeType.Brand)
        const inputData = createdNode.properties as unknown as InputBrandCreate
        const updatedNode = await updateDbNode(DbNodeType.Brand, createdNode.properties.id, inputData)

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
        const createdNode = await seedNode(DbNodeType.Brand)
        const inputData = createdNode.properties as unknown as InputBrandCreate
        // @ts-expect-error TS2339 TS2339 TS2339
        inputData.name = null
        const updatedNode = await updateDbNode(DbNodeType.Brand, createdNode.properties.id, inputData) as BrandNode

        expect(updatedNode.properties.name)
            .toBeNull()
    })
})
