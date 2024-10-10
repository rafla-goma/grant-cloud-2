'use client'

import React from 'react';
import Layout from '../components/Layout';
import SubsidySearchForm from '../components/subsidy/SubsidySearchForm';
import { searchSubsidies } from '../../utils/api-client';
import { SubsidySearchParams } from '../../utils/types';

const SearchPage: React.FC = () => {
    const handleSearch = async (params: SubsidySearchParams) => {
        try {
            return await searchSubsidies(params);
        } catch (err) {
            console.error('Search failed:', err);
            throw err;
        }
    };

    return (
        <Layout>
            <div className="flex-1 bg-gray-900 text-white">
                <SubsidySearchForm _onSearch={(params) => {
                    handleSearch(params);
                    return Promise.resolve();
                }} />
            </div>
        </Layout>
    );
};

export default SearchPage;