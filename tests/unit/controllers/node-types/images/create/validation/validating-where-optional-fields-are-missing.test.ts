import {expect, test} from 'vitest'
import {validateInputData} from "../../../../../../../src/controllers/nodes/validateInputData"
import {NodeType} from "../../../../../../../src/specification/NodeType"

test('validating a valid request where optional fields are missing', async () => {
    const data = {
        image_provider: "wikimedia",
        external_id: "2011-03-04 Autosalon Genf 1391.JPG"
    }

    const result = validateInputData(data, NodeType.Image)

    expect(result)
        .toBeTruthy()
})
