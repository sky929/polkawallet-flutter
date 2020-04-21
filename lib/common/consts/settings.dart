import 'package:polka_wallet/store/settings.dart';

EndpointData networkEndpointKusama = EndpointData.fromJson(const {
  'info': 'kusama',
  'ss58': 2,
//  'text': 'Kusama (Polkadot Canary, hosted by Parity)',
//  'value': 'wss://kusama-rpc.polkadot.io/',
  'text': 'Kusama (Polkadot Canary, hosted by Polkawallet)',
  'value': 'ws://mandala-01.acala.network:9954/',
});

EndpointData networkEndpointAcala = EndpointData.fromJson(const {
  'info': 'acala-mandala',
  'ss58': 42,
  'text': 'Acala Mandala (Hosted by Acala Network)',
//  'value':
//      'wss://node-6655590520181506048.jm.onfinality.io/ws?apikey=5fb96acf-6839-484f-9f3d-8784f26df699',
  'value': 'ws://192.168.1.60:9944',
});

const network_ss58_map = {
  'acala': 42,
  'kusama': 2,
  'substrate': 42,
  'polkadot': 0,
};

const int acala_token_decimals = 18;