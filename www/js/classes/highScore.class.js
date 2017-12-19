
class HighScore extends Base {
    constructor() {
        super();
        this.highScoreList = [];
        this.vsHuman = null;
        this.vsEasy = null;
        this.vsHard = null;
    }

    init() {
        return JSON._load('winner_and_score')
            .then((data) => {
                this.highScoreList = data.app;
                this.vsHuman = this.vsHunamFilter();
                this.vsEasy = this.vsEasyFilter();
                this.vsHard = this.vsHardFilter();
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

    vsHunamFilter() {
        let humanWinner = [];
        for (let winner of this.highScoreList) {
            if (winner.ai) {
                humanWinner.push(winner);
            }
        }
        return humanWinner;
    }

    vsEasyFilter() {
        let easyWinner = [];
        for (let winner of this.highScoreList) {
            if (!winner.ai && winner.level == 1 ) {
                easyWinner.push(winner);
            }
        }
        return easyWinner;
    }

    vsHardFilter() {
        let hardWinner = [];
        for (let winner of this.highScoreList) {
            if (!winner.ai && winner.level == 2) {
                hardWinner.push(winner);
            }
        }
        return hardWinner;
    }

    ranking() {

    }





}

