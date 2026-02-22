import {expect, test} from 'vitest'
import {Image} from "../../../../../src/models/node-types/images/Image"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"

test('Fetching an image that does not exist should return "false"', async () => {
    const expectedNode = false
    const actualNode = await Image.findById(-42)

    expect(actualNode)
        .toEqual(expectedNode)
})

test('When the image exists it should be returned', async () => {
    const expectedNode = await seedNode(DbNodeType.Image)
    const actualNode = await Image.findById(expectedNode.properties.id)

    expect(actualNode.attributes)
        .toEqual(expectedNode.properties)
})

