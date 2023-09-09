// Giả sử chỉ nhập dữ liệu vào Course có name RA01
let arrCourse = JSON.parse(localStorage.getItem("arrCourse")) || [];
let arrClass = arrCourse.flatMap(element => element.arrClass);
let arrStudent = arrClass.flatMap(element => element.arrStudent);
// let arrStudent = arrCourse.flatMap(course => course.arrClass.flatMap(cla => cla.arrStudent));
let rowPerPage = 10;
let action = "Create";
let currenPage = 1;
let renderStudent = (page, arrStudent) => {
    pageMax = Math.ceil(arrStudent.length / rowPerPage);
    if (page < 1) {
        page = 1;
    }
    else if (page > pageMax) {
        page = pageMax;
    }
    let iMin = (page - 1) * rowPerPage;
    let iMax;
    if (page * rowPerPage > arrStudent.length) {
        iMax = arrStudent.length;
    }
    else {
        iMax = page * rowPerPage;
    }
    let content = document.getElementById("content");
    content.innerHTML = "";
    // Render dữ liệu lên elemen tbody của table
    for (let i = iMin; i < iMax; i++) {
        let indexOfClass = 0;
        for (let j = 0; j < arrClass.length; j++) {
            let Cla = arrClass[j];
            // Tìm kiếm trong mảng arrClass của mỗi phần tử Class
            let indexInClass = Cla.arrStudent.findIndex(classItem => classItem.studentId === arrStudent[i].studentId);
            // Nếu tìm thấy, lưu lại index của Class và thoát khỏi vòng lặp
            if (indexInClass !== -1) {
                indexOfClass = j;
                break;
            }
        }
        content.innerHTML += `
        <tr>
            <td>${i + 1}</td>
            <td>${arrStudent[i].studentId}</td>
            <td>${arrStudent[i].studentName}</td>
            <td>${arrStudent[i].birth}</td>
            <td>${arrStudent[i].address}</td>
            <td>${arrStudent[i].status}</td>
            <td>${arrClass[indexOfClass].className}</td>
            <td>
                <button type="button" class="btn btn-danger" onclick = editStudent('${arrStudent[i].studentId}')>Sửa</button>
                <button type="button" class="btn btn-secondary" onclick = deleteStudent('${arrStudent[i].studentId}')>Xóa</button>
            </td>
        </tr>
        `
    }
    // Render ra Pagination (phân trang)
    let listPages = document.getElementById("listPages");
    listPages.innerText = "";
    for (let i = 1; i <= pageMax; i++) {
        listPages.innerHTML += `<li class="page-item"><a class="page-link" href="javascript:clickPage('${i}')">${i}</a></li>`
    }
    // Ẩn hiện Previous và Next.
    let previous = document.getElementById("previous");
    let next = document.getElementById("next");
    if (currenPage == 1) {
        previous.style.visibility = "hidden";
    } else {
        previous.style.visibility = "visible";
    }
    if (currenPage == pageMax) {
        next.style.visibility = "hidden";
    } else {
        next.style.visibility = "visible";
    }
}
let clickPage = (page) => {
    currenPage = page;
    let arrCourse = JSON.parse(localStorage.getItem("arrCourse")) || [];
    let arrClass = arrCourse.flatMap(element => element.arrClass);
    let arrStudent = arrClass.flatMap(element => element.arrStudent);
    renderStudent(currenPage, arrStudent);
}
let previousPage = () => {
    currenPage--;
    let arrCourse = JSON.parse(localStorage.getItem("arrCourse")) || [];
    let arrClass = arrCourse.flatMap(element => element.arrClass);
    let arrStudent = arrClass.flatMap(element => element.arrStudent);
    renderStudent(currenPage, arrStudent);
}
let nextPage = () => {
    currenPage++;
    let arrCourse = JSON.parse(localStorage.getItem("arrCourse")) || [];
    let arrClass = arrCourse.flatMap(element => element.arrClass);
    let arrStudent = arrClass.flatMap(element => element.arrStudent);
    renderStudent(currenPage, arrStudent);
}
// Lấy dữ liệu từ input
let getInput = () => {
    let studentId = document.getElementById("studentId").value;
    let studentName = document.getElementById("studentName").value;
    let birth = document.getElementById("birth").value;
    let address = document.getElementById("address").value;
    let status = "Chờ lớp";
    let choose = document.getElementById("sex").value;
    if (choose == "boy") {
        var sex = "Nam";
    }
    else if (choose == "girl") {
        var sex = "Nữ";
    } else {
        var sex = "unknow";
    }
    let studentObject = { studentId, studentName, birth, address, status, sex };
    let count = true;
    for (let key in studentObject) {
        if (studentObject[key] !== undefined && studentObject[key] !== null && studentObject[key] !== '') {
            count = false;
            break;
        }
    }
    if (count) {
        alert("Không được để trống!");
    }
    return studentObject;

}
// Xóa dữ liệu input
let deleInput = () => {
    document.getElementById("studentId").value = "";
    document.getElementById("studentName").value = "";
    document.getElementById("birth").value = "";
    document.getElementById("address").value = "";
    document.getElementById("email").value = "";
    document.getElementById("sex").value = "";
}
// Thêm event cho nút Thêm sinh viên
let btnSave = document.getElementById("btnSave");
btnSave.addEventListener("click", (event) => {
    event.preventDefault;
    if (action == "Create") {
        createStudent(1, arrStudent);
    } else {
        updateStudent(1, arrStudent);
    }
})
// Tạo hàm createStudent với giả thiết chỉ tạo sinh viên mới ở Class với chỉ số 0.
let createStudent = () => {
    let newStudent = getInput();
    arrCourse[0].arrClass[0].arrStudent.unshift(newStudent);
    let arrClass = arrCourse.flatMap(element => element.arrClass);
    let arrStudent = arrClass.flatMap(element => element.arrStudent);
    localStorage.setItem("arrCourse", JSON.stringify(arrCourse));
    renderStudent(1, arrStudent);
    deleInput();
}
// Tạo hàm editStudent lấy thông tin cần sửa lên input
let editStudent = (studentId) => {
    let arrCourse = localStorage.getItem("arrCourse") ? JSON.parse(localStorage.getItem("arrCourse")) : [];
    let arrClass = arrCourse.flatMap(element => element.arrClass);
    let arrStudent = arrClass.flatMap(element => element.arrStudent);
    let index = indexOfStudentId(arrStudent, studentId);
    document.getElementById("studentId").value = arrStudent[index].studentId;
    document.getElementById("studentId").readOnly = true;
    document.getElementById("studentName").value = arrStudent[index].studentName;
    document.getElementById("birth").value = arrStudent[index].birth;
    document.getElementById("address").value = arrStudent[index].address;
    document.getElementById("email").value = arrStudent[index].email;
    document.getElementById("sex").value = arrStudent[index].sex;
    let modal = new bootstrap.Modal(document.getElementById("exampleModal"));
    modal.show();
    action = "Edit";
    document.getElementById("btnSave").innerHTML = "Cập nhật";
}
// Hàm lấy vị trí của object có studentId được chọn trong arrStudent
let indexOfStudentId = (arrStudent, studentId) => {
    for (let i = 0; i < arrStudent.length; i++) {
        if (arrStudent[i].studentId == studentId) {
            return i;
        }
    }
    return -1;
}
// Tạo hàm updateStudent
let updateStudent = () => {
    let arrCourse = localStorage.getItem("arrCourse") ? JSON.parse(localStorage.getItem("arrCourse")) : [];
    let arrClass = arrCourse.flatMap(element => element.arrClass);
    let arrStudent = arrClass.flatMap(element => element.arrStudent);
    let updateObject = getInput()
    let index = indexOfStudentId(arrStudent, updateObject.studentId);
    if (index > -1) {
        arrStudent[index].studentId = updateObject.studentId;
        arrStudent[index].studentName = updateObject.studentName;
        arrStudent[index].birth = updateObject.birth;
        arrStudent[index].address = updateObject.address;
        arrStudent[index].email = updateObject.email;
        arrStudent[index].sex = updateObject.sex;
    }
    let indexOfClass = 0;
    for (let j = 0; j < arrClass.length; j++) {
        let cla = arrClass[j];
        let index = cla.arrStudent.findIndex(studentItem => studentItem.studentId === updateObject.studentId);
        if (index !== -1) {
            indexOfClass = j;
            break;
        }
    }
    arrCourse[0].arrClass[indexOfClass].arrStudent = arrStudent;
    localStorage.setItem("arrCourse", JSON.stringify(arrCourse));
    action = "Create";
    deleInput();
    document.getElementById("classId").readOnly = false;
    renderStudent(1, arrStudent);
}
// Tạo deleteStudent
let deleteStudent = (studentId) => {
    var deleteModal = document.getElementById("deleteModal");
    var confirmDelete = document.getElementById("confirmDelete");
    var cancelDelete = document.getElementById("cancelDelete");
    var studentIdDelete = null;
    studentIdDelete = studentId;
    deleteModal.style.display = "block";
    confirmDelete.addEventListener("click", () => {
        let arrCourse = localStorage.getItem("arrCourse") ? JSON.parse(localStorage.getItem("arrCourse")) : [];
        let arrClass = arrCourse.flatMap(element => element.arrClass);
        let arrStudent = arrClass.flatMap(element => element.arrStudent);
        let index = indexOfStudentId(arrStudent, studentId);
        let indexOfClass = arrClass.findIndex(cls => {
            return cls.arrStudent.findIndex(student => student.studentId === studentId) !== -1
        });
        let indexOfCourse = arrCourse.findIndex(course => {
            return course.arrClass.findIndex(cls => {
                return cls.arrStudent.findIndex(student => student.studentId === studentId) !== -1
            }) !== -1
        })
        console.log("indexOfCourse", indexOfCourse);
        arrCourse[indexOfCourse]?.arrClass[indexOfClass]?.arrStudent.splice(index, 1);
        arrClass[indexOfClass]?.arrStudent.splice(index, 1);
        arrStudent.splice(index, 1);
        localStorage.setItem("arrCourse", JSON.stringify(arrCourse));
        renderStudent(1, arrStudent);
        deleteModal.style.display = "none";
    });
    cancelDelete.addEventListener("click", () => {
        deleteModal.style.display = "none";
    });
}


