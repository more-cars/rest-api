import {getCarModelNodeById} from "../../../src/db/getCarModelNodeById"

describe('Car Model', () => {
    test('Querying a car model that does not exist should return "false"', async () => {
        const expectedCarModelNode = false
        const actualCarModelNode = await getCarModelNodeById(-42)

        expect(actualCarModel)
            .toBe(expectedCarModel)
    })
})
