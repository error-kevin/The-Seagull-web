import React, { useState, useEffect } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, ArcElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import axios from '../../api/axios';

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const fetchTeamData = async () => {
    try {
        const response = await axios.get('/registration/player');
        const getCollegeCounts = (data) => {
            const collegeCounts = {};
            
            data.forEach(team => {
                // team.members.forEach(member => {
                    const collegeName = team.college;
                    if (collegeCounts[collegeName]) {
                        collegeCounts[collegeName]++;
                    } else {
                        collegeCounts[collegeName] = 1;
                    }
                // });
            });
            return collegeCounts;
        };

        const getEventCounts = (data) => {
            const eventCounts = {};
            data.forEach(team => {
                const eventName = team.college;
                if (eventCounts[eventName]) {
                    eventCounts[eventName]++;
                } else {
                    eventCounts[eventName] = 1;
                }
            });
            return eventCounts;
        };

        const collegeCounts = getCollegeCounts(response.data);
        const eventCounts = getEventCounts(response.data);
        return { collegeCounts, eventCounts };
    } catch (err) {
        console.error(err);
    }
}

export const BarChartComponent2 = () => {
    const [eventData, setEventData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchTeamData();
            setEventData(data.eventCounts);
        };
        fetchData();
    }, []);

    if (!eventData) {
        return <div>Loading...</div>;
    }

    const data = {
        labels: Object.keys(eventData),
        datasets: [
            {
                label: 'No. of Teams',
                data: Object.values(eventData),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 2,
                barThickness: 80,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                display: false,
                labels: {
                    color: 'white',
                    font: {
                        size: 14,
                        weight: 'bold'
                    }
                }
            },
            tooltip: {
                enabled: true,
                backgroundColor: 'rgba(0,0,0,0.8)',
                titleColor: 'white',
                bodyColor: 'white',
                borderColor: 'white',
                borderWidth: 1,
            }
        },
        scales: {
            x: {
                ticks: {
                    display: false,
                    color: 'white',
                    font: {
                        size: 12,
                    }
                },
                grid: {
                    display: false,
                }
            },
            y: {
                beginAtZero: true,
                ticks: {
                    color: 'white',
                    font: {
                        size: 12,
                    }
                },
                grid: {
                    color: 'rgba(200, 200, 200, 0.2)',
                }
            }
        }
    };

    return <Bar data={data} options={options} />;
};

export const BarChartComponent = () => {
    const [collegeData, setCollegeData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchTeamData();
            setCollegeData(data.collegeCounts);
        };
        fetchData();
    }, []);

    if (!collegeData) {
        return <div>Loading...</div>;
    }

    const data = {
        labels: Object.keys(collegeData),
        datasets: [
            {
                label: 'No. of Participants',
                data: Object.values(collegeData),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 2,
                barThickness: 75,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                display: false,
                labels: {
                    color: 'white',
                    font: {
                        size: 14,
                        weight: 'bold'
                    }
                }
            },
            tooltip: {
                enabled: true,
                backgroundColor: 'rgba(0,0,0,0.8)',
                titleColor: 'white',
                bodyColor: 'white',
                borderColor: 'white',
                borderWidth: 1,
            }
        },
        scales: {
            x: {
                ticks: {
                    display: false,
                    color: 'white',
                    font: {
                        size: 12,
                    }
                },
                grid: {
                    display: false,
                }
            },
            y: {
                beginAtZero: true,
                ticks: {
                    color: 'white',
                    font: {
                        size: 12,
                    }
                },
                grid: {
                    color: 'rgba(200, 200, 200, 0.2)',
                }
            }
        }
    };

    return <Bar data={data} options={options} />;
};

export const DonutChartComponent = () => {
    const [collegeData, setCollegeData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchTeamData();
            setCollegeData(data.collegeCounts);
        };
        fetchData();
    }, []);

    if (!collegeData) {
        return <div>Loading...</div>;
    }

    const data = {
        labels: Object.keys(collegeData),
        datasets: [
            {
                label: 'No. of Participants',
                data: Object.values(collegeData),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                display: false,
                labels: {
                    color: 'blue',
                    font: {
                        size: 14,
                        weight: 'bold'
                    }
                }
            },
            tooltip: {
                enabled: true,
                backgroundColor: 'rgba(0,0,0,0.8)',
                titleColor: 'white',
                bodyColor: 'white',
                borderColor: 'white',
                borderWidth: 1,
            }
        }
    };

    return <Doughnut data={data} options={options} />;
};
