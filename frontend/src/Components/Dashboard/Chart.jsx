import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Chart = ({ data }) => {
    let cumulativeSum = 0;

    // Initialize labels and data arrays
    const labels = ['Start', ...data.map((entry) => new Date(entry.date).toLocaleDateString())];
    const cumulativeData = [0];

    data.forEach((entry) => {
        cumulativeSum += entry.amount;
        cumulativeData.push(cumulativeSum);
    });

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Cumulative Income',
                data: cumulativeData,
                fill: true,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                pointBackgroundColor: 'rgba(75, 192, 192, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                tension: 0.4
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: {
                        size: 14
                    }
                }
            },
            title: {
                display: true,
                text: 'Cumulative Income Over Time',
                font: {
                    size: 18
                },
                color: 'black'
            },
            tooltip: {
                backgroundColor: 'rgba(0,0,0,0.7)',
                titleFont: {
                    size: 16
                },
                bodyFont: {
                    size: 14
                },
                footerFont: {
                    size: 12
                },
                padding: 10
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    font: {
                        size: 12
                    }
                }
            },
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(200, 200, 200, 0.2)',
                    borderDash: [5, 5]
                },
                ticks: {
                    font: {
                        size: 12
                    }
                }
            }
        }
    };

    return (
        <div className='bg-blue-400 bg-opacity-40 p-5 rounded-md shadow-dark text-white h-[300px] w-[500px]'>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default Chart;
