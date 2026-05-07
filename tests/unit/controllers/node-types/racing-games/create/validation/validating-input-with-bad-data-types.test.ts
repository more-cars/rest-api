import {expect, test} from 'vitest'
import {validateInputData} from "../../../../../../../src/controllers/nodes/validateInputData"
import {NodeType} from "../../../../../../../src/specification/NodeType"

test.each([
    [true, 2017, "Turn 10 Studios", "Microsoft Studios"],
    ["Forza Motorsport 7", false, "Turn 10 Studios", "Microsoft Studios"],
    ["Forza Motorsport 7", 2017, false, "Microsoft Studios"],
    ["Forza Motorsport 7", 2017, "Turn 10 Studios", false],
])('validating a request where the fields have invalid data types', async (
    name, release_year, developer, publisher
) => {
    const data = {
        name,
        release_year,
        developer,
        publisher,
    }

    const result = validateInputData(data, NodeType.RacingGame)

    expect(result)
        .toBeFalsy()
})
