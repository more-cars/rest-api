import {When, world} from "@cucumber/cucumber"
import axios from "axios"
import type {CarModelNode} from "../../../src/models/car-models/types/CarModelNode"
import type {ImageNode} from "../../../src/models/images/types/ImageNode"

When('the user requests the relationship between CAR MODEL {string} and IMAGE {string}',
    async (carModelLabel: string, imageLabel: string) => {
        const carModel: CarModelNode = world.recallNode(carModelLabel)
        const image: ImageNode = world.recallNode(imageLabel)

        const response = await axios
            .get(`${process.env.API_URL}/car-models/${carModel.id}/has-image/${image.id}`)
            .catch(error => {
                console.error(error)
            })

        world.rememberResponse(response)
    })
