"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateExaminationCenterDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_examination_center_dto_1 = require("./create-examination-center.dto");
class UpdateExaminationCenterDto extends (0, mapped_types_1.PartialType)(create_examination_center_dto_1.CreateExaminationCenterDto) {
}
exports.UpdateExaminationCenterDto = UpdateExaminationCenterDto;
//# sourceMappingURL=update-examinationCenter.dto.js.map