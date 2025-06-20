import {sanitize} from "../../../../../../src/controllers/carModels/create"
import {CreateCarModelRawInput} from "../../../../../../src/controllers/carModels/types/CreateCarModelRawInput"

test.skip('leading and trailing whitespaces are removed', async () => {
    const data: CreateCarModelRawInput = {
        name: "    360 Modena    ",
        built_from: 1999,
        built_to: 2005,
        generation: null,
        internal_code: "F131   ",
        total_production: 16365,
    }

    const result = sanitize(data)

    expect(result)
        .toStrictEqual({
            name: "360 Modena",
            built_from: 1999,
            built_to: 2005,
            generation: null,
            internal_code: "F131",
            total_production: 16365,
        })
})
