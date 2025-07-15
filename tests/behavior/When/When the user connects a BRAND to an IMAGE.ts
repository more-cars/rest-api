import {When} from "@cucumber/cucumber"
import axios from "axios"
import {seedImage} from "../../_toolbox/dbSeeding/images/nodes/seedImage"
import {seedBrand} from "../../_toolbox/dbSeeding/brands/nodes/seedBrand"

When('the user connects a BRAND to an IMAGE',
    async function () {
        const image = await seedImage()
        const brand = await seedBrand()

        this.latestResponse = await axios
            .post(`${process.env.API_URL}/images/${image.id}/belongs-to-node/${brand.id}`)
            .catch(error => {
                console.error(error)
            })
    })
