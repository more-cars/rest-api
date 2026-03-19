import type {CompanyNode} from "../node-types/companies/types/CompanyNode"
import type {BrandNode} from "../node-types/brands/types/BrandNode"
import type {CarModelNode} from "../node-types/car-models/types/CarModelNode"
import type {CarModelVariantNode} from "../node-types/car-model-variants/types/CarModelVariantNode"
import type {RaceTrackNode} from "../node-types/race-tracks/types/RaceTrackNode"
import type {TrackLayoutNode} from "../node-types/track-layouts/types/TrackLayoutNode"
import type {RacingSeriesNode} from "../node-types/racing-series/types/RacingSeriesNode"
import type {RacingEventNode} from "../node-types/racing-events/types/RacingEventNode"
import type {RacingSessionNode} from "../node-types/racing-sessions/types/RacingSessionNode"
import type {SessionResultNode} from "../node-types/session-results/types/SessionResultNode"
import type {LapTimeNode} from "../node-types/lap-times/types/LapTimeNode"
import type {RacingGameNode} from "../node-types/racing-games/types/RacingGameNode"
import type {GamingPlatformNode} from "../node-types/gaming-platforms/types/GamingPlatformNode"
import type {ModelCarNode} from "../node-types/model-cars/types/ModelCarNode"
import type {ModelCarBrandNode} from "../node-types/model-car-brands/types/ModelCarBrandNode"
import type {MagazineNode} from "../node-types/magazines/types/MagazineNode"
import type {MagazineIssueNode} from "../node-types/magazine-issues/types/MagazineIssueNode"
import type {RatingNode} from "../node-types/ratings/types/RatingNode"
import type {ProgrammeNode} from "../node-types/programmes/types/ProgrammeNode"
import type {ProgrammeEpisodeNode} from "../node-types/programme-episodes/types/ProgrammeEpisodeNode"
import type {MotorShowNode} from "../node-types/motor-shows/types/MotorShowNode"
import type {ImageNode} from "../node-types/images/types/ImageNode"

export type ControllerNode =
    CompanyNode |
    BrandNode |
    CarModelNode |
    CarModelVariantNode |
    RaceTrackNode |
    TrackLayoutNode |
    RacingSeriesNode |
    RacingEventNode |
    RacingSessionNode |
    SessionResultNode |
    LapTimeNode |
    RacingGameNode |
    GamingPlatformNode |
    ModelCarNode |
    ModelCarBrandNode |
    MagazineNode |
    MagazineIssueNode |
    RatingNode |
    ProgrammeNode |
    ProgrammeEpisodeNode |
    MotorShowNode |
    ImageNode
