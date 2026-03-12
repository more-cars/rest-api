import {CreateProgrammeEpisodeInput} from "./types/CreateProgrammeEpisodeInput"
import {ProgrammeEpisodeNode} from "./types/ProgrammeEpisodeNode"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../../db/node-types/programme-episodes/createNode"
import {convertDbNodeToModelNode} from "../convertDbNodeToModelNode"
import {getNodeById} from "../../../db/node-types/programme-episodes/getNodeById"
import {NodeNotFoundError} from "../../types/NodeNotFoundError"
import {getAllNodesOfType} from "../../../db/node-types/programme-episodes/getAllNodesOfType"
import type {NodeCollectionConstraints} from "../../types/NodeCollectionConstraints"
import {deleteNode} from "../../../db/nodes/deleteNode"
import {createRel} from "../../relationships/createRel"
import {CarModel} from "../car-models/CarModel"
import {getSpecificRel} from "../../relationships/getSpecificRel"
import {RelAlreadyExistsError} from "../../types/RelAlreadyExistsError"
import {RelType} from "../../relationships/types/RelType"
import {getAllRels} from "../../relationships/getAllRels"
import {deleteSpecificRel} from "../../relationships/deleteSpecificRel"
import {RelNotFoundError} from "../../types/RelNotFoundError"
import {CarModelVariant} from "../car-model-variants/CarModelVariant"

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

    async delete(id: number): Promise<void> {
        const node = await getNodeById(id)

        if (!node) {
            throw new NodeNotFoundError(id)
        }

        await deleteNode(id)
    },

    async createCoversCarModelRelationship(programmeEpisodeId: number, carModelId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await ProgrammeEpisode.findById(programmeEpisodeId)
        await CarModel.findById(carModelId)

        const existingRelation = await getSpecificRel(programmeEpisodeId, carModelId, RelType.ProgrammeEpisodeCoversCarModel)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.ProgrammeEpisodeCoversCarModel, programmeEpisodeId, carModelId)
        }

        const createdRelationship = await createRel(programmeEpisodeId, carModelId, RelType.ProgrammeEpisodeCoversCarModel)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAllCoversCarModelRelationships(programmeEpisodeId: number) {
        // checking that the node exists -> exception is thrown if not
        await ProgrammeEpisode.findById(programmeEpisodeId)

        return getAllRels(programmeEpisodeId, RelType.ProgrammeEpisodeCoversCarModel)
    },

    async deleteCoversCarModelRelationship(programmeEpisodeId: number, carModelId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await ProgrammeEpisode.findById(programmeEpisodeId)
        await CarModel.findById(carModelId)

        const relationship = await getSpecificRel(programmeEpisodeId, carModelId, RelType.ProgrammeEpisodeCoversCarModel)
        if (!relationship) {
            throw new RelNotFoundError(RelType.ProgrammeEpisodeCoversCarModel, programmeEpisodeId, carModelId)
        }

        await deleteSpecificRel(programmeEpisodeId, carModelId, RelType.ProgrammeEpisodeCoversCarModel)
    },

    async createFeaturesCarModelVariantRelationship(programmeEpisodeId: number, carModelVariantId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await ProgrammeEpisode.findById(programmeEpisodeId)
        await CarModelVariant.findById(carModelVariantId)

        const existingRelation = await getSpecificRel(programmeEpisodeId, carModelVariantId, RelType.ProgrammeEpisodeFeaturesCarModelVariant)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.ProgrammeEpisodeFeaturesCarModelVariant, programmeEpisodeId, carModelVariantId)
        }


        const createdRelationship = await createRel(programmeEpisodeId, carModelVariantId, RelType.ProgrammeEpisodeFeaturesCarModelVariant)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAllFeaturesCarModelVariantRelationships(programmeEpisodeId: number) {
        // checking that the node exists -> exception is thrown if not
        await ProgrammeEpisode.findById(programmeEpisodeId)

        return getAllRels(programmeEpisodeId, RelType.ProgrammeEpisodeFeaturesCarModelVariant)
    },
}
