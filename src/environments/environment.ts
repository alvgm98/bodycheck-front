const API_BASE_URL = 'http://13.60.81.49/';

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
