import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"

test('unmarshalling a complete and valid request', async () => {
    const data = {
        name: "Lausitzring",
        opened: 2000,
        closed: null,
        type: "permanent-race-track",
        location: "Klettwitz",
        geo_position: "51°32′0″N 13°55′10″E",
        country_code: "DE",
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
            opened: 2000,
            closed: null,
            type: "permanent-race-track",
            location: "Klettwitz",
            geo_position: "51°32′0″N 13°55′10″E",
            country_code: "DE",
        })
})
