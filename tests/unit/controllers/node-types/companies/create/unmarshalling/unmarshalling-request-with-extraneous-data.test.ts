import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"

test('unmarshalling a request where extraneous fields are contained', async () => {
    const data: unknown = {
        name: "BMW AG",
        founded: 1916,
        defunct: null,
        headquarters_location: "Munich",
        hq_country_code: "DE",
        legal_headquarters_location: "Munich",
        legal_hq_country_code: "DE",
        my_property: "Hello",
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
