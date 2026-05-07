import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"

test('unmarshalling a request where extraneous fields are contained', async () => {
    const data: unknown = {
        name: "GP Monaco 2025",
        round: 8,
        date_from: "2025-05-25",
        date_to: "2025-05-27",
        my_property: "Hello",
    }

    const result = unmarshalInputData(data, [
        'name',
        'round',
        'date_from',
        'date_to',
    ])

    expect(result)
        .toStrictEqual({
            name: "GP Monaco 2025",
            round: 8,
            date_from: "2025-05-25",
            date_to: "2025-05-27",
        })
})
