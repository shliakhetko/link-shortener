import {atomWithStorage} from "jotai/vanilla/utils/atomWithStorage";

export const authAtom = atomWithStorage<string | null>("auth", null);