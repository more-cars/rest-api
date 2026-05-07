import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"
import type {CreateRacingEventRawInput} from "../../../../../../../src/controllers/node-types/racing-events/types/CreateRacingEventRawInput"

test('unmarshalling a complete and valid request', async () => {
    const data: CreateRacingEventRawInput = {
        name: "GP Monaco 2025",
        round: 8,
        date_from: "2025-05-25",
        date_to: "2025-05-27",
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
