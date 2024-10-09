import {atomWithStorage} from "jotai/utils";

export const authAtom = atomWithStorage<string | null>("auth", null);