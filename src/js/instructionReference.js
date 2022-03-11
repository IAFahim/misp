class Instruction {
    constructor(name, op, type, opcode_binary, operation, functionCode_binary) {
        this._name = name;
        this._op = op;
        this._format = type.toLowerCase();
        this._opcode_binary = opcode_binary;
        this._operation = operation;
        this._functionCode_binary = functionCode_binary;
        this._order = new Map();
        let position = 0;
    }
}
class IR {
    constructor(bit) {
        this._bit = bit;
        this._register = new Map();
        this._type = new Map();
        this._op = new Map();
    }
    addOp(instruction) {
        this._op[instruction._op] = instruction;
    }
    addInstructionType(type, encoding) {
        this._type[type] = encoding;
    }
    /**
     * "t0",10 would result in _register { t0: 10 } added
     * @param name "t0"
     * @param value_decimal 10
     */
    addRegister(name, value_decimal) {
        this._register[name] = value_decimal;
    }
    /**
     * "t0-t5",10 would result in _register { t0: 10, t1: 11, t2: 12, t3: 13, t4: 14 } added
     * @param from_to_string "t0-t5"
     * @param start 10
     */
    addRegisterRange(from_to_string, start) {
        let srr = from_to_string.split("-");
        let s = srr[0].charAt(0);
        let sn_s = parseInt(srr[0].substring(1, srr[0].length));
        let sn_e = parseInt(srr[1].substring(1, srr[1].length));
        for (let i = sn_s; i < sn_e; i++) {
            this._register[s + i] = start++;
        }
    }
    parse_instruction(str) {
        let out = Array(5);
        let srr = str.split(" ");
        let op = srr[0].toLowerCase();
        let main = this._op[op];
        if (main._functionCode_binary) {
            out[0] = main._opcode_binary;
            out[4] = main._functionCode_binary;
        }
        else {
            out[0] = main._opcode_binary;
        }
        out[1] = (this.has_doller_parse(srr[1]));
        out[2] = (this.has_doller_parse(srr[2]));
        out[3] = (this.has_doller_parse(srr[3]));
        let x = out.join(" ");
        return out.join(" ");
    }
    has_doller_parse(str) {
        if (str.charAt(0) == '$') {
            return this._register[str.substring(1, str.length)];
        }
        return this._register[str];
    }
}
let ir = new IR(32);
ir.addRegister('zero', 0);
ir.addRegister('0', 0);
ir.addRegisterRange("t0-t5", 10);
let add = new Instruction("Add", "add", "R", "000000", "d = s + t;", "00000100000");
let and = {
    _name: "And",
    _op: "and",
    _format: "R",
    _opcode_binary: "000000",
    _operation: "d = s & t",
    _functionCode_binary: "00000100100",
};
ir.addInstructionType("R", "000000 sssss ttttt ddddd fffffffffff");
ir.addOp(add);
ir.addOp(and);
console.log(ir.parse_instruction("add $t0 $t0 $0"));
console.log(ir.parse_instruction("and $t0 $t0 $0"));
//# sourceMappingURL=instructionReference.js.map