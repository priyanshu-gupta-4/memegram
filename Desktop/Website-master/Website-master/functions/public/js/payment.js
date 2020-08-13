const checksum_lib = require('../paytm/checksum/checksum');

const port = 5000;
module.exports = (app) => {
    app.get("/payment", (req, res) => {

        let params = {}
        params['MID'] = 'kXUAwf16188730506375',
            params['WEBSITE'] = 'WEBSTAGING',
            params['CHANNEL_ID'] = 'WEB',
            params['INDUSTRY_TYPE_ID'] = 'Retail',
            params['ORDER_ID'] = 'QRD0005'+ new Date().getTime(),
            params['CUST_ID'] = 'CUST001',
            params['TXN_AMOUNT'] = '100',
            params['CALLBACK_URL'] = 'http://localhost:' + 5000 + '/successfull',
            params['EMAIL'] = 'xyz@gmail.com',
            params['MOBILE_NO'] = '8383905834'

        checksum_lib.genchecksum(params, 'slLndCLk#g_vUvsT', function(err, checksum) {

            let txn_url = "https://securegw-stage.paytm.in/order/process"

            let form_fields = ""
            for (x in params) {
                form_fields += "<input type='hidden' name='" + x + "' value='" + params[x] + "'/>"
            }
            form_fields += "<input type='hidden' name='CHECKSUMHASH' value='" + checksum + "'/>"

            var html = '<html><body><center><h1>Please wait!! Do not refresh the page</h1></center><form method="post" action="' + txn_url + '"name="f1" >' +
                form_fields + '</form><script type="text/javascript">document.f1.submit()</script></body></html>'

            res.writeHead(200, {
                'Content-Type': 'text/html'
            })
            res.write(html)
            res.end();
        })
    })
}