import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../src/controllers/node-types/race-tracks/marshalling/unmarshalInputData"

test('unmarshalling a request where the data types are incorrect', async () => {
    const data: any = {
        name: true,
        opened: true,
        closed: true,
        type: true,
        location: true,
        geo_position: true,
    }

    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            name: true,
            opened: true,
            closed: true,
            type: true,
            location: true,
            geo_position: true,
        })
})
