import {When} from "@cucumber/cucumber"
import axios from "axios"
import {CarModelNode} from "../../src/types/CarModelNode"

When('the user requests the car model A via ID', async function () {
    const carModelA: CarModelNode = this.carModelA
    const id = carModelA.id

    this.latestResponse = await axios
        .get(`${process.env.API_URL}/car-models/${id}`)
})
