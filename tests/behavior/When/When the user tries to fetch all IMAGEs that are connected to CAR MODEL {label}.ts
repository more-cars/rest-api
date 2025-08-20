import {When, world} from "@cucumber/cucumber"
import axios from "axios"
import {CarModelNode} from "../../../src/models/car-models/types/CarModelNode"

When('the user tries to fetch all IMAGEs that are connected to CAR MODEL {string}',
    async (label: string) => {
        const carModel: CarModelNode = world.recallNode(label)

        const response = await axios
            .get(`${process.env.API_URL}/car-models/${carModel.id}/has-image`, {
                validateStatus: function (status) {
                    return status === 404 // treating 404 as a "good" status code, so axios does not fail the request
                }
            })
            .catch(error => {
                console.error(error)
            })

        world.rememberResponse(response)
    })
