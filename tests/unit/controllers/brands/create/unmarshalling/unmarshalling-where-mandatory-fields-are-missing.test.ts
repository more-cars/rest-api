import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../src/controllers/node-types/brands/marshalling/unmarshalInputData"

test('unmarshalling a request where mandatory fields are missing', async () => {
    const data: any = {
        full_name: "Bayerische Motoren Werke",
        founded: 1916,
        defunct: 2222,
        wmi: "WBA",
        hsn: "0005",
    }

    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            name: undefined,
            full_name: "Bayerische Motoren Werke",
            founded: 1916,
            defunct: 2222,
            wmi: "WBA",
            hsn: "0005",
        })
})
