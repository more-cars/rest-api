import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import {FakeRating} from "../../../../../_toolbox/fixtures/nodes/FakeRating"
import {updateDbNode} from "../../../../../../src/db/nodes/updateDbNode"
import type {InputRatingCreate} from "../../../../../../src/db/node-types/ratings/types/InputRatingCreate"
import type {RatingNode} from "../../../../../../src/db/node-types/ratings/types/RatingNode"

describe('Updating RATING', () => {
    test('with valid data', async () => {
        const createdNode = await seedNode(DbNodeType.Rating)
        const inputData = FakeRating.dbInput()
        const updatedNode = await updateDbNode(DbNodeType.Rating, createdNode.properties.id, inputData)

        expect(updatedNode.properties)
            .not.toEqual(expect.objectContaining(createdNode.properties))

        expect(updatedNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })

    test('with the same data', async () => {
        const createdNode = await seedNode(DbNodeType.Rating)
        const inputData = createdNode.properties as unknown as InputRatingCreate
        const updatedNode = await updateDbNode(DbNodeType.Rating, createdNode.properties.id, inputData)

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
        const createdNode = await seedNode(DbNodeType.Rating)
        const inputData = createdNode.properties as unknown as InputRatingCreate
        // @ts-expect-error TS2339 TS2339 TS2339
        inputData.rating_value = null
        const updatedNode = await updateDbNode(DbNodeType.Rating, createdNode.properties.id, inputData) as RatingNode

        expect(updatedNode.properties.rating_value)
            .toBeNull()
    })
})
