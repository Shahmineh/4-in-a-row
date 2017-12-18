
class HighScore extends Base {
    constructor() {
        super();
        this.highScoreList = [];
        return JSON._load('winner_and_score')
        .then((data)=>{
            this.highScoreList=this.highScoreList.push(data.app);
        });
        this.name=name;
        this.score=score;
        this.ai=ai;
        this.level=level;
        this.vsHuman=[];
        this.vsEasy=[];
        this.vsHard=[];
        
    }


    template(){
        return `
        <tr>
        <th class="${this.rank}">${this.rank}</th>
        <td class="${this.name}">${this.name}</td>
        <td class="${this.score}">${this.score}</td>
        </tr>
                 
        `
    }
    
}

