import {When} from "@cucumber/cucumber"
import axios from "axios"
import {CarModelType} from "../../src/types/CarModelType"

When('the user requests the car model A via ID', async function () {
    const carModelA: CarModelType = this.carModelA
    this.latestResponse = await axios
        .get(`http://localhost:3000/car-models/${carModelA.id}`)
})
