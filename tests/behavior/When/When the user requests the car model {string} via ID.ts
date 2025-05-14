import {When} from "@cucumber/cucumber"
import axios from "axios"
import {CarModelNode} from "../../../src/types/CarModelNode"

When('the user requests the car model {string} via ID', async function (label: string) {
    const carModel: CarModelNode = this.carModel[label]

    this.latestResponse = await axios
        .get(`${process.env.API_URL}/car-models/${carModel.id}`)
})
