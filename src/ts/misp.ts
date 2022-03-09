import IR from "./instructionReference.js";

class Misp {
    _cin_textarea: HTMLTextAreaElement;
    _text_misp_p: HTMLElement;
    _ir: IR;

    constructor(cin_id: string, text_misp_id) {
        this._cin_textarea = document.getElementById(cin_id) as HTMLTextAreaElement;
        this._text_misp_p = document.getElementById(text_misp_id) as HTMLElement;
        this._ir = new IR();
        this._cin_textarea.value = "add $t0 $t0 $0";
        this.textSet();
        this._cin_textarea.addEventListener("input", (ev => {
            this.textSet();
        }))

    }

    textSet() {
        let text: string = this._cin_textarea.value;
        let line:string[]=text.split("\n");
        let out =[];
        for (let i = 0; i < line.length; i++) {
            out.push(this._ir.parse(line[i]));
        }
        this._text_misp_p.innerText = out.join("\n");
    }
}

new Misp("cin", "text-MISP")