import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../src/controllers/racing-events/marshalling/unmarshalInputData"

/**
 * Missing optional fields are automatically added as "undefined".
 */
test('unmarshalling a valid request where optional fields are missing', async () => {
    const data: any = {
  name: "GP Monaco 2025"
}

    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            name: "GP Monaco 2025",
            round: undefined,
            date_from: undefined,
            date_to: undefined,
        })
})
