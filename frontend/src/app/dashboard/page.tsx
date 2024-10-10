'use client'

import React, { useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, PointElement, LineElement } from 'chart.js';
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../../components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, PointElement, LineElement);

// モックデータ
const mockData = {
  applicationCount: 150,
  passedCount: 75,
  totalSubsidyAmount: 100000000,
  subsidyBreakdown: [
    { name: '設備投資', amount: 50000000 },
    { name: '研究開発', amount: 30000000 },
    { name: '人材育成', amount: 20000000 },
  ],
  monthlyApplications: [
    { month: '1月', count: 10 },
    { month: '2月', count: 15 },
    { month: '3月', count: 20 },
    { month: '4月', count: 25 },
    { month: '5月', count: 30 },
    { month: '6月', count: 35 },
  ],
  topSubsidies: [
    { name: '中小企業経営強化税制', count: 30 },
    { name: '事業再構築補助金', count: 25 },
    { name: 'ものづくり補助金', count: 20 },
    { name: '小規模事業者持続化補助金', count: 15 },
    { name: 'IT導入補助金', count: 10 },
  ],
};

const Dashboard: React.FC = () => {
  const {
    applicationCount,
    passedCount,
    totalSubsidyAmount,
    subsidyBreakdown,
    monthlyApplications,
    topSubsidies
  } = mockData;

  const [_showBreakdown, setShowBreakdown] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const barData = {
    labels: subsidyBreakdown.map(item => item.name),
    datasets: [
      {
        label: '補助金額',
        data: subsidyBreakdown.map(item => item.amount),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const lineData = {
    labels: monthlyApplications.map(item => item.month),
    datasets: [
      {
        label: '月間申請数',
        data: monthlyApplications.map(item => item.count),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      },
    ],
  };

  const topSubsidiesData = {
    labels: topSubsidies.map(item => item.name),
    datasets: [
      {
        label: '申請数',
        data: topSubsidies.map(item => item.count),
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: 'white'
        }
      }
    },
    scales: {
      x: {
        ticks: { color: 'white' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' }
      },
      y: {
        ticks: { color: 'white' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' }
      }
    }
  };

  const applicationStatusData = {
    labels: ['申請状況'],
    datasets: [
      {
        label: '通過数',
        data: [passedCount],
        backgroundColor: '#36A2EB',
      },
      {
        label: '未通過数',
        data: [applicationCount - passedCount],
        backgroundColor: '#FF6384',
      }
    ]
  };

  const applicationStatusOptions = {
    ...chartOptions,
    indexAxis: 'y' as const,
    plugins: {
      ...chartOptions.plugins,
      legend: {
        ...chartOptions.plugins.legend,
        position: 'top' as const,
      },
    },
    scales: {
      x: {
        stacked: true,
        ticks: { color: 'white' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' }
      },
      y: {
        stacked: true,
        ticks: { color: 'white' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' }
      }
    }
  };

  const tabVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 }
  };

  const tabs = [
    { id: "overview", label: "概要" },
    { id: "monthly", label: "月間推移" },
    { id: "top", label: "人気補助金" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-500 to-blue-500 text-white p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16">
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 sm:mb-6 text-center">
        ダッシュボード
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="bg-white bg-opacity-10 backdrop-blur-lg">
          <CardHeader>
            <CardTitle className="text-white">申請数</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl text-white">{applicationCount}</p>
          </CardContent>
        </Card>
        <Card className="bg-white bg-opacity-10 backdrop-blur-lg">
          <CardHeader>
            <CardTitle className="text-white">通過数</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl text-white">{passedCount}</p>
          </CardContent>
        </Card>
        <Card className="bg-white bg-opacity-10 backdrop-blur-lg">
          <CardHeader>
            <CardTitle className="text-white">補助金合計額</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl text-white">{totalSubsidyAmount.toLocaleString()}円</p>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="mt-2 bg-blue-500 hover:bg-blue-600 text-white" onClick={() => setShowBreakdown(true)}>内訳を表示</Button>
              </DialogTrigger>
              <DialogContent className="bg-white">
                <DialogHeader>
                  <DialogTitle className="text-gray-800">補助金内訳</DialogTitle>
                </DialogHeader>
                <div className="h-96">
                  <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false }} />
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>
      <div className="mb-8 flex space-x-2 bg-white bg-opacity-10 backdrop-blur-lg p-2 rounded-lg">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`transition-colors duration-200 ease-in-out ${
              activeTab === tab.id
                ? "bg-blue-500 hover:bg-blue-600 text-white"
                : "bg-white bg-opacity-10 backdrop-blur-lg text-white hover:bg-white hover:bg-opacity-20"
            }`}
          >
            {tab.label}
          </Button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        {activeTab === "overview" && (
          <motion.div
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Card className="bg-white bg-opacity-10 backdrop-blur-lg">
              <CardHeader>
                <CardTitle className="text-white">申請状況</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <Bar data={applicationStatusData} options={applicationStatusOptions} />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
        {activeTab === "monthly" && (
          <motion.div
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Card className="bg-white bg-opacity-10 backdrop-blur-lg">
              <CardHeader>
                <CardTitle className="text-white">月間申請数推移</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <Line data={lineData} options={chartOptions} />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
        {activeTab === "top" && (
          <motion.div
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Card className="bg-white bg-opacity-10 backdrop-blur-lg">
              <CardHeader>
                <CardTitle className="text-white">人気補助金ランキング</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <Bar data={topSubsidiesData} options={{...chartOptions, indexAxis: 'y'}} />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Dashboard;