import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/node-types/race-tracks/marshalling/unmarshalInputData"

test('unmarshalling a request where mandatory fields are missing', async () => {
    const data: any = {
        name: undefined,
        opened: 2000,
        closed: null,
        type: "permanent race track",
        location: "Klettwitz",
        geo_position: "51°32'0\"N 13°55'10\"E",
    }
    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            name: undefined,
            opened: 2000,
            closed: null,
            type: "permanent race track",
            location: "Klettwitz",
            geo_position: "51°32'0\"N 13°55'10\"E",
        })
})
