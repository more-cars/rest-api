import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../src/controllers/node-types/racing-series/marshalling/unmarshalInputData"

/**
 * Missing optional fields are automatically added as "undefined".
 */
test('unmarshalling a valid request where optional fields are missing', async () => {
    const data: any = {
        name: "Formula 1"
    }

    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            name: "Formula 1",
            short_name: undefined,
            founded: undefined,
            defunct: undefined,
            organized_by: undefined,
            vehicle_type: undefined,
        })
})
