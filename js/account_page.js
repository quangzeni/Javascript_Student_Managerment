let arrUser = JSON.parse(localStorage.getItem("arrUser")) || [];
let rowPerPage = 10;
let action = "Create";
let currenPage = 1;
let renderAccount = (page, arrUser) => {
    pageMax = Math.ceil(arrUser.length / rowPerPage);
    if (page < 1) {
        page = 1;
    }
    else if (page > pageMax) {
        page = pageMax;
    }
    let iMin = (page - 1) * rowPerPage;
    let iMax;
    if (page * rowPerPage > arrUser.length) {
        iMax = arrUser.length;
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
            <td>${arrUser[i].email}</td>
            <td>${arrUser[i].pass}</td>
            <td>${arrUser[i].name}</td>
            <td>${arrUser[i].status}</td>
            <td>
                <button type="button" class="btn btn-secondary" onclick = lockAccount('${arrUser[i].email}')>Khóa</button>
                <button type="button" class="btn btn-danger" onclick = unlockAccount('${arrUser[i].email}')>Mở khóa</button>
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
    let arrUser = JSON.parse(localStorage.getItem("arrUser")) || [];
    renderAccount(currenPage, arrUser);
}
let previousPage = () => {
    currenPage--;
    let arrUser = JSON.parse(localStorage.getItem("arrUser")) || [];
    renderAccount(currenPage, arrUser);
}
let nextPage = () => {
    currenPage++;
    let arrUser = JSON.parse(localStorage.getItem("arrUser")) || [];
    renderAccount(currenPage, arrUser);
}
// Tạo hàm lockAccount 
var lockModal = document.getElementById("lockModal");
var confirmLock = document.getElementById("confirmLock");
var cancelLock = document.getElementById("cancelLock");
var userEmailToLock = null;
let lockAccount = (email) => {
    userEmailToLock = email; // Lưu email của người dùng cần khóa
    lockModal.style.display = "block"; // Hiển thị modal    
}
confirmLock.addEventListener("click", () => {
    let arrUser = localStorage.getItem("arrUser") ? JSON.parse(localStorage.getItem("arrUser")) : [];
    let index = indexOfCourseId(arrUser, userEmailToLock);
    arrUser[index].status = false;
    localStorage.setItem("arrUser", JSON.stringify(arrUser));
    renderAccount(1, arrUser);
    lockModal.style.display = "none";
});
cancelLock.addEventListener("click", () => {
    lockModal.style.display = "none";
});
// Tạo unlockAccount
var unlockModal = document.getElementById("unlockModal");
var confirmUnlock = document.getElementById("confirmUnlock");
var cancelUnlock = document.getElementById("cancelUnlock");
var userEmailToUnlock = null;
let unlockAccount = (email) => {
    userEmailToUnlock = email; // Lưu email của người dùng cần khóa
    unlockModal.style.display = "block"; // Hiển thị modal
}
confirmUnlock.addEventListener("click", () => {
    let arrUser = localStorage.getItem("arrUser") ? JSON.parse(localStorage.getItem("arrUser")) : [];
    let index = indexOfCourseId(arrUser, userEmailToUnlock);
    arrUser[index].status = true;
    localStorage.setItem("arrUser", JSON.stringify(arrUser));
    renderAccount(1, arrUser);
    unlockModal.style.display = "none";
});
cancelUnlock.addEventListener("click", () => {
    unlockModal.style.display = "none";
});
let indexOfCourseId = (arrUser, email) => {
    for (let i = 0; i < arrUser.length; i++) {
        if (arrUser[i].email == email) {
            return i;
        }
    }
    return -1;
}
let btnSearch = document.getElementById("btnSearch");
btnSearch.addEventListener("click", (event) => {
    event.preventDefault();
    let arrUser = localStorage.getItem("arrUser") ? JSON.parse(localStorage.getItem("arrUser")) : [];
    let searchValue = document.getElementById("accountNameSearch").value;
    let accountSearch = arrUser.filter(userarr => userarr.email.includes(searchValue));
    renderAccount(1, accountSearch);
})
// Tạo Sắp xếp
let sortAccount = () => {
    let arrUser = localStorage.getItem("arrUser") ? JSON.parse(localStorage.getItem("arrUser")) : [];
    let sortValue = document.getElementById("sort").value;
    switch (sortValue) {
        case "accountEmailASC":
            arrUser.sort((a, b) => (a.email > b.email) ? 1 : (a.email < b.email) ? - 1 : 0);
            break;
        case "accountEmailDESC":
            arrUser.sort((a, b) => (a.email > b.email) ? -1 : (a.email < b.email) ? 1 : 0);
            break;
        case "statusASC":
            arrUser.sort((a, b) => (a.status > b.status) ? 1 : (a.status < b.status) ? - 1 : 0);
            break;
        case "statusDESC":
            arrUser.sort((a, b) => (a.status > b.status) ? -1 : (a.status < b.status) ? 1 : 0);
            break;
    }
    localStorage.setItem("arrUser", JSON.stringify(arrUser));
    renderAccount(1, arrUser);
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
let arrUserOnload = localStorage.getItem("arrUser") ? JSON.parse(localStorage.getItem("arrUser")) : [];
// Load trang đầu tiên khi xuất hiện
document.onload = renderAccount(1, arrUserOnload);