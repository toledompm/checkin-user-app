import axios, { AxiosResponse } from 'axios';

type CheckinTokenResponse = {
  refreshToken: string;
}

function createApiInstance(url:string, authToken:string) {
  return axios.create({
    baseURL: url,
    timeout: 1000,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
  });
}

export async function getCheckinToken(url: string, authToken: string): Promise<AxiosResponse<CheckinTokenResponse>> {
  const apiInstance = createApiInstance(url, authToken);
  return apiInstance.get<CheckinTokenResponse>('/user');
}
