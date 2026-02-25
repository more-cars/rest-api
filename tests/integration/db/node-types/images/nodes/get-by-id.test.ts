import {expect, test} from 'vitest'
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import {getNodeById} from "../../../../../../src/db/node-types/images/getNodeById"
import {ImageSchema} from "../../../../../_toolbox/schemas/db/ImageSchema"
import {validateJson} from "../../../../../_toolbox/validateJson"

test('Querying an IMAGE that does not exist should return "false"', async () => {
    const expectedNode = false
    const actualNode = await getNodeById(-42)

    expect(actualNode)
        .toBe(expectedNode)
})

test('Querying an existing IMAGE should return a db node with correct schema', async () => {
    const existingNode = await seedNode(DbNodeType.Image)
    const requestedNode = await getNodeById(existingNode.properties.id)

    expect(validateJson(requestedNode, ImageSchema))
        .toBeTruthy()
})
