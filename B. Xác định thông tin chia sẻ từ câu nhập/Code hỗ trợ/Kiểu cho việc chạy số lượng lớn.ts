import { CâuNhập, DữLiệuCấuHình } from "./Ki%E1%BB%83u%20cho%20d%E1%BB%AF%20li%E1%BB%87u%20nh%E1%BA%ADp%20v%C3%A0o.ts";
import { KếtQuảPhânLoại } from "./Ki%E1%BB%83u%20cho%20vi%E1%BB%87c%20x%E1%BB%AD%20l%C3%BD.ts";

export type CấuHìnhĐượcNhập = DữLiệuCấuHình | string
export default interface dữLiệuTrênURL {
    cấuHìnhTrênURL: string | null
    danhSáchCâuNhậpTrênURL: string;
  }
export type DanhSáchVậtThểKếtQuả = Array<KếtQuảPhânLoại>