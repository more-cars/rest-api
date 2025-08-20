import {When, world} from "@cucumber/cucumber"
import axios from "axios"
import {BrandNode} from "../../../src/models/brands/types/BrandNode"

When('the user tries to request a list of all CAR MODEL relationships for the BRAND {string}',
    async (label: string) => {
        const brandNode: BrandNode = world.recallNode(label)

        const response = await axios
            .get(`${process.env.API_URL}/brands/${brandNode.id}/has-car-model`, {
                validateStatus: function (status) {
                    return status === 404 // treating 404 as a "good" status code, so axios does not fail the request
                }
            })
            .catch(error => {
                console.error(error)
            })

        world.rememberResponse(response)
    })
