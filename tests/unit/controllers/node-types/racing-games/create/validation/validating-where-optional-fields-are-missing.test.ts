import {expect, test} from 'vitest'
import {validateInputData} from "../../../../../../../src/controllers/nodes/validateInputData"
import {NodeType} from "../../../../../../../src/specification/NodeType"

test('validating a valid request where optional fields are missing', async () => {
    const data = {
        name: "Forza Motorsport 7",
        release_year: undefined,
        developer: undefined,
        publisher: undefined,
    }

    const result = validateInputData(data, NodeType.RacingGame)

    expect(result)
        .toBeTruthy()
})
