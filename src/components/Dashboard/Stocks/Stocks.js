import React, { useState, useEffect } from "react";
import { Table, Card, Typography } from "antd";

const { Title } = Typography;

const Stocks = () => {
  const testStocksData = [
    {
      symbol: "AAPL",
      shares: 100,
      purchase: 150.0,
      price: 170.5, // 从外部获得的当前价格
      dividend: 2.5, // 从外部获得的股息
    },
    {
      symbol: "IBKR",
      shares: 7.6292,
      purchase: 94.13,
      price: 127.07, // 从外部获得的当前价格
      dividend: 0.79, // 从外部获得的股息
    },
    // ... 更多股票数据
  ];

  const [stocksData, setStocksData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setStocksData(testStocksData);
    setLoading(true);
  }, [loading]);

  const calculateStockData = (stock) => {
    const cost = +(stock.shares * stock.purchase).toFixed(2);
    const marketValue = +(stock.shares * stock.price).toFixed(2);
    const dollarGain = +((stock.price - stock.purchase) * stock.shares).toFixed(
      2
    );
    const growth = +(
      ((stock.price - stock.purchase) / stock.purchase) *
      100
    ).toFixed(2);

    return {
      ...stock,
      cost,
      marketValue,
      dollarGain,
      growth: `${growth}%`,
    };
  };

  const stocks = stocksData.map(calculateStockData);

  const columns = [
    { title: "Symbol", dataIndex: "symbol", key: "symbol" },
    { title: "Shares", dataIndex: "shares", key: "shares" },
    {
      title: "Purchase",
      dataIndex: "purchase",
      key: "purchase",
      render: (value) => value.toFixed(2),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (value) => value.toFixed(2),
    },
    { title: "Cost", dataIndex: "cost", key: "cost" },
    { title: "Market Value", dataIndex: "marketValue", key: "marketValue" },
    { title: "Gain", dataIndex: "dollarGain", key: "dollarGain" },
    { title: "Growth", dataIndex: "growth", key: "growth" },
    {
      title: "Dividend",
      dataIndex: "dividend",
      key: "dividend",
      render: (value) => value.toFixed(2),
    },
  ];

  return (
    <Card>
      <Title level={3}>Shares</Title>
      <Table
        columns={columns}
        dataSource={stocks}
        pagination={false}
        scroll={{ x: true }}
        rowKey="symbol"
      />
    </Card>
  );
};

export default Stocks;
