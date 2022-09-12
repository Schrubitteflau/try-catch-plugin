import { yo } from "./yo";

/**
 * @throws {Error}
 */
function a()
{
    const aaa = yo();
}

/**
 * @throws {Error}
 * @returns {string}
 */
async function myFunctionAsync() {
    //a();
    throw new Error("");
    //return "";
}

