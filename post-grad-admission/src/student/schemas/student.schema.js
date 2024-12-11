"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentSchema = exports.Student = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const mongoose_3 = require("mongoose");
let Student = class Student extends mongoose_2.Document {
};
exports.Student = Student;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_3.Types.ObjectId }),
    __metadata("design:type", mongoose_3.Types.ObjectId)
], Student.prototype, "personalDetailsId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_3.Types.ObjectId }),
    __metadata("design:type", mongoose_3.Types.ObjectId)
], Student.prototype, "addressId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_3.Types.ObjectId }),
    __metadata("design:type", mongoose_3.Types.ObjectId)
], Student.prototype, "educationDetailsId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_3.Types.ObjectId }),
    __metadata("design:type", mongoose_3.Types.ObjectId)
], Student.prototype, "documentId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [mongoose_3.Types.ObjectId], ref: 'Application' }),
    __metadata("design:type", Array)
], Student.prototype, "applicationIds", void 0);
exports.Student = Student = __decorate([
    (0, mongoose_1.Schema)()
], Student);
exports.StudentSchema = mongoose_1.SchemaFactory.createForClass(Student);
//# sourceMappingURL=student.schema.js.map