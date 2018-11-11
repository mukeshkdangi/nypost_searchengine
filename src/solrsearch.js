var SolrNode = require('solr-node');
var client = new SolrNode({
    host: 'localhost',
    port: '8983',
    core: 'nypost',
    protocol: 'http'
});
const express = require('express');
const app = express();
//app.use(cors());
app.set('json spaces', 40);
app.use(express.static(__dirname + '/public'));

app.use('/api/getresult/', (req, res) => {

    let strQuery = client.query().q(req.query.keyword);
    if (req.query.sort && req.query.sort.length > 0) {
        strQuery.sort({ pageRankFile: 'desc' })
    }
    console.log('req.query.rows', req.query.rows)
    if (req.query.rows > 0) {
        strQuery.rows(req.query.rows)
    }

    client.search(strQuery, function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        console.log('Response:', result);
        res.send(JSON.stringify(result));
    });
});
app.listen(3000,
    function () {
        console.log('Example app listening on port 3000!')
    });