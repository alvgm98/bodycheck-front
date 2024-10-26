const API_BASE_URL = 'http://localhost:8080/';
// const API_BASE_URL = 'http://192.168.2.151:8080/';

export const environment = {
  production: false,

  TOKEN_KEY: 'token',
  USER_KEY: 'user',

  apiAuthUrl: API_BASE_URL + 'auth/',
  apiUserUrl: API_BASE_URL + 'api/user',
  apiCustomerUrl: API_BASE_URL + 'api/customers',
  apiMeasurementUrl: API_BASE_URL + 'api/measurements',
  apiAppointmentUrl: API_BASE_URL + 'api/appointments',
};
