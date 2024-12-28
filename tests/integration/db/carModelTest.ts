import {getCarModelById} from "../../../src/db/getCarModelById"

describe('Car Model', () => {
    test('Querying a car model that does not exist should return "false"', async () => {
        const expectedCarModel = false
        const actualCarModel = await getCarModelById(-42)

        expect(actualCarModel)
            .toBe(expectedCarModel)
    })
})
