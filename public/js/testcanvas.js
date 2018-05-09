$(() => {
    const socket = io();

    $("#addone").click(() => {
        console.log('clicked upvote');
        socket.emit("upvote", 1);
    });
    socket.on("upvote", val => {
        console.log('received upvote');
        myChart.data.datasets[0].data[1] += val;
        myChart.update();
    });


});

var ctx = document.getElementById("myChart");

var data = [12, 10, 4, 8];

var labels = ["A", "B", "C", "D", "E", "F"];
labels = labels.slice(0, data.length);

var type = "bar";

var myChart = new Chart(ctx, {
    type: type,
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