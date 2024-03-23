import CấuHìnhNơiĐăng from "./Ki%E1%BB%83u%20cho%20n%C6%A1i%20%C4%91%C4%83ng.ts";

export function lấyKýHiệuViếtTắt(từĐượcKiểmTra: string, cấuHìnhNơiĐăng: CấuHìnhNơiĐăng) {
    if (cấuHìnhNơiĐăng["Viết tắt"]) {
        for (const danhMụcViếtTắt of cấuHìnhNơiĐăng["Viết tắt"]) {
            const từĐượcViếtTắt = Object.keys(danhMụcViếtTắt)[0];
            const từViếtTắt = Object.values(danhMụcViếtTắt)[0];
            if (từĐượcViếtTắt === từĐượcKiểmTra) {
                return từViếtTắt;
            }
        }
        return từĐượcKiểmTra;
    } else return từĐượcKiểmTra;
}