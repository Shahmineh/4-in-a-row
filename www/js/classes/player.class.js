class Player extends Base {

    constructor(config) {
        super();
        this.name = config.name;
        this.color = config.color;
        this.playerNo = config.playerNo;
        this.playerEl = config.playerEl;
    }

    render(el, templateNo) {
        super.render(el, templateNo);
        let nameEl = $(el).find(".player-name");
        if (nameEl.length > 0) {
            nameEl.val(this.name);
        }
    }

    keyup(element, instances, event) {
        if (element.hasClass('player-name')) {
            this.name = $(element).val();
        }
    }

    template() {
        return `
        <div class="card ">
        <div class="card-body">
          <h4 class="card-title" for="player1name"><div class="player${this.playerNo} winner-player-coin"></div> Spelare ${this.playerNo}</h4>
          <div class="input-group">
            <span class="input-group-addon">Namn</span>
            <input type="text" class="form-control player-name" value="${this.name}">
          </div>

          <div class="form-check mt-3">
            <label class="form-check-label">
              <input type="checkbox" class="form-check-input ai-check-${this.playerNo}"> Spela som datorspelare
            </label>
          </div>
          <div class="mt-3">
        </div>
      </div>
        `;
    }

    template2() {
        return `
          <div class="card current-player">
            <div class="card-block">
              <h2>
              <div class="current-player-coin player${this.playerNo}"></div>
                ${this.name}

              </h2>
            </div>
          </div>
          `;
    }
}
