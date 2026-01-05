import React, { Component } from "react";
import Chart from "react-apexcharts";

const InvestmentsChart = ({ investments }) => {
    // On transforme tes investissements en séries ApexCharts
    const series = [
        {
            name: "Invested Amount (FCFA)",
            data: investments.map(inv => inv.amount || 0),
        },
    ];

    const options = {
        chart: {
            type: "bar",
            height: 350,
            toolbar: { show: false },
        },
        xaxis: {
            categories: investments.map(inv => inv.investment.amount || "Unknown"),
            title: { text: "Investment Plans" },
        },
        yaxis: {
            title: { text: "Amount (FCFA)" },
        },
        dataLabels: {
            enabled: true,
            formatter: val => `${val}`,
        },
        tooltip: {
            y: {
                formatter: val => `${val}`,
            },
        },
    };

    return (
        <div>
            <Chart options={options} series={series} type="bar" height={350} />
        </div>
    );
};

export default InvestmentsChart;
