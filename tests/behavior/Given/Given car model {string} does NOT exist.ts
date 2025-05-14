import {Given} from "@cucumber/cucumber"
import {CarModelNode} from "../../../src/types/CarModelNode"

Given('car model {string} does NOT exist', async function (label: string) {
    const carModel: CarModelNode = {
        id: -42,
        name: "Non-existing Car Model",
    }

    this.carModel[label] = carModel
})
