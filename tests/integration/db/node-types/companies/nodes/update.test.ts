import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import {FakeCompany} from "../../../../../_toolbox/fixtures/nodes/FakeCompany"
import {updateDbNode} from "../../../../../../src/db/nodes/updateDbNode"
import type {CompanyNode} from "../../../../../../src/db/node-types/companies/types/CompanyNode"
import type {DbInputData} from "../../../../../../src/db/types/DbInputData"

describe('Updating COMPANY', () => {
    test('with valid data', async () => {
        const createdNode = await seedNode(DbNodeType.Company)
        const inputData = FakeCompany.dbInput()
        const updatedNode = await updateDbNode(DbNodeType.Company, createdNode.properties.id, inputData)

        expect(updatedNode.properties)
            .not.toEqual(expect.objectContaining(createdNode.properties))

        expect(updatedNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })

    test('with the same data', async () => {
        const createdNode = await seedNode(DbNodeType.Company)
        const inputData = createdNode.properties as DbInputData
        const updatedNode = await updateDbNode(DbNodeType.Company, createdNode.properties.id, inputData)

        expect(updatedNode.properties.updated_at)
            .not.toEqual(createdNode.properties.updated_at)

        createdNode.properties.updated_at = ''
        updatedNode.properties.updated_at = ''

        expect(updatedNode.properties)
            .toEqual(expect.objectContaining(createdNode.properties))

        expect(updatedNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })

    test('removing a field', async () => {
        const createdNode = await seedNode(DbNodeType.Company)
        const inputData = createdNode.properties as DbInputData
        inputData.name = null

        const updatedNode = await updateDbNode(DbNodeType.Company, createdNode.properties.id, inputData) as CompanyNode

        expect(updatedNode.properties.name)
            .toBeNull()
    })
})
