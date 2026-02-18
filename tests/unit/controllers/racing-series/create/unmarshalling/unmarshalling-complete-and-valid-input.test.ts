import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../src/controllers/node-types/racing-series/marshalling/unmarshalInputData"

test('unmarshalling a complete and valid request', async () => {
    const data: any = {
        name: "Formula 1",
        short_name: "F1",
        founded: 1950,
        defunct: null,
        organized_by: "FIA",
        vehicle_type: "formula racing cars",
    }

    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            name: "Formula 1",
            short_name: "F1",
            founded: 1950,
            defunct: null,
            organized_by: "FIA",
            vehicle_type: "formula racing cars",
        })
})
