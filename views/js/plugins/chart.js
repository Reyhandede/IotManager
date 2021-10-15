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
    el.setAttribute("width", "400");
    el.setAttribute("height", "300");
    parent.append(el);




    var chart = new Chart(el.getContext('2d'), {
        type: 'line',
        data: {
            datasets: [
                {
                    label: data.label,
                    //backgroundColor: "#F40A",
                    borderColor: data.color,
                    fill: false,
                    data: [],
                    backgroundColor: ["#ee345d"]

                }
            ]
        },
        // options: {
        //     responsive: false,
        //     title: {
        //         display: true,
        //         text: data.label
        //     },
        //     scales: {
        //         xAxes: [{
        //             type: 'time',
        //             display: true,
        //             scaleLabel: {
        //                 //display: true,
        //                 //labelString: 'Date'
        //             },
        //             ticks: {
        //                 major: {
        //                     fontStyle: 'bold',
        //                     fontColor: '#FF0000'
        //                 }
        //             }
        //         }],
        //         yAxes: [{
        //             display: true,
        //             scaleLabel: {
        //                 display: true,
        //                 labelString: 'value'
        //             }
        //         }]
        //     }

        // }
    });

    // var color = Chart.helpers.color

    // var chart = new Chart(el.getContext('2d'), {
    //     type: 'line',
    //     data: {
    //         datasets: [
    //             {
    //                 label: data.label,
    //                 //backgroundColor: "#F40A",
    //                 borderColor: data.color,
    //                 fill: false,
    //                 data: []
    //                 /*
    //                     [
    //                         {x:"2021-01-20T23:43:00.458Z",y:30},
    //                         {x:"2021-01-20T23:44:00.458Z",y:26},
    //                         {x:"2021-01-20T23:45:00.458Z",y:28},
    //                         {x:"2021-01-20T23:46:00.458Z",y:24},
    //                         {x:"2021-01-20T23:47:00.458Z",y:23}
    //                     ]
    //                 */
    //             }
    //         ]
    //     },
    //     options: {
    //         responsive: false,
    //         title: {
    //             display: true,
    //             text: data.label
    //         },
    //         scales: {
    //             xAxes: [{
    //                 type: 'time',
    //                 display: true,
    //                 scaleLabel: {
    //                     //display: true,
    //                     //labelString: 'Date'
    //                 },
    //                 ticks: {
    //                     major: {
    //                         fontStyle: 'bold',
    //                         fontColor: '#FF0000'
    //                     }
    //                 }
    //             }],
    //             yAxes: [{
    //                 display: true,
    //                 scaleLabel: {
    //                     display: true,
    //                     labelString: 'value'
    //                 }
    //             }]
    //         }

    //     }
    // });

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
    }, 1000);

    return chart;

}
