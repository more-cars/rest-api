import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"

test('unmarshalling a valid request where optional fields are missing', async () => {
    const data: unknown = {
        name: "Lausitzring"
    }

    const result = unmarshalInputData(data, [
        'name',
        'opened',
        'closed',
        'type',
        'location',
        'geo_position',
        'country_code',
    ])

    expect(result)
        .toStrictEqual({
            name: "Lausitzring",
            opened: undefined,
            closed: undefined,
            type: undefined,
            location: undefined,
            geo_position: undefined,
            country_code: undefined,
        })
})
