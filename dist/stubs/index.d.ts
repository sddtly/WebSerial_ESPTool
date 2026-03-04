import { ChipFamily } from "../const";
export interface Stub {
    text: number[];
    data: number[];
    text_start: number;
    entry: number;
    data_start: number;
}
export declare const getStubCode: (chipFamily: ChipFamily, chipRevision?: number | null) => Promise<Stub | null>;
