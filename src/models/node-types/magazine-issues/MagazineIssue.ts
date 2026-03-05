import {CreateMagazineIssueInput} from "./types/CreateMagazineIssueInput"
import {MagazineIssueNode} from "./types/MagazineIssueNode"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../../db/node-types/magazine-issues/createNode"
import {convertDbNodeToModelNode} from "../convertDbNodeToModelNode"
import {getNodeById} from "../../../db/node-types/magazine-issues/getNodeById"
import {NodeNotFoundError} from "../../types/NodeNotFoundError"
import {getAllNodesOfType} from "../../../db/node-types/magazine-issues/getAllNodesOfType"
import type {NodeCollectionConstraints} from "../../types/NodeCollectionConstraints"
import {deleteNode} from "../../../db/nodes/deleteNode"
import {createRel} from "../../relationships/createRel"
import {deleteOutgoingRel} from "../../relationships/deleteOutgoingRel"
import {Magazine} from "../magazines/Magazine"
import {getSpecificRel} from "../../relationships/getSpecificRel"
import {ModelNodeType} from "../../types/ModelNodeType"
import {RelAlreadyExistsError} from "../../types/RelAlreadyExistsError"
import {RelType} from "../../relationships/types/RelType"
import {getRel} from "../../relationships/getRel"
import {RelNotFoundError} from "../../types/RelNotFoundError"
import {deleteSpecificRel} from "../../relationships/deleteSpecificRel"
import {Image} from "../images/Image"
import {getAllRels} from "../../relationships/getAllRels"
import {deleteIncomingRel} from "../../relationships/deleteIncomingRel"
import {SemanticError} from "../../types/SemanticError"
import {CarModel} from "../car-models/CarModel"
import {CarModelVariant} from "../car-model-variants/CarModelVariant"

