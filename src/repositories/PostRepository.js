import SquidexClient from '@/clients/SquidexClient';

const resource = '/posts';

export default {
  get(payload) {
    return SquidexClient.get(`${resource}`, payload);
  },
  getPost(id) {
    return SquidexClient.get(`${resource}/${id}`);
  },
  create(payload) {
    return SquidexClient.post(`${resource}`, payload);
  },
  update(payload, id) {
    return SquidexClient.put(`${resource}/${id}`, payload);
  },
  patch(payload, id) {
    return SquidexClient.patch(`${resource}/${id}`, payload);
  },
  delete(id) {
    return SquidexClient.delete(`${resource}/${id}`);
  },
};
