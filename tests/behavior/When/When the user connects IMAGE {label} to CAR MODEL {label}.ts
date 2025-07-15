import {When} from "@cucumber/cucumber"
import axios from "axios"
import {ImageNode} from "../../../src/models/images/types/ImageNode.ts"
import {CarModelNode} from "../../../src/models/car-models/types/CarModelNode.ts"

When('the user connects IMAGE {string} to CAR MODEL {string}',
    async function (imageLabel: string, carModelLabel: string) {
        const carModel: CarModelNode = this.carmodel[carModelLabel]
        const image: ImageNode = this.image[imageLabel]

        this.latestResponse = await axios
            .post(`${process.env.API_URL}/car-models/${carModel.id}/has-image/${image.id}`)
            .catch(error => {
                console.error(error)
            })
    })
