import {When} from "@cucumber/cucumber"
import axios from "axios"
import {faker} from "@faker-js/faker"

When('the user creates a car model', async function () {
    const carModelData = {
        name: faker.vehicle.model(),
        built_from: faker.number.int({min: 1000, max: 3000}),
        built_to: faker.number.int({min: 1000, max: 3000}),
        generation: faker.number.int({min: 1, max: 10}),
        internal_code: faker.commerce.isbn(),
        total_production: faker.number.int({min: 100, max: 10000000}),
    }

    this.latestResponse = await axios
        .post(`${process.env.API_URL}/car-models`, carModelData)
        .catch(error => {
            console.error(error.toJSON())
        })
})
