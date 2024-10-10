import axios from 'axios';
import { SubsidyDetail, SubsidySearchParams, SubsidyInfo } from './types';

const API_BASE_URL = 'https://api.jgrants-portal.go.jp/exp/v1/public';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
  },
});

export const searchSubsidies = async (params: SubsidySearchParams): Promise<SubsidyInfo[]> => {
  try {
    const response = await apiClient.get('/subsidies', { 
      params: { ...params, timestamp: Date.now() },
    });
    return response.data.result;
  } catch (error) {
    console.error('Error fetching subsidies:', error);
    throw error;
  }
};

export const getSubsidyDetail = async (id: string): Promise<SubsidyDetail> => {
  try {
    const response = await apiClient.get(`/subsidies/id/${id}`, {
      params: { timestamp: Date.now() },
    });

    if (!response.data.result || response.data.result.length === 0) {
      throw new Error('No data returned from API');
    }

    const subsidyDetail: SubsidyDetail = response.data.result[0];

    if (typeof subsidyDetail.use_purpose === 'string') {
      subsidyDetail.use_purpose = subsidyDetail.use_purpose.split(' / ');
    }

    return subsidyDetail;
  } catch (error) {
    console.error('Error fetching subsidy detail:', error);
    throw error;
  }
};