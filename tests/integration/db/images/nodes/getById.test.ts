import {seedImage} from "../../../../_toolbox/dbSeeding/images/nodes/seedImage"
import {getNodeById} from "../../../../../src/db/nodes/images/getNodeById"
import {ImageNode} from "../../../../../src/db/nodes/images/types/ImageNode"
import {ImageSchema} from "../../../../_toolbox/schemas/ImageSchema"
import {validateJson} from "../../../../_toolbox/validateJson"

test('Querying an image that does not exist should return "false"', async () => {
    const expectedNode = false
    const actualNode = await getNodeById(-42)

    expect(actualNode)
        .toBe(expectedNode)
})

test('Querying an existing brand should return a db node with correct schema', async () => {
    const existingNode: ImageNode = await seedImage()
    const requestedNode = await getNodeById(existingNode.id)

    expect(validateJson(requestedNode, ImageSchema))
        .toBe(true)
})
