import {ACTION_TYPE_DELIMITER, STATE} from "./store/constants/commonConstants";

export function createRequestSuccessFailure(action, entity) {
  return {
    request: [action, entity, STATE.REQUEST].join(ACTION_TYPE_DELIMITER),
    success: [action, entity, STATE.SUCCESS].join(ACTION_TYPE_DELIMITER),
    failure: [action, entity, STATE.FAILURE].join(ACTION_TYPE_DELIMITER),
  };
}
