import {Then} from "@cucumber/cucumber"
// import axios from "axios"
// import {CarModelNode} from "../../../src/types/CarModelNode"
// import {BrandNode} from "../../../src/types/BrandNode"
// import assert from "assert"

// TODO on hold until it is possible to request relationships via the API
Then('the relationship between car model {string} and brand {string} should not exist anymore',
    async function (carModelLabel: string, brandLabel: string) {
        //     const carModel: CarModelNode = this.carModel[carModelLabel]
        //     const brand: BrandNode = this.brand[brandLabel]
        //
        //     const response = await axios
        //         .get(`${process.env.API_URL}/car-models/${carModel.id}/belongs-to-brand/${brand.id}`)
        //         .catch(error => {
        //             console.error(error.toJSON())
        //         })
        //
        //     assert.equal(response.status, 404)
    })
