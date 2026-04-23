import {describe, expect, test} from 'vitest'
import {FakeProgramme} from "../../../../../_toolbox/fixtures/nodes/FakeProgramme"
import {createNeo4jNode} from "../../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"

describe('Creating node', () => {
    test('with valid data', async () => {
        const inputData = FakeProgramme.dbInput
        const createdNode = await createNeo4jNode(DbNodeType.Programme, inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })

    test('with valid minimum data', async () => {
        const inputData = FakeProgramme.dbInputMinimal
        const createdNode = await createNeo4jNode(DbNodeType.Programme, inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })
})
