
export enum LogSeverityLevel {
   low = 'low',
   medium = 'medium',
   high = 'high'
};


export interface LogEntityOptions {
   level: LogSeverityLevel; // Enum
   message: string;
   createAt?: Date;
   origin: string;
}


export class LogEntity {

   public level: LogSeverityLevel; // Enum
   public message: string;
   public createAt: Date;
   public origin: string;

   constructor(options: LogEntityOptions) {
      const { level, message, origin, createAt = new Date() } = options;
      this.level = level;
      this.message = message;
      this.createAt = createAt;
      this.origin = origin;
   };


   static fromJson = (json: string): LogEntity => {
      const { message, level, createdAt, origin } = JSON.parse(json);
      if (!message) throw new Error('Message is required');
      if (!level) throw new Error('level is required');
      if (!createdAt) throw new Error('createdAt is required');
      const log = new LogEntity({
         message: message,
         level: level,
         createAt: createdAt,
         origin: origin,
      });
      return log;
   };

   
   static fromObject = (object: {[key: string]:any}):LogEntity => {

     const {message, level, createAt, origin} = object;
     const log = new LogEntity({
      message,
      level,
      createAt,
      origin
     })

     return log;

   };

}