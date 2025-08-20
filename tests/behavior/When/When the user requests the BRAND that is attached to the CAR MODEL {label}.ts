import {When, world} from "@cucumber/cucumber"
import axios from "axios"
import {CarModelNode} from "../../../src/models/car-models/types/CarModelNode"

When('the user requests the BRAND that is attached to the CAR MODEL {string}',
    async (label: string) => {
        const carModel: CarModelNode = world.recallNode(label)

        const response = await axios
            .get(`${process.env.API_URL}/car-models/${carModel.id}/belongs-to-brand`)
            .catch(error => {
                console.error(error)
            })

        world.rememberResponse(response)
    })
