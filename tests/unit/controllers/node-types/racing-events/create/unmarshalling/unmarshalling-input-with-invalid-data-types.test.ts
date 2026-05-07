import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"

test('unmarshalling a request where the data types are incorrect', async () => {
    const data: unknown = {
        name: true,
        round: true,
        date_from: true,
        date_to: true,
    }

    const result = unmarshalInputData(data, [
        'name',
        'round',
        'date_from',
        'date_to',
    ])

    expect(result)
        .toStrictEqual({
            name: true,
            round: true,
            date_from: true,
            date_to: true,
        })
})
