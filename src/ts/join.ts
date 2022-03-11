let str = "000000 sssss ttttt ddddd fffffffffff"
let mat = "0 s t d f";

type SE = {
    start: number
    end: number
    index: number;
}

let arr = new Map<string, SE>();

for (let i = 0, c = 0; i < str.length; i++) {
    if (('a'.charAt(0) <= str.charAt(i) && str.charAt(i) <= 'z'.charAt(0)) || ('0'.charAt(0) <= str.charAt(i) && str.charAt(i) <= '9'.charAt(0))) {
        if (!arr[str[i]]) {
            arr[str[i]] = {start: i, end: i, index: c++} as SE;

        } else {
            arr[str[i]].end = i;
        }
    }
}

let parsedData_map = new Map<string, number| string>();
parsedData_map['s'] = 10;
parsedData_map['t'] = 20;
parsedData_map['d'] = 30;
parsedData_map['i'] = 400;
parsedData_map['0']="00000";
parsedData_map['f']="000100";


let set = new Array(5);

for (let i = 0; i < mat.length; i++) {
    if (arr[mat[i]]) {
        set[arr[mat[i]].index] = parsedData_map[mat[i]];
    }
}
console.log(set)