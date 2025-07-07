import {DataTable, When} from "@cucumber/cucumber"
import axios from "axios"

When('the user tries to create a BRAND with the following data',
    async function (dataTable: DataTable) {
        const nameRow = dataTable.hashes()[0]

        const data = {
            [nameRow.attribute]: nameRow.value,
        }

        this.latestResponse = await axios
            .post(`${process.env.API_URL}/brands`, data, {
                validateStatus: function (status) {
                    return status === 400 // treating the 400 as a "good" status code, so axios does not fail the request
                }
            })
    })
