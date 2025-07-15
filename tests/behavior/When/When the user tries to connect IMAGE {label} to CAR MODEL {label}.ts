import {When} from "@cucumber/cucumber"
import axios from "axios"
import {ImageNode} from "../../../src/models/images/types/ImageNode"
import {CarModelNode} from "../../../src/models/car-models/types/CarModelNode"

When('the user tries to connect IMAGE {string} to CAR MODEL {string}',
    async function (imageLabel: string, carModelLabel: string) {
        const carModel: CarModelNode = this.carmodel[carModelLabel]
        const image: ImageNode = this.image[imageLabel]

        this.latestResponse = await axios
            .post(`${process.env.API_URL}/car-models/${carModel.id}/has-image/${image.id}`, null, {
                validateStatus: function (status) {
                    return status === 404 // treating the 404 as a "good" status code, so axios does not fail the request
                }
            })
            .catch(error => {
                console.error(error)
            })
    })
