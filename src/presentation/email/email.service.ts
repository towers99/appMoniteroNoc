
import nodemailer from "nodemailer";
import { envs } from "../../config/plugins/envs.plugins";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";



interface SendEmailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachements?: Attachement[];
};


interface Attachement {
    fileName: string;
    path: string;
};

export class EmailService {


    constructor() { }

    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }
    });

    async sendEmail(options: SendEmailOptions): Promise<boolean> {

        const { to, subject, htmlBody, attachements = [] } = options;

        try {

            const sendInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachements
            });
            
            return true;

        } catch (error) {

            const log = new LogEntity({
                level: LogSeverityLevel.high,
                message: 'Email not sent',
                origin: 'email.service.ts',
            });
            
            return false;
        }

    }


    async sendEmailWithFileSystemLog(to: string | string[]) {

        const subject = 'Logs del servidor';
        const htmlBody = `
             <h3> Logs de sistema-Noc </h3>
             <p> Registro de Logs con FS </p>
            `;
        const attachements = [
            { fileName: 'logs-all.log', path: `./logs/logs-all.log` },
            { fileName: 'logs-high.log', path: `./logs/logs-high.log` },
            { fileName: 'logs-medium.log', path: `./logs/logs-medium.log` },
        ];

        return this.sendEmail({
            to, subject, attachements, htmlBody
        })

    }

}