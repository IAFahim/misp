type Pair = {
    position: number
    count: number
}

class Instruction {
    _name: string
    _op: string
    _format: string
    _binary: string
    _operation: string
    _order: Map<string, Pair>

    constructor(name: string, op: string, type: string, opcode_or_function_value: string, operation: string, rearrange: string) {
        this._name = name;
        this._op = op;
        this._format = type.toLowerCase();
        this._binary = opcode_or_function_value;
        this._operation = operation;
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

    addRegister(name: string, value_decimal: string) {
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
        let srr: string[] = str.split(" ");
        let x = srr[0].toLowerCase();
        return this._op[x];
    }
}


let ir = new IR(32);
ir.addRegisterRange("t0-t5", 10)

let add = new Instruction("Add", "add", "R", "00000100000", "$d = $s + $t;", "0dstf");
ir.addOp(add);

console.log(ir.parse_instruction("add $t0 $t0 $0"))

let and = {
    _name: "And",
    _op: "and",
    _format: "R",
    _binary: "00000100100",
    _operation: "$d = $s + $t;",
} as Instruction;