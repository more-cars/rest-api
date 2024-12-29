import {Given} from "@cucumber/cucumber"
import {createCarModelNode} from "../../src/db/createCarModelNode"
import {faker} from "@faker-js/faker"

Given('there exists a car model A', async function () {
    const carModelData = {
        name: faker.vehicle.model(),
        mc_id: faker.number.int({max: 10000}),
    }
    this.carModelA = await createCarModelNode(carModelData)
})
