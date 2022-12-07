function TeacherService() {
  this.getTeacherAPI = function () {
    return axios({
      url: "https://6385cb06beaa645826688fa9.mockapi.io/user",
      method: "GET",
    });
  };
}
