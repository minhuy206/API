function Validation() {
  this.printNoti = function (condition, errorId, mess) {
    if (condition) {
      getEle(errorId).innerHTML = "";
      getEle(errorId).style.display = "none";
      return true;
    }
    getEle(errorId).innerHTML = mess;
    getEle(errorId).style.display = "block";
    return false;
  };

  this.kiemTraRong = function (value, errorId, mess) {
    return this.printNoti(value !== "", errorId, mess);
  };

  this.kiemTraChon = function (idSelect, errorId, mess) {
    return this.printNoti(getEle(idSelect).selectedIndex > 0, errorId, mess);
  };

  this.kiemTraDoDaiVaDinhDang = function (value, letters, errorId, mess) {
    var letter = letters;
    return this.printNoti(value.match(letter), errorId, mess);
  };

  this.kiemTraTrungTaiKhoan = function (value, errorId, mess) {};
}
