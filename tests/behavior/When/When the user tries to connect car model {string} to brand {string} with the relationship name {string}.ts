import {When} from "@cucumber/cucumber"
import axios from "axios"
import {BrandNode} from "../../../src/types/BrandNode"
import {CarModelNode} from "../../../src/types/CarModelNode"

When('the user tries to connect car model {string} to brand {string} with the relationship name {string}',
    async function (carModelLabel: string, brandLabel: string, relationshipName: string) {
        const brand: BrandNode = this.brand[brandLabel]
        const carModel: CarModelNode = this.carModel[carModelLabel]

        this.latestResponse = await axios
            .post(`${process.env.API_URL}/brands/${brand.id}/${relationshipName}/${carModel.id}`, null, {
                validateStatus: function (status) {
                    return status === 404 // treating the 404 as a "good" status code, so axios does not fail the request
                }
            })
            .catch(error => {
                console.error(error.toJSON())
            })
    })
