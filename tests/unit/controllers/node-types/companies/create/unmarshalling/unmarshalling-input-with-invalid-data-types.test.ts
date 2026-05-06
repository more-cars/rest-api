import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"

test('unmarshalling a request where the data types are incorrect', async () => {
    const data: unknown = {
        name: true,
        founded: true,
        defunct: true,
        headquarters_location: true,
        hq_country_code: true,
        legal_headquarters_location: true,
        legal_hq_country_code: true,
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
            name: true,
            founded: true,
            defunct: true,
            headquarters_location: true,
            hq_country_code: true,
            legal_headquarters_location: true,
            legal_hq_country_code: true,
        })
})
