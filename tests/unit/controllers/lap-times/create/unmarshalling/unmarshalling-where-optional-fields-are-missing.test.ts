import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../src/controllers/node-types/lap-times/marshalling/unmarshalInputData"

test('unmarshalling a valid request where optional fields are missing', async () => {
    const data: any = {
        time: "PT1M33.294S",
        driver_name: "Klaus Ludwig",
    }

    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            time: "PT1M33.294S",
            driver_name: "Klaus Ludwig",
            date: undefined,
        })
})
