import minimist, {ParsedArgs} from 'minimist';

import testConfig from './test-data.json';

import {Record} from '../../contracts/index.js';

/* c8 ignore next 100 */
export default class TestService {
  public static getTestData(): TestData {
    const args: ParsedArgs = minimist(process.argv.slice(2));

    const email: string = args.email ? args.email : testConfig.auth.email;
    const key: string = args.key ? args.key : testConfig.auth.key;
    const domain: string = args.domain ? args.domain : testConfig.domain;

    const testData: TestData = {
      auth: {
        email: email,
        key: key,
      },
      domain: domain,
      records: this.getRandomRecords(5, domain),
    };

    const testDataNotProvided: boolean = !testData.auth.email
      || testData.auth.email === 'your@email.com'
      || !testData.auth.key
      || testData.auth.key === 'your_cloudflare_api_key'
      || !testData.domain
      || testData.domain === 'yourdomain.com';

    if (testDataNotProvided) {
      // tslint:disable-next-line:no-console
      console.log(`In order to use the tests you must provide some data via 'src/tests/test-service/test-data.json' or via 'npm test -- --email="your@email.com" --key="cloudflare-key" --domain="domain.com"'`);

      process.exit();
    }

    return testData;
  }

  private static getRandomRecords(amount: number, domain: string): Array<Record> {
    const records: Array<Record> = [];

    for (let index: number = 0; index < amount; index++) {
      const record: Record = {
        name: `cddnss-test-${this.getRandomSubdomain()}.${domain}`,
      };

      records.push(record);
    }

    return records;
  }

  private static getRandomSubdomain(): string {
    let result: string = '';
    const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength: number = characters.length;

    for (let index: number = 0; index < 5; index++) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }
}

export type TestData = {
  auth: {
    email: string,
    key: string,
  },
  domain: string,
  records: Array<Record>,
};
