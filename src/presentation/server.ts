import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";


export class Server {

    public static start() {

        console.log('server started...')

        CronService.createJob(
            '*/20 * * * * *',
            () => {
                 const url = 'http://localhost:3000';
                 new CheckService(
                    () => console.log(`Sucess ok url ${url}`),
                    (error) => console.log(error)
                 ).execute(url);

            }

        );

    }

}


