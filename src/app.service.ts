import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  public endpoints: string[] = [];

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
        <a href="http://localhost:4000/doc">Open API doc</a>
      </div>
      `;
  }
}
