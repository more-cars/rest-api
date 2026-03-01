import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../src/controllers/node-types/race-tracks/marshalling/unmarshalInputData"

test('unmarshalling a valid request where optional fields are missing', async () => {
    const data: any = {
        name: "Lausitzring"
    }

    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            name: "Lausitzring",
            opened: undefined,
            closed: undefined,
            type: undefined,
            location: undefined,
            geo_position: undefined,
        })
})
