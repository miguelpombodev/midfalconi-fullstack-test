import { NodeSDK } from "@opentelemetry/sdk-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";

const SERVICE_NAME = "falconi-test-api";
const JAEGER_URL = `http://${process.env.JAEGER_HOST}:${process.env.JAEGER_PORT}/v1/traces`;

const otlpExporter = new OTLPTraceExporter({
  url: JAEGER_URL,
});

const sdk = new NodeSDK({
  serviceName: SERVICE_NAME,

  traceExporter: otlpExporter,
  instrumentations: [getNodeAutoInstrumentations()],
});

try {
  sdk.start();
  console.log(
    `OpenTelemetry SDK (Jaeger) started successfully [${SERVICE_NAME}].`,
  );
} catch (error) {
  console.error("Error trying to start OpenTelemetry SDK:", error);
}

process.on("SIGTERM", () => {
  sdk
    .shutdown()
    .then(() => console.log("Tracing terminated"))
    .catch((error) => console.error("Error terminating tracing", error))
    .finally(() => process.exit(0));
});
