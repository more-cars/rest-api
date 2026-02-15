import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../src/controllers/race-tracks/marshalling/unmarshalInputData"

test('unmarshalling a complete and valid request', async () => {
    const data: any = {
        name: "Lausitzring",
        opened: 2000,
        closed: null,
        type: "permanent race track",
        location: "Klettwitz",
        geo_position: "51°32'0\"N 13°55'10\"E",
    }

    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            name: "Lausitzring",
            opened: 2000,
            closed: null,
            type: "permanent race track",
            location: "Klettwitz",
            geo_position: "51°32'0\"N 13°55'10\"E",
        })
})
