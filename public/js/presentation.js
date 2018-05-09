// event detail
var event = {
    title: "Presentation event title",
    presentation_id: 1,
    event_id: 2,
    location: "Hong Kong",
    date: 1525855413,   // timestamp
    slides: [
        {
            type: "image",
            link: "/html_mock-up/presentation-slide-example/slide-1.jpg" // /api/img/id
        },
        {
            type: "image",
            link: "/html_mock-up/presentation-slide-example/slide-2.jpg"
        },
        {
            type: "poll",
            id: 3,
            question: "Poll question?",
            graph_type: 'bar',
            answers: [
                "A. response 1",
                "B. response 2",
                "C. response 3",
                "D. response 4"
            ]
        },
        {
            type: "image",
            link: "/html_mock-up/presentation-slide-example/slide-4.jpg"
        },
        {
            type: "question",
            id: 4
        }
    ]
}

// drawing
var ctx = Zwibbler.create("drawing", {
    showToolbar: false,
    showColourPanel: false
});
$('.tools a').click(function (e) {
    e.preventDefault();
    if (!$(this).hasClass('selected')) {
        var action = $(this).attr('class');
        if (action == 'select') {
            ctx.usePickTool();
        } else if (action == 'pen') {
            ctx.useBrushTool({
                lineWidth: 8,
            });
        } else if (action == 'eraser') {
            ctx.useBrushTool({
                lineWidth: 8,
                strokeStyle: "erase"
            });
        } else if (action == 'line') {
            ctx.useLineTool();
        } else if (action == 'rectangle') {
            ctx.useRectangleTool();
        } else if (action == 'circle') {
            ctx.useCircleTool();
        } else if (action == 'text') {
            ctx.useTextTool();
        } else if (action == 'background') {
            $('#drawing').toggleClass('white-background');
        } else if (action == 'undo') {
            ctx.undo();
        } else if (action == 'redo') {
            ctx.redo();
        }
        if (action != 'background' && action != 'undo' && action != 'redo') {
            $('.tools a.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    }
    $(this).blur();
});
$('.colors a').click(function (e) {
    e.preventDefault();
    if (!$(this).hasClass('selected')) {
        var color = $(this).find('div').css('background-color');
        ctx.setColour(color, true);
        $('.colors a.selected').removeClass('selected');
        $(this).addClass('selected');
    }
    $(this).blur();
});
ctx.on("tool-changed", function (toolname) {
    console.log(toolname);
    if (toolname == 'pick') {
        $('.tools a.selected').removeClass('selected');
        $('.tools a.select').addClass('selected');
    }
});

console.log(event);

// load slides
var nb_slides = event.slides.length;
var current_slide = 0;

function formatDate(d) {
    d = new Date(d * 1000);
    return d.getMonth() + 1 + '/' + d.getDate() + '/' + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes();
}

// adding canvas for each slide
for (let i = 1; i <= nb_slides; i++) {
    ctx.addPage();
}

var event_date = formatDate(event.date);

$('#presentation').append(`
<div class="slide slide-0 slide-html active">
    <h1>${event.title}</h1>
    <h2>${event.location}</h2>
    <h2>${event_date}</h2>
    <div id="qrcode"></div>
</div>`);

$('#qrcode').qrcode(document.location.protocol + '//' + document.location.host + '/html_mock-up/mobile/event.html');

var i = 1;

for (slide of event.slides) {
    console.log(slide);
    var html_slide = "";
    if (slide.type == "image") {
        html_slide = `
        <div class="slide slide-${i} slide-${slide.type}">
            <img src="${slide.link}">
        </div>`;
    } else if (slide.type == "poll") {
        var responses = '';
        for (const key in slide.answers) {
            responses += `<li class="list-group-item item-${key}">${slide.answers[key]}</li>`;
        }
        html_slide = `
        <div class="slide slide-${i} slide-${slide.type}">
            <div class="question-container">
                <h1>${slide.question}</h1>
                <ul class="list-group">
                    ${responses}
                </ul>
            </div>
            <div class="chart-container">
                <canvas id="myChart-${slide.id}"></canvas>
            </div>
        </div>`;
    } else if (slide.type == "question") {
        html_slide = `
        <div class="slide slide-${i} slide-${slide.type}">
            <h1>Q&A</h1>
        </div>`;
    }
    $('#presentation').append(html_slide);
    i++;
}

// Shortcuts
$('[data-shortcut]').each(function () {
    var element = $(this);
    key = element.data('shortcut');

    $(document).on('keyup', null, String(key), function () {
        element.trigger('focus').trigger('click');
    });
});

// navigation
$('.previous-slide').click(function (e) {
    e.preventDefault();
    current_slide = (current_slide == 0) ? nb_slides : current_slide - 1;
    update_slide();
    $(this).blur();
});
$('.next-slide').click(function (e) {
    e.preventDefault();
    current_slide = (current_slide == nb_slides) ? 0 : current_slide + 1;
    update_slide();
    $(this).blur();
});
function display_chart(id) {

    var ctx = document.getElementById("myChart-" + id);

    // get init data by ajax call
    var data = [12, 10, 4, 8];

    var labels = ["A", "B", "C", "D", "E", "F"];
    labels = labels.slice(0, slide.answers.length);

    var myChart = new Chart(ctx, {
        type: slide.graph_type,
        data: {
            labels: labels,
            datasets: [{
                label: "",
                data: data,
                backgroundColor: [
                    "rgba(255, 99, 132, 0.5)",
                    "rgba(75, 192, 192, 0.5)",
                    "rgba(54, 162, 235, 0.5)",
                    "rgba(255, 206, 86, 0.5)",
                    "rgba(153, 102, 255, 0.5)",
                    "rgba(255, 159, 64, 0.5)"
                ],
                borderColor: [
                    "rgba(255,99,132,1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)"
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            legend: {
                display: false
            },
            responsive: true,
            maintainAspectRatio: false
        }
    });

    var socket = io();

    $("#addone").click(() => {
        console.log('clicked upvote');
        socket.emit("upvote", 1);
    });
    socket.on("upvote", val => {
        console.log('received upvote');
        myChart.data.datasets[0].data[1] += val;
        myChart.update();
    });
}
function update_slide() {
    $('.slide.active').removeClass('active');
    $('.slide.slide-' + current_slide).addClass('active');
    ctx.setCurrentPage(current_slide);
    $('#drawing').removeClass('white-background');

    // actions for this slide
    if (current_slide > 0) {
        slide = event.slides[current_slide - 1];
        if (slide.type == 'poll') {
            display_chart(slide.id);
        }
    }
}
var fadeout = null;
$("html").mousemove(function () {
    $(".control").stop().show();
    if (fadeout != null) {
        clearTimeout(fadeout);
    }
    fadeout = setTimeout(hide_control, 2000);
});
function hide_control() {
    $(".control").stop().hide();
}
$("html").mousemove();

// fullscreen
$('.toggle-fullscreen').click(function (e) {
    e.preventDefault();
    toggleFullScreen();
    $(this).blur();
});
function toggleFullScreen() {
    if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
}

$(function () {     // when page loaded
    // selection default tools
    $('.pen').click();
    $('.color-black').click();
    // activate tooltip
    $('[data-toggle="tooltip"]').tooltip();
});