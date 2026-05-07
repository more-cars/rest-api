import {expect, test} from 'vitest'
import {validateInputData} from "../../../../../../../src/controllers/nodes/validateInputData"
import {NodeType} from "../../../../../../../src/specification/NodeType"

test.each([
    [true, "Bayerische Motoren Werke", 1916, 2345, "WBA", "0005", "DE"],
    ["BMW", false, 1916, 2345, "WBA", "0005", "DE"],
    ["BMW", "Bayerische Motoren Werke", false, 2345, "WBA", "0005", "DE"],
    ["BMW", "Bayerische Motoren Werke", 1916, false, "WBA", "0005", "DE"],
    ["BMW", "Bayerische Motoren Werke", 1916, 2345, false, "0005", "DE"],
    ["BMW", "Bayerische Motoren Werke", 1916, 2345, "WBA", false, "DE"],
    ["BMW", "Bayerische Motoren Werke", 1916, 2345, "WBA", "0005", false],
])('validating a request where the fields have invalid data types', async (
    name, full_name, founded, defunct, wmi, hsn, country_code
) => {
    const data = {
        name,
        full_name,
        founded,
        defunct,
        wmi,
        hsn,
        country_code,
    }

    const result = validateInputData(data, NodeType.Brand)

    expect(result)
        .toBeFalsy()
})
