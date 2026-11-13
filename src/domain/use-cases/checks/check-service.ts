interface checkServiceUseCase {
    execute(url: string): Promise<boolean>;
}

type SucessCallback = () => void;
type ErrorCallBack = (error : string) => void;

export class CheckService implements checkServiceUseCase {


    constructor(
        private readonly sucessCallBack: SucessCallback,
        private readonly errorCallBack: ErrorCallBack,
    ){};



    public async execute(url: string): Promise<boolean> {

        try {

            const req = await fetch(url);
            if(!req.ok) throw new Error(`Error on check service ${url}`);
            this.sucessCallBack();
            return true;

        } catch (error) {

            this.errorCallBack(`${error}`);
            console.log(`${error}`);
            return false;

        }

    }

};