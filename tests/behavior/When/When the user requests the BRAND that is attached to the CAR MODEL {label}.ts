import {When} from "@cucumber/cucumber"
import axios from "axios"
import {CarModelNode} from "../../../src/types/car-models/CarModelNode"

When('the user requests the BRAND that is attached to the CAR MODEL {string}',
    async function (label: string) {
        const carModel: CarModelNode = this.carmodel[label]

        this.latestResponse = await axios
            .get(`${process.env.API_URL}/car-models/${carModel.id}/belongs-to-brand`)
            .catch(error => {
                console.error(error)
            })
    })
