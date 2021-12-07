import mongoose from 'mongoose';
const connection:any = {};

async function connect(){
    if (connection.isConnected){
        console.log('already Connected');
        return
    }

    if(mongoose.connections.length > 0){
        connection.isConnected = mongoose.connections[0].readyState;
        if(connection.isConnected ===1){
            console.log('use previous Connection');
            return
        }

        await mongoose.disconnect();
    }

    const connectionString:any = process.env.MONGO_DB_URI
   
    //const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@clustertodo.raz9g.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
    const options:any = { useNewUrlParser: true, useUnifiedTopology: true }
    //mongoose.set("useFindAndModify", false) useCreateIndex:true useFindAndModify: false
    const db:any = await mongoose.connect(connectionString, options)
    console.log('New Connection');
    connection.isConnected = db.connections[0].readyState;
}

async function disconnect(){
    if(connection.isConnected){
        if(process.env.NODE_ENV === 'production'){
            await mongoose.disconnect();
            connection.isConnected = false;
        }else{
            console.log('not disconnected');
        }
    }
}

function convertDocToObj(doc){
    doc._id = doc._id.toString();
    doc.createdAt = doc.createdAt.toString();
    doc.updatedAt = doc.updatedAt.toString();
    return doc
}

const db = {connect, disconnect,convertDocToObj};
export default db;