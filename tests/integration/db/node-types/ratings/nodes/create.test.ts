import {describe, expect, test} from 'vitest'
import {FakeRating} from "../../../../../_toolbox/fixtures/nodes/FakeRating"
import {createDbNode} from "../../../../../../src/db/nodes/createDbNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"

describe('Creating node', () => {
    test('with valid data', async () => {
        const inputData = FakeRating.dbInput
        const createdNode = await createDbNode(DbNodeType.Rating, inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })

    test('with valid minimum data', async () => {
        const inputData = FakeRating.dbInputMinimal
        const createdNode = await createDbNode(DbNodeType.Rating, inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })
})
