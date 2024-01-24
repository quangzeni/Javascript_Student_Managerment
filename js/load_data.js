let arrCourse = [
    {
        courseId: "RA01",
        courseName: "Khóa học 1",
        courseTime: 1000,
        status: "Hoạt động",
        arrClass: [
            {
                classId: "C001",
                className: "HN-JV230508",
                lecturer: "QuangND",
                discription: "Java fullstack",
                totalMember: 3,
                status: "Hoạt động",
                arrStudent: [
                    {
                        studentId: "SV001",
                        studentName: "Nguyễn Văn A",
                        birth: 2000,
                        address: "Hà Nội",
                        email: "rikkei@gmail.com",
                        phone: "0123456678",
                        sex: "Nữ", status: "Chờ lớp"
                    },
                    {
                        studentId: "SV002",
                        studentName: "Nguyễn Văn B",
                        birth: 2001,
                        address: "Hà Nội2",
                        email: "rikkei@gmail.com",
                        phone: "0123456678",
                        sex: "Nam",
                        status: "Đang học"
                    },
                    {
                        studentId: "SV003",
                        studentName: "Nguyễn Văn C",
                        birth: 2002,
                        address: "Hà Nội3",
                        email: "rikkei@gmail.com",
                        phone: "0123456678",
                        sex: "Nam",
                        status: "Bảo lưu"
                    }
                ]
            },
            {
                classId: "C002",
                className: "HN-JV230608",
                lecturer: "PhuND",
                discription: "Java fullstack",
                totalMember: 2,
                status: "Hoạt động",
                arrStudent: [
                    {
                        studentId: "SV004",
                        studentName: "Nguyễn Văn D",
                        birth: 2004,
                        address: "Hà Nội4",
                        email: "rikkei@gmail.com",
                        phone: "0123456678",
                        sex: "Nam",
                        status: "Đang học"
                    },
                    {
                        studentId: "SV005",
                        studentName: "Nguyễn Văn E",
                        birth: 2005,
                        address: "Hà Nội5",
                        email: "rikkei@gmail.com",
                        phone: "0123456678",
                        sex: "Nam",
                        status: "Đang học"
                    }
                ]
            },

        ]
    },
    {
        courseId: "RA02",
        courseName: "Khóa học 2",
        courseTime: 1002,
        status: "Không hoạt động",
        arrClass: [
            {
                classId: "C003",
                className: "HN-JV230711",
                lecturer: "GiangND",
                discription: "Java",
                totalMember: 3,
                status: "Đang chờ",
                arrStudent: [
                    {
                        studentId: "SV006",
                        studentName: "Nguyễn Văn G",
                        birth: 2000,
                        address: "Hà Nội",
                        email: "rikkei@gmail.com",
                        phone: "0123456678",
                        sex: "Nam", status: "Đang học"
                    },
                    {
                        studentId: "SV007",
                        studentName: "Nguyễn Văn H",
                        birth: 2001,
                        address: "Hà Nội6",
                        email: "rikkei@gmail.com",
                        phone: "0123456678",
                        sex: "Nam",
                        status: "Đang học"
                    },
                    {
                        studentId: "SV008",
                        studentName: "Nguyễn Văn Q",
                        birth: 2008,
                        address: "Hà Nội7",
                        email: "rikkei@gmail.com",
                        phone: "0123456678",
                        sex: "Nam",
                        status: "Đang học"
                    }
                ]
            },
            {
                classId: "C004",
                className: "HN-JV230901",
                lecturer: "ToanND",
                discription: "Fullstack",
                totalMember: 2,
                status: "Kết thúc",
                arrStudent: [
                    {
                        studentId: "SV009",
                        studentName: "Nguyễn Văn X",
                        birth: 2014,
                        address: "Hà Nội4",
                        email: "rikkei@gmail.com",
                        phone: "0123456678",
                        sex: "Nam",
                        status: "Đang học"
                    },
                    {
                        studentId: "SV010",
                        studentName: "Nguyễn Văn Y",
                        birth: 2025,
                        address: "Hà Nội5",
                        email: "rikkei@gmail.com",
                        phone: "0123456678",
                        sex: "Nam",
                        status: "Đang học"
                    }
                ]
            },

        ]
    },
    // course 3
    {
        courseId: "RA03",
        courseName: "Khóa học 3",
        courseTime: 1003,
        status: "Không hoạt động",
        arrClass: [
            {
                classId: "C005",
                className: "HN-JV230711",
                lecturer: "GiangND11",
                discription: "Java",
                totalMember: 1,
                status: "Đang chờ",
                arrStudent: [
                    {
                        studentId: "SV011",
                        studentName: "Nguyễn Văn G",
                        birth: 2000,
                        address: "Hà Nội",
                        email: "rikkei@gmail.com",
                        phone: "0123456678",
                        sex: "Nam", status: "Đang học"
                    }
                ]
            }
        ]
    },
    {
        courseId: "RA04",
        courseName: "Khóa học 4",
        courseTime: 1003,
        status: "Không hoạt động",
        arrClass: [
            {
                classId: "C006",
                className: "HN-JV230711",
                lecturer: "GiangND11",
                discription: "Java",
                totalMember: 1,
                status: "Đang chờ",
                arrStudent: [
                    {
                        studentId: "SV012",
                        studentName: "Nguyễn Văn G",
                        birth: 2000,
                        address: "Hà Nội",
                        email: "rikkei@gmail.com",
                        phone: "0123456678",
                        sex: "Nam", status: "Đang học"
                    }
                ]
            }
        ]
    },
    {
        courseId: "RA05",
        courseName: "Khóa học 5",
        courseTime: 1003,
        status: "Không hoạt động",
        arrClass: [
            {
                classId: "C007",
                className: "HN-JV230711",
                lecturer: "GiangND11",
                discription: "Java",
                totalMember: 1,
                status: "Đang chờ",
                arrStudent: [
                    {
                        studentId: "SV013",
                        studentName: "Nguyễn Văn G",
                        birth: 2000,
                        address: "Hà Nội",
                        email: "rikkei@gmail.com",
                        phone: "0123456678",
                        sex: "Nam", status: "Đang học"
                    }
                ]
            }
        ]
    },
    {
        courseId: "RA06",
        courseName: "Khóa học 6",
        courseTime: 1003,
        status: "Không hoạt động",
        arrClass: [
            {
                classId: "C008",
                className: "HN-JV230711",
                lecturer: "GiangND11",
                discription: "Java",
                totalMember: 1,
                status: "Đang chờ",
                arrStudent: [
                    {
                        studentId: "SV014",
                        studentName: "Nguyễn Văn G",
                        birth: 2000,
                        address: "Hà Nội",
                        email: "rikkei@gmail.com",
                        phone: "0123456678",
                        sex: "Nam", status: "Đang học"
                    }
                ]
            }
        ]
    },
    {
        courseId: "RA07",
        courseName: "Khóa học 7",
        courseTime: 1003,
        status: "Không hoạt động",
        arrClass: [
            {
                classId: "C009",
                className: "HN-JV230711",
                lecturer: "GiangND11",
                discription: "Java",
                totalMember: 1,
                status: "Đang chờ",
                arrStudent: [
                    {
                        studentId: "SV015",
                        studentName: "Nguyễn Văn G",
                        birth: 2000,
                        address: "Hà Nội",
                        email: "rikkei@gmail.com",
                        phone: "0123456678",
                        sex: "Nam", status: "Đang học"
                    }
                ]
            }
        ]
    },
    {
        courseId: "RA08",
        courseName: "Khóa học 8",
        courseTime: 1003,
        status: "Không hoạt động",
        arrClass: [
            {
                classId: "C010",
                className: "HN-JV230711",
                lecturer: "GiangND11",
                discription: "Java",
                totalMember: 1,
                status: "Đang chờ",
                arrStudent: [
                    {
                        studentId: "SV016",
                        studentName: "Nguyễn Văn G",
                        birth: 2000,
                        address: "Hà Nội",
                        email: "rikkei@gmail.com",
                        phone: "0123456678",
                        sex: "Nam", status: "Đang học"
                    }
                ]
            }
        ]
    },
    {
        courseId: "RA09",
        courseName: "Khóa học 9",
        courseTime: 1003,
        status: "Không hoạt động",
        arrClass: [
            {
                classId: "C011",
                className: "HN-JV230711",
                lecturer: "GiangND11",
                discription: "Java",
                totalMember: 1,
                status: "Đang chờ",
                arrStudent: [
                    {
                        studentId: "SV017",
                        studentName: "Nguyễn Văn G",
                        birth: 2000,
                        address: "Hà Nội",
                        email: "rikkei@gmail.com",
                        phone: "0123456678",
                        sex: "Nam", status: "Đang học"
                    }
                ]
            }
        ]
    },
    {
        courseId: "RA10",
        courseName: "Khóa học 10",
        courseTime: 1003,
        status: "Không hoạt động",
        arrClass: [
            {
                classId: "C012",
                className: "HN-JV230711",
                lecturer: "GiangND11",
                discription: "Java",
                totalMember: 1,
                status: "Đang chờ",
                arrStudent: [
                    {
                        studentId: "SV018",
                        studentName: "Nguyễn Văn G",
                        birth: 2000,
                        address: "Hà Nội",
                        email: "rikkei@gmail.com",
                        phone: "0123456678",
                        sex: "Nam", status: "Đang học"
                    }
                ]
            }
        ]
    },
    {
        courseId: "RA11",
        courseName: "Khóa học 11",
        courseTime: 1003,
        status: "Không hoạt động",
        arrClass: [
            {
                classId: "C013",
                className: "HN-JV230711",
                lecturer: "GiangND11",
                discription: "Java",
                totalMember: 1,
                status: "Đang chờ",
                arrStudent: [
                    {
                        studentId: "SV019",
                        studentName: "Nguyễn Văn G",
                        birth: 2000,
                        address: "Hà Nội",
                        email: "rikkei@gmail.com",
                        phone: "0123456678",
                        sex: "Nam", status: "Đang học"
                    }
                ]
            }
        ]
    },
]
// Data người dùng đăng nhập:
let arrUser = [
    {
        email: "admin@gmail.com",
        pass: "123456",
        name: "Nguyễn admin",
        status: true
    },
    {
        email: "doremon@gmail.com",
        pass: "123456",
        name: "Nguyễn Mon",
        status: true
    },
    {
        email: "nobita@gmail.com",
        pass: "123456",
        name: "Nguyễn Nô",
        status: false
    },
    {
        email: "admin1@gmail.com",
        pass: "123456",
        name: "Nguyễn admin 1",
        status: true
    },
    {
        email: "doremon1@gmail.com",
        pass: "123456",
        name: "Nguyễn Mon 1",
        status: true
    },
    {
        email: "nobita1@gmail.com",
        pass: "123456",
        name: "Nguyễn Nô 1",
        status: false
    }
]
let arrLogin = [];
localStorage.setItem("arrCourse", JSON.stringify(arrCourse));
localStorage.setItem("arrUser", JSON.stringify(arrUser));
