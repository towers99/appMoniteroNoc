import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface checkServiceUseCase {
    execute(url: string): Promise<boolean>;
}

type SucessCallback = (() => void) | undefined;
type ErrorCallBack = ((error: string) => void) | undefined;

export class CheckService implements checkServiceUseCase {


    constructor(
        private readonly logRepository: LogRepository,
        private readonly sucessCallBack: SucessCallback,
        private readonly errorCallBack: ErrorCallBack,
    ) { };



    public async execute(url: string): Promise<boolean> {

        try {

            const req = await fetch(url);
            if (!req.ok) throw new Error(`Error on check service ${url}`);
            const log = new LogEntity({
                message: `${url} is ok`,
                level: LogSeverityLevel.low,
                origin: 'check-service.ts'
            });
            this.logRepository.saveLog(log);
            this.sucessCallBack && this.sucessCallBack();
            return true;

        } catch (error) {

            const errorMessage = `${url} is not ok ${error}`
            const log = new LogEntity({
                message: errorMessage,
                level: LogSeverityLevel.high,
                origin: 'check-service.ts'
            });
            this.logRepository.saveLog(log);
            this.errorCallBack && this.errorCallBack(errorMessage);
            return false;

        }

    }

};