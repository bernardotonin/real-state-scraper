import { HttpsProxyAgent } from "https-proxy-agent";

export const ZapHeaders = {
  "X-Domain": ".zapimoveis.com.br",
};

export const VivaHeaders = {
  "X-Domain": "www.vivareal.com.br",
};

export const ProxyAgent = new HttpsProxyAgent(
  ""
); // < endereço proxy aqui
