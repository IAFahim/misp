class Instruction {
    constructor(name, op, type, opcode_or_function_value, operation, rearrange) {
        this._name = name;
        this._op = op;
        this._format = type.toLowerCase();
        this._binary = opcode_or_function_value;
        this._operation = operation;
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
        console.log(this._op[instruction._op]);
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
        let srr = str.split(" ");
        let x = srr[0].toLowerCase();
        return this._op[x];
    }
}
let ir = new IR(32);
ir.addRegisterRange("t0-t5", 10);
let add = new Instruction("Add", "add", "R", "00000100000", "$d = $s + $t;", "0dstf");
ir.addOp(add);
console.log(ir.parse_instruction("add $t0 $t0 $0"));
let and = {
    _name: "And",
    _op: "and",
    _format: "R",
    _binary: "00000100100",
    _operation: "$d = $s + $t;",
};
//# sourceMappingURL=instructionReference.js.map