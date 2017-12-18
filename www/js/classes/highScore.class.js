
class HighScore extends Base {
    constructor() {
        super();
        this.highScoreList = [];
        return JSON._load('winner_and_score')
        .then((data)=>{
            this.highScoreList=data.app;
        });
        this.vsHuman=[];
        this.vsEasy=[];
        this.vsHard=[];
        this.ranking=[];
    }

 

    render(el, templateNo) {
        super.render(el,templateNo);
        this.vsHuman=this.vsHunamFilter();
        this.vsEasy=this. vsEasyFilter();
        this.vsHard=this. vsHardFilter();    
    }

    vsHunamFilter(){
        let humanWinner=[];
        for(let winner of this.highScoreList){
            if(winner.ai==false){
                humanWinner.push(winner);
            }
        }
        return humanWinner;
    }

    vsEasyFilter(){
        let vsEasy=[];
        for(let winner of this.highScoreList){
            if(winner.level==1){
                easyWinner.push(winner);
            }
        }
        return easyWinner;
    }

    vsHardFilter(){
        let vsEasy=[];
        for(let winner of this.highScoreList){
            if(winner.level==2){
                hardWinner.push(winner);
            }
        }
        return hardWinner;
    }





    template(){
        return `
        <tr>
        <th class="${this.vsHuman.ranking}">${this.vsHuman.ranking}</th>
        <td class="${this.vsHuman.name}">${this.vsHuman.name}</td>
        <td class="${this.vsHuman.score}">${this.vsHuman.score}</td>
        </tr>
                 
        `
    }
    
}

