import axios from 'axios';
import { SubsidyDetail } from './types';

export const fetchSubsidyDetails = async (): Promise<SubsidyDetail[]> => {
  try {
    const response = await axios.get<SubsidyDetail[]>('/subsidies', {
      params: { timestamp: Date.now() },
    });
    return response.data;
  } catch (error) {
    console.error('補助金詳細の取得中にエラーが発生しました:', error);
    return [];
  }
};

const API_BASE_URL = 'https://api.jgrants-portal.go.jp/exp/v1/public';

export interface SubsidySearchParams {
  keyword?: string;
  sort?: string;
  order?: string;
  acceptance?: string;
  use_purpose?: string;
  industry?: string;
  target_number_of_employees?: string;
  target_area_search?: string;
}

export interface SubsidyInfo {
  id: string;
  name: string;
  title: string;
  target_area_search: string;
  subsidy_max_limit: number;
  acceptance_start_datetime: string;
  acceptance_end_datetime: string;
  target_number_of_employees: string;
  subsidy_name?: string;
  purpose?: string;
  target_industry?: string;
  target_area?: string;
}

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

// export interface SubsidyDetail extends SubsidyInfo {
//     catch_copy: string;
//     summary: string;
//     target_area_detail: string;
//     subsidy_max_limit: number;
//     acceptance_start_datetime: string;
//     acceptance_end_datetime: string;
//   }
  
export const getSubsidyDetail = async (id: string): Promise<SubsidyDetail> => {
  try {
    const timestamp = new Date().getTime();
    const uniqueId = Math.random().toString(36).substring(7);
    const url = `/api/subsidies?id=${id}&_=${timestamp}&unique=${uniqueId}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    console.log('API Response:', data);

    if (!data.result || data.result.length === 0) {
      throw new Error('No data returned from API');
    }

    const subsidyDetail: SubsidyDetail = data.result[0];

    if (typeof subsidyDetail.use_purpose === 'string') {
      subsidyDetail.use_purpose = subsidyDetail.use_purpose.split(' / ');
    }

    console.log('Processed subsidy detail:', subsidyDetail);

    return subsidyDetail;
  } catch (error) {
    console.error('Error fetching subsidy detail:', error);
    throw error;
  }
};

