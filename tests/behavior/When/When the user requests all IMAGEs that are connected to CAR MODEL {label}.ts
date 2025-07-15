import {When} from "@cucumber/cucumber"
import axios from "axios"
import {CarModelNode} from "../../../src/models/car-models/types/CarModelNode"

When('the user requests all IMAGEs that are connected to CAR MODEL {string}',
    async function (label: string) {
        const carModel: CarModelNode = this.carmodel[label]

        this.latestResponse = await axios
            .get(`${process.env.API_URL}/car-models/${carModel.id}/has-image`)
            .catch(error => {
                console.error(error)
            })
    })
