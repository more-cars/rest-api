import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../src/controllers/node-types/brands/marshalling/unmarshalInputData"

test('unmarshalling a request where extraneous fields are contained', async () => {
    const data: any = {
        name: "BMW",
        id: 42,
        my_property: "Hello",
    }

    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            name: "BMW",
            full_name: undefined,
            founded: undefined,
            defunct: undefined,
            wmi: undefined,
            hsn: undefined
        })
})
