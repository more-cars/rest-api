import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"

test('unmarshalling a valid request where optional fields are missing', async () => {
    const data: unknown = {
        name: "GP Monaco 2025"
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
            round: undefined,
            date_from: undefined,
            date_to: undefined,
        })
})
