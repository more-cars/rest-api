import {describe, expect, test} from 'vitest'
import {FakeRevision} from "../../../../../_toolbox/fixtures/nodes/FakeRevision"
import {createNeo4jNode} from "../../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"

describe('Creating node', () => {
    test('with valid data', async () => {
        const inputData = FakeRevision.dbInput
        const createdNode = await createNeo4jNode(DbNodeType.Revision, inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })

    test('with valid minimum data', async () => {
        const inputData = FakeRevision.dbInputMinimal
        const createdNode = await createNeo4jNode(DbNodeType.Revision, inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })
})
