class Misp {
    _cin_textarea: HTMLTextAreaElement;
    _text_misp_p: HTMLElement;
    _String;
    _String_old;

    constructor(cin_id: string, text_misp_id) {
        this._cin_textarea = document.getElementById(cin_id) as HTMLTextAreaElement;
        this._text_misp_p = document.getElementById(text_misp_id) as HTMLElement;

        this._cin_textarea.addEventListener("input", (ev => {
            this.textSet();
        }))

    }

    textSet() {
        this._text_misp_p.innerText = this._cin_textarea.value;
    }
}

new Misp("cin", "text-MISP")