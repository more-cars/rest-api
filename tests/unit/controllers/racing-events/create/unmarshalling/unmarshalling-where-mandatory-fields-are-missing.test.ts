import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../src/controllers/node-types/racing-events/marshalling/unmarshalInputData"

test('unmarshalling a request where mandatory fields are missing', async () => {
    const data: any = {
        round: 8,
        date_from: "2025-05-25",
        date_to: "2025-05-27",
    }
    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            name: undefined,
            round: 8,
            date_from: "2025-05-25",
            date_to: "2025-05-27",
        })
})
