import {When, world} from "@cucumber/cucumber"
import axios from "axios"
import {ImageNode} from "../../../src/models/images/types/ImageNode"
import {CarModelNode} from "../../../src/models/car-models/types/CarModelNode"

When('the user connects IMAGE {string} to CAR MODEL {string}',
    async (imageLabel: string, carModelLabel: string) => {
        const carModel: CarModelNode = world.recallNode(carModelLabel)
        const image: ImageNode = world.recallNode(imageLabel)

        const response = await axios
            .post(`${process.env.API_URL}/car-models/${carModel.id}/has-image/${image.id}`)
            .catch(error => {
                console.error(error)
            })

        world.rememberResponse(response)
    })
