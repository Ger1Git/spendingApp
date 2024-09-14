import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Chart = ({ data, label, lineColor }) => {
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
                label: `Cumulative ${label}`,
                data: cumulativeData,
                fill: true,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: `${lineColor}`,
                pointBackgroundColor: 'rgba(75, 192, 192, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                tension: 0.2
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false, // Allows the chart to scale with the container
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: {
                        size: 16 // Increased font size for better visibility
                    }
                }
            },
            title: {
                display: true,
                text: `Cumulative ${label} Over Time`,
                font: {
                    size: 22 // Larger title font
                },
                color: 'white'
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
                        size: 14 // Larger x-axis tick font size
                    }
                }
            },
            y: {
                beginAtZero: true,
                grid: {
                    display: false
                },
                ticks: {
                    font: {
                        size: 14 // Larger y-axis tick font size
                    }
                }
            }
        }
    };

    return (
        <div className='bg-blue-400 bg-opacity-40 p-5 rounded-md shadow-dark text-white w-[400px] h-[250px] md:w-[500px] md:h-[300px] lg:w-[600px] lg:h-[450px]'>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default Chart;
