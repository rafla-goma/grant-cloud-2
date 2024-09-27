import React from 'react';
import { SubsidyDetail } from '@/utils/api-client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface SubsidyDetailModalProps {
  subsidy: SubsidyDetail;
  onClose: () => void;
  isLoading: boolean;
  error: string | null;
}

const SubsidyDetailModal: React.FC<SubsidyDetailModalProps> = ({ subsidy, onClose, isLoading, error }) => {
  if (isLoading) {
    return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="bg-gray-800 text-white">
          <p className="text-center">詳細情報を読み込み中...</p>
        </DialogContent>
      </Dialog>
    );
  }

  if (error) {
    return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="bg-gray-800 text-white">
          <p className="text-center text-red-500">{error}</p>
          <Button onClick={onClose} className="mt-4">閉じる</Button>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="bg-gray-800 text-white max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{subsidy.subsidy_name}</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          <p className="text-lg font-semibold">{subsidy.catch_copy}</p>
          <p>{subsidy.summary}</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-bold">目的</h3>
              <p>{subsidy.purpose}</p>
            </div>
            <div>
              <h3 className="font-bold">対象業種</h3>
              <p>{subsidy.target_industry}</p>
            </div>
            <div>
              <h3 className="font-bold">対象地域</h3>
              <p>{subsidy.target_area}</p>
            </div>
            <div>
              <h3 className="font-bold">詳細地域</h3>
              <p>{subsidy.target_area_detail}</p>
            </div>
            <div>
              <h3 className="font-bold">従業員数</h3>
              <p>{subsidy.target_number_of_employees}</p>
            </div>
            <div>
              <h3 className="font-bold">補助金上限</h3>
              <p>{subsidy.subsidy_max_limit.toLocaleString()}円</p>
            </div>
            <div>
              <h3 className="font-bold">募集開始</h3>
              <p>{new Date(subsidy.acceptance_start_datetime).toLocaleString()}</p>
            </div>
            <div>
              <h3 className="font-bold">募集終了</h3>
              <p>{new Date(subsidy.acceptance_end_datetime).toLocaleString()}</p>
            </div>
          </div>
        </div>
        <Button onClick={onClose} className="mt-6 bg-yellow-400 hover:bg-yellow-300 text-black font-bold">
          閉じる
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default SubsidyDetailModal;