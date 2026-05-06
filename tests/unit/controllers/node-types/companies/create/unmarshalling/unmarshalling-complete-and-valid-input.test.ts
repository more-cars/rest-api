import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"
import type {CreateCompanyRawInput} from "../../../../../../../src/controllers/node-types/companies/types/CreateCompanyRawInput"

test('unmarshalling a complete and valid request', async () => {
    const data: CreateCompanyRawInput = {
        name: "BMW AG",
        founded: 1916,
        defunct: null,
        headquarters_location: "Munich",
        hq_country_code: "DE",
        legal_headquarters_location: "Munich",
        legal_hq_country_code: "DE",
    }

    const result = unmarshalInputData(data, [
        'name',
        'founded',
        'defunct',
        'headquarters_location',
        'hq_country_code',
        'legal_headquarters_location',
        'legal_hq_country_code',
    ])

    expect(result)
        .toStrictEqual({
            name: "BMW AG",
            founded: 1916,
            defunct: null,
            headquarters_location: "Munich",
            hq_country_code: "DE",
            legal_headquarters_location: "Munich",
            legal_hq_country_code: "DE",
        })
})
