import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../src/controllers/node-types/racing-events/marshalling/unmarshalInputData"

test('unmarshalling a complete and valid request', async () => {
    const data: any = {
        name: "GP Monaco 2025",
        round: 8,
        date_from: "2025-05-25",
        date_to: "2025-05-27",
    }

    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            name: "GP Monaco 2025",
            round: 8,
            date_from: "2025-05-25",
            date_to: "2025-05-27",
        })
})
