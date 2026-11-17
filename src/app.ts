import { envs } from "./config/plugins/envs.plugins";
import { LogModel, MongoDataBase } from "./data/mongo";
import { Server } from "./presentation/server";


(async() => {
  main();
})();


async function main() {
   
     await MongoDataBase.connect({
       mongoUrl: envs.MONGO_URL,
       dbName: envs.MONGO_DB_NAME,
     });


    //Crea un registron en la coleccion Log
    // const newLog = await LogModel.create({

    //    message: 'Test desde Mongo',
    //    origin: 'app.ts',
    //    level: 'low',

    // })

    // await newLog.save()


    const logs = await LogModel.find();
    console.log(logs)

     Server.start();
}