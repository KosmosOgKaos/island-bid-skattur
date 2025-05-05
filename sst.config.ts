/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: 'island-bid-starter-backend',
      removal: input?.stage === 'production' ? 'retain' : 'remove',
      protect: ['production'].includes(input?.stage),
      home: 'aws',
    };
  },
  async run() {
    const vpc = new sst.aws.Vpc('BidTaxBackendVpc');
    const cluster = new sst.aws.Cluster('BidTaxBackendCluster', { vpc });

    new sst.aws.Service('BidTaxBackendService', {
      cluster,
      containers: [
        {
          name: 'backend',
          image: {
            dockerfile: 'Dockerfile-backend',
          },
        },
        {
          name: 'postgresql',
          image: {
            dockerfile: 'Dockerfile-database',
          },
        },
      ],
      loadBalancer: {
        ports: [{ listen: '80/http', forward: '3000/http' }],
      },
      dev: {
        command: 'yarn start:dev',
      },
    });
  },
});
