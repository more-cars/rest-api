import {When, world} from "@cucumber/cucumber"
import axios from "axios"
import {CarModelNode} from "../../../src/models/car-models/types/CarModelNode"

When('the user requests all IMAGEs that are connected to CAR MODEL {string}',
    async (label: string) => {
        const carModel: CarModelNode = world.recallNode(label).data

        const response = await axios
            .get(`${process.env.API_URL}/car-models/${carModel.id}/has-image`)
            .catch(error => {
                console.error(error)
            })

        world.rememberResponse(response)
    })
