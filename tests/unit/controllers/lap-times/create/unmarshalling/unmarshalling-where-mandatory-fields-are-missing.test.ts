import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../src/controllers/node-types/lap-times/marshalling/unmarshalInputData"

test('unmarshalling a request where mandatory fields are missing', async () => {
    const data: any = {
        date: "1996-08-03",
    }
    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            time: undefined,
            driver_name: undefined,
            date: "1996-08-03",
        })
})
