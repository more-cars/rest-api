import {When} from "@cucumber/cucumber"
import axios from "axios"
import type {CarModelNode} from "../../../src/models/car-models/types/CarModelNode"
import type {ImageNode} from "../../../src/models/images/types/ImageNode"

When('the user tries to request the relationship between CAR MODEL {string} and IMAGE {string}',
    async function (carModelLabel: string, imageLabel: string) {
        const carModel: CarModelNode = this.carmodel[carModelLabel]
        const image: ImageNode = this.image[imageLabel]

        this.latestResponse = await axios
            .get(`${process.env.API_URL}/car-models/${carModel.id}/has-image/${image.id}`, {
                validateStatus: function (status) {
                    return status === 404 // treating 404 as a "good" status code, so axios does not fail the request
                }
            })
            .catch(error => {
                console.error(error)
            })
    })
