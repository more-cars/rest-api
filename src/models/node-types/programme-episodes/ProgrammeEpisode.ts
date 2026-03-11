import {CreateProgrammeEpisodeInput} from "./types/CreateProgrammeEpisodeInput"
import {ProgrammeEpisodeNode} from "./types/ProgrammeEpisodeNode"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../../db/node-types/programme-episodes/createNode"
import {convertDbNodeToModelNode} from "../convertDbNodeToModelNode"
import {getNodeById} from "../../../db/node-types/programme-episodes/getNodeById"
import {NodeNotFoundError} from "../../types/NodeNotFoundError"
import {getAllNodesOfType} from "../../../db/node-types/programme-episodes/getAllNodesOfType"
import type {NodeCollectionConstraints} from "../../types/NodeCollectionConstraints"

export const ProgrammeEpisode = {
    async create(data: CreateProgrammeEpisodeInput): Promise<ProgrammeEpisodeNode> {
        const input = convertInputData(data)
        const result = await createNode(input)

        return convertDbNodeToModelNode(result) as ProgrammeEpisodeNode
    },

    async findById(id: number): Promise<ProgrammeEpisodeNode> {
        const node = await getNodeById(id)

        if (!node) {
            throw new NodeNotFoundError(id)
        }

        return convertDbNodeToModelNode(node) as ProgrammeEpisodeNode
    },

    async findAll(options: NodeCollectionConstraints = {}): Promise<ProgrammeEpisodeNode[]> {
        const nodes: ProgrammeEpisodeNode[] = []
        const nodesDb = await getAllNodesOfType(options)

        nodesDb.forEach(node => {
            nodes.push(convertDbNodeToModelNode(node) as ProgrammeEpisodeNode)
        })

        return nodes
    },
}
