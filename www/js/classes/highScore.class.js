
class HighScore extends Base {
    constructor() {
        super();
        this.highScoreList = [];
    }

    init() {
        return JSON._load('winner_and_score')
            .then((data) => {
                this.highScoreList = data.app;
                this.sortList(this.highScoreList);
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

    sortList(array) {
        array.sort(function (a, b) {
            return a.score - b.score;
        })

    }
}

