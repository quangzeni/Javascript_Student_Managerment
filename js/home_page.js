let totalCourse = 0;
let totalClass = 0;
let activeClass = 0;
let notActiveClass = 0;
let pendingClass = 0;
let totalStudent = 0;
let pendingStudent = 0;
let studingStudent = 0;
let bandedStudent = 0;
let graduatedStudent = 0;
let arrCourse = JSON.parse(localStorage.getItem("arrCourse")) || [];
arrCourse.forEach(course => {
    totalCourse++;
    course.arrClass.forEach(classItem => {
        totalClass++;
        if (classItem.status == "Hoạt động") {
            activeClass++;
        }
        if (classItem.status == "Kết thúc") {
            notActiveClass++;
        }
        if (classItem.status == "Đang chờ") {
            pendingClass++;
        }
        classItem.arrStudent.forEach(student => {
            totalStudent++;
            if (student.status == "Chờ lớp") {
                pendingStudent++;
            }
            if (student.status == "Đang học") {
                studingStudent++;
            }
            if (student.status == "Bảo lưu") {
                bandedStudent++;
            }
            if (student.status == "Tốt nghiệp") {
                graduatedStudent++;
            }
        })
    })
})
document.getElementById("totalCourse").innerText    = totalCourse;
document.getElementById("totalClass").innerText = totalClass;
document.getElementById("activeClass").innerText = activeClass;
document.getElementById("notActiveClass").innerText = notActiveClass;
document.getElementById("pendingClass").innerText = pendingClass;
document.getElementById("totalStudent").innerText = totalStudent;
document.getElementById("pendingStudent").innerText = pendingStudent;
document.getElementById("studingStudent").innerText = studingStudent;
document.getElementById("bandedStudent").innerText = bandedStudent;
document.getElementById("graduatedStudent").innerText = graduatedStudent;
// Đăng xuất
var logOutButton = document.getElementById("logOutButton");
var logOut = document.getElementById("logOut");
var confirmOut = document.getElementById("confirmOut");
var cancelOut = document.getElementById("cancelOut");
logOutButton.addEventListener("click",()=>{
    logOut.style.display = "block";
})
confirmOut.addEventListener("click",()=>{
    logOut.style.display = "none";
    window.location.href = "login_page.html"
})
cancelOut.addEventListener("click",()=>{
    logOut.style.display = "none";
})

