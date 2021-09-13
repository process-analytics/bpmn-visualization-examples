class Legend {
    #id;
    #theme;

    constructor(id, theme) {
        this.#id = id;
        this.#theme = theme;
    }

    update() {
        if (this.#theme.colors) {
            this._updateLegendColor(this.#theme.colors);
        }
        if (this.#theme.titles) {
            this._updateTitle(this.#theme.titles);
        }
        console.info('%s updated', this.#id);
    }

    _updateTitle(titles) {
        let ticks = document.getElementById(`${this.#id}-guide-y`).children;
        for (let i = 0; i < ticks.length; i++) {
            ticks[i].firstElementChild.innerText = titles[i];
        }
    }

    _updateLegendColor(colors) {
        document.getElementById(`${this.#id}-250`).style.backgroundColor = colors[0];
        document.getElementById(`${this.#id}-200`).style.backgroundColor = colors[1];
        document.getElementById(`${this.#id}-150`).style.backgroundColor = colors[2];
        document.getElementById(`${this.#id}-100`).style.backgroundColor = colors[3];
        document.getElementById(`${this.#id}-50`).style.backgroundColor = colors[4];
    }

}
