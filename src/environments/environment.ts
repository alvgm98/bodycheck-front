const API_BASE_URL = 'https://agile-fulfillment-production.up.railway.app/';

export const environment = {
  production: true,

  TOKEN_KEY: 'token',
  USER_KEY: 'user',

  apiAuthUrl: API_BASE_URL + 'auth/',
  apiUserUrl: API_BASE_URL + 'api/user',
  apiCustomerUrl: API_BASE_URL + 'api/customers',
  apiMeasurementUrl: API_BASE_URL + 'api/measurements',
  apiAppointmentUrl: API_BASE_URL + 'api/appointments',
  apiPdf: API_BASE_URL + 'api/pdf',
};
