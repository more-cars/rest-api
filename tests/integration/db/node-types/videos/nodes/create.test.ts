import {describe, expect, test} from 'vitest'
import {FakeVideo} from "../../../../../_toolbox/fixtures/nodes/FakeVideo"
import {createDbNode} from "../../../../../../src/db/nodes/createDbNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"

describe('Creating node', () => {
    test('with valid data', async () => {
        const inputData = FakeVideo.dbInput()
        const createdNode = await createDbNode(DbNodeType.Video, inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })

    test('with valid minimum data', async () => {
        const inputData = FakeVideo.dbInputMinimal()
        const createdNode = await createDbNode(DbNodeType.Video, inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })
})
