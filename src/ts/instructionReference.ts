type Instruction = {
    name: string
    mnemonic: string
    format: string
    encoding: string
    binary: string
    operation: string
    formatter:string
};
export default class IR {
    _instruction: Map<string, Instruction>;
    _reg: Map<string, string>;

    constructor() {
        this.opcode();
        this.reg();
    }

    private opcode() {
        this._instruction = new Map<string, Instruction>();

        this._instruction["add"] = {
            name: "Add",
            mnemonic: "add",
            format: "R",
            encoding: "000000 sssss ttttt ddddd fffffffffff",
            binary: "00000100000",
            operation: "$d = $s + $t;",
            formatter:"000000 {3} {1} {2} {0}"
        } as Instruction;

        this._instruction["and"] = {
            name: "And",
            mnemonic: "and",
            format: "R",
            encoding: "000000 sssss ttttt ddddd fffffffffff",
            binary: "00000100100",
            operation: "$d = $s + $t;",
            formatter:"000000 {3} {1} {2} {0}"
        } as Instruction;
    }

    private reg() {
        this._reg = new Map<string, string>();
        this._reg["t0"] = this._reg["8"] = "1000";
        this._reg["t1"] = this._reg["9"] = "1001";
        this._reg["t2"] = this._reg["10"] = "1010";
        this._reg["t3"] = this._reg["11"] = "1011";
        this._reg["t4"] = this._reg["12"] = "1100";
        this._reg["t5"] = this._reg["13"] = "1101";
        this._reg["t6"] = this._reg["14"] = "1110";
        this._reg["t7"] = this._reg["15"] = "1111";
    }

    parse(str: string): string {
        let srr: string[] = str.split(" ");
        if (this._instruction[srr[0].toLowerCase()]) {
            return (this._instruction[srr[0]] as Instruction).encoding;
        }

        return "";
    }

}
