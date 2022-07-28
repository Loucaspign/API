const {compareHash} = require("../utils/utils");
const {getAccount} = require("./userDB");

module.exports.checkConnection = async (client, email, password) => {
    const promiseClient = getAccount(client, email);
    const values = await Promise.resolve(promiseClient);
    const clientRow = values.rows[0];

    if(clientRow !== undefined   && await compareHash(password, clientRow.password) ) {
        return {userType: (clientRow.isadmin ? "admin" : "client") , value: clientRow};
    } else {
        return {userType: "inconnu", value: null}
    }
}


