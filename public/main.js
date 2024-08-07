$(document).ready(function () {
    $('#sortForm').on('submit', function (e) {
        e.preventDefault();
        console.log("Sort form submitted");

        try {
            const inputArray = $('#inputArray').val().split(',').map(item => item.trim());
            console.log("Input array:", inputArray);

            if (inputArray.some(item => item === '')) {
                throw new Error('Input array contains empty values.');
            }

            const criteria = $('.selected-criteria-option').map((_, el) => $(el).text().trim()).get();
            console.log("Selected criteria:", criteria);

            if (criteria.length === 0) {
                throw new Error('Please select at least one sort criterion.');
            }

            const order = $('#orderHidden').val();
            console.log("Selected order:", order);

            const outputFormat = $('#outputFormatHidden').val();
            console.log("Selected output format:", outputFormat);

            const language = $('#language').val();
            console.log("Selected language:", language);

            console.log("Sending sort request");
            $.ajax({
                url: '/sort',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ input: inputArray, criteria, order, options: [{}] }),
                success: function (sortedResult) {
                    console.log("Sort request successful, sorted result:", sortedResult);

                    console.log("Sending format request");
                    $.ajax({
                        url: '/format',
                        method: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify({ data: sortedResult, format: outputFormat, language: language }),
                        success: function (formattedData) {
                            console.log("Format request successful, formatted data:", formattedData);

                            if (outputFormat === 'table') {
                                let table = '<table><tr><td>' + formattedData + '</td></tr></table>';
                                $('#result').html(table);
                            } else if (outputFormat === 'orderedList') {
                                let ol = '<ol>' + formattedData + '</ol>';
                                $('#result').html(ol);
                            } else if (outputFormat === 'unorderedList') {
                                let ul = '<ul>' + formattedData + '</ul>';
                                $('#result').html(ul);
                            } else if (outputFormat === 'textFile') {
                                const blob = new Blob([formattedData], { type: 'text/plain' });
                                const link = document.createElement('a');
                                link.href = URL.createObjectURL(blob);
                                link.download = 'sorted_result.txt';
                                link.textContent = 'Download sorted result as text file';
                                $('#result').html(link);
                            } else if (outputFormat === 'chart') {
                                const ctx = document.getElementById('chart').getContext('2d');
                                new Chart(ctx, {
                                    type: 'bar',
                                    data: {
                                        labels: sortedResult,
                                        datasets: [{
                                            label: 'Sorted Data',
                                            data: sortedResult.map((_, i) => i + 1),
                                            backgroundColor: 'rgba(54, 162, 235, 0.2)',
                                            borderColor: 'rgba(54, 162, 235, 1)',
                                            borderWidth: 1
                                        }]
                                    },
                                    options: {
                                        scales: {
                                            y: {
                                                beginAtZero: true
                                            }
                                        }
                                    }
                                });
                                $('#chart').show();
                            } else if (outputFormat === 'heatmap') {
                                const ctx = document.getElementById('chart').getContext('2d');
                                const heatmapData = JSON.parse(formattedData);
                                const chartData = {
                                    labels: Object.keys(heatmapData),
                                    datasets: [{
                                        label: 'Heatmap',
                                        data: Object.values(heatmapData),
                                        backgroundColor: function (context) {
                                            const value = context.dataset.data[context.dataIndex];
                                            return value > 5 ? 'red' : value > 2 ? 'yellow' : 'green';
                                        }
                                    }]
                                };
                                new Chart(ctx, {
                                    type: 'bar',
                                    data: chartData,
                                    options: {
                                        scales: {
                                            x: {
                                                type: 'category',
                                                labels: chartData.labels
                                            },
                                            y: {
                                                type: 'linear',
                                                beginAtZero: true
                                            }
                                        },
                                        plugins: {
                                            colorschemes: {
                                                scheme: 'brewer.Paired12'
                                            }
                                        }
                                    }
                                });
                                $('#chart').show();
                            } else {
                                $('#result').text(formattedData);
                            }
                        },
                        error: function (xhr) {
                            console.error("Error in format request:", xhr.responseText);
                            alert(`Error: ${xhr.responseText}`);
                        }
                    });
                },
                error: function (xhr) {
                    console.error("Error in sort request:", xhr.responseText);
                    alert(`Error: ${xhr.responseText}`);
                }
            });
        } catch (error) {
            console.error("Error during sort:", error);
            $('#result').text('Error: ' + error.message);
        }
    });
});
