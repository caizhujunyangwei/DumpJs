function dump(target, notice?: string, maxnesting?:number)
{
    // let callfunc = (dump.caller.toString()).split(" ");    
    // console.log("dump from : ---" + callfunc[1] + "\n");
    if (notice === undefined || notice === null)
        notice = "<var> ";
    if (maxnesting === undefined || maxnesting === null || maxnesting <= 0)
        maxnesting = 3;

    let logStr = notice + " = {"
    let trigger = 0
    let indent = ""

    let _dump = function (node, indent_, trigger_) {
        logStr += "\n"
        indent_ += "    "
        for (let i in node) {
            if (typeof (node[i]) === "object") {
                if (trigger_ >= maxnesting) {   //最大打印数
                    if (node[i] instanceof Array)
                        logStr += indent_ + "\"" + i + "\" : [*MAX_NESTING]\n"
                    else
                        logStr += indent_ + "\"" + i + "\" : {*MAX_NESTING}\n"
                } else {
                    if (node[i] instanceof Array) {
                        logStr += indent_ + "\"" + i + "\" : ["
                        _dump(node[i], indent_, trigger_ + 1)
                        logStr += indent_ + "  " + "]\n"
                    } else {
                        logStr += indent_ + "\"" + i + "\" : { "
                        _dump(node[i], indent_, trigger_ + 1)
                        logStr += indent_ + "  " + "}\n"
                    }
                }
            } else {
                    logStr += indent_ + "\"" + i + "\" : " + node[i] + "\n";
            }
        }
    }
    _dump(target,indent,trigger)
    logStr += "}";

    console.log(logStr);
}