import {CarModelNode} from "./types/CarModelNode"
import {CreateCarModelInput} from "./types/CreateCarModelInput"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../../db/node-types/car-models/createNode"
import {convertDbNodeToModelNode} from "../convertDbNodeToModelNode"
import {getNodeById} from "../../../db/node-types/car-models/getNodeById"
import type {NodeCollectionConstraints} from "../../types/NodeCollectionConstraints"
import {getAllNodesOfType} from "../../../db/node-types/car-models/getAllNodesOfType"
import {deleteNode} from "../../../db/nodes/deleteNode"
import {Brand} from "../brands/Brand"
import {Image} from "../images/Image"
import {getRel} from "../../relationships/getRel"
import {NodeNotFoundError} from "../../types/NodeNotFoundError"
import {RelNotFoundError} from "../../types/RelNotFoundError"
import {RelAlreadyExistsError} from "../../types/RelAlreadyExistsError"
import {SemanticError} from "../../types/SemanticError"
import {RelType} from "../../relationships/types/RelType"
import {deleteSpecificRel} from "../../relationships/deleteSpecificRel"
import {getSpecificRel} from "../../relationships/getSpecificRel"
import {createRel} from "../../relationships/createRel"
import {getAllRels} from "../../relationships/getAllRels"
import {CarModelVariant} from "../car-model-variants/CarModelVariant"
import {deleteOutgoingRel} from "../../relationships/deleteOutgoingRel"
import {deleteIncomingRel} from "../../relationships/deleteIncomingRel"
import {MagazineIssue} from "../magazine-issues/MagazineIssue"
import {ProgrammeEpisode} from "../programme-episodes/ProgrammeEpisode"
import {Video} from "../videos/Video"

