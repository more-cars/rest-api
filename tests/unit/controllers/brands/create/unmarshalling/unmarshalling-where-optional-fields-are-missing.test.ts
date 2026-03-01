import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../src/controllers/node-types/brands/marshalling/unmarshalInputData"

test('unmarshalling a valid request where optional fields are missing', async () => {
    const data: any = {
        name: "BMW",
        full_name: "Bayerische Motoren Werke",
    }

    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            name: "BMW",
            full_name: "Bayerische Motoren Werke",
            founded: undefined,
            defunct: undefined,
            wmi: undefined,
            hsn: undefined,
        })
})
