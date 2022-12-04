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
    printNoti(value !== "", errorId, mess);
  };
}
