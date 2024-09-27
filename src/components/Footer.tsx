import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <p className="text-sm">
              &copy; 2023 補助金クラウド. All rights reserved.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold tracking-wider uppercase">
                  サービス
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link href="/search" className="text-base text-gray-300 hover:text-white">
                      補助金検索
                    </Link>
                  </li>
                  <li>
                    <Link href="/community" className="text-base text-gray-300 hover:text-white">
                      コミュニティ
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold tracking-wider uppercase">
                  サポート
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link href="/faq" className="text-base text-gray-300 hover:text-white">
                      よくある質問
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-base text-gray-300 hover:text-white">
                      お問い合わせ
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;