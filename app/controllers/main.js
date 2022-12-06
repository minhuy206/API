var userService = new UserService();
var validation = new Validation();
var listTaiKhoan = [];

function getEle(id) {
  return document.getElementById(id);
}

// Lấy API
function getListUser() {
  userService
    .getUserAPI()
    .then(function (result) {
      renderTable(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

getListUser();

// Hàm tạo bảng
function renderTable(data) {
  var content = "";
  data.forEach((user, index) => {
    content += `
        <tr>
        <td>${++index}</td>
        <td>${user.taiKhoan}</td>
        <td>${user.matKhau}</td>
        <td>${user.hoTen}</td>
        <td>${user.email}</td>
        <td>${user.ngonNgu}</td>
        <td>${user.loaiND}</td>
        <td>        
        <button class="btn btn-info"  data-toggle="modal"
                data-target="#myModal" onclick="editModal(${
                  user.id
                })">Edit</button>
        <button class="btn btn-danger" onclick="deleteUser(${
          user.id
        })">Delete</button>
        </td>
        </tr>
        `;
    listTaiKhoan.push(user.taiKhoan);
  });
  getEle("tblDanhSachNguoiDung").innerHTML = content;
}

// Thêm user modal
getEle("btnThemNguoiDung").onclick = function () {
  var title = "Thêm người dùng";
  document.getElementsByClassName("modal-title")[0].innerHTML = title;

  var btn = `<button class="btn btn-success" onclick="addUser()">Thêm người dùng</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = btn;
};

// Lấy thông tin user
function getUserInfo(id) {
  var taiKhoan = getEle("TaiKhoan").value;
  var hoTen = getEle("HoTen").value;
  var matKhau = getEle("MatKhau").value;
  var email = getEle("Email").value;
  var hinhAnh = getEle("HinhAnh").value;
  var loaiND = getEle("loaiNguoiDung").value;
  var ngonNgu = getEle("loaiNgonNgu").value;
  var moTa = getEle("MoTa").value;

  // Cờ
  var isValid = true;

  // Tài khoản
  isValid &=
    validation.kiemTraRong(
      taiKhoan,
      "errorTaiKhoan",
      "(*) Vui lòng nhập tài khoản!"
    ) &&
    validation.kiemTraTrungTaiKhoan(
      taiKhoan,
      "errorTaiKhoan",
      "(*) Tài khoản đã tồn tại"
    );

  // Họ tên
  isValid &=
    validation.kiemTraRong(hoTen, "errorHoTen", "(*) Vui lòng nhập họ tên!") &&
    validation.kiemTraDoDaiVaDinhDang(
      hoTen,
      /[A-Za-z]/,
      "errorHoTen",
      "(*) Vui lòng nhập họ tên đúng định dạng"
    );

  //Mật khẩu
  isValid &=
    validation.kiemTraRong(
      matKhau,
      "errorMatKhau",
      "(*) Vui lòng nhập mật khẩu!"
    ) &&
    validation.kiemTraDoDaiVaDinhDang(
      matKhau,
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,8}$/,
      "errorMatKhau",
      "(*) Vui lòng nhập mật khẩu dài 6-10 ký tự chứa ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt"
    );

  // Email
  isValid &=
    validation.kiemTraRong(email, "errorEmail", "(*) Vui lòng nhập email!") &&
    validation.kiemTraDoDaiVaDinhDang(
      email,
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "errorEmail",
      "(*) Vui lòng nhập email đúng định dạng"
    );

  //Hình ảnh
  isValid &= validation.kiemTraRong(
    hinhAnh,
    "errorHinhAnh",
    "(*) Vui lòng nhập hình ảnh!"
  );

  // Người dùng
  isValid &= validation.kiemTraChon(
    "loaiNguoiDung",
    "errorLoaiND",
    "(*) Vui lòng chọn người dùng!"
  );

  // Ngôn ngữ
  isValid &= validation.kiemTraChon(
    "loaiNgonNgu",
    "errorNgonNgu",
    "(*) Vui lòng chọn ngôn ngữ!"
  );

  // Mô tả
  isValid &=
    validation.kiemTraRong(moTa, "errorMoTa", "(*) Vui lòng nhập mô tả!") &&
    validation.kiemTraDoDaiVaDinhDang(
      moTa,
      /^\w{1,60}$/,
      "errorMoTa",
      "(*) Mô tả không được quá 60 kí tự"
    );

  if (!isValid) return false;
  var user = new User(
    id,
    taiKhoan,
    hoTen,
    matKhau,
    email,
    loaiND,
    ngonNgu,
    moTa,
    hinhAnh
  );
  return user;
}

// Thêm user
function addUser() {
  if (getUserInfo("")) {
    var user = getUserInfo("");

    userService
      .addUserAPI(user)
      .then(function (result) {
        alert("Add Success");
        getListUser();

        document.getElementsByClassName("close")[0].click();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

// Sửa user modal
function editModal(id) {
  var title = "Sửa";
  document.getElementsByClassName("modal-title")[0].innerHTML = title;

  var btn = `<button class="btn btn-success" onclick="updateUser('${id}')">Cập nhật</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = btn;
  userService
    .getUserByIdAPI(id)
    .then(function (result) {
      var user = result.data;
      getEle("TaiKhoan").value = user.taiKhoan;
      getEle("HoTen").value = user.hoTen;
      getEle("MatKhau").value = user.matKhau;
      getEle("Email").value = user.email;
      getEle("loaiNgonNgu").value = user.ngonNgu;
      getEle("loaiNguoiDung").value = user.loaiND;
      getEle("MoTa").value = user.moTa;
      getEle("HinhAnh").value = user.hinhAnh;
    })
    .catch(function (error) {
      console.log(error);
    });
}

// Xoá user
function deleteUser(id) {
  userService
    .deleteUserAPI(id)
    .then(function (result) {
      alert("Delete Succes");
      getListUser();
    })
    .catch(function (error) {
      console.log(error);
    });
}

// Cập nhật user
function updateUser(id) {
  var user = getUserInfo(id);

  userService
    .updateUserAPI(user)
    .then(function (result) {
      alert("Update Succes");
      getListUser();
      document.getElementsByClassName("close")[0].click();
    })
    .catch(function (error) {
      console.log(error);
    });
}
