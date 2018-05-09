$(() => {
  const socket = io('/testroom');

  $("#addone").click(() => {
    console.log('clicked upvote');
    socket.emit("upvote", 1);
  });

  // $(".vote-button").click(function () {
  //   console.log("Mobile vote");
  //   socket.emit("upvote", $(this).data('vote'));
  // });

  socket.on("upvote", (val) => {
    console.log('received upvote');
    myChart.data.datasets[0].data[1] += val;
    myChart.update();
  });

  socket.on('vote', val => {
    console.log("Oh fuck");
    myChart.data.datasets[0].data[1] += 1;
    myChart.update();
  })


});


const ctx = document.getElementById("myChart");

const myChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [{
      label: "# of Votes",
      data: [12, 10, 4, 8, 12, 10],
      backgroundColor: [
        "rgba(255, 99, 132, 0.5)",
        "rgba(54, 162, 235, 0.5)",
        "rgba(255, 206, 86, 0.5)",
        "rgba(75, 192, 192, 0.5)",
        "rgba(153, 102, 255, 0.5)",
        "rgba(255, 159, 64, 0.5)"
      ],
      borderColor: [
        "rgba(255,99,132,1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
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
    }
  }
});