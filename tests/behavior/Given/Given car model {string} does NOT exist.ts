import {Given} from "@cucumber/cucumber"
import {CarModelNode} from "../../../src/types/car-models/CarModelNode"

Given('car model {string} does NOT exist', async function (label: string) {
    const carModel: CarModelNode = {
        id: -42,
        name: "Non-existing Car Model",
        created_at: "",
        updated_at: "",
    }

    this.carmodel[label] = carModel
})
