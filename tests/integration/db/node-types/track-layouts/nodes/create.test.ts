import {describe, expect, test} from 'vitest'
import {FakeTrackLayout} from "../../../../../_toolbox/fixtures/nodes/FakeTrackLayout"
import {createNeo4jNode} from "../../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"

describe('Creating node', () => {
    test('with valid data', async () => {
        const inputData = FakeTrackLayout.dbInput
        const createdNode = await createNeo4jNode(DbNodeType.TrackLayout, inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })

    test('with valid minimum data', async () => {
        const inputData = FakeTrackLayout.dbInputMinimal
        const createdNode = await createNeo4jNode(DbNodeType.TrackLayout, inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })
})
