// Giả sử chỉ nhập dữ liệu vào Course có name RA01
let arrCourse = JSON.parse(localStorage.getItem("arrCourse")) || [];
let arrClass = arrCourse.flatMap(element => element.arrClass);
let rowPerPage = 10;
let action = "Create";
let currenPage = 1;
renderClass = (page, arrClass) => {
    pageMax = Math.ceil(arrClass.length / rowPerPage);
    if (page < 1) {
        page = 1;
    }
    else if (page > pageMax) {
        page = pageMax;
    }
    let iMin = (page - 1) * rowPerPage;
    let iMax;
    if (page * rowPerPage > arrClass.length) {
        iMax = arrClass.length;
    }
    else {
        iMax = page * rowPerPage;
    }
    let content = document.getElementById("content");
    content.innerHTML = "";
    let courseName = "";
    // Render dữ liệu lên elemen tbody của table
    for (let i = iMin; i < iMax; i++) {
        let indexOfCourse = 0;
        for (let j = 0; j < arrCourse.length; j++) {
            let course = arrCourse[j];
            // Tìm kiếm trong mảng arrClass của mỗi phần tử course
            let indexInClass = course.arrClass.findIndex(classItem => classItem.classId === arrClass[i].classId);
            // Nếu tìm thấy, lưu lại index của course và thoát khỏi vòng lặp
            if (indexInClass !== -1) {
                indexOfCourse = j;
                break;
            }
        }
        content.innerHTML += `
        <tr>
            <td>${i + 1}</td>
            <td>${arrClass[i].classId}</td>
            <td>${arrClass[i].className}</td>
            <td>${arrClass[i].lecturer}</td>
            <td>${arrClass[i].discription}</td>
            <td>${arrClass[i].totalMember}</td>
            <td>${arrClass[i].status}</td>
            <td>${arrCourse[indexOfCourse].courseName}</td>
            <td>
                <button type="button" class="btn btn-secondary"  onclick = editClass('${arrClass[i].classId}')>Sửa</button>
                <button type="button" class="btn btn-danger" onclick = deleteClass('${arrClass[i].classId}')>Xóa</button>
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
    renderClass(currenPage, arrClass);
}
let previousPage = () => {
    currenPage--;
    let arrCourse = JSON.parse(localStorage.getItem("arrCourse")) || [];
    let arrClass = arrCourse.flatMap(element => element.arrClass);
    renderClass(currenPage, arrClass);
}
let nextPage = () => {
    currenPage++;
    let arrCourse = JSON.parse(localStorage.getItem("arrCourse")) || [];
    let arrClass = arrCourse.flatMap(element => element.arrClass);
    renderClass(currenPage, arrClass);
}
// Lấy dữ liệu từ input
let getInput = () => {
    let classId = document.getElementById("classId").value;
    let className = document.getElementById("className").value;
    let lecturer = document.getElementById("lecturer").value;
    let totalMember = document.getElementById("totalMember").value;
    let discription = document.getElementById("discription").value;
    let choose = document.getElementById("status").value;
    if (choose == "active") {
        var status = "Hoạt động";
    }
    else if (choose == "pending") {
        var status = "Đang chờ";
    } else {
        var status = "Kết thúc";
    }
    let arrStudent = [];
    let classObject = { classId, className, lecturer, totalMember, discription, status, arrStudent };
    let count = true;
    for (let key in classObject) {
        if (classObject[key] !== undefined && classObject[key] !== null && classObject[key] !== '') {
            count = false;
            break;
        }
    }
    if (count) {
        alert("Không được để trống!");
    }
    return classObject;

}
// Xóa dữ liệu input
let deleInput = () => {
    document.getElementById("classId").value = "";
    document.getElementById("className").value = "";
    document.getElementById("lecturer").value = "";
    document.getElementById("totalMember").value = "";
    document.getElementById("discription").value = "";
    document.getElementById("status").value = "";
}
// Thêm event cho nút Thêm
let btnSave = document.getElementById("btnSave");
btnSave.addEventListener("click", (event) => {
    event.preventDefault;
    if (action == "Create") {
        createClass(1, arrClass);
    } else {
        updateClass(1, arrClass);
    }
})
// Tạo hàm createClass với giả thiết chỉ tạo lớp mới ở Course với chỉ số 0.
let createClass = () => {
    let newClass = getInput();
    arrCourse[0].arrClass.unshift(newClass);
    // Update lớp học vào khóa học nào ?????????????????????????????????????????
    // arrCourse[0].arrClass = arrClass;
    let arrClass = arrCourse.flatMap(element => element.arrClass);
    localStorage.setItem("arrCourse", JSON.stringify(arrCourse));
    renderClass(1, arrClass);
    deleInput();
}
// Tạo hàm editClass lấy thông tin cần sửa lên input
let editClass = (classId) => {
    let arrCourse = localStorage.getItem("arrCourse") ? JSON.parse(localStorage.getItem("arrCourse")) : [];
    let arrClass = arrCourse.flatMap(element => element.arrClass);
    let index = indexOfClassId(arrClass, classId);
    document.getElementById("classId").value = arrClass[index].classId;
    document.getElementById("classId").readOnly = true;
    document.getElementById("className").value = arrClass[index].className;
    document.getElementById("lecturer").value = arrClass[index].lecturer;
    document.getElementById("totalMember").value = arrClass[index].totalMember;
    document.getElementById("discription").value = arrClass[index].discription;
    document.getElementById("status").value = arrClass[index].status;
    let modal = new bootstrap.Modal(document.getElementById("exampleModal"));
    modal.show();
    action = "Edit";
    document.getElementById("btnSave").innerHTML = "Cập nhật";
}
// Hàm lấy thứ tự của object có id được chọn trong arrClass
let indexOfClassId = (arrClass, classId) => {
    for (let i = 0; i < arrClass.length; i++) {
        if (arrClass[i].classId == classId) {
            return i;
        }
    }
    return -1;
}
// Tạo hàm updateClass
let updateClass = () => {
    let arrCourse = localStorage.getItem("arrCourse") ? JSON.parse(localStorage.getItem("arrCourse")) : [];
    let arrClass = arrCourse.flatMap(element => element.arrClass);
    let updateObject = getInput()
    let index = indexOfClassId(arrClass, updateObject.classId);
    if (index > -1) {
        arrClass[index].classId = updateObject.classId;
        arrClass[index].className = updateObject.className;
        arrClass[index].lecturer = updateObject.lecturer;
        arrClass[index].totalMember = updateObject.totalMember;
        arrClass[index].discription = updateObject.discription;
        arrClass[index].status = updateObject.status;
        // chưa chắc với status
    }
    let indexOfCourse = 0;
    for (let j = 0; j < arrCourse.length; j++) {
        let course = arrCourse[j];
        let indexInClass = course.arrClass.findIndex(classItem => classItem.classId === updateObject.classId);
        if (indexInClass !== -1) {
            indexOfCourse = j;
            break;
        }
    }
    arrCourse[indexOfCourse].arrClass = arrClass;
    localStorage.setItem("arrCourse", JSON.stringify(arrCourse));
    action = "Create";
    deleInput();
    document.getElementById("classId").readOnly = false;
    renderClass(1, arrClass);
}
let deleteClass = (classId) => {
    var deleteModal = document.getElementById("deleteModal");
    var confirmDelete = document.getElementById("confirmDelete");
    var cancelDelete = document.getElementById("cancelDelete");
    var classIdDelete = null;
    classIdDelete = classId;
    deleteModal.style.display = "block";
    confirmDelete.addEventListener("click", () => {
        let arrCourse = localStorage.getItem("arrCourse") ? JSON.parse(localStorage.getItem("arrCourse")) : [];
        let arrClass = arrCourse.flatMap(element => element.arrClass);
        let index = indexOfClassId(arrClass, classId);
        for (let i = 0; i < arrCourse.length; i++) {
            let course = arrCourse[i];
            let indexInClass = course.arrClass.findIndex(classItem => classItem.classId === arrClass[index].classId);
            if (indexInClass !== -1) {
                indexOfCourse = i;
                break;
            }
        }
        arrCourse[indexOfCourse].arrClass.splice(index, 1);
        arrClass.splice(index, 1);
        localStorage.setItem("arrCourse", JSON.stringify(arrCourse));
        renderClass(1, arrClass);
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
    let searchValue = document.getElementById("classNameSearch").value;
    let arrClassSearch = arrClass.filter(classfind => classfind.className.includes(searchValue));
    renderClass(1, arrClassSearch);
})
// Tạo Sắp xếp
let sortClass = () => {
    let arrCourse = localStorage.getItem("arrCourse") ? JSON.parse(localStorage.getItem("arrCourse")) : [];
    let arrClass = arrCourse.flatMap(element => element.arrClass);
    let sortValue = document.getElementById("sort").value;
    switch (sortValue) {
        case "classNameASC":
            arrClass.sort((a, b) => (a.className > b.className) ? 1 : (a.className < b.className) ? - 1 : 0);
            break;
        case "classNameDESC":
            arrClass.sort((a, b) => (a.className > b.className) ? -1 : (a.className < b.className) ? 1 : 0);
            break;
        case "statusASC":
            arrClass.sort((a, b) => (a.status > b.status) ? 1 : (a.status < b.status) ? - 1 : 0);
            break;
        case "statusDESC":
            arrClass.sort((a, b) => (a.status > b.status) ? -1 : (a.status < b.status) ? 1 : 0);
            break;
    }
    localStorage.setItem("arrCourse", JSON.stringify(arrCourse));
    renderClass(1, arrClass);
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
// Load trang đầu tiên khi xuất hiện
document.onload = renderClass(1, arrClassOnload);