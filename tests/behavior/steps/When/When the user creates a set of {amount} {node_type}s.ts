import {When, world} from "@cucumber/cucumber"
import {Company} from "../../../../src/models/companies/Company"
import {Brand} from "../../../../src/models/brands/Brand"
import {CarModel} from "../../../../src/models/car-models/CarModel"
import {Image} from "../../../../src/models/images/Image"
import FakeCompany from "../../../_toolbox/fixtures/nodes/FakeCompany"
import FakeBrand from "../../../_toolbox/fixtures/nodes/FakeBrand"
import FakeCarModel from "../../../_toolbox/fixtures/nodes/FakeCarModel"
import FakeImage from "../../../_toolbox/fixtures/nodes/FakeImage"

When('the user creates a set of {int} {string}s',
    async (amount: number, nodeType: string) => {
        const nodes = []

        // TODO this approach is not scalable, and it is cheating because we are circumventing the API -> needs to be an explicit API call
        for (let i = 0; i < amount; i++) {
            switch (nodeType.toLowerCase()) {
                case 'company':
                    nodes.push(await Company.create(FakeCompany))
                    break
                case 'brand':
                    nodes.push(await Brand.create(FakeBrand))
                    break
                case 'car model':
                    nodes.push(await CarModel.create(FakeCarModel))
                    break
                case 'image':
                    nodes.push(await Image.create(FakeImage))
                    break
            }
        }
        const response = {
            data: nodes
        }

        world.rememberResponse(response)
    })
