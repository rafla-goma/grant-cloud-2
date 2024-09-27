// pages/api/subsidies.ts
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const API_BASE_URL = 'https://api.jgrants-portal.go.jp/exp/v1/public';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { id, ...queryParams } = req.query;

      // キャッシュを無効化するためのヘッダーを設定
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');

      if (id) {
        // 個別の補助金詳細を取得
        const detailResponse = await axios.get(`${API_BASE_URL}/subsidies/id/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
          },
        });
        console.log('API Response (Detail):', detailResponse.data);
        return res.status(200).json(detailResponse.data);
      }

      // 補助金一覧を取得
      const params = {
        keyword: queryParams.keyword,
        sort: queryParams.sort,
        order: queryParams.order,
        acceptance: queryParams.acceptance,
        use_purpose: queryParams.use_purpose,
        industry: '製造業', // 固定値として設定
        target_number_of_employees: queryParams.target_number_of_employees,
        target_area_search: queryParams.target_area_search,
        timestamp: Date.now(), // キャッシュバスターとしてタイムスタンプを追加
      };

      // 空の値を持つパラメータを除外
      const cleanParams = Object.entries(params).reduce((acc: Record<string, any>, [key, value]) => {
        if (value !== undefined && value !== '') {
          acc[key] = value;
        }
        return acc;
      }, {});

      console.log('Requesting subsidies with params:', cleanParams);

      const listResponse = await axios.get(`${API_BASE_URL}/subsidies`, {
        params: cleanParams,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
        },
      });

      console.log('API Response (List):', listResponse.data);
      res.status(200).json(listResponse.data);
    } catch (error) {
      console.error('Error fetching subsidies:', error);
      if (axios.isAxiosError(error)) {
        console.error('Axios error details:', error.response?.data);
        res.status(error.response?.status || 500).json({ 
          error: 'Failed to fetch subsidies', 
          details: error.response?.data 
        });
      } else {
        res.status(500).json({ error: 'An unexpected error occurred' });
      }
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}