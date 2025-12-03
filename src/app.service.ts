import { Injectable } from '@nestjs/common';
import { DEF_PORT } from './common/constants';

@Injectable()
export class AppService {
  public endpoints: string[] = [];
  public port: string | number = DEF_PORT;

  getEndpointsList(): string {
    return `
      <div style="margin:auto;width:fit-content;font-family:sans-serif">
        <p>Endpoints:</p>
        <ul style="">
          ${this.endpoints
            .map(s => `<li>${s}</li>`)
            .join('\n')
            .replace(/\{(.+)\}/g, ':$1')}
        </ul>
        <a href="http://localhost:${this.port}/doc">Open API doc</a>
      </div>
      `;
  }
}
