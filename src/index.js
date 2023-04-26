const path = require('path');
const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const app = express();
const port = 3000;


const {MongoClient} = require('mongodb');



async function main() {
	// we'll add code here soon

    const uri = "mongodb+srv://dnt_store:dnt123456@cluster0.nf1pnoh.mongodb.net/test"
    const client = new MongoClient(uri);

    try {
        await client.connect();
    
        await listDatabases(client);
     
    } catch (e) {
        console.error(e,'có lỗi');
    }finally {
        await client.close();
    }
}

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};
main().catch(console.error);






const route = require('./routes');


// cấu hình đọc được các file tĩnh (hình ảnh, video, css ...) trong file public
app.use(express.static(path.join(__dirname, 'public')));



// nhận data từ method post
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

// HTTP logger
app.use(morgan('combined'));

// template engine
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// routes init
route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
