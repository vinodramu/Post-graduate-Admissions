import { StudentEducationdata } from "./studentEducatioData.model";

export class StudentPersonalData{
    name!:string;
    date_of_birth!:Date;
    gender!:string;
    email!:string;
    phone_number!:string;
    aadharno!:string;
    address!:string;
    state!:string;
    pincode!:string;
    country!:string;
    education!:StudentEducationdata[];
}