import type {InputCompanyCreate} from "../node-types/companies/types/InputCompanyCreate"
import type {InputBrandCreate} from "../node-types/brands/types/InputBrandCreate"
import type {InputCarModelCreate} from "../node-types/car-models/types/InputCarModelCreate"
import type {InputCarModelVariantCreate} from "../node-types/car-model-variants/types/InputCarModelVariantCreate"
import type {InputRaceTrackCreate} from "../node-types/race-tracks/types/InputRaceTrackCreate"
import type {InputTrackLayoutCreate} from "../node-types/track-layouts/types/InputTrackLayoutCreate"
import type {InputRacingSeriesCreate} from "../node-types/racing-series/types/InputRacingSeriesCreate"
import type {InputRacingEventCreate} from "../node-types/racing-events/types/InputRacingEventCreate"
import type {InputRacingSessionCreate} from "../node-types/racing-sessions/types/InputRacingSessionCreate"
import type {InputSessionResultCreate} from "../node-types/session-results/types/InputSessionResultCreate"
import type {InputLapTimeCreate} from "../node-types/lap-times/types/InputLapTimeCreate"
import type {InputRacingGameCreate} from "../node-types/racing-games/types/InputRacingGameCreate"
import type {InputGamingPlatformCreate} from "../node-types/gaming-platforms/types/InputGamingPlatformCreate"
import type {InputModelCarCreate} from "../node-types/model-cars/types/InputModelCarCreate"
import type {InputModelCarBrandCreate} from "../node-types/model-car-brands/types/InputModelCarBrandCreate"
import type {InputMagazineCreate} from "../node-types/magazines/types/InputMagazineCreate"
import type {InputMagazineIssueCreate} from "../node-types/magazine-issues/types/InputMagazineIssueCreate"
import type {InputRatingCreate} from "../node-types/ratings/types/InputRatingCreate"
import type {InputProgrammeCreate} from "../node-types/programmes/types/InputProgrammeCreate"
import type {InputProgrammeEpisodeCreate} from "../node-types/programme-episodes/types/InputProgrammeEpisodeCreate"
import type {InputMotorShowCreate} from "../node-types/motor-shows/types/InputMotorShowCreate"
import type {InputImageCreate} from "../node-types/images/types/InputImageCreate"

export type InputNodeTypeCreate =
    InputCompanyCreate |
    InputBrandCreate |
    InputCarModelCreate |
    InputCarModelVariantCreate |
    InputRaceTrackCreate |
    InputTrackLayoutCreate |
    InputRacingSeriesCreate |
    InputRacingEventCreate |
    InputRacingSessionCreate |
    InputSessionResultCreate |
    InputLapTimeCreate |
    InputRacingGameCreate |
    InputGamingPlatformCreate |
    InputModelCarCreate |
    InputModelCarBrandCreate |
    InputMagazineCreate |
    InputMagazineIssueCreate |
    InputRatingCreate |
    InputProgrammeCreate |
    InputProgrammeEpisodeCreate |
    InputMotorShowCreate |
    InputImageCreate
