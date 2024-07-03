"use client";
import ContainerSection from "@/components/partials/ContainerSection";
import { generateTransactionGraphData } from "@/lib/expense_calculations";
import { TransactionInterface } from "@/types/transaction.types";
import React from "react";
import ReactApexChart from "react-apexcharts";

const TransactionsChart = ({
  transactions,
}: {
  transactions: TransactionInterface[] | [];
}) => {
  if(!transactions) return;
  const result = generateTransactionGraphData(transactions);
  // Define colors and styles for light mode
  const lightModeColors = {
    background: "#ffffff",
    primary: "#1a202c", // Primary text color for dark backgrounds
    secondary: "#3182ce", // Accent color for light mode
    gridColor: "#f3f3f3",
  };

  return (
    <ContainerSection className="my-10 dark:text-dark-color">
      <ReactApexChart
        options={{
          chart: {
            height: 350,
            type: "line",
            zoom: {
              enabled: false,
            },
            background: lightModeColors.background,
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: "straight",
          },
          title: {
            text: "Transaction Graph",
            align: "left",
            style: {
              color: lightModeColors.primary,
            },
          },
          grid: {
            row: {
              colors: [lightModeColors.gridColor, "transparent"],
              opacity: 0.5,
            },
          },
          xaxis: {
            categories: result.map(r=>r.label),
            labels: {
              style: {
                colors: lightModeColors.primary,
              },
            },
          },
        }}
        series={[
          {
            name: "Expense",
            data: result.map(r=>r.value),
          },
        ]}
        type="line"
      />
    </ContainerSection>
  );
};

export default TransactionsChart;
