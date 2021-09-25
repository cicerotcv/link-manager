import { conditionalAuthentication } from "./ConditionAuthentication";
import { ensureAuthorization } from "./EnsureAuthorization";
import { ensureIsAdmin } from "./EnsureIsAdmin";
import { ensureUserExists } from "./EnsureUserExists";

export const middlewares = {
  conditionalAuthentication,
  ensureAuthorization,
  ensureUserExists,
  ensureIsAdmin
};
