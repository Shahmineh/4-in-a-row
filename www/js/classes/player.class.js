class Player extends Base {

    constructor(config) {
        super();
        this.name = config.name;
        this.color = config.color;
        this.ai = config.ai;
        this.difficulty = config.difficulty;
    }

    render(el) {
        super.render(el);

        let levelEl = $(el).find(".player-difficulty");
        if (levelEl.length > 0) {
            levelEl.val(this.difficulty);
        }

        let colorEl = $(el).find(".color." + this.color);
        if (colorEl.length > 0) {
            colorEl.addClass("active");
        }

        let aiEl = $(el).find(".ai-check");
        if (aiEl.length > 0) {
            aiEl.val(this.ai);
        }

        let nameEl = $(el).find(".player-name");
        if (nameEl.length > 0) {
            nameEl.val(this.name);
        }
    }

    isAI() {
        if (!this.ai) { return "checked" };
    }


    

    

   






    template() {
        return `
        <div class="card ">
        <div class="card-body">
          <h4 class="card-title" for="player1name">Player 1:</h4>
          <div class="input-group">
            <span class="input-group-addon" >Name:</span>
            <input type="text" class="form-control player-name" value="${this.name}">
          </div>

          <div class="form-check mt-3">
            <label class="form-check-label">
              <input type="checkbox" class="form-check-input ai-check" ${this.isAI()}> Play with human
            </label>
          </div>
          <div class="mt-3">
          <select class="player-difficulty mb-2 mr-sm-2 mb-sm-0">
              <option value="0">Play with computer</option>
              <option value="1">Easy</option>
              <option value="2">Hard</option>
            </select>
          </div>
          
          <div class="color_chosen">
            <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
              <div class="btn-group mr-2" role="group" aria-label="First group">
                <a type="button" class="btn btn-dark color black"></a>
                <a type="button" class="btn btn-light color white"></a>
                <a type="button" class="btn btn-danger color red"></a>
                <a type="button" class="btn btn-warning color yellow"></a>
              </div>
            </div>
          </div>

        </div>
      </div>
        `;
    }


template2(){
    return `
    <div class="card">
    <div class="card-header">
    </div>
    <div class="card-block">
    <p>${this.name}</p>
        <button class="btn ${this.color}"></button>
    </div>
  </div>
    `;
}

}