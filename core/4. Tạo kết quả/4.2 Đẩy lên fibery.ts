import { KếtQuảHiểnThị } from "../Code hỗ trợ/Kiểu cho việc xử lý.ts";
import {
	lấyTênNhãn,
	TênChiều,
} from "../Code hỗ trợ/Hàm liên quan tới chiều.ts";
import lấyDữLiệuCấuHình, { KýHiệuCấuHình } from "../Code hỗ trợ/Hàm liên quan tới cấu hình.ts";
import Fibery from "npm:fibery-unofficial";

async function đẩyLênFibery(
	câuNhập: string,
	kýHiệuCấuHình: KýHiệuCấuHình,
	kếtQuảHiểnThị: KếtQuảHiểnThị,
){
	const dữLiệuCấuHình = (await lấyDữLiệuCấuHình(kýHiệuCấuHình)).dữLiệuCấuHình;
	const cấuHìnhFibery = dữLiệuCấuHình["Fibery"];
	if (!cấuHìnhFibery) return console.log('Chưa cấu hình cho Fibery')

	const fibery = new Fibery(cấuHìnhFibery.API);
	const dữLiệuĐẩyLênFibery: KếtQuảHiểnThị = {}

	const spaceName = cấuHìnhFibery["Tên space"];
	const databaseName = cấuHìnhFibery["Tên database"];
	
	let fieldName: string;
	if (cấuHìnhFibery["Name field"]) {
		if (cấuHìnhFibery["Name field"]['Tên']) {
			fieldName = cấuHìnhFibery["Name field"]['Tên'];
		} else {
			fieldName = 'Name'
		}

		if (cấuHìnhFibery["Name field"]['Giá trị']) {
			const giáTrịChoNameField = cấuHìnhFibery["Name field"]['Giá trị'].replace(/{{(.*?)}}/g, function () {
				return kếtQuảHiểnThị[arguments[1]]
			});
			
			dữLiệuĐẩyLênFibery[spaceName + "/" + fieldName] = giáTrịChoNameField
		} else {
			dữLiệuĐẩyLênFibery[spaceName + "/" + fieldName] = câuNhập
		}
	} else {
		dữLiệuĐẩyLênFibery[spaceName + "/Name"] = câuNhập
	}

	for (const chiều of dữLiệuCấuHình["Khai báo"]) {
		const tênChiều: TênChiều = chiều["Tên chiều"];
		const tênNhãn = lấyTênNhãn(tênChiều);

		let tênChiềuĐầuRa: string;
		let tênNhãnĐầuRa: string;
		if (chiều["Tên gọi đầu ra"]){
			tênChiềuĐầuRa = chiều["Tên gọi đầu ra"]["Từ"];
		} else {
			tênChiềuĐầuRa = tênChiều;
		}
		
		dữLiệuĐẩyLênFibery[spaceName + "/" + tênChiềuĐầuRa] = kếtQuảHiểnThị[tênChiều];
		
		if (chiều['Dữ liệu tự nhận dạng']) {
			if (chiều["Tên gọi đầu ra"]){
				tênNhãnĐầuRa = chiều["Tên gọi đầu ra"]["Nhãn"];
			} else {
				tênNhãnĐầuRa = tênNhãn;
			}
			dữLiệuĐẩyLênFibery[spaceName + "/" + tênNhãnĐầuRa] = kếtQuảHiểnThị[tênNhãn];
        }
	}

	await fibery.entity.createBatch([{
		"type": `${spaceName}/${databaseName}`,
		"entity": dữLiệuĐẩyLênFibery,
	}]);

	console.log(`Đã đẩy lên ${spaceName}/${databaseName} tại ${cấuHìnhFibery.API.host}`);
}

export default đẩyLênFibery;
