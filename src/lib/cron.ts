import cron, {ScheduledTask} from 'node-cron';

export default class Cron {
  public static createCronJob(cronExpression: string, callback: Function): ScheduledTask {
    const cronExpressionIsInvalid: boolean = !this.isValid(cronExpression);
    if(cronExpressionIsInvalid) {
      throw new Error(`'${cronExpression}' is not a valid cron expression.\nHere you can see how cron expressions work: https://cds.knaup.pw/cron-expression`)
    }

    return cron.schedule(cronExpression, () => {
      callback();
    }, undefined);
  }

  public static isValid(cronExpression: string): boolean {
    return cron.validate(cronExpression);
  }
}
