import {describe, expect, test} from 'vitest'
import {FakeVideo} from "../../../../../_toolbox/fixtures/nodes/FakeVideo"
import {createNeo4jNode} from "../../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"

describe('Creating node', () => {
    test('with valid data', async () => {
        const inputData = FakeVideo.dbInput
        const createdNode = await createNeo4jNode(DbNodeType.Video, inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })

    test('with valid minimum data', async () => {
        const inputData = FakeVideo.dbInputMinimal
        const createdNode = await createNeo4jNode(DbNodeType.Video, inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })
})
