var teacherService = new TeacherService();

function getEle(id) {
  return document.getElementById(id);
}

function getListTeacher() {
  teacherService
    .getTeacherAPI()
    .then(function (result) {
      console.log(result.data);
      renderCard(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

getListTeacher();

function renderCard(data) {
  var content = "";
  data.forEach((user) => {
    if (user.loaiND === "GV") {
      content += `
      <div
            class="card wow col-lg-3 col-sm-6 animate__animated animate__fadeIn"
          >
            <div class="card__container">
              <div class="card-img-top__container" style="overflow: hidden">
                <img class="card-img-top" src="./img/${user.hinhAnh}" alt="" />
              </div>
              <div class="card-body">
                <h3>${user.ngonNgu}</h3>
                <h1>${user.hoTen}</h1>
                <p class="card-text">
                  ${user.moTa}
                </p>
              </div>
            </div>
            </div>`;
    }
  });
  getEle("listTeachers__container").innerHTML = content;
}
