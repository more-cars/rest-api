import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../src/controllers/racing-events/marshalling/unmarshalInputData"

/**
 * Requests are NOT rejected when they contain too much information.
 * The extraneous fields are simply ignored.
 */
test('unmarshalling a request where extraneous fields are contained', async () => {
    const data: any = {
        name: "GP Monaco 2025",
        round: 8,
        date_from: "2025-05-25",
        date_to: "2025-05-27",
        my_property: "Hello",
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
