import {expect, test} from 'vitest'
import {Image} from "../../../../../../../src/models/images/Image"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('IMAGE does not exist', async () => {
    await expect(Image.getAllBelongsToNodeRelationships(-42))
        .rejects
        .toThrow(NodeNotFoundError)
})
