import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../src/controllers/node-types/racing-series/marshalling/unmarshalInputData"

test('unmarshalling a request where mandatory fields are missing', async () => {
    const data: any = {
        short_name: "F1",
        founded: 1950,
        defunct: null,
        organized_by: "FIA",
        vehicle_type: "formula racing cars",
    }
    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            name: undefined,
            short_name: "F1",
            founded: 1950,
            defunct: null,
            organized_by: "FIA",
            vehicle_type: "formula racing cars",
        })
})
