$.ajax({
  type: "GET",
  url: "http://localhost:8080/MOCK_DATA.sql",
  crossDomain: true,
  dataType: "jsonp",
  success: function jsondata(data) {
    let parsedata = JSON.parse(JSON.stringify(data));
    let logindata = parsedata["Status"];

    if ("success" == logindata) {
      console.log("success");
    } else {
      console.log("failed");
    }
  }
});
