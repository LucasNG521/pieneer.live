class ChartDetails {
    constructor(type, labels, nameOfTable, data = [], bgc = [], bdc = [], bdw = 1) {
        this.types = type;
        this.labels = labels;
        this.labelOfTable = nameOfTable;
        this.datas = data;
        this.bgc = bgc;
        this.bdc = bdc;
        this.bdw = bdw;
    }
    // To output to Chart object
    chartDetailInJson() {
        return {
            type: this.types,
            data: {
                labels: this.labels,
                datasets: [{
                    label: this.labelOfTable,
                    data: this.datas,
                    backgroundColor: this.bgc,
                    borderColor: this.bdc,
                    borderWidth: this.bdw
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
        }
    }
}

module.exports = ChartDetails;