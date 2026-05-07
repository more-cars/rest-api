import {expect, test} from 'vitest'
import {validateInputData} from "../../../../../../../src/controllers/nodes/validateInputData"
import {NodeType} from "../../../../../../../src/specification/NodeType"

test('validating a valid request where optional fields are missing', async () => {
    const data = {
        name: "BMW AG",
        founded: undefined,
        defunct: undefined,
        headquarters_location: undefined,
        hq_country_code: undefined,
        legal_headquarters_location: undefined,
        legal_hq_country_code: undefined,
    }

    const result = validateInputData(data, NodeType.Company)

    expect(result)
        .toBeTruthy()
})