export const CarModel = {
    async create(data: CreateCarModelInput): Promise<CarModelNode> {
        const input = convertInputData(data)
        const result = await createNode(input)

        return convertDbNodeToModelNode(result) as CarModelNode
    },

    async findById(id: number): Promise<CarModelNode> {
        const node = await getNodeById(id)

        if (!node) {
            throw new NodeNotFoundError(id)
        }

        return convertDbNodeToModelNode(node) as CarModelNode
    },

    async findAll(options: NodeCollectionConstraints = {}): Promise<CarModelNode[]> {
        const nodes: CarModelNode[] = []
        const nodesDb = await getAllNodesOfType(options)

        nodesDb.forEach(node => {
            nodes.push(convertDbNodeToModelNode(node) as CarModelNode)
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

    async createBelongsToBrandRelationship(carModelId: number, brandId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await CarModel.findById(carModelId)
        await Brand.findById(brandId)

        const existingRelationship = await getSpecificRel(carModelId, brandId, RelType.CarModelBelongsToBrand)
        if (existingRelationship) {
            throw new RelAlreadyExistsError(RelType.CarModelBelongsToBrand, carModelId, brandId)
        }

        await deleteOutgoingRel(carModelId, RelType.CarModelBelongsToBrand)

        const createdRelationship = await createRel(carModelId, brandId, RelType.CarModelBelongsToBrand)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getBelongsToBrandRelationship(carModelId: number) {
        // checking that the node exists -> exception is thrown if not
        await CarModel.findById(carModelId)

        const relationship = await getRel(carModelId, RelType.CarModelBelongsToBrand)
        if (!relationship) {
            throw new RelNotFoundError(RelType.CarModelBelongsToBrand, carModelId)
        }

        return relationship
    },

    async deleteBelongsToBrandRelationship(carModelId: number, brandId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await CarModel.findById(carModelId)
        await Brand.findById(brandId)

        const relationship = await getSpecificRel(carModelId, brandId, RelType.CarModelBelongsToBrand)
        if (!relationship) {
            throw new RelNotFoundError(RelType.CarModelBelongsToBrand, carModelId, brandId)
        }

        await deleteSpecificRel(carModelId, brandId, RelType.CarModelBelongsToBrand)
    },

    async createHasSuccessorRelationship(carModelId: number, partnerId: number) {
        if (carModelId === partnerId) {
            throw new SemanticError(`Car Model #${carModelId} cannot be connected to itself`)
        }

        // checking that both nodes exist -> exception is thrown if not
        await CarModel.findById(carModelId)
        await CarModel.findById(partnerId)

        const existingRelation = await getSpecificRel(carModelId, partnerId, RelType.CarModelHasSuccessor)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.CarModelHasSuccessor, carModelId, partnerId)
        }

        await deleteOutgoingRel(carModelId, RelType.CarModelHasSuccessor)
        await deleteIncomingRel(partnerId, RelType.CarModelHasSuccessor)

        const createdRelationship = await createRel(carModelId, partnerId, RelType.CarModelHasSuccessor)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getHasSuccessorRelationship(carModelId: number) {
        // checking that the node exists -> exception is thrown if not
        await CarModel.findById(carModelId)

        const relationship = await getRel(carModelId, RelType.CarModelHasSuccessor)
        if (!relationship) {
            throw new RelNotFoundError(RelType.CarModelHasSuccessor, carModelId, null)
        }

        return relationship
    },

    async deleteHasSuccessorRelationship(carModelId: number, partnerId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await CarModel.findById(carModelId)
        await CarModel.findById(partnerId)

        const relationship = await getSpecificRel(carModelId, partnerId, RelType.CarModelHasSuccessor)
        if (!relationship) {
            throw new RelNotFoundError(RelType.CarModelHasSuccessor, carModelId, partnerId)
        }

        await deleteSpecificRel(carModelId, partnerId, RelType.CarModelHasSuccessor)
    },

    async createIsSuccessorOfRelationship(carModelId: number, partnerId: number) {
        if (carModelId === partnerId) {
            throw new SemanticError(`Car Model #${carModelId} cannot be connected to itself`)
        }

        // checking that both nodes exist -> exception is thrown if not
        await CarModel.findById(carModelId)
        await CarModel.findById(partnerId)

        const existingRelation = await getSpecificRel(carModelId, partnerId, RelType.CarModelIsSuccessorOf)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.CarModelIsSuccessorOf, carModelId, partnerId)
        }

        await deleteOutgoingRel(carModelId, RelType.CarModelIsSuccessorOf)
        await deleteIncomingRel(partnerId, RelType.CarModelIsSuccessorOf)

        const createdRelationship = await createRel(carModelId, partnerId, RelType.CarModelIsSuccessorOf)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getIsSuccessorOfRelationship(carModelId: number) {
        // checking that the node exists -> exception is thrown if not
        await CarModel.findById(carModelId)

        const relationship = await getRel(carModelId, RelType.CarModelIsSuccessorOf)
        if (!relationship) {
            throw new RelNotFoundError(RelType.CarModelIsSuccessorOf, carModelId, null)
        }

        return relationship
    },

    async deleteIsSuccessorOfRelationship(carModelId: number, partnerId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await CarModel.findById(carModelId)
        await CarModel.findById(partnerId)

        const relationship = await getSpecificRel(carModelId, partnerId, RelType.CarModelIsSuccessorOf)
        if (!relationship) {
            throw new RelNotFoundError(RelType.CarModelIsSuccessorOf, carModelId, partnerId)
        }

        await deleteSpecificRel(carModelId, partnerId, RelType.CarModelIsSuccessorOf)
    },

    async createHasVariantRelationship(carModelId: number, carModelVariantId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await CarModel.findById(carModelId)
        await CarModelVariant.findById(carModelVariantId)

        const existingRelation = await getSpecificRel(carModelId, carModelVariantId, RelType.CarModelHasVariant)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.CarModelHasVariant, carModelId, carModelVariantId)
        }

        await deleteIncomingRel(carModelVariantId, RelType.CarModelHasVariant)

        const createdRelationship = await createRel(carModelId, carModelVariantId, RelType.CarModelHasVariant)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAllHasVariantRelationships(carModelId: number) {
        // checking that the node exists -> exception is thrown if not
        await CarModel.findById(carModelId)

        return getAllRels(carModelId, RelType.CarModelHasVariant)
    },

    async deleteHasVariantRelationship(carModelId: number, carModelVariantId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await CarModel.findById(carModelId)
        await CarModelVariant.findById(carModelVariantId)

        const relationship = await getSpecificRel(carModelId, carModelVariantId, RelType.CarModelHasVariant)
        if (!relationship) {
            throw new RelNotFoundError(RelType.CarModelHasVariant, carModelId, carModelVariantId)
        }

        await deleteSpecificRel(carModelId, carModelVariantId, RelType.CarModelHasVariant)
    },

    async createCoveredByMagazineIssueRelationship(carModelId: number, magazineIssueId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await CarModel.findById(carModelId)
        await MagazineIssue.findById(magazineIssueId)

        const existingRelation = await getSpecificRel(carModelId, magazineIssueId, RelType.CarModelCoveredByMagazineIssue)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.CarModelCoveredByMagazineIssue, carModelId, magazineIssueId)
        }


        const createdRelationship = await createRel(carModelId, magazineIssueId, RelType.CarModelCoveredByMagazineIssue)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAllCoveredByMagazineIssueRelationships(carModelId: number) {
        // checking that the node exists -> exception is thrown if not
        await CarModel.findById(carModelId)

        return getAllRels(carModelId, RelType.CarModelCoveredByMagazineIssue)
    },

    async deleteCoveredByMagazineIssueRelationship(carModelId: number, magazineIssueId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await CarModel.findById(carModelId)
        await MagazineIssue.findById(magazineIssueId)

        const relationship = await getSpecificRel(carModelId, magazineIssueId, RelType.CarModelCoveredByMagazineIssue)
        if (!relationship) {
            throw new RelNotFoundError(RelType.CarModelCoveredByMagazineIssue, carModelId, magazineIssueId)
        }

        await deleteSpecificRel(carModelId, magazineIssueId, RelType.CarModelCoveredByMagazineIssue)
    },

    async createCoveredByProgrammeEpisodeRelationship(carModelId: number, programmeEpisodeId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await CarModel.findById(carModelId)
        await ProgrammeEpisode.findById(programmeEpisodeId)

        const existingRelation = await getSpecificRel(carModelId, programmeEpisodeId, RelType.CarModelCoveredByProgrammeEpisode)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.CarModelCoveredByProgrammeEpisode, carModelId, programmeEpisodeId)
        }


        const createdRelationship = await createRel(carModelId, programmeEpisodeId, RelType.CarModelCoveredByProgrammeEpisode)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAllCoveredByProgrammeEpisodeRelationships(carModelId: number) {
        // checking that the node exists -> exception is thrown if not
        await CarModel.findById(carModelId)

        return getAllRels(carModelId, RelType.CarModelCoveredByProgrammeEpisode)
    },

    async deleteCoveredByProgrammeEpisodeRelationship(carModelId: number, programmeEpisodeId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await CarModel.findById(carModelId)
        await ProgrammeEpisode.findById(programmeEpisodeId)

        const relationship = await getSpecificRel(carModelId, programmeEpisodeId, RelType.CarModelCoveredByProgrammeEpisode)
        if (!relationship) {
            throw new RelNotFoundError(RelType.CarModelCoveredByProgrammeEpisode, carModelId, programmeEpisodeId)
        }

        await deleteSpecificRel(carModelId, programmeEpisodeId, RelType.CarModelCoveredByProgrammeEpisode)
    },

    async createHasImageRelationship(carModelId: number, imageId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await CarModel.findById(carModelId)
        await Image.findById(imageId)

        const existingRelationship = await getSpecificRel(carModelId, imageId, RelType.CarModelHasImage)
        if (existingRelationship) {
            throw new RelAlreadyExistsError(RelType.CarModelHasImage, carModelId, imageId)
        }

        const createdRelationship = await createRel(carModelId, imageId, RelType.CarModelHasImage)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAllHasImageRelationships(carModelId: number) {
        // checking that the node exists -> exception is thrown if not
        await CarModel.findById(carModelId)

        return getAllRels(carModelId, RelType.CarModelHasImage)
    },

    async deleteHasImageRelationship(carModelId: number, imageId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await CarModel.findById(carModelId)
        await Image.findById(imageId)

        const relationship = await getSpecificRel(carModelId, imageId, RelType.CarModelHasImage)
        if (!relationship) {
            throw new RelNotFoundError(RelType.CarModelHasImage, carModelId, imageId)
        }

        await deleteSpecificRel(carModelId, imageId, RelType.CarModelHasImage)
    },

    async createHasPrimeImageRelationship(carModelId: number, imageId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await CarModel.findById(carModelId)
        await Image.findById(imageId)

        const existingRelationship = await getSpecificRel(carModelId, imageId, RelType.CarModelHasPrimeImage)
        if (existingRelationship) {
            throw new RelAlreadyExistsError(RelType.CarModelHasPrimeImage, carModelId, imageId)
        }

        await deleteOutgoingRel(carModelId, RelType.CarModelHasPrimeImage)

        const createdRelationship = await createRel(carModelId, imageId, RelType.CarModelHasPrimeImage)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getHasPrimeImageRelationship(carModelId: number) {
        // checking that the node exists -> exception is thrown if not
        await CarModel.findById(carModelId)

        const relationship = await getRel(carModelId, RelType.CarModelHasPrimeImage)
        if (!relationship) {
            throw new RelNotFoundError(RelType.CarModelHasPrimeImage, carModelId, null)
        }

        return relationship
    },

    async deleteHasPrimeImageRelationship(carModelId: number, imageId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await CarModel.findById(carModelId)
        await Image.findById(imageId)

        const relationship = await getSpecificRel(carModelId, imageId, RelType.CarModelHasPrimeImage)
        if (!relationship) {
            throw new RelNotFoundError(RelType.CarModelHasPrimeImage, carModelId, imageId)
        }

        await deleteSpecificRel(carModelId, imageId, RelType.CarModelHasPrimeImage)
    },

    async createHasVideoRelationship(carModelId: number, videoId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await CarModel.findById(carModelId)
        await Video.findById(videoId)

        const existingRelation = await getSpecificRel(carModelId, videoId, RelType.CarModelHasVideo)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.CarModelHasVideo, carModelId, videoId)
        }

        const createdRelationship = await createRel(carModelId, videoId, RelType.CarModelHasVideo)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAllHasVideoRelationships(carModelId: number) {
        // checking that the node exists -> exception is thrown if not
        await CarModel.findById(carModelId)

        return getAllRels(carModelId, RelType.CarModelHasVideo)
    },

    async deleteHasVideoRelationship(carModelId: number, videoId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await CarModel.findById(carModelId)
        await Video.findById(videoId)

        const relationship = await getSpecificRel(carModelId, videoId, RelType.CarModelHasVideo)
        if (!relationship) {
            throw new RelNotFoundError(RelType.CarModelHasVideo, carModelId, videoId)
        }

        await deleteSpecificRel(carModelId, videoId, RelType.CarModelHasVideo)
    },

    async createHasMainVideoRelationship(carModelId: number, videoId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await CarModel.findById(carModelId)
        await Video.findById(videoId)

        const existingRelation = await getSpecificRel(carModelId, videoId, RelType.CarModelHasMainVideo)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.CarModelHasMainVideo, carModelId, videoId)
        }
        await deleteOutgoingRel(carModelId, RelType.CarModelHasMainVideo)

        const createdRelationship = await createRel(carModelId, videoId, RelType.CarModelHasMainVideo)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getHasMainVideoRelationship(carModelId: number) {
        // checking that the node exists -> exception is thrown if not
        await CarModel.findById(carModelId)

        const relationship = await getRel(carModelId, RelType.CarModelHasMainVideo)
        if (!relationship) {
            throw new RelNotFoundError(RelType.CarModelHasMainVideo, carModelId, null)
        }

        return relationship
    },

    async deleteHasMainVideoRelationship(carModelId: number, videoId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await CarModel.findById(carModelId)
        await Video.findById(videoId)

        const relationship = await getSpecificRel(carModelId, videoId, RelType.CarModelHasMainVideo)
        if (!relationship) {
            throw new RelNotFoundError(RelType.CarModelHasMainVideo, carModelId, videoId)
        }

        await deleteSpecificRel(carModelId, videoId, RelType.CarModelHasMainVideo)
    },
}
