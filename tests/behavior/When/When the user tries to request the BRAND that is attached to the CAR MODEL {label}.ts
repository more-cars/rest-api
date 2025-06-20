import {When} from "@cucumber/cucumber"
import axios from "axios"
import {CarModelNode} from "../../../src/models/car-models/types/CarModelNode"

When('the user tries to request the BRAND that is attached to the CAR MODEL {string}',
    async function (label: string) {
        const carModel: CarModelNode = this.carmodel[label]

        this.latestResponse = await axios
            .get(`${process.env.API_URL}/car-models/${carModel.id}/belongs-to-brand`, {
                validateStatus: function (status) {
                    return status === 404 // treating 404 as a "good" status code, so axios does not fail the request
                }
            })
            .catch(error => {
                console.error(error)
            })
    })
