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
exports.CategoryWiseReportSchema = exports.CategoryWiseReport = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let CategoryWiseReport = class CategoryWiseReport {
};
exports.CategoryWiseReport = CategoryWiseReport;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], CategoryWiseReport.prototype, "categoryName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], CategoryWiseReport.prototype, "reportDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], CategoryWiseReport.prototype, "totalStudents", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Object)
], CategoryWiseReport.prototype, "programWise", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Object)
], CategoryWiseReport.prototype, "subjectWise", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], CategoryWiseReport.prototype, "createdAt", void 0);
exports.CategoryWiseReport = CategoryWiseReport = __decorate([
    (0, mongoose_1.Schema)()
], CategoryWiseReport);
exports.CategoryWiseReportSchema = mongoose_1.SchemaFactory.createForClass(CategoryWiseReport);
//# sourceMappingURL=categorywise-report.schema.js.map