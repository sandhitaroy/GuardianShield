document.getElementById('payment-method').addEventListener('change', function () {
    var selectedMethod = this.value;
    document.querySelectorAll('.payment-details').forEach(function (detailSection) {
        detailSection.style.display = 'none';
    });
    if (selectedMethod === 'card') {
        document.getElementById('card-details').style.display = 'block';
    } else if (selectedMethod === 'upi') {
        document.getElementById('upi-details').style.display = 'block';
    } else if (selectedMethod === 'net-banking') {
        document.getElementById('net-banking-details').style.display = 'block';
    }
});

document.getElementById('book-service-form').addEventListener('submit', function (event) {
    event.preventDefault();
    // Add your form submission logic here
    alert('Service booked successfully!');
});
