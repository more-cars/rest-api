import {describe, expect, test} from 'vitest'
import {Rating} from "../../../../../../../src/models/node-types/ratings/Rating"
import {FakeRating} from "../../../../../../_toolbox/fixtures/nodes/FakeRating"
import type {RatingInput} from "../../../../../../../src/models/node-types/ratings/types/RatingInput"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

describe('Updating a RATING', () => {
    test('Node does not exist', async () => {
        await expect(Rating.update(-42, FakeRating.dbInput() as RatingInput))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('Node exists', async () => {
        const createdNode = await seedNode(DbNodeType.Rating)
        const inputData = FakeRating.dbInput()
        const updatedNode = await Rating.update(createdNode.properties.id, inputData as RatingInput)

        expect(updatedNode.attributes)
            .toEqual(expect.objectContaining(inputData))
    })

    test('Trying to override read-only properties', async () => {
        const createdNode = await seedNode(DbNodeType.Rating)
        const validData = FakeRating.dbInput()
        const readOnlyData = {
            id: 9999,
            created_at: "NOT_ALLOWED_TO_OVERWRITE",
            updated_at: "NOT_ALLOWED_TO_OVERWRITE",
        }
        const inputData = Object.assign({}, validData, readOnlyData)

        const updatedNode = await Rating.update(createdNode.properties.id, inputData as RatingInput)

        expect(updatedNode.attributes)
            .not.toEqual(expect.objectContaining(readOnlyData))
    })
})
