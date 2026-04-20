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
import {deleteOutgoingRel} from "../../relationships/deleteOutgoingRel"
import {Programme} from "../programmes/Programme"
import {ModelNodeType} from "../../types/ModelNodeType"
import {getRel} from "../../relationships/getRel"
import {deleteIncomingRel} from "../../relationships/deleteIncomingRel"
import {SemanticError} from "../../types/SemanticError"
import {Image} from "../images/Image"
import {Video} from "../videos/Video"

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

    async createBelongsToProgrammeRelationship(programmeEpisodeId: number, programmeId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await ProgrammeEpisode.findById(programmeEpisodeId)
        await Programme.findById(programmeId)

        const existingRelation = await getSpecificRel(programmeEpisodeId, programmeId, RelType.ProgrammeEpisodeBelongsToProgramme)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.ProgrammeEpisodeBelongsToProgramme, programmeEpisodeId, programmeId)
        }
        await deleteOutgoingRel(programmeEpisodeId, RelType.ProgrammeEpisodeBelongsToProgramme)

        const createdRelationship = await createRel(programmeEpisodeId, programmeId, RelType.ProgrammeEpisodeBelongsToProgramme)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getBelongsToProgrammeRelationship(programmeEpisodeId: number) {
        // checking that the node exists -> exception is thrown if not
        await ProgrammeEpisode.findById(programmeEpisodeId)

        const relationship = await getRel(programmeEpisodeId, RelType.ProgrammeEpisodeBelongsToProgramme)
        if (!relationship) {
            throw new RelNotFoundError(RelType.ProgrammeEpisodeBelongsToProgramme, programmeEpisodeId, null)
        }

        return relationship
    },

    async deleteBelongsToProgrammeRelationship(programmeEpisodeId: number, programmeId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await ProgrammeEpisode.findById(programmeEpisodeId)
        await Programme.findById(programmeId)

        const relationship = await getSpecificRel(programmeEpisodeId, programmeId, RelType.ProgrammeEpisodeBelongsToProgramme)
        if (!relationship) {
            throw new RelNotFoundError(RelType.ProgrammeEpisodeBelongsToProgramme, programmeEpisodeId, programmeId)
        }

        await deleteSpecificRel(programmeEpisodeId, programmeId, RelType.ProgrammeEpisodeBelongsToProgramme)
    },

    async createFollowsEpisodeRelationship(programmeEpisodeId: number, partnerId: number) {
        if (programmeEpisodeId === partnerId) {
            throw new SemanticError(`Programme Episode #${programmeEpisodeId} cannot be connected to itself`)
        }
        // checking that both nodes exist -> exception is thrown if not
        await ProgrammeEpisode.findById(programmeEpisodeId)
        await ProgrammeEpisode.findById(partnerId)

        const existingRelation = await getSpecificRel(programmeEpisodeId, partnerId, RelType.ProgrammeEpisodeFollowsEpisode)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.ProgrammeEpisodeFollowsEpisode, programmeEpisodeId, partnerId)
        }
        await deleteOutgoingRel(programmeEpisodeId, RelType.ProgrammeEpisodeFollowsEpisode)
        await deleteIncomingRel(partnerId, RelType.ProgrammeEpisodeFollowsEpisode, ModelNodeType.ProgrammeEpisode)

        const createdRelationship = await createRel(programmeEpisodeId, partnerId, RelType.ProgrammeEpisodeFollowsEpisode)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getFollowsEpisodeRelationship(programmeEpisodeId: number) {
        // checking that the node exists -> exception is thrown if not
        await ProgrammeEpisode.findById(programmeEpisodeId)

        const relationship = await getRel(programmeEpisodeId, RelType.ProgrammeEpisodeFollowsEpisode)
        if (!relationship) {
            throw new RelNotFoundError(RelType.ProgrammeEpisodeFollowsEpisode, programmeEpisodeId, null)
        }

        return relationship
    },

    async deleteFollowsEpisodeRelationship(programmeEpisodeId: number, partnerId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await ProgrammeEpisode.findById(programmeEpisodeId)
        await ProgrammeEpisode.findById(partnerId)

        const relationship = await getSpecificRel(programmeEpisodeId, partnerId, RelType.ProgrammeEpisodeFollowsEpisode)
        if (!relationship) {
            throw new RelNotFoundError(RelType.ProgrammeEpisodeFollowsEpisode, programmeEpisodeId, partnerId)
        }

        await deleteSpecificRel(programmeEpisodeId, partnerId, RelType.ProgrammeEpisodeFollowsEpisode)
    },

    async createIsFollowedByEpisodeRelationship(programmeEpisodeId: number, partnerId: number) {
        if (programmeEpisodeId === partnerId) {
            throw new SemanticError(`Programme Episode #${programmeEpisodeId} cannot be connected to itself`)
        }
        // checking that both nodes exist -> exception is thrown if not
        await ProgrammeEpisode.findById(programmeEpisodeId)
        await ProgrammeEpisode.findById(partnerId)

        const existingRelation = await getSpecificRel(programmeEpisodeId, partnerId, RelType.ProgrammeEpisodeIsFollowedByEpisode)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.ProgrammeEpisodeIsFollowedByEpisode, programmeEpisodeId, partnerId)
        }
        await deleteOutgoingRel(programmeEpisodeId, RelType.ProgrammeEpisodeIsFollowedByEpisode)
        await deleteIncomingRel(partnerId, RelType.ProgrammeEpisodeIsFollowedByEpisode, ModelNodeType.ProgrammeEpisode)

        const createdRelationship = await createRel(programmeEpisodeId, partnerId, RelType.ProgrammeEpisodeIsFollowedByEpisode)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getIsFollowedByEpisodeRelationship(programmeEpisodeId: number) {
        // checking that the node exists -> exception is thrown if not
        await ProgrammeEpisode.findById(programmeEpisodeId)

        const relationship = await getRel(programmeEpisodeId, RelType.ProgrammeEpisodeIsFollowedByEpisode)
        if (!relationship) {
            throw new RelNotFoundError(RelType.ProgrammeEpisodeIsFollowedByEpisode, programmeEpisodeId, null)
        }

        return relationship
    },

    async deleteIsFollowedByEpisodeRelationship(programmeEpisodeId: number, partnerId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await ProgrammeEpisode.findById(programmeEpisodeId)
        await ProgrammeEpisode.findById(partnerId)

        const relationship = await getSpecificRel(programmeEpisodeId, partnerId, RelType.ProgrammeEpisodeIsFollowedByEpisode)
        if (!relationship) {
            throw new RelNotFoundError(RelType.ProgrammeEpisodeIsFollowedByEpisode, programmeEpisodeId, partnerId)
        }

        await deleteSpecificRel(programmeEpisodeId, partnerId, RelType.ProgrammeEpisodeIsFollowedByEpisode)
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

    async deleteFeaturesCarModelVariantRelationship(programmeEpisodeId: number, carModelVariantId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await ProgrammeEpisode.findById(programmeEpisodeId)
        await CarModelVariant.findById(carModelVariantId)

        const relationship = await getSpecificRel(programmeEpisodeId, carModelVariantId, RelType.ProgrammeEpisodeFeaturesCarModelVariant)
        if (!relationship) {
            throw new RelNotFoundError(RelType.ProgrammeEpisodeFeaturesCarModelVariant, programmeEpisodeId, carModelVariantId)
        }

        await deleteSpecificRel(programmeEpisodeId, carModelVariantId, RelType.ProgrammeEpisodeFeaturesCarModelVariant)
    },

    async createHasImageRelationship(programmeEpisodeId: number, imageId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await ProgrammeEpisode.findById(programmeEpisodeId)
        await Image.findById(imageId)

        const existingRelation = await getSpecificRel(programmeEpisodeId, imageId, RelType.ProgrammeEpisodeHasImage)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.ProgrammeEpisodeHasImage, programmeEpisodeId, imageId)
        }

        const createdRelationship = await createRel(programmeEpisodeId, imageId, RelType.ProgrammeEpisodeHasImage)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAllHasImageRelationships(programmeEpisodeId: number) {
        // checking that the node exists -> exception is thrown if not
        await ProgrammeEpisode.findById(programmeEpisodeId)

        return getAllRels(programmeEpisodeId, RelType.ProgrammeEpisodeHasImage)
    },

    async deleteHasImageRelationship(programmeEpisodeId: number, imageId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await ProgrammeEpisode.findById(programmeEpisodeId)
        await Image.findById(imageId)

        const relationship = await getSpecificRel(programmeEpisodeId, imageId, RelType.ProgrammeEpisodeHasImage)
        if (!relationship) {
            throw new RelNotFoundError(RelType.ProgrammeEpisodeHasImage, programmeEpisodeId, imageId)
        }

        await deleteSpecificRel(programmeEpisodeId, imageId, RelType.ProgrammeEpisodeHasImage)
    },

    async createHasPrimeImageRelationship(programmeEpisodeId: number, imageId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await ProgrammeEpisode.findById(programmeEpisodeId)
        await Image.findById(imageId)

        const existingRelation = await getSpecificRel(programmeEpisodeId, imageId, RelType.ProgrammeEpisodeHasPrimeImage)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.ProgrammeEpisodeHasPrimeImage, programmeEpisodeId, imageId)
        }
        await deleteOutgoingRel(programmeEpisodeId, RelType.ProgrammeEpisodeHasPrimeImage)


        const createdRelationship = await createRel(programmeEpisodeId, imageId, RelType.ProgrammeEpisodeHasPrimeImage)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getHasPrimeImageRelationship(programmeEpisodeId: number) {
        // checking that the node exists -> exception is thrown if not
        await ProgrammeEpisode.findById(programmeEpisodeId)

        const relationship = await getRel(programmeEpisodeId, RelType.ProgrammeEpisodeHasPrimeImage)
        if (!relationship) {
            throw new RelNotFoundError(RelType.ProgrammeEpisodeHasPrimeImage, programmeEpisodeId, null)
        }

        return relationship
    },

    async deleteHasPrimeImageRelationship(programmeEpisodeId: number, imageId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await ProgrammeEpisode.findById(programmeEpisodeId)
        await Image.findById(imageId)

        const relationship = await getSpecificRel(programmeEpisodeId, imageId, RelType.ProgrammeEpisodeHasPrimeImage)
        if (!relationship) {
            throw new RelNotFoundError(RelType.ProgrammeEpisodeHasPrimeImage, programmeEpisodeId, imageId)
        }

        await deleteSpecificRel(programmeEpisodeId, imageId, RelType.ProgrammeEpisodeHasPrimeImage)
    },

    async createHasVideoRelationship(programmeEpisodeId: number, videoId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await ProgrammeEpisode.findById(programmeEpisodeId)
        await Video.findById(videoId)

        const existingRelation = await getSpecificRel(programmeEpisodeId, videoId, RelType.ProgrammeEpisodeHasVideo)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.ProgrammeEpisodeHasVideo, programmeEpisodeId, videoId)
        }

        const createdRelationship = await createRel(programmeEpisodeId, videoId, RelType.ProgrammeEpisodeHasVideo)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAllHasVideoRelationships(programmeEpisodeId: number) {
        // checking that the node exists -> exception is thrown if not
        await ProgrammeEpisode.findById(programmeEpisodeId)

        return getAllRels(programmeEpisodeId, RelType.ProgrammeEpisodeHasVideo)
    },

    async deleteHasVideoRelationship(programmeEpisodeId: number, videoId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await ProgrammeEpisode.findById(programmeEpisodeId)
        await Video.findById(videoId)

        const relationship = await getSpecificRel(programmeEpisodeId, videoId, RelType.ProgrammeEpisodeHasVideo)
        if (!relationship) {
            throw new RelNotFoundError(RelType.ProgrammeEpisodeHasVideo, programmeEpisodeId, videoId)
        }

        await deleteSpecificRel(programmeEpisodeId, videoId, RelType.ProgrammeEpisodeHasVideo)
    },

    async createHasMainVideoRelationship(programmeEpisodeId: number, videoId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await ProgrammeEpisode.findById(programmeEpisodeId)
        await Video.findById(videoId)

        const existingRelation = await getSpecificRel(programmeEpisodeId, videoId, RelType.ProgrammeEpisodeHasMainVideo)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.ProgrammeEpisodeHasMainVideo, programmeEpisodeId, videoId)
        }
        await deleteOutgoingRel(programmeEpisodeId, RelType.ProgrammeEpisodeHasMainVideo)

        const createdRelationship = await createRel(programmeEpisodeId, videoId, RelType.ProgrammeEpisodeHasMainVideo)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getHasMainVideoRelationship(programmeEpisodeId: number) {
        // checking that the node exists -> exception is thrown if not
        await ProgrammeEpisode.findById(programmeEpisodeId)

        const relationship = await getRel(programmeEpisodeId, RelType.ProgrammeEpisodeHasMainVideo)
        if (!relationship) {
            throw new RelNotFoundError(RelType.ProgrammeEpisodeHasMainVideo, programmeEpisodeId, null)
        }

        return relationship
    },

    async deleteHasMainVideoRelationship(programmeEpisodeId: number, videoId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await ProgrammeEpisode.findById(programmeEpisodeId)
        await Video.findById(videoId)

        const relationship = await getSpecificRel(programmeEpisodeId, videoId, RelType.ProgrammeEpisodeHasMainVideo)
        if (!relationship) {
            throw new RelNotFoundError(RelType.ProgrammeEpisodeHasMainVideo, programmeEpisodeId, videoId)
        }

        await deleteSpecificRel(programmeEpisodeId, videoId, RelType.ProgrammeEpisodeHasMainVideo)
    },
}