// Tạp event Search
let btnSearch = document.getElementById("btnSearch");
btnSearch.addEventListener("click", (event) => {
    event.preventDefault();
    let arrCourse = localStorage.getItem("arrCourse") ? JSON.parse(localStorage.getItem("arrCourse")) : [];
    let arrClass = arrCourse.flatMap(element => element.arrClass);
    let arrStudent = arrClass.flatMap(element => element.arrStudent);
    let searchValue = document.getElementById("classNameSearch").value;
    let arrStudentSearch = arrStudent.filter(studentfind => studentfind.studentName.includes(searchValue));
    renderStudent(1, arrStudentSearch);
})
// Tạo Sắp xếp
let sortClass = () => {
    let arrCourse = localStorage.getItem("arrCourse") ? JSON.parse(localStorage.getItem("arrCourse")) : [];
    let arrClass = arrCourse.flatMap(element => element.arrClass);
    let arrStudent = arrClass.flatMap(element => element.arrStudent);
    let sortValue = document.getElementById("sort").value;
    switch (sortValue) {
        case "studentNameASC":
            arrStudent.sort((a, b) => (a.studentName > b.studentName) ? 1 : (a.studentName < b.studentName) ? - 1 : 0);
            break;
        case "studentNameDESC":
            arrStudent.sort((a, b) => (a.studentName > b.studentName) ? -1 : (a.studentName < b.studentName) ? 1 : 0);
            break;
        case "statusASC":
            arrStudent.sort((a, b) => (a.status > b.status) ? 1 : (a.status < b.status) ? - 1 : 0);
            break;
        case "statusDESC":
            arrStudent.sort((a, b) => (a.status > b.status) ? -1 : (a.status < b.status) ? 1 : 0);
            break;
    }
    localStorage.setItem("arrCourse", JSON.stringify(arrCourse));
    renderStudent(1, arrStudent);
}
// Đăng xuất
var logOutButton = document.getElementById("logOutButton");
var logOut = document.getElementById("logOut");
var confirmOut = document.getElementById("confirmOut");
var cancelOut = document.getElementById("cancelOut");
logOutButton.addEventListener("click", () => {
    logOut.style.display = "block";
})
confirmOut.addEventListener("click", () => {
    logOut.style.display = "none";
    window.location.href = "login_page.html"
})
cancelOut.addEventListener("click", () => {
    logOut.style.display = "none";
})
let arrCourseOnload = localStorage.getItem("arrCourse") ? JSON.parse(localStorage.getItem("arrCourse")) : [];
let arrClassOnload = arrCourseOnload.flatMap(element => element.arrClass);
let arrStudentOnload = arrClassOnload.flatMap(element => element.arrStudent);
// Load trang đầu tiên khi xuất hiện
document.onload = renderStudent(1, arrStudentOnload);