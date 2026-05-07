import {expect, test} from 'vitest'
import {validateInputData} from "../../../../../../../src/controllers/nodes/validateInputData"
import {NodeType} from "../../../../../../../src/specification/NodeType"

test('validating a request where mandatory fields are missing', async () => {
    const data = {
        name: undefined,
        founded: 1916,
        defunct: null,
        headquarters_location: "Munich",
        hq_country_code: "DE",
        legal_headquarters_location: "Munich",
        legal_hq_country_code: "DE",
    }

    const result = validateInputData(data, NodeType.Company)

    expect(result)
        .toBeFalsy()
})
