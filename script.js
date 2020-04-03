var workDay = {
    "6 AM": "", "7 AM": "", "8 AM": "", "9 AM": "", "10 AM": "", "11 AM": "", "12 PM": "", "1 PM": "", "2 PM": "", "3 PM": "", "4 PM": "", "5 PM": "", "6 PM": "",
};

$(document).ready(function () {
    if (!localStorage.getItem('workDay')) {
        updateCalendarTasks(workDay);
    } else {
        updateCalendarTasks(JSON.parse(localStorage.getItem('workDay')));
    }
})

$('#currentDay').text(moment().format('dddd') + ", " + moment().format('MMMM Do YYYY, h:mm:ss a'));

var counter = 1;
for (var property in workDay) {
    var textEntry = "#text-entry" + counter;
    $(textEntry).text(workDay[property]);
    var timeId = "#time" + counter;
    var presentHour = moment().hour();
    var timeString = $(timeId).text();
    var timeNumber = hourNumString(timeString);
    if (timeNumber < presentHour) {
        $(textEntry).addClass("past");
    } else if (timeNumber > presentHour) {
        $(textEntry).addClass("future");
    } else {
        $(textEntry).addClass("present");
    }
    counter++;
}

$("button").click(function () {
    value = $(this).siblings("textarea").val();
    hourString = $(this).siblings("div").text();

    saveSchedule(hourString, value);
});

function hourNumString(hourString) {
    switch (hourString) {
        case "6 AM": return 6;
        case "7 AM": return 7;
        case "8 AM": return 8;
        case "9 AM": return 9;
        case "10 AM": return 10;
        case "11 AM": return 11;
        case "12 PM": return 12;
        case "1 PM": return 13;
        case "2 PM": return 14;
        case "3 PM": return 15;
        case "4 PM": return 16;
        case "5 PM": return 17;
        case "6 PM": return 18;
    }
}

function loadCorrectDataset() {
    result = localStorage.getItem('workDay')
    return (result ? result : workDay);
}

function initializeLocalStorage() {
    localStorage.setItem('workDay', JSON.stringify(workDay));
};

function saveToLocalStorage(dayObj) {
    localStorage.setItem('workDay', JSON.stringify(dayObj));
}

function saveSchedule(hourString, val) {
    if (!localStorage.getItem('workDay')) {
        initializeLocalStorage();
    }

    var workHours = JSON.parse(localStorage.getItem('workDay'));
    workHours[hourString] = val

    saveToLocalStorage(workHours);
}

function updateCalendarTasks(dayObject) {
    $(".calendar-row").each(function (index) {
        var res = $(this).children("div");
        $(this).children("textarea").text(dayObject[res.text()]);
    })
}