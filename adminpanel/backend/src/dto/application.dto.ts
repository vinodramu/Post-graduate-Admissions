export class StudentApplication {
    studentId: string;
    status: string; 
    city_preference1: string;
    city_preference2: string;
    colleges: string;
    course_name: string;
    fee: number;
    exam_center_allotment: string;
    room_allotment: string;

    constructor(
        studentId: string,
        status: string,
        city_preference1: string,
        city_preference2: string,
        colleges: string,
        course_name: string,
        fee: number,
        exam_center_allotment: string,
        room_allotment: string
    ) {
        this.studentId = studentId;
        this.status = status;
        this.city_preference1 = city_preference1;
        this.city_preference2 = city_preference2;
        this.colleges = colleges;
        this.course_name = course_name;
        this.fee = fee;
        this.exam_center_allotment = exam_center_allotment;
        this.room_allotment = room_allotment;
    }
}
