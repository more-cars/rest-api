import {When, world} from "@cucumber/cucumber"
import axios from "axios"
import {CarModelNode} from "../../../src/models/car-models/types/CarModelNode"

When('the user requests the CAR MODEL {string} via ID',
    async (label: string) => {
        const carModel: CarModelNode = world.recallNode(label).data

        const response = await axios
            .get(`${process.env.API_URL}/car-models/${carModel.id}`)

        world.rememberResponse(response)
    })
