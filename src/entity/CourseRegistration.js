// Define a class
export class CourseRegistration {
    // Constructor to initialize properties
    constructor(idStudent, idCourse, time) {
        this.idStudent = idStudent;
        this.idCourse = idCourse;
        this.time = time;
    }

    // Method to display registration details
    displayDetails() {
        console.log(`Student ID: ${this.idStudent}`);
        console.log(`Course ID: ${this.idCourse}`);
        console.log(`Time: ${this.time}`);
    }
}





