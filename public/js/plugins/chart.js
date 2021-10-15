var App = App || (App = {});
App.ui = App.ui || (App.ui = {})

/*
    App.ui components all time connected with /api/v1/get/data[TOKEN]/data[sensor]
*/


/*
    data:{
        sensor:"STRING"  ::  "temperature" 
        label:"STRING"   ::  "Tarla 1 Sıcaklık"
        color:"STRING"   ::  "red"
    }

*/

App.ui.chart = function (data, parent) {
    var el = document.createElement("canvas");
    el.setAttribute("width", "412");
    el.setAttribute("height", "312");
    parent.append(el);


    //var color = Chart.helpers.color

    var chart = new Chart(el.getContext('2d'), {
        type: 'line',
        data: {
            datasets: [
                {
                    label: data.label,
                    backgroundColor: "#0099CC",
                    borderColor: "#66CCCC",
                    fill: false,
                    data: [],
                    borderWidth: 4,
                    pointStyle: "circle",
                    pointRadius: 3


                }
            ]
        },
        options: {
            responsive: false,
            title: {
                display: true,
                text: data.label
            },
            scales: {
                xAxes: [{
                    type: 'time',
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'time',
                        fontStyle: "bold",
                        fontColor: ""

                    },
                    ticks: {
                        major: {
                            display: true,
                            //labelString: "jsabjb",
                            fontStyle: 'bold',
                            fontColor: 'black'
                        }
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        fontStyle: 'bold',
                        labelString: 'value'

                    }
                }]
            }

        }
    });








    chart._update_ = () => {
        Ajax.Json("/api/v1/get/" + data.token + "/telemetry").then(e => {
            //console.log("JSON",e)
            chart.data.datasets[0].data.splice(0, chart.data.datasets[0].data.length)
            var chartData = e.map(a => ({ x: a._date, y: parseFloat(a[data.sensor]) })).forEach(a => {
                //console.log("SS:",a)
                chart.data.datasets[0].data.push(a)
            })
            chart.update();
        });
    }

    window.debug.chart = chart;

    setInterval(e => {

        chart._update_()
    }, 2500);

    return chart;

}

App.ui.chart2 = function (data, parent) {
    var el = document.createElement("canvas");
    el.setAttribute("width", "412");
    el.setAttribute("height", "312");
    parent.append(el);


    //var color = Chart.helpers.color

    var chart2 = new Chart(el.getContext('2d'), {
        type: 'bar',
        data: {
            datasets: [
                {
                    label: data.label,
                    backgroundColor: "#f27a31",
                    borderColor: "#e56517",
                    fill: false,
                    data: [],
                    borderWidth: 5,
                    // pointStyle: "circle",
                    pointRadius: 2


                }
            ]
        },
        options: {
            responsive: false,
            title: {
                display: true,
                text: data.label
            },
            scales: {
                xAxes: [{
                    type: 'time',
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'time',
                        fontStyle: "bold",


                    },
                    // ticks: {
                    //     major: {
                    //         display: true,
                    //         //labelString: "jsabjb",
                    //         fontStyle: 'bold',
                    //         fontColor: 'black'
                    //     }
                    // }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        fontStyle: 'bold',
                        labelString: 'value'
                    }
                }]
            }

        }
    });








    chart2._update_ = () => {
        Ajax.Json("/api/v1/get/" + data.token + "/telemetry").then(e => {
            //console.log("JSON",e)
            chart2.data.datasets[0].data.splice(0, chart2.data.datasets[0].data.length)
            var chartData = e.map(a => ({ x: a._date, y: parseFloat(a[data.sensor]) })).forEach(a => {
                //console.log("SS:",a)
                chart2.data.datasets[0].data.push(a)
            })
            chart2.update();
        });
    }

    window.debug.chart2 = chart2;

    setInterval(e => {

        chart2._update_()
    }, 2500);

    return chart2;

}
