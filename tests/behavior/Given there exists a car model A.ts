import {Given} from "@cucumber/cucumber"
import {createCarModelNode} from "../../src/db/createCarModelNode"
import {faker} from "@faker-js/faker"

Given('there exists a car model A', async function () {
    this.carModelA = await seedCarModel()
})
