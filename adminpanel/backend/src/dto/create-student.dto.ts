export class CreateStudentDto {
    studentId: string;
    name: string;
    email: string;
    programId: string;
    gpa?: number;
    enrollmentDate?: Date;
}
