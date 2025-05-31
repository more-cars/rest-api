import Ajv from "ajv"
import {seedImage} from "../../../../dbSeeding/images/nodes/seedImage"
import {getNodeById} from "../../../../../src/db/images/getNodeById"
import {ImageNode} from "../../../../../src/types/images/ImageNode"
import {ImageSchema} from "../../../../_schemas/ImageSchema"

describe('Image', () => {
    test('Querying an image that does not exist should return "false"', async () => {
        const expectedNode = false
        const actualNode = await getNodeById(-42)

        expect(actualNode)
            .toBe(expectedNode)
    })

    test('Querying an existing brand should return a db node with correct schema', async () => {
        // ARRANGE
        const existingNode: ImageNode = await seedImage()

        // ACT
        const requestedNode = await getNodeById(existingNode.id as number)

        // ASSERT
        const validate = new Ajv().compile(ImageSchema)
        const valid = validate(requestedNode)
        if (!valid) {
            console.log(validate.errors)
        }

        expect(valid).toBe(true)
    })
})
