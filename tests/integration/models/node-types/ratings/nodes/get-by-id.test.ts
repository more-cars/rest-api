import {describe, expect, test} from 'vitest'
import {Rating} from "../../../../../../src/models/node-types/ratings/Rating"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"

describe('Fetching a RATING', () => {
    test('which does not exist', async () => {
        await expect(Rating.findById(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('which exists', async () => {
        const expectedRating = await seedNode(DbNodeType.Rating)
        const actualRating = await Rating.findById(expectedRating.properties.id)

        expect(actualRating.attributes)
            .toEqual(expectedRating.properties)
    })
})
