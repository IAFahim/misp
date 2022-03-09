import IR from "./instructionReference.js";
class Misp {
    constructor(cin_id, text_misp_id) {
        this._cin_textarea = document.getElementById(cin_id);
        this._text_misp_p = document.getElementById(text_misp_id);
        this._ir = new IR();
        this._cin_textarea.value = "add $t0 $t0 $0";
        this.textSet();
        this._cin_textarea.addEventListener("input", (ev => {
            this.textSet();
        }));
    }
    textSet() {
        let text = this._cin_textarea.value;
        let line = text.split("\n");
        let out = [];
        for (let i = 0; i < line.length; i++) {
            out.push(this._ir.parse(line[i]));
        }
        this._text_misp_p.innerText = out.join("\n");
    }
}
new Misp("cin", "text-MISP");
//# sourceMappingURL=misp.js.map