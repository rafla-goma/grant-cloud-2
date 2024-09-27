import React from 'react';
import { SubsidyInfo } from '@/utils/api-client';

interface SubsidyListProps {
  subsidies: SubsidyInfo[];
}

const SubsidyList: React.FC<SubsidyListProps> = ({ subsidies }) => {
  return (
    <ul className="space-y-4">
      {subsidies.map((subsidy) => (
        <li key={subsidy.id} className="border p-4 rounded-md bg-white shadow">
          <h3 className="font-bold">{subsidy.subsidy_name}</h3>
          <p>目的: {subsidy.purpose}</p>
          <p>対象業種: {subsidy.target_industry}</p>
          <p>従業員数: {subsidy.target_number_of_employees}</p>
          <p>対象地域: {subsidy.target_area}</p>
        </li>
      ))}
    </ul>
  );
};

export default SubsidyList;