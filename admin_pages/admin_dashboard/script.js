// Sales Trend Chart (Line Chart)
const salesTrendCtx = document.getElementById('salesTrendChart').getContext('2d');
const salesTrendChart = new Chart(salesTrendCtx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Sales ($)',
            data: [1200, 1900, 3000, 5000, 2000, 3000],
            borderColor: '#ffd500',
            backgroundColor: 'rgba(255, 213, 0, 0.1)',
            tension: 0.4,
            fill: true
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    color: '#FFF3E0'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#FFF3E0'
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                }
            },
            y: {
                ticks: {
                    color: '#FFF3E0'
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                }
            }
        }
    }
});

// Order Status Pie Chart
const orderStatusCtx = document.getElementById('orderStatusChart').getContext('2d');
const orderStatusChart = new Chart(orderStatusCtx, {
    type: 'pie',
    data: {
        labels: ['Pending', 'Shipped', 'Delivered'],
        datasets: [{
            data: [30, 50, 20],
            backgroundColor: ['#F3722C', '#F8961E', '#ffd500'],
            borderColor: ['#b90404', '#b90404', '#b90404'],
            borderWidth: 2
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    color: '#FFF3E0'
                }
            }
        }
    }
});

// Refresh Button Functionality
document.getElementById('refreshBtn').addEventListener('click', function() {
    // Simulate refreshing data
    alert('Dashboard data refreshed!');
    // In a real app, this would fetch new data from server
    location.reload(); // Simple reload for demo
});

// Quick Action Buttons (Simulate navigation)
document.querySelectorAll('.btn-quick').forEach(button => {
    button.addEventListener('click', function() {
        const action = this.textContent;
        alert(`Navigating to: ${action}`);
        // In a real app, this would navigate to the respective page
    });
});

// View Order Buttons
document.querySelectorAll('.btn-action').forEach(button => {
    button.addEventListener('click', function() {
        alert('Viewing order details...');
        // In a real app, this would open order details page
    });
});
