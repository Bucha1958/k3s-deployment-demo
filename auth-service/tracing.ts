// import { NodeSDK } from '@opentelemetry/sdk-node';
// import { Resource } from '@opentelemetry/resources';
// import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
// import { JaegerExporter } from '@opentelemetry/exporter-jaeger';
// import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
// import dotenv from 'dotenv';

// dotenv.config();

// const sdk = new NodeSDK({
//   resource: new Resource({
//     [SemanticResourceAttributes.SERVICE_NAME]: 'auth-service',
//   }),
//   traceExporter: new JaegerExporter({
//     endpoint: process.env.JAEGER_ENDPOINT || 'http://localhost:14268/api/traces',
//   }),
//   instrumentations: [getNodeAutoInstrumentations()],
// });

// sdk.start()
//   .then(() => {
//     console.log('Tracing initialized');
//   })
//   .catch((error) => {
//     console.error('Error initializing tracing', error);
//   });


/*instrumentation.ts*/
import { NodeSDK } from '@opentelemetry/sdk-node';
import { ConsoleSpanExporter } from '@opentelemetry/sdk-trace-node';
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import {
  PeriodicExportingMetricReader,
  ConsoleMetricExporter,
} from '@opentelemetry/sdk-metrics';

const sdk = new NodeSDK({
  traceExporter: new ConsoleSpanExporter(),
  metricReader: new PeriodicExportingMetricReader({
    exporter: new ConsoleMetricExporter(),
  }),
  instrumentations: [getNodeAutoInstrumentations(), new ExpressInstrumentation()],
});

const exporter = new OTLPTraceExporter({
  url: 'http://localhost:4318/v1/traces',
});

provider.addSpanProcessor(new BatchSpanProcessor(exporter));
sdk.start();
