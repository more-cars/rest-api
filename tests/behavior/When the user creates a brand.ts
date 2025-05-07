import {When} from "@cucumber/cucumber"
import axios from "axios"
import {faker} from "@faker-js/faker"

When('the user creates a brand', async function () {
    const data = {
        name: faker.vehicle.model(),
        full_name: faker.vehicle.model(),
        founded: faker.number.int({min: 1000, max: 3000}),
        defunct: faker.number.int({min: 1000, max: 3000}),
        wmi: faker.vehicle.vrm(),
        hsn: faker.vehicle.vrm(),
    }

    this.latestResponse = await axios
        .post(`${process.env.API_URL}/brands`, data)
        .catch(error => {
            console.error(error.toJSON())
        })
})
