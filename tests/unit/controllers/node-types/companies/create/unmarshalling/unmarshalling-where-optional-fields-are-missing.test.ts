import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"

test('unmarshalling a valid request where optional fields are missing', async () => {
    const data: unknown = {
        name: "BMW AG"
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
            founded: undefined,
            defunct: undefined,
            headquarters_location: undefined,
            hq_country_code: undefined,
            legal_headquarters_location: undefined,
            legal_hq_country_code: undefined,
        })
})
