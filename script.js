// object to store work hours 9am-5pm with three indicators: time, text, and value 
var hour = [
  { time: "9 am", text: "", val: 9 },
  { time: "10 am", text: "", val: 10 },
  { time: "11 am", text: "", val: 11 },
  { time: "12 pm", text: "", val: 12 },
  { time: "1 pm", text: "", val: 13 },
  { time: "2 pm", text: "", val: 14 },
  { time: "3 pm", text: "", val: 15 },
  { time: "4 pm", text: "", val: 16 },
  { time: "5 pm", text: "", val: 17 },
];

// Format current date to the variable
var date = moment().format('dddd, MMMM Do, YYYY');
// show current date on page and time on row
$("#currentDay").text(date);
var currentT =moment().format('H');
// load saved user text 
$(document).ready(function () {
  $("textarea").each(function () {
    var userText = $(this)
    for (var i = 0; i < window.localStorage.length; i++) {
      var keyName = window.localStorage.key([i])
      var time = $(this).siblings("div").attr("id");
      // makes sure key and time matches to get text value from local storage
      if (keyName == time) {
        userText.val(JSON.parse(localStorage.getItem(keyName)));
      }
    }
  })
})

// selects each time in object
$.each(hour, function (index, item) {
  // create row for each hour block  
  var row = $("<div>").addClass("row time-block");
  // using bootstrap for row and set width 
  var timeDiv = $("<div>").text(item.time).addClass("hour col-1").attr("id", item.time);
  //using bootrap for input and display
  var taskText = $("<textarea>").attr("placeholder", "").addClass(" description col-10");
  // adds save button using bootstrap
  var saveButton = $("<button>").addClass("saveBtn col-1").html("<p>&#128190</p>")
  // append input section and save button to the row 
  row.append(timeDiv, taskText, saveButton);
  // append the row to the container div 
  $(".container").append(row);
  // checks if timeblock hour amount is correct
  if (item.val > currentT) {
    taskText.addClass("future");
  } else if (item.val == currentT) {
    taskText.addClass("present");
  } else {
    taskText.addClass("past");
  }
});

// create the save button
$(".saveBtn").each(function (index, item) {
  // click button to save user text to local storage
  $(this).on("click", function () {
    var userText = $(this).siblings("textarea").val();
    var time = $(this).siblings("div").attr("id");

    // save usertext to local storage
    localStorage.setItem(time, JSON.stringify(userText));
  })
})