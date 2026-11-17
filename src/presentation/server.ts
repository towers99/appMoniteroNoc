import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasouerces/file-system-datasource";
import { MongoLogDataSource } from "../infrastructure/datasouerces/mongo-log-dataSource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron.service";
import { EmailService } from "./email/email.service";


const logRepository = new LogRepositoryImpl(
    new MongoLogDataSource()
);

const emailService = new EmailService();


export class Server {

    public static start() {

        console.log('server started...')

        new SendEmailLogs(
            emailService,
            logRepository
        ).execute([
            'towers0927@gmail.com', 'yztorres19@gmail.com'
        ])

        // emailService.sendEmailWithFileSystemLog([
        //     'towers0927@gmail.com', 'yztorres19@gmail.com'
        // ])

        CronService.createJob(
            '*/30 * * * * *',
            () => {
                const url = 'http://localhost:3000';
                new CheckService(
                    logRepository,
                    () => console.log(`Sucess ok url ${url}`),
                    (error) => console.log(error)
                ).execute(url);

            }

        );

    }

}


