type Pair = {
    position: number
    count: number
}

class Instruction {
    _name: string
    _op: string
    _format: string
    _opcode_binary: string
    _operation: string
    _functionCode_binary: string
    _order: Map<string, Pair>

    constructor(name: string, op: string, type: string, opcode_binary: string, operation: string, functionCode_binary: string) {
        this._name = name;
        this._op = op;
        this._format = type.toLowerCase();
        this._opcode_binary = opcode_binary;
        this._operation = operation;
        this._functionCode_binary = functionCode_binary
        this._order = new Map<string, Pair>();
        let position: number = 0;
    }
}


class IR {
    _register: Map<string, string>;
    _type: Map<string, string>;
    _op: Map<string, Instruction>;
    _bit: number


    constructor(bit) {
        this._bit = bit;
        this._register = new Map<string, string>();
        this._type = new Map<string, string>();
        this._op = new Map<string, Instruction>();
    }

    addOp(instruction: Instruction) {
        this._op[instruction._op] = instruction;
    }

    addInstructionType(type: string, encoding: string) {
        this._type[type] = encoding;
    }


    /**
     * "t0",10 would result in _register { t0: 10 } added
     * @param name "t0"
     * @param value_decimal 10
     */

    addRegister(name: string, value_decimal: number) {
        this._register[name] = value_decimal;
    }

    /**
     * "t0-t5",10 would result in _register { t0: 10, t1: 11, t2: 12, t3: 13, t4: 14 } added
     * @param from_to_string "t0-t5"
     * @param start 10
     */

    addRegisterRange(from_to_string: string, start: number) {
        let srr: string[] = from_to_string.split("-");
        let s = srr[0].charAt(0);
        let sn_s = parseInt(srr[0].substring(1, srr[0].length));
        let sn_e = parseInt(srr[1].substring(1, srr[1].length));
        for (let i = sn_s; i < sn_e; i++) {
            this._register[s + i] = start++
        }
    }

    parse_instruction(str: string): string {
        let out: string[] = Array(5);

        let srr: string[] = str.split(" ");
        let op = srr[0].toLowerCase();
        let main = this._op[op] as Instruction;

        if (main._functionCode_binary) {
            out[0] = main._opcode_binary;
            out[4] = main._functionCode_binary;
        } else {
            out[0] = main._opcode_binary;
        }

        out[1] = (this.has_doller_parse(srr[1]))
        out[2] = (this.has_doller_parse(srr[2]))
        out[3] = (this.has_doller_parse(srr[3]))
        let x= out.join(" ")

        return out.join(" ");
    }

    has_doller_parse(str: string): string {
        if (str.charAt(0) == '$') {
            return this._register[str.substring(1, str.length)]
        }
        return this._register[str];
    }
}


let ir = new IR(32);
ir.addRegister('zero', 0);
ir.addRegister('0', 0);
ir.addRegisterRange("t0-t5", 10)

let add = new Instruction("Add", "add", "R", "000000", "d = s + t;", "00000100000");
let and = {
    _name: "And",
    _op: "and",
    _format: "R",
    _opcode_binary: "000000",
    _operation: "d = s & t",
    _functionCode_binary: "00000100100",
} as Instruction;

ir.addInstructionType("R", "000000 sssss ttttt ddddd fffffffffff");

ir.addOp(add);
ir.addOp(and);

console.log(ir.parse_instruction("add $t0 $t0 $0"))
console.log(ir.parse_instruction("and $t0 $t0 $0"))
