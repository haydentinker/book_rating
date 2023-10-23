import mongodb from 'mongodb';
import csvtojson from 'csvtojson';
import { mongoDBURL } from "../config.js";



var dbConn;
mongodb.MongoClient.connect(mongoDBURL, {
    useNewUrlParser:true,
    useUnifiedTopology: true,
}).then((client) => {
    console.log('DB Connected!');
    dbConn = client.db();
    csvtojson().fromFile('./ratings.csv').then(source => {
        var collection = dbConn.collection('ratings');
        collection.insertMany(source, (err, result) => {
            if (err) {
                console.log(err)
                process.exit(1)
            };
            if (result) {
                console.log('Import CSV into database successfully.');
                process.exit(0)
            }
        
        });
    });
}).catch(err => {
    console.log(`DB Connection Error: ${err.message}`);
});


