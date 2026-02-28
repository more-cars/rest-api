import {DataTable, When, world} from "@cucumber/cucumber"
import {seedNode} from "../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../src/db/types/DbNodeType"
import {performApiRequest} from "../../lib/performApiRequest"

When('the user creates a relationship with the following data',
    async (dataTable: DataTable) => {
        const brand = await seedNode(DbNodeType.Brand)
        const carModel = await seedNode(DbNodeType.CarModel)
        const rows = dataTable.hashes()
        const data: any = {}

        rows.forEach((row) => {
            data[row.key] = row.value
        })

        const path = `/brands/${brand.properties.id}/has-car-model/${carModel.properties.id}`

        const response = await performApiRequest(path, 'POST', data)
        world.rememberResponse(response)
    })
