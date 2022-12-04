var userService = new UserService();

function getEle(id) {
  return document.getElementById(id);
}

// Lấy API
function getListUser() {
  userService
    .getUserAPI()
    .then(function (result) {
      console.log(result.data);
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
  var ngonNgu = getEle("loaiNgonNgu").value;
  var loaiND = getEle("loaiNguoiDung").value;
  var moTa = getEle("MoTa").value;
  var hinhAnh = getEle("HinhAnh").value;

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

// Thêm user
function addUser() {
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
