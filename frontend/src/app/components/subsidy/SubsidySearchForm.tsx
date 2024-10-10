'use client';

import React, { useState, useEffect } from 'react';
import { Search, Star, Send } from 'lucide-react';
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Checkbox } from "../../../components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
// import { getSubsidyDetail } from '../../../utils/api-client';
import { SubsidyDetail } from '../../../utils/types';

interface SubsidyInfo {
  id: string;
  name: string;
  title: string;
  target_area_search: string;
  subsidy_max_limit: number;
  acceptance_start_datetime: string;
  acceptance_end_datetime: string;
  target_number_of_employees: string;
}

interface ApiResponse {
  metadata: {
    type: string;
    resultset: {
      count: number;
    }
  };
  result: SubsidyInfo[];
}

interface SubsidySearchParams {
  keyword: string;
  sort: string;
  order: string;
  acceptance: string;
  use_purpose: string;
  industry: string;
  target_number_of_employees: string;
  target_area_search: string;
}

interface SubsidySearchFormProps {
  _onSearch: (params: SubsidySearchParams) => Promise<void>;
}

const SubsidySearchForm: React.FC<SubsidySearchFormProps> = ({ _onSearch }) => {
  const [isStarred, setIsStarred] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [sort, setSort] = useState('created_date');
  const [order, setOrder] = useState('DESC');
  const [acceptance, setAcceptance] = useState('1');
  const [usePurpose, setUsePurpose] = useState<string[]>([]);
  const [targetNumberOfEmployees, setTargetNumberOfEmployees] = useState('');
  const [targetAreaSearch, setTargetAreaSearch] = useState('');
  const [searchResults, setSearchResults] = useState<SubsidyInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [_error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [_animateTitle, setAnimateTitle] = useState(false);
  
  // 詳細モーダル用の状態
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedSubsidyDetail, setSelectedSubsidyDetail] = useState<SubsidyDetail | null>(null);
  const [isDetailLoading, setIsDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState<string | null>(null);

  useEffect(() => {
    const titleAnimation = setInterval(() => {
      setAnimateTitle(prev => !prev);
    }, 2000);

    return () => clearInterval(titleAnimation);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formattedUsePurpose = usePurpose.join(' / ');
    const searchParams = new URLSearchParams({
      keyword,
      sort,
      order,
      acceptance,
      use_purpose: formattedUsePurpose,
      industry: '製造業', // 固定値
      target_number_of_employees: targetNumberOfEmployees,
      target_area_search: targetAreaSearch
    });

    try {
      const response = await fetch(`/api/subsidies?${searchParams.toString()}`, {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data: ApiResponse = await response.json();
      setSearchResults(data.result);
      setShowModal(true);
    } catch (err) {
      setError('検索中にエラーが発生しました。もう一度お試しください。');
      console.error('Search failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewDetails = async (id: string) => {
    setIsDetailLoading(true);
    setDetailError(null);
    try {
      const response = await fetch(`/api/subsidies?id=${id}&timestamp=${Date.now()}`, {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const detail = await response.json();
      console.log('Fetched detail in component:', detail);
      setSelectedSubsidyDetail(detail.result[0]);
      setDetailModalOpen(true);
    } catch (err) {
      setDetailError(`詳細情報の取得に失敗しました: ${err instanceof Error ? err.message : String(err)}`);
      console.error('Error fetching detail:', err);
    } finally {
      setIsDetailLoading(false);
    }
  };
  
  useEffect(() => {
    if (selectedSubsidyDetail) {
      console.log('Selected subsidy detail updated:', selectedSubsidyDetail);
    }
  }, [selectedSubsidyDetail]);

  const usePurposeOptions = [
    "新たな事業を行いたい",
    "販路拡大・海外展開をしたい",
    "イベント・事業運営支援がほしい",
    "事業を引き継ぎたい",
    "研究開発・実証事業を行いたい",
    "人材育成を行いたい",
    "資金繰りを改善したい",
    "設備整備・IT導入したい",
    "雇用・職場環境を改善したい",
    "エコ・SDG's活動支援がほしい",
    "災害（自然災害、感染症等）支援がほしい",
    "教育・子育て・少子化への支援がほしい",
    "スポーツ・文化への支援がほしい",
    "安全・防災対策支援がほしい",
    "まちづくり・地域振興支援がほしい"
  ];

  const prefectures = [
    "北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県", 
    "茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県", 
    "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県", "岐阜県", 
    "静岡県", "愛知県", "三重県", "滋賀県", "京都府", "大阪府", "兵庫県", 
    "奈良県", "和歌山県", "鳥取県", "島根県", "岡山県", "広島県", "山口県", 
    "徳島県", "香川県", "愛媛県", "高知県", "福岡県", "佐賀県", "長崎県", 
    "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県"
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-500 to-blue-500 text-white p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 sm:mb-6 text-center">
          補助金検索
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-8 sm:mb-10 text-yellow-300 font-light text-center">
          あなたに最適な補助金を見つけましょう
        </p>
        <div className="bg-white bg-opacity-10 backdrop-blur-lg p-4 sm:p-6 rounded-lg shadow-lg border border-white border-opacity-20">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="keyword" className="text-xl text-gray-700">キーワード*</Label>
                <Input
                  id="keyword"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="例: 小規模事業者"
                  required
                  minLength={2}
                  maxLength={255}
                  className="bg-gray-100 text-gray-800 placeholder-gray-500 rounded-md w-full h-10"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sort" className="text-xl text-gray-700">ソート項目*</Label>
                <Select value={sort} onValueChange={setSort}>
                  <SelectTrigger id="sort" className="bg-gray-100 text-gray-800 rounded-md w-full h-10">
                    <SelectValue placeholder="ソート項目を選択" />
                  </SelectTrigger>
                  <SelectContent className="bg-white text-gray-800">
                    <SelectItem value="created_date">作成日時</SelectItem>
                    <SelectItem value="acceptance_start_datetime">募集開始日時</SelectItem>
                    <SelectItem value="acceptance_end_datetime">募集終了日時</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="order" className="text-xl text-gray-700">ソート順*</Label>
                <Select value={order} onValueChange={setOrder}>
                  <SelectTrigger id="order" className="bg-gray-100 text-gray-800 rounded-md w-full h-10">
                    <SelectValue placeholder="ソート順を選択" />
                  </SelectTrigger>
                  <SelectContent className="bg-white text-gray-800">
                    <SelectItem value="DESC">降順</SelectItem>
                    <SelectItem value="ASC">昇順</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="acceptance" className="text-xl text-gray-700">募集期間内絞込み*</Label>
              <Select value={acceptance} onValueChange={setAcceptance}>
                <SelectTrigger id="acceptance" className="bg-gray-100 text-gray-800">
                  <SelectValue placeholder="絞込みを選択" />
                </SelectTrigger>
                <SelectContent className="bg-white text-gray-800">
                  <SelectItem value="1">要</SelectItem>
                  <SelectItem value="0">否</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-xl text-gray-700">利用目的</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {usePurposeOptions.map((purpose) => (
                  <div key={purpose} className="flex items-center space-x-2">
                    <Checkbox
                      id={`purpose-${purpose}`}
                      checked={usePurpose.includes(purpose)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setUsePurpose([...usePurpose, purpose]);
                        } else {
                          setUsePurpose(usePurpose.filter(p => p !== purpose));
                        }
                      }}
                      className="border-gray-400"
                    />
                    <Label htmlFor={`purpose-${purpose}`} className="text-sm text-gray-700">{purpose}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="target_number_of_employees" className="text-xl text-gray-700">従業員数</Label>
              <Select value={targetNumberOfEmployees} onValueChange={setTargetNumberOfEmployees}>
                <SelectTrigger id="target_number_of_employees" className="bg-gray-100 text-gray-800">
                  <SelectValue placeholder="従業員数を選択" />
                </SelectTrigger>
                <SelectContent className="bg-white text-gray-800">
                  <SelectItem value="従業員の制約なし">制約なし</SelectItem>
                  <SelectItem value="5名以下">5名以下</SelectItem>
                  <SelectItem value="20名以下">20名以下</SelectItem>
                  <SelectItem value="50名以下">50名以下</SelectItem>
                  <SelectItem value="100名以下">100名以下</SelectItem>
                  <SelectItem value="300名以下">300名以下</SelectItem>
                  <SelectItem value="900名以下">900名以下</SelectItem>
                  <SelectItem value="901名以上">901名以上</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="target_area_search" className="text-xl text-gray-700">補助対象地域</Label>
              <Select value={targetAreaSearch} onValueChange={setTargetAreaSearch}>
                <SelectTrigger id="target_area_search" className="bg-gray-100 text-gray-800">
                  <SelectValue placeholder="地域を選択" />
                </SelectTrigger>
                <SelectContent className="bg-white text-gray-800">
                  <SelectItem value="全国">全国</SelectItem>
                  <SelectItem value="北海道地方">北海道地方</SelectItem>
                  <SelectItem value="東北地方">東北地方</SelectItem>
                  <SelectItem value="関東・甲信越地方">関東・甲信越地方</SelectItem>
                  <SelectItem value="東海・北陸地方">東海・北陸地方</SelectItem>
                  <SelectItem value="近畿地方">近畿地方</SelectItem>
                  <SelectItem value="中国地方">中国地方</SelectItem>
                  <SelectItem value="四国地方">四国地方</SelectItem>
                  <SelectItem value="九州・沖縄地方">九州・沖縄地方</SelectItem>
                  {prefectures.map((prefecture) => (
                    <SelectItem key={prefecture} value={prefecture}>{prefecture}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-purple-900 font-bold py-3 px-6 rounded-full transform transition duration-200 hover:scale-105" 
              disabled={isLoading}
            >
              {isLoading ? '検索中...' : <><Search className="mr-2 h-6 w-6" /> 補助金を探す</>}
            </Button>
          </form>
        </div>
      </div>

      {/* 検索結果モーダル */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="bg-white text-gray-800 max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center text-gray-900">🎉 補助金発見！ 🎉</DialogTitle>
            <DialogDescription className="text-center text-gray-600">
              あなたにピッタリの補助金が見つかりました！
            </DialogDescription>
          </DialogHeader>
          {searchResults.length > 0 ? (
            <ul className="space-y-4 mt-4">
              {searchResults.map((subsidy, index) => (
                <li 
                  key={subsidy.id} 
                  className="border-2 border-blue-400 p-4 rounded-md bg-gray-50 transition-all duration-300 hover:scale-105"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <h4 className="font-bold text-xl text-blue-600">{subsidy.title}</h4>
                  <p className="text-gray-600 mt-2">対象地域: {subsidy.target_area_search}</p>
                  <p className="text-gray-600">補助金上限: {subsidy.subsidy_max_limit ? subsidy.subsidy_max_limit.toLocaleString() : '情報なし'}円</p>
                  <p className="text-gray-600">募集期間: {new Date(subsidy.acceptance_start_datetime).toLocaleDateString()} ～ {new Date(subsidy.acceptance_end_datetime).toLocaleDateString()}</p>
                  <p className="text-gray-600">従業員数: {subsidy.target_number_of_employees}</p>
                  <div className="mt-4 flex justify-end">
                    <Button 
                      onClick={() => handleViewDetails(subsidy.id)}
                      className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-full"
                    >
                      詳細を見る
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-xl mt-4 text-gray-600">検索結果がありません。別の条件で試してみてください！</p>
          )}
          <div className="mt-6 flex justify-center">
            <Button onClick={() => setShowModal(false)} className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-full">
              閉じる
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 詳細モーダル */}
      <Dialog open={detailModalOpen} onOpenChange={setDetailModalOpen}>
        <DialogContent className="bg-white text-gray-800 max-w-4xl max-h-[80vh] overflow-y-auto hide-close-button">
          <DialogHeader className="sticky top-0 bg-white z-10 pb-4 border-b">
            <div className="flex justify-between items-center">
              <DialogTitle className="text-2xl font-bold text-gray-900">🔍 補助金詳細 🔍</DialogTitle>
        <button
          onClick={() => setIsStarred(!isStarred)}
          className={`text-2xl ${isStarred ? 'text-yellow-400' : 'text-gray-400'}`}
        >
          <Star className={`h-8 w-8 ${isStarred ? 'fill-current' : ''}`} />
        </button>
      </div>
      <DialogDescription className="text-center text-gray-600">
        選択された補助金の詳細情報です。
      </DialogDescription>
    </DialogHeader>
          {isDetailLoading ? (
            <p className="text-center">読み込み中...</p>
          ) : detailError ? (
            <p className="text-center text-red-500">{detailError}</p>
          ) : selectedSubsidyDetail ? (
            <div className="space-y-4 mt-4">
              <h3 className="text-2xl font-semibold text-blue-600">{selectedSubsidyDetail.title}</h3>
              
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-lg font-medium text-green-600">キャッチコピー</p>
                <p>{selectedSubsidyDetail.subsidy_catch_phrase}</p>
              </div>
              
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-lg font-medium text-green-600">概要</p>
                <div 
                  dangerouslySetInnerHTML={{ __html: selectedSubsidyDetail.detail }} 
                  className="prose max-w-none"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="text-lg font-medium text-green-600">利用目的</p>
                  <p>{Array.isArray(selectedSubsidyDetail.use_purpose) ? selectedSubsidyDetail.use_purpose.join(', ') : selectedSubsidyDetail.use_purpose}</p>
                </div>
                
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="text-lg font-medium text-green-600">対象業種</p>
                  <p>{selectedSubsidyDetail.industry}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="text-lg font-medium text-green-600">補助対象地域</p>
                  <p>{selectedSubsidyDetail.target_area_search}</p>
                </div>
                
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="text-lg font-medium text-green-600">補助対象地域詳細</p>
                  <p>{selectedSubsidyDetail.target_area_detail || '詳細情報なし'}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="text-lg font-medium text-green-600">従業員数</p>
                  <p>{selectedSubsidyDetail.target_number_of_employees}</p>
                </div>
                
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="text-lg font-medium text-green-600">補助率</p>
                  <p>{selectedSubsidyDetail.subsidy_rate}</p>
                </div>
              </div>
              
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-lg font-medium text-green-600">補助金上限</p>
                <p>{selectedSubsidyDetail.subsidy_max_limit.toLocaleString()}円</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="text-lg font-medium text-green-600">募集開始</p>
                  <p>{new Date(selectedSubsidyDetail.acceptance_start_datetime).toLocaleString()}</p>
                </div>
                
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="text-lg font-medium text-green-600">募集終了</p>
                  <p>{new Date(selectedSubsidyDetail.acceptance_end_datetime).toLocaleString()}</p>
                </div>
                
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="text-lg font-medium text-green-600">事業終了期限</p>
                  <p>{new Date(selectedSubsidyDetail.project_end_deadline).toLocaleString()}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="text-lg font-medium text-green-600">申請受付状況</p>
                  <p>{selectedSubsidyDetail.request_reception_presence}</p>
                </div>
                
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="text-lg font-medium text-green-600">複数回申請</p>
                  <p>{selectedSubsidyDetail.is_enable_multiple_request ? '可能' : '不可'}</p>
                </div>
              </div>
              
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-lg font-medium text-green-600">詳細ページURL</p>
                <a 
                  href={selectedSubsidyDetail.front_subsidy_detail_page_url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-600 hover:underline"
                >
                  {selectedSubsidyDetail.front_subsidy_detail_page_url}
                </a>
              </div>
              
              {/* 申請ガイドライン */}
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-lg font-medium text-green-600 mb-2">申請ガイドライン</p>
                {selectedSubsidyDetail.application_guidelines && selectedSubsidyDetail.application_guidelines.length > 0 ? (
                  <ul className="list-disc list-inside">
                    {selectedSubsidyDetail.application_guidelines.map((guideline, index) => (
                      <li key={index}>
                        <a 
                          href={`data:application/pdf;base64,${guideline.data}`} 
                          download={guideline.name}
                          className="text-blue-600 hover:underline"
                        >
                          {guideline.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>申請ガイドラインはありません</p>
                )}
              </div>
              
              {/* 補助金概要 */}
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-lg font-medium text-green-600 mb-2">補助金概要</p>
                {selectedSubsidyDetail.outline_of_grant && selectedSubsidyDetail.outline_of_grant.length > 0 ? (
                  <ul className="list-disc list-inside">
                    {selectedSubsidyDetail.outline_of_grant.map((outline, index) => (
                      <li key={index}>
                        <a 
                          href={`data:application/pdf;base64,${outline.data}`} 
                          download={outline.name}
                          className="text-blue-600 hover:underline"
                        >
                          {outline.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>補助金概要はありません</p>
                )}
              </div>
              
              {/* 申請様式 */}
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-lg font-medium text-green-600 mb-2">申請様式</p>
                {selectedSubsidyDetail.application_form && selectedSubsidyDetail.application_form.length > 0 ? (
                  <ul className="list-disc list-inside">
                    {selectedSubsidyDetail.application_form.map((form, index) => (
                      <li key={index}>
                        <a 
                          href={`data:application/pdf;base64,${form.data}`} 
                          download={form.name}
                          className="text-blue-600 hover:underline"
                        >
                          {form.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>申請様式はありません</p>
                )}
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-600">詳細情報がありません。</p>
          )}
          <div className="mt-6 flex justify-center">
            <Button onClick={() => setDetailModalOpen(false)} className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-full">
              閉じる
            </Button>
          </div>
          <div className="mt-6 flex justify-between items-center sticky bottom-0 bg-white z-10 pt-4 border-t">
      <Button onClick={() => setDetailModalOpen(false)} className="bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded-full">
        閉じる
      </Button>
      <Button onClick={() => {/* 申請代行処理 */}} className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-full flex items-center">
        <Send className="mr-2 h-5 w-5" />
        申請代行を依頼
      </Button>
    </div>
  </DialogContent>
</Dialog>
    </>
  );
};

export default SubsidySearchForm;