import {When, world} from "@cucumber/cucumber"
import axios from "axios"
import {BrandNode} from "../../../src/models/brands/types/BrandNode"
import {CarModelNode} from "../../../src/models/car-models/types/CarModelNode"

When('the user tries to connect CAR MODEL {string} to BRAND {string} with the relationship name {string}',
    async (carModelLabel: string, brandLabel: string, relationshipName: string) => {
        const brand: BrandNode = world.recallNode(brandLabel)
        const carModel: CarModelNode = world.recallNode(carModelLabel)

        const response = await axios
            .post(`${process.env.API_URL}/brands/${brand.id}/${relationshipName}/${carModel.id}`, null, {
                validateStatus: function (status) {
                    return status === 404 // treating the 404 as a "good" status code, so axios does not fail the request
                }
            })
            .catch(error => {
                console.error(error)
            })

        world.rememberResponse(response)
    })
