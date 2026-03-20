import {Then} from "@cucumber/cucumber"
import assert from "assert"
import {ResponseManager} from "../../lib/ResponseManager"
import {validateJson} from "../../../_toolbox/validateJson"
import {PaginationSchema} from "../../../_toolbox/schemas/response/PaginationSchema"
import {MetaSchema} from "../../../_toolbox/schemas/response/MetaSchema"

Then('the response should contain pagination meta information',
    () => {
        const response = ResponseManager.getPreviousResponse()

        assert.ok(validateJson(response.body.links, PaginationSchema))
        assert.ok(validateJson(response.body.meta, MetaSchema))
    })
