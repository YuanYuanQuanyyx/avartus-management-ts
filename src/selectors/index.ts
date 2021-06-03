import { RootState } from "../store/state/users";

export const getAuth = (state: RootState) => state.authState;
