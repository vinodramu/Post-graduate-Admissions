// /* eslint-disable @typescript-eslint/no-unused-vars */
// import * as mongoose from 'mongoose';
// import { AdminSchema } from '../models/admin.schema';
// import { CollegeSchema } from '../models/college.entity';
// import { CourseSchema } from '../models/course.entity';
// import { ExamCenterSchema } from '../models/examCenter.entity';
// import { RoomSchema } from '../models/room.entity';
// import { AddressSchema } from '../models/address.schema';
// import { PersonalDetailsSchema } from '../models/personalDetails.schema';

// const mongoUri = 'mongodb://127.0.0.1:27017/postgrad';

// const Admin = mongoose.model('Admin', AdminSchema);
// const College = mongoose.model('College', CollegeSchema);
// const Course = mongoose.model('Course', CourseSchema);
// const ExamCenter = mongoose.model('ExamCenter', ExamCenterSchema);
// const Room = mongoose.model('Room', RoomSchema);
// const Address = mongoose.model('Address', AddressSchema);
// const PersonalDetails = mongoose.model('PersonalDetails', PersonalDetailsSchema);

// const addressData = [
//     { correspondenseAddress: '123 Academic Blvd, University City', permanentAddress: '123 Academic Blvd, University City', state: 'State1', city: 'City1', pincode: '123456', country: 'Country1' },
//     { correspondenseAddress: '456 Scholar St, College Town', permanentAddress: '456 Scholar St, College Town', state: 'State2', city: 'City2', pincode: '654321', country: 'Country2' },
//     { correspondenseAddress: '789 Learning Ave, Research Park', permanentAddress: '789 Learning Ave, Research Park', state: 'State3', city: 'City3', pincode: '789456', country: 'Country3' }
// ];

// const personalDetailsData = [
//     { name: 'John Doe', dateOfBirth: new Date('1985-06-15'), gender: 'Male', email: 'john.doe@example.com', phoneNumber: '123-456-7890' },
//     { name: 'Jane Smith', dateOfBirth: new Date('1990-08-20'), gender: 'Female', email: 'jane.smith@example.com', phoneNumber: '987-654-3210' }
// ];

// const courseData = [
//     { courseId: 'c001', courseName: 'Master of Science in Computer Science', fee: 2000.00 },
//     { courseId: 'c002', courseName: 'Master of Arts in English Literature', fee: 1800.00 },
//     { courseId: 'c003', courseName: 'Master of Business Administration', fee: 2200.00 },
//     { courseId: 'c004', courseName: 'Master of Science in Data Science', fee: 2500.00 }
// ];

// const collegeData = [
//     { collegeId: 'col001', collegeName: 'Tech University' },
//     { collegeId: 'col002', collegeName: 'Arts College' },
//     { collegeId: 'col003', collegeName: 'Business School' }
// ];

// const examCenterData = [
//     { centerId: 'ec001', centerName: 'Main Examination Hall', address: '123 Academic Blvd, University City' },
//     { centerId: 'ec002', centerName: 'North Campus Center', address: '456 Scholar St, College Town' },
//     { centerId: 'ec003', centerName: 'West Wing Exam Hall', address: '789 Learning Ave, Research Park' }
// ];

// // Updated Room Data with centerId
// const roomData = [
//     { roomId: 'r001', centerId: 'ec001', roomNumber: '101', capacity: 50 },
//     { roomId: 'r002', centerId: 'ec001', roomNumber: '102', capacity: 75 },
//     { roomId: 'r003', centerId: 'ec002', roomNumber: '201', capacity: 60 },
//     { roomId: 'r004', centerId: 'ec003', roomNumber: '301', capacity: 100 }
// ];

// const adminData = [
//     { username: 'admin1', password: 'hashedpassword1' },
//     { username: 'admin2', password: 'hashedpassword2' }
// ];

// async function seedDatabase() {
//     try {
//         await mongoose.connect(mongoUri);
//         console.log('Connected to MongoDB');

//         // Clear collections
//         await Admin.deleteMany({});
//         await College.deleteMany({});
//         await Course.deleteMany({});
//         await ExamCenter.deleteMany({});
//         await Room.deleteMany({});
//         await Address.deleteMany({});
//         await PersonalDetails.deleteMany({});
//         console.log('Cleared all collections');

//         // Insert Address data
//         const insertedAddresses = await Address.insertMany(addressData);
//         console.log('Inserted address data');

//         // Insert PersonalDetails data
//         const insertedPersonalDetails = await PersonalDetails.insertMany(personalDetailsData);
//         console.log('Inserted personal details data');

//         // Insert Course data
//         await Course.insertMany(courseData);
//         console.log('Inserted course data');

//         // Insert College data
//         const insertedColleges = await College.insertMany(collegeData);
//         console.log('Inserted college data');

//         // Insert ExamCenter data
//         const insertedExamCenters = await ExamCenter.insertMany(examCenterData);
//         console.log('Inserted exam center data');

//         // Create maps for ID lookup
//         const addressIdMap = new Map(insertedAddresses.map((address) => [address.correspondenseAddress, address._id]));
//         const personalDetailsIdMap = new Map(insertedPersonalDetails.map((pd) => [pd.email, pd._id]));

//         // Adjusted Room Data and Admin Data
//         const updatedRoomData = roomData.map(room => ({
//             ...room,
//             centerId: insertedExamCenters.find(ec => ec.centerId === room.centerId)?._id
//         }));

//         const updatedAdminData = adminData.map(admin => ({
//             ...admin,
//             personalDetailsId: insertedPersonalDetails.length > 0 ? insertedPersonalDetails[0]._id : null, // Handle cases with no personal details
//             addressId: insertedAddresses.length > 0 ? insertedAddresses[0]._id : null // Handle cases with no address
//         }));

//         async function seedDatabase() {
//             try {
//                 await mongoose.connect(mongoUri);
//                 console.log('Connected to MongoDB');

//                 // Clear collections
//                 await Admin.deleteMany({});
//                 await College.deleteMany({});
//                 await Course.deleteMany({});
//                 await ExamCenter.deleteMany({});
//                 await Room.deleteMany({});
//                 await Address.deleteMany({});
//                 await PersonalDetails.deleteMany({});
//                 console.log('Cleared all collections');

//                 // Insert Address data
//                 const insertedAddresses = await Address.insertMany(addressData);
//                 console.log('Inserted address data');

//                 // Insert PersonalDetails data
//                 const insertedPersonalDetails = await PersonalDetails.insertMany(personalDetailsData);
//                 console.log('Inserted personal details data');

//                 // Insert Course data
//                 await Course.insertMany(courseData);
//                 console.log('Inserted course data');

//                 // Insert College data
//                 const insertedColleges = await College.insertMany(collegeData);
//                 console.log('Inserted college data');

//                 // Insert ExamCenter data
//                 const insertedExamCenters = await ExamCenter.insertMany(examCenterData);
//                 console.log('Inserted exam center data');

//                 // Insert Room data
//                 await Room.insertMany(updatedRoomData);
//                 console.log('Inserted room data');

//                 // Insert Admin data
//                 await Admin.insertMany(updatedAdminData);
//                 console.log('Inserted admin data');

//                 // Disconnect from MongoDB
//                 await mongoose.disconnect();
//                 console.log('Disconnected from MongoDB');
//             }
//              catch (error) {
//                 console.error('Error seeding database:', error);
//                 await mongoose.disconnect();
//             }
//         }
//     seedDatabase()
// }