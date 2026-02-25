import {describe, expect, test} from 'vitest'
import {Image} from "../../../../../../src/models/node-types/images/Image"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"

describe('Fetching a IMAGE', () => {
    test('which does not exist', async () => {
        await expect(Image.findById(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('which exists', async () => {
        const expectedNode = await seedNode(DbNodeType.Image)
        const actualNode = await Image.findById(expectedNode.properties.id)

        expect(actualNode.attributes)
            .toEqual(expectedNode.properties)
    })
})

