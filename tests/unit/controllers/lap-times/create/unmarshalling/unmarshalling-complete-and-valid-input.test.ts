import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../src/controllers/node-types/lap-times/marshalling/unmarshalInputData"

test('unmarshalling a complete and valid request', async () => {
    const data: any = {
        time: "PT1M33.294S",
        driver_name: "Klaus Ludwig",
        date: "1996-08-03",
    }

    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            time: "PT1M33.294S",
            driver_name: "Klaus Ludwig",
            date: "1996-08-03",
        })
})
