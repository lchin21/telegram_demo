import { AxiosInstance } from 'axios';
import { Response, NonceResponse, StarkKeyParams } from './DepositFunctionality/types';
import { parseParams } from './parseParams';

export const getNonce = async (
  request: AxiosInstance,
  params: StarkKeyParams,
) => request.get<Response<NonceResponse>>('/v1/nonce', {
  params: {
    ...parseParams(params),
  },
});