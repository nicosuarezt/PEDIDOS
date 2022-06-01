var hana = require('@sap/hana-client');

var db = hana.createConnection();

// Parametros para la conexión
var conn_params = {
    serverNode  : '846ab1c3-a2d8-431d-a2e5-63d547889b04.hana.trial-us10.hanacloud.ondemand.com:443',
    uid         : 'DBADMIN',
    pwd         : 'Casta97..',
    sslValidateCertificate: false,
    encrypt: true
};

db.connect(conn_params, function(err) {
    if (err) { 
        throw err
    }else {
        console.log("CONECTADO EXITOSAMENTE")
    }
});

function disconect() {
    db.disconnect()
}

module.exports = {disconect, db}