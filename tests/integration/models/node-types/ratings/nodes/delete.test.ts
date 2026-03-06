import {describe, expect, test} from 'vitest'
import {Rating} from "../../../../../../src/models/node-types/ratings/Rating"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"

describe('Deleting a RATING', () => {
    test('that does not exist', async () => {
        await expect(Rating.delete(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('that exists', async () => {
        const node = await seedNode(DbNodeType.Rating)
        await expect(Rating.delete(node.properties.id))
            .resolves
            .not.toThrow(NodeNotFoundError)
    })
})
