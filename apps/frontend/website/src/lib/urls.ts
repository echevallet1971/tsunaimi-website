const askMyEnvoyUrl = process.env.NEXT_PUBLIC_ASK_MY_ENVOY_URL;

if (!askMyEnvoyUrl) {
  throw new Error('NEXT_PUBLIC_ASK_MY_ENVOY_URL is not configured');
}

export const ASK_MY_ENVOY_URL = askMyEnvoyUrl;
