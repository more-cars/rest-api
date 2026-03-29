import {CreateVideoInput} from "./types/CreateVideoInput"
import {VideoNode} from "./types/VideoNode"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../../db/node-types/videos/createNode"
import {convertDbNodeToModelNode} from "../convertDbNodeToModelNode"
import type {CreateVideoGeneratedInput} from "./create/CreateVideoGeneratedInput"

export const Video = {
    async create(data: CreateVideoInput): Promise<VideoNode> {
        const generatedData = getGeneratedData()
        const input = convertInputData(Object.assign(data, generatedData))
        const result = await createNode(input)

        return convertDbNodeToModelNode(result) as VideoNode
    },
}

/**
 * TEMPORARY solution until the youtube importer is implemented
 */
function getGeneratedData(): CreateVideoGeneratedInput {
    return {
        title: 'DUMMY',
        description: 'DUMMY',
        creator: 'DUMMY',
        license: 'DUMMY',
        tags: 'DUMMY',
        source: 'DUMMY',
        duration: 'DUMMY',
        thumbnail_url_l: 'DUMMY',
        thumbnail_url_m: 'DUMMY',
        thumbnail_url_s: 'DUMMY',
        thumbnail_url_xs: 'DUMMY',
    } satisfies CreateVideoGeneratedInput
}