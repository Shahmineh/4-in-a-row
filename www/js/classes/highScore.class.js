
class HighScore extends Base {
    constructor() {
        super();
        this.highScoreList = [];
        // this.vsHuman = null;
        // this.vsEasy = null;
        // this.vsHard = null;
    }

    init() {
        return JSON._load('winner_and_score')
            .then((data) => {
                this.highScoreList = data.app;
                this.sortList(this.highScoreList);
                // this.vsHuman = this.vsHumanFilter(this.highScoreList);
                // this.vsEasy = this.vsEasyFilter(this.highScoreList);
                // this.vsHard = this.vsHardFilter(this.highScoreList);
            });
    }

    render(el, list) {
        let html = "";

        for (let i = 0; i < list.length; i++) {
            html += "<tr>";
            html += "<td>" + (i + 1) + "</td>";
            html += "<td>" + list[i].name + "</td>";
            html += "<td>" + list[i].score + "</td>";
            html += "</tr>";
        }



        $(el).append($(html));
    }

    // vsHumanFilter(list) {
    //     let humanWinner = [];
    //     for (let winner of list) {
    //         if (!winner.ai) {
    //             humanWinner.push(winner);
    //         }
    //     }
    //     return humanWinner;
    // }

    // vsEasyFilter(list) {
    //     let easyWinner = [];
    //     for (let winner of list) {
    //         if (!winner.ai && winner.level == 1) {
    //             easyWinner.push(winner);
    //         }
    //     }
    //     return easyWinner;
    // }

    // vsHardFilter(list) {
    //     let hardWinner = [];
    //     for (let winner of list) {
    //         if (!winner.ai && winner.level == 2) {
    //             hardWinner.push(winner);
    //         }
    //     }
    //     return hardWinner;
    // }

    sortList(array) {
        array.sort(function (a, b) {
            return a.score - b.score;
        })

    }







}

