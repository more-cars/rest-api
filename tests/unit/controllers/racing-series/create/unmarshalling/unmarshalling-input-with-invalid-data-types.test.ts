import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../src/controllers/node-types/racing-series/marshalling/unmarshalInputData"

test('unmarshalling a request where the data types are incorrect', async () => {
    const data: any = {
        name: true,
        short_name: true,
        founded: true,
        defunct: true,
        organized_by: true,
        vehicle_type: true,
    }

    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            name: true,
            short_name: true,
            founded: true,
            defunct: true,
            organized_by: true,
            vehicle_type: true,
        })
})
