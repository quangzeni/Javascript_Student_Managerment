let arrCourse = JSON.parse(localStorage.getItem("arrCourse")) || [];
let rowPerPage = 10;
let action = "Create";
let currenPage = 1;
renderCourse = (page, arrCourse) => {
    pageMax = Math.ceil(arrCourse.length / rowPerPage);
    if (page < 1) {
        page = 1;
    }
    else if (page > pageMax) {
        page = pageMax;
    }
    let iMin = (page - 1) * rowPerPage;
    let iMax;
    if (page * rowPerPage > arrCourse.length) {
        iMax = arrCourse.length;
    }
    else {
        iMax = page * rowPerPage;
    }
    let content = document.getElementById("content");
    content.innerHTML = "";
    // Render dữ liệu lên elemen tbody của table
    for (let i = iMin; i < iMax; i++) {
        content.innerHTML += `
        <tr>
            <td>${i + 1}</td>
            <td>${arrCourse[i].courseId}</td>
            <td>${arrCourse[i].courseName}</td>
            <td>${arrCourse[i].courseTime}</td>
            <td>${arrCourse[i].status}</td>
            <td>
                <button type="button" class="btn btn-secondary" onclick = editCourse('${arrCourse[i].courseId}')>Sửa</button>
                <button type="button" class="btn  btn-danger" onclick = deleteCourse('${arrCourse[i].courseId}')>Xóa</button>
            </td>
        </tr>
        `
    }
    // Render ra Pagination (phân trang)
    let listPages = document.getElementById("listPages");
    listPages.innerText = "";
    for (let i = 1; i <= pageMax; i++) {
        listPages.innerHTML += `<li class="page-item" style="list-style: none"><a class="page-link"  href="javascript:clickPage('${i}')">${i}</a></li>`
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
    renderCourse(currenPage, arrCourse);
}
let previousPage = () => {
    currenPage--;
    let arrCourse = JSON.parse(localStorage.getItem("arrCourse")) || [];
    renderCourse(currenPage, arrCourse);
}
let nextPage = () => {
    currenPage++;
    let arrCourse = JSON.parse(localStorage.getItem("arrCourse")) || [];
    renderCourse(currenPage, arrCourse);
}
// Lấy dữ liệu từ input
let getInput = () => {
    let courseId = document.getElementById("courseId").value;
    let courseName = document.getElementById("courseName").value;
    let courseTime = document.getElementById("courseTime").value;
    let status = document.querySelector("input[type = 'radio']:checked").value == "Active" ? "Hoạt động" : "Không hoạt động";
    let arrClass = [];
    let courseObject = { courseId, courseName, courseTime, status, arrClass };
    return courseObject;
}
// Xóa dữ liệu input
let deleInput = () => {
    document.getElementById("courseId").value = "";
    document.getElementById("courseName").value = "";
    document.getElementById("courseTime").value = "";
    document.getElementById("active").value = true;
}
// Thêm event cho nút Thêm
let btnSave = document.getElementById("btnSave");
btnSave.addEventListener("click", (event) => {
    event.preventDefault;
    if (action == "Create") {
        createCourse(1, arrCourse);
    } else {
        updateCourse(1, arrCourse);
    }
})
// Tạo hàm createCourse
let createCourse = () => {
    let newObject = getInput();
    arrCourse.unshift(newObject);
    localStorage.setItem("arrCourse", JSON.stringify(arrCourse));
    renderCourse(1, arrCourse);
    deleInput();
}
// Tạo hàm editCourse lấy thông tin cần sửa lên input
let editCourse = (courseId) => {
    let arrCourse = localStorage.getItem("arrCourse") ? JSON.parse(localStorage.getItem("arrCourse")) : [];
    let index = indexOfCourseId(arrCourse, courseId);
    document.getElementById("courseId").value = arrCourse[index].courseId;
    document.getElementById("courseId").readOnly = true;
    document.getElementById("courseName").value = arrCourse[index].courseName;
    document.getElementById("courseTime").value = arrCourse[index].courseTime;
    if (arrCourse[index].status === "Hoạt động") {
        document.getElementById("active").checked = true;
    }
    else {
        document.getElementById("inActive").checked = true;
    }
    let modal = new bootstrap.Modal(document.getElementById("exampleModal"));
    modal.show();
    action = "Edit";
}
// Hàm lấy thứ tự của object có id được chọn trong arrCourse
let indexOfCourseId = (arrCourse, courseId) => {
    for (let i = 0; i < arrCourse.length; i++) {
        if (arrCourse[i].courseId == courseId) {
            return i;
        }
    }
    return -1;
}
// Tạo hàm updateCourse
let updateCourse = () => {
    let arrCourse = localStorage.getItem("arrCourse") ? JSON.parse(localStorage.getItem("arrCourse")) : [];
    let updateObject = getInput()
    let index = indexOfCourseId(arrCourse, updateObject.courseId);
    if (index > -1) {
        arrCourse[index].courseId = updateObject.courseId;
        arrCourse[index].courseName = updateObject.courseName;
        arrCourse[index].courseTime = updateObject.courseTime;
        arrCourse[index].status = updateObject.status;
    }
    localStorage.setItem("arrCourse", JSON.stringify(arrCourse));
    deleInput();
    action = "Create";
    document.getElementById("courseId").readOnly = false;
    renderCourse(1, arrCourse);
}
// Tạo deleteCourse
// let deleteCourse = (courseId) => {
//     let arrCourse = localStorage.getItem("arrCourse") ? JSON.parse(localStorage.getItem("arrCourse")) : [];
//     let index = indexOfCourseId(arrCourse, courseId);
//     arrCourse.splice(index, 1);
//     localStorage.setItem("arrCourse", JSON.stringify(arrCourse));
//     renderCourse(1, arrCourse);
// }
// Tạo deleteCourse
let deleteCourse = (courseId) => {
    var deleteModal = document.getElementById("deleteModal");
    var confirmDelete = document.getElementById("confirmDelete");
    var cancelDelete = document.getElementById("cancelDelete");
    var courseIdDelete = null;
    courseIdDelete = courseId;
    deleteModal.style.display = "block";
    confirmDelete.addEventListener("click", () => {
        let arrCourse = localStorage.getItem("arrCourse") ? JSON.parse(localStorage.getItem("arrCourse")) : [];
        let index = indexOfCourseId(arrCourse, courseIdDelete);
        arrCourse.splice(index, 1);
        localStorage.setItem("arrCourse", JSON.stringify(arrCourse));
        renderCourse(1, arrCourse);
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
    let searchValue = document.getElementById("courseNameSearch").value;
    let arrCourseSearch = arrCourse.filter(course => course.courseName.includes(searchValue));
    renderCourse(1, arrCourseSearch);
})
// Tạo Sắp xếp
let sortCourse = () => {
    let arrCourse = localStorage.getItem("arrCourse") ? JSON.parse(localStorage.getItem("arrCourse")) : [];
    let sortValue = document.getElementById("sort").value;
    switch (sortValue) {
        case "courseNameASC":
            arrCourse.sort((a, b) => (a.courseName > b.courseName) ? 1 : (a.courseName < b.courseName) ? - 1 : 0);
            break;
        case "courseNameDESC":
            arrCourse.sort((a, b) => (a.courseName > b.courseName) ? -1 : (a.courseName < b.courseName) ? 1 : 0);
            break;
    }
    localStorage.setItem("arrCourse", JSON.stringify(arrCourse));
    renderCourse(1, arrCourse);
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
// Load trang đầu tiên khi xuất hiện
document.onload = renderCourse(1, arrCourseOnload);