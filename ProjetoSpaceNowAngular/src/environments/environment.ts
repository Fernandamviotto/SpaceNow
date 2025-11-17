export const environment = {
  production: false,
  // Use '' if estiver usando proxy.conf.json (recomendado em dev).
  // Ou use 'http://localhost:5000' / 'https://localhost:5001' se não usar proxy.
  apiBaseUrl: '',
  // Se true, alguns serviços podem usar mocks (AppComponentService verifica isso).
  useMock: false
};
