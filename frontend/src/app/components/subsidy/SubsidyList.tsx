import React, { useState } from 'react';
import { getSubsidyDetail } from '../../../utils/api-client';
import { SubsidyInfo } from '../../../utils/types';
import SubsidyDetailModal from './SubsidyDetailModal';
import { SubsidyDetail } from '../../../utils/types';
interface SubsidyListProps {
  subsidies: SubsidyInfo[];
}

const SubsidyList: React.FC<SubsidyListProps> = ({ subsidies }) => {
  const [selectedSubsidy, setSelectedSubsidy] = useState<SubsidyDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleViewDetail = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const detail = await getSubsidyDetail(id);
      setSelectedSubsidy(detail);
    } catch (err) {
      setError('詳細情報の取得に失敗しました。');
      console.error('Failed to fetch subsidy detail:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {subsidies.map((subsidy) => (
        <div key={subsidy.id} className="bg-gray-700 p-4 rounded-lg shadow-lg border border-yellow-500">
          <h3 className="text-xl font-bold text-white mb-2">{subsidy.subsidy_name}</h3>
          <p className="text-gray-300 mb-2">対象地域: {subsidy.target_area_search}</p>
          <p className="text-gray-300 mb-2">補助金上限: {subsidy.subsidy_max_limit ? `${subsidy.subsidy_max_limit.toLocaleString()}円` : '未定義'}</p>
          <p className="text-gray-300 mb-2">募集期間: {subsidy.acceptance_start_datetime ? new Date(subsidy.acceptance_start_datetime).toLocaleDateString() : '未定義'} ～ {subsidy.acceptance_end_datetime ? new Date(subsidy.acceptance_end_datetime).toLocaleDateString() : '未定義'}</p>
          <p className="text-gray-300 mb-4">従業員数: {subsidy.target_number_of_employees}</p>
          <button
            onClick={() => handleViewDetail(subsidy.id)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            詳細を見る
          </button>
        </div>
      ))}
      {isLoading && <p className="text-center text-white">詳細情報を読み込み中...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {selectedSubsidy && (
        <SubsidyDetailModal
          subsidy={selectedSubsidy}
          onClose={() => setSelectedSubsidy(null)}
          isLoading={false}  // または適切な値を設定
          error={null}  // または適切なエラー状態を設定
        />
      )}
    </div>
  );
};

export default SubsidyList;