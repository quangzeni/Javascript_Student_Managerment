document.getElementById("buttonLogin").addEventListener("click", (event) => {
    event.preventDefault();
    let arrUser = JSON.parse(localStorage.getItem("arrUser")) || [];
    let emailInput = document.getElementById("exampleInputEmail1").value;
    let passInput = document.getElementById("exampleInputPassword1").value;
    let count = false;
    for (let i = 0; i < arrUser.length; i++) {
        if (arrUser[i].email == emailInput && arrUser[i].pass == passInput) {
            if (arrUser[i].status == false) {
                alert("Tài khoản bị khóa. Vui lòng liên hệ Admin")
            }
            else {        
                let arrLogin = [];        
                arrLogin.unshift(emailInput)
                localStorage.setItem("arrLogin", arrLogin);
                window.location.href = "home_page.html";
            }
            count = true;
            break;
        }
    }
    if (!count) {
        document.getElementById("exampleInputEmail1").value = "";
        document.getElementById("exampleInputPassword1").value = "";
        alert("Sai mật khẩu hoặc password. Vui lòng đăng nhập lại");
    }
})