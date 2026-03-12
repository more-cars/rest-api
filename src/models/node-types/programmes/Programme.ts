import {CreateProgrammeInput} from "./types/CreateProgrammeInput"
import {ProgrammeNode} from "./types/ProgrammeNode"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../../db/node-types/programmes/createNode"
import {convertDbNodeToModelNode} from "../convertDbNodeToModelNode"
import {getNodeById} from "../../../db/node-types/programmes/getNodeById"
import {NodeNotFoundError} from "../../types/NodeNotFoundError"
import {getAllNodesOfType} from "../../../db/node-types/programmes/getAllNodesOfType"
import type {NodeCollectionConstraints} from "../../types/NodeCollectionConstraints"
import {deleteNode} from "../../../db/nodes/deleteNode"
import {createRel} from "../../relationships/createRel"
import {deleteIncomingRel} from "../../relationships/deleteIncomingRel"
import {ProgrammeEpisode} from "../programme-episodes/ProgrammeEpisode"
import {getSpecificRel} from "../../relationships/getSpecificRel"
import {ModelNodeType} from "../../types/ModelNodeType"
import {RelAlreadyExistsError} from "../../types/RelAlreadyExistsError"
import {RelType} from "../../relationships/types/RelType"
import {getAllRels} from "../../relationships/getAllRels"

export const Programme = {
    async create(data: CreateProgrammeInput): Promise<ProgrammeNode> {
        const input = convertInputData(data)
        const result = await createNode(input)

        return convertDbNodeToModelNode(result) as ProgrammeNode
    },

    async findById(id: number): Promise<ProgrammeNode> {
        const node = await getNodeById(id)

        if (!node) {
            throw new NodeNotFoundError(id)
        }

        return convertDbNodeToModelNode(node) as ProgrammeNode
    },

    async findAll(options: NodeCollectionConstraints = {}): Promise<ProgrammeNode[]> {
        const nodes: ProgrammeNode[] = []
        const nodesDb = await getAllNodesOfType(options)

        nodesDb.forEach(node => {
            nodes.push(convertDbNodeToModelNode(node) as ProgrammeNode)
        })

        return nodes
    },

    async delete(id: number): Promise<void> {
        const node = await getNodeById(id)

        if (!node) {
            throw new NodeNotFoundError(id)
        }

        await deleteNode(id)
    },

    async createHasEpisodeRelationship(programmeId: number, programmeEpisodeId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await Programme.findById(programmeId)
        await ProgrammeEpisode.findById(programmeEpisodeId)

        const existingRelation = await getSpecificRel(programmeId, programmeEpisodeId, RelType.ProgrammeHasEpisode)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.ProgrammeHasEpisode, programmeId, programmeEpisodeId)
        }

        await deleteIncomingRel(programmeEpisodeId, RelType.ProgrammeHasEpisode, ModelNodeType.Programme)

        const createdRelationship = await createRel(programmeId, programmeEpisodeId, RelType.ProgrammeHasEpisode)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAllHasEpisodeRelationships(programmeId: number) {
        // checking that the node exists -> exception is thrown if not
        await Programme.findById(programmeId)

        return getAllRels(programmeId, RelType.ProgrammeHasEpisode)
    },
}
