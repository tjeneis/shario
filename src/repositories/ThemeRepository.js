import SquidexClient from '@/clients/SquidexClient';

const resource = '/themes';

export default {
  get(payload) {
    return SquidexClient.get(`${resource}`, payload);
  },
};