export const MagazineIssue = {
    async create(data: CreateMagazineIssueInput): Promise<MagazineIssueNode> {
        const input = convertInputData(data)
        const result = await createNode(input)

        return convertDbNodeToModelNode(result) as MagazineIssueNode
    },

    async findById(id: number): Promise<MagazineIssueNode> {
        const node = await getNodeById(id)

        if (!node) {
            throw new NodeNotFoundError(id)
        }

        return convertDbNodeToModelNode(node) as MagazineIssueNode
    },

    async findAll(options: NodeCollectionConstraints = {}): Promise<MagazineIssueNode[]> {
        const nodes: MagazineIssueNode[] = []
        const nodesDb = await getAllNodesOfType(options)

        nodesDb.forEach(node => {
            nodes.push(convertDbNodeToModelNode(node) as MagazineIssueNode)
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

    async createBelongsToMagazineRelationship(magazineIssueId: number, magazineId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await MagazineIssue.findById(magazineIssueId)
        await Magazine.findById(magazineId)

        const existingRelation = await getSpecificRel(magazineIssueId, magazineId, RelType.MagazineIssueBelongsToMagazine)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.MagazineIssueBelongsToMagazine, magazineIssueId, magazineId)
        }
        await deleteOutgoingRel(magazineIssueId, RelType.MagazineIssueBelongsToMagazine, ModelNodeType.Magazine)


        const createdRelationship = await createRel(magazineIssueId, magazineId, RelType.MagazineIssueBelongsToMagazine)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getBelongsToMagazineRelationship(magazineIssueId: number) {
        // checking that the node exists -> exception is thrown if not
        await MagazineIssue.findById(magazineIssueId)

        const relationship = await getRel(magazineIssueId, RelType.MagazineIssueBelongsToMagazine)
        if (!relationship) {
            throw new RelNotFoundError(RelType.MagazineIssueBelongsToMagazine, magazineIssueId, null)
        }

        return relationship
    },

    async deleteBelongsToMagazineRelationship(magazineIssueId: number, magazineId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await MagazineIssue.findById(magazineIssueId)
        await Magazine.findById(magazineId)

        const relationship = await getSpecificRel(magazineIssueId, magazineId, RelType.MagazineIssueBelongsToMagazine)
        if (!relationship) {
            throw new RelNotFoundError(RelType.MagazineIssueBelongsToMagazine, magazineIssueId, magazineId)
        }

        await deleteSpecificRel(magazineIssueId, magazineId, RelType.MagazineIssueBelongsToMagazine)
    },

    async createFollowsIssueRelationship(magazineIssueId: number, partnerId: number) {
        if (magazineIssueId === partnerId) {
            throw new SemanticError(`Magazine Issue #${magazineIssueId} cannot be connected to itself`)
        }
        // checking that both nodes exist -> exception is thrown if not
        await MagazineIssue.findById(magazineIssueId)
        await MagazineIssue.findById(partnerId)

        const existingRelation = await getSpecificRel(magazineIssueId, partnerId, RelType.MagazineIssueFollowsIssue)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.MagazineIssueFollowsIssue, magazineIssueId, partnerId)
        }
        await deleteOutgoingRel(magazineIssueId, RelType.MagazineIssueFollowsIssue, ModelNodeType.MagazineIssue)
        await deleteIncomingRel(partnerId, RelType.MagazineIssueFollowsIssue, ModelNodeType.MagazineIssue)

        const createdRelationship = await createRel(magazineIssueId, partnerId, RelType.MagazineIssueFollowsIssue)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getFollowsIssueRelationship(magazineIssueId: number) {
        // checking that the node exists -> exception is thrown if not
        await MagazineIssue.findById(magazineIssueId)

        const relationship = await getRel(magazineIssueId, RelType.MagazineIssueFollowsIssue)
        if (!relationship) {
            throw new RelNotFoundError(RelType.MagazineIssueFollowsIssue, magazineIssueId, null)
        }

        return relationship
    },

    async deleteFollowsIssueRelationship(magazineIssueId: number, partnerId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await MagazineIssue.findById(magazineIssueId)
        await MagazineIssue.findById(partnerId)

        const relationship = await getSpecificRel(magazineIssueId, partnerId, RelType.MagazineIssueFollowsIssue)
        if (!relationship) {
            throw new RelNotFoundError(RelType.MagazineIssueFollowsIssue, magazineIssueId, partnerId)
        }

        await deleteSpecificRel(magazineIssueId, partnerId, RelType.MagazineIssueFollowsIssue)
    },

    async createFollowedByIssueRelationship(magazineIssueId: number, partnerId: number) {
        if (magazineIssueId === partnerId) {
            throw new SemanticError(`Magazine Issue #${magazineIssueId} cannot be connected to itself`)
        }
        // checking that both nodes exist -> exception is thrown if not
        await MagazineIssue.findById(magazineIssueId)
        await MagazineIssue.findById(partnerId)

        const existingRelation = await getSpecificRel(magazineIssueId, partnerId, RelType.MagazineIssueFollowedByIssue)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.MagazineIssueFollowedByIssue, magazineIssueId, partnerId)
        }
        await deleteOutgoingRel(magazineIssueId, RelType.MagazineIssueFollowedByIssue, ModelNodeType.MagazineIssue)
        await deleteIncomingRel(partnerId, RelType.MagazineIssueFollowedByIssue, ModelNodeType.MagazineIssue)

        const createdRelationship = await createRel(magazineIssueId, partnerId, RelType.MagazineIssueFollowedByIssue)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getFollowedByIssueRelationship(magazineIssueId: number) {
        // checking that the node exists -> exception is thrown if not
        await MagazineIssue.findById(magazineIssueId)

        const relationship = await getRel(magazineIssueId, RelType.MagazineIssueFollowedByIssue)
        if (!relationship) {
            throw new RelNotFoundError(RelType.MagazineIssueFollowedByIssue, magazineIssueId, null)
        }

        return relationship
    },

    async deleteFollowedByIssueRelationship(magazineIssueId: number, partnerId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await MagazineIssue.findById(magazineIssueId)
        await MagazineIssue.findById(partnerId)

        const relationship = await getSpecificRel(magazineIssueId, partnerId, RelType.MagazineIssueFollowedByIssue)
        if (!relationship) {
            throw new RelNotFoundError(RelType.MagazineIssueFollowedByIssue, magazineIssueId, partnerId)
        }

        await deleteSpecificRel(magazineIssueId, partnerId, RelType.MagazineIssueFollowedByIssue)
    },

    async createCoversCarModelRelationship(magazineIssueId: number, carModelId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await MagazineIssue.findById(magazineIssueId)
        await CarModel.findById(carModelId)

        const existingRelation = await getSpecificRel(magazineIssueId, carModelId, RelType.MagazineIssueCoversCarModel)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.MagazineIssueCoversCarModel, magazineIssueId, carModelId)
        }

        const createdRelationship = await createRel(magazineIssueId, carModelId, RelType.MagazineIssueCoversCarModel)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAllCoversCarModelRelationships(magazineIssueId: number) {
        // checking that the node exists -> exception is thrown if not
        await MagazineIssue.findById(magazineIssueId)

        return getAllRels(magazineIssueId, RelType.MagazineIssueCoversCarModel)
    },

    async deleteCoversCarModelRelationship(magazineIssueId: number, carModelId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await MagazineIssue.findById(magazineIssueId)
        await CarModel.findById(carModelId)

        const relationship = await getSpecificRel(magazineIssueId, carModelId, RelType.MagazineIssueCoversCarModel)
        if (!relationship) {
            throw new RelNotFoundError(RelType.MagazineIssueCoversCarModel, magazineIssueId, carModelId)
        }

        await deleteSpecificRel(magazineIssueId, carModelId, RelType.MagazineIssueCoversCarModel)
    },

    async createPresentsCarModelVariantRelationship(magazineIssueId: number, carModelVariantId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await MagazineIssue.findById(magazineIssueId)
        await CarModelVariant.findById(carModelVariantId)

        const existingRelation = await getSpecificRel(magazineIssueId, carModelVariantId, RelType.MagazineIssuePresentsCarModelVariant)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.MagazineIssuePresentsCarModelVariant, magazineIssueId, carModelVariantId)
        }


        const createdRelationship = await createRel(magazineIssueId, carModelVariantId, RelType.MagazineIssuePresentsCarModelVariant)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAllPresentsCarModelVariantRelationships(magazineIssueId: number) {
        // checking that the node exists -> exception is thrown if not
        await MagazineIssue.findById(magazineIssueId)

        return getAllRels(magazineIssueId, RelType.MagazineIssuePresentsCarModelVariant)
    },

    async deletePresentsCarModelVariantRelationship(magazineIssueId: number, carModelVariantId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await MagazineIssue.findById(magazineIssueId)
        await CarModelVariant.findById(carModelVariantId)

        const relationship = await getSpecificRel(magazineIssueId, carModelVariantId, RelType.MagazineIssuePresentsCarModelVariant)
        if (!relationship) {
            throw new RelNotFoundError(RelType.MagazineIssuePresentsCarModelVariant, magazineIssueId, carModelVariantId)
        }

        await deleteSpecificRel(magazineIssueId, carModelVariantId, RelType.MagazineIssuePresentsCarModelVariant)
    },

    async createHasImageRelationship(magazineIssueId: number, imageId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await MagazineIssue.findById(magazineIssueId)
        await Image.findById(imageId)

        const existingRelation = await getSpecificRel(magazineIssueId, imageId, RelType.MagazineIssueHasImage)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.MagazineIssueHasImage, magazineIssueId, imageId)
        }

        const createdRelationship = await createRel(magazineIssueId, imageId, RelType.MagazineIssueHasImage)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAllHasImageRelationships(magazineIssueId: number) {
        // checking that the node exists -> exception is thrown if not
        await MagazineIssue.findById(magazineIssueId)

        return getAllRels(magazineIssueId, RelType.MagazineIssueHasImage)
    },

    async deleteHasImageRelationship(magazineIssueId: number, imageId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await MagazineIssue.findById(magazineIssueId)
        await Image.findById(imageId)

        const relationship = await getSpecificRel(magazineIssueId, imageId, RelType.MagazineIssueHasImage)
        if (!relationship) {
            throw new RelNotFoundError(RelType.MagazineIssueHasImage, magazineIssueId, imageId)
        }

        await deleteSpecificRel(magazineIssueId, imageId, RelType.MagazineIssueHasImage)
    },

    async createHasPrimeImageRelationship(magazineIssueId: number, imageId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await MagazineIssue.findById(magazineIssueId)
        await Image.findById(imageId)

        const existingRelation = await getSpecificRel(magazineIssueId, imageId, RelType.MagazineIssueHasPrimeImage)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.MagazineIssueHasPrimeImage, magazineIssueId, imageId)
        }
        await deleteOutgoingRel(magazineIssueId, RelType.MagazineIssueHasPrimeImage, ModelNodeType.Image)


        const createdRelationship = await createRel(magazineIssueId, imageId, RelType.MagazineIssueHasPrimeImage)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getHasPrimeImageRelationship(magazineIssueId: number) {
        // checking that the node exists -> exception is thrown if not
        await MagazineIssue.findById(magazineIssueId)

        const relationship = await getRel(magazineIssueId, RelType.MagazineIssueHasPrimeImage)
        if (!relationship) {
            throw new RelNotFoundError(RelType.MagazineIssueHasPrimeImage, magazineIssueId, null)
        }

        return relationship
    },

    async deleteHasPrimeImageRelationship(magazineIssueId: number, imageId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await MagazineIssue.findById(magazineIssueId)
        await Image.findById(imageId)

        const relationship = await getSpecificRel(magazineIssueId, imageId, RelType.MagazineIssueHasPrimeImage)
        if (!relationship) {
            throw new RelNotFoundError(RelType.MagazineIssueHasPrimeImage, magazineIssueId, imageId)
        }

        await deleteSpecificRel(magazineIssueId, imageId, RelType.MagazineIssueHasPrimeImage)
    },
}
