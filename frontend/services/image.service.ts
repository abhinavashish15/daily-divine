import { apiClient } from '../lib/api-client';
import { Image, CreateImageDTO, UpdateImageDTO } from '../types/image';

export const imageService = {
  async getImages(): Promise<Image[]> {
    const response = await apiClient.get<{ data: Image[] }>('/images');
    return response.data.data;
  },

  async createImage(data: CreateImageDTO): Promise<Image> {
    const response = await apiClient.post<{ data: Image }>('/images', data);
    return response.data.data;
  },

  async updateImage(id: string, data: UpdateImageDTO): Promise<Image> {
    const response = await apiClient.put<{ data: Image }>(`/images/${id}`, data);
    return response.data.data;
  },

  async deleteImage(id: string): Promise<void> {
    await apiClient.delete(`/images/${id}`);
  }
};
