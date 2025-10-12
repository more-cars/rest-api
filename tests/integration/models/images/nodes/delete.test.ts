import {describe, expect, test} from 'vitest'
import {Image} from "../../../../../src/models/images/Image"
import {seedImage} from "../../../../_toolbox/dbSeeding/images/nodes/seedImage"
import {NodeNotFoundError} from "../../../../../src/models/types/NodeNotFoundError"

describe('Deleting an IMAGE', () => {
    test('that does not exist', async () => {
        await expect(Image.delete(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('that exists', async () => {
        const node = await seedImage()
        await expect(Image.delete(node.id))
            .resolves
            .not.toThrow(NodeNotFoundError)
    })
})
