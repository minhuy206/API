function UserService() {
  this.getUserAPI = function () {
    return axios({
      url: "https://6385cb06beaa645826688fa9.mockapi.io/user",
      method: "GET",
    });
  };

  this.addUserAPI = function (user) {
    return axios({
      url: "https://6385cb06beaa645826688fa9.mockapi.io/user",
      method: "POST",
      data: user,
    });
  };

  this.deleteUserAPI = function (id) {
    return axios({
      url: `https://6385cb06beaa645826688fa9.mockapi.io/user/${id}`,
      method: "DELETE",
    });
  };

  this.getUserByIdAPI = function (id) {
    return axios({
      url: `https://6385cb06beaa645826688fa9.mockapi.io/user/${id}`,
      method: "GET",
    });
  };

  this.updateUserAPI = function (user) {
    return axios({
      url: `https://6385cb06beaa645826688fa9.mockapi.io/user/${user.id}`,
      method: "PUT",
      data: user,
    });
  };
}
