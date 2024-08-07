$(document).ready(function () {
    const criteriaDetails = {
        'alphabetical': { icon: 'fas fa-sort-alpha-down', description: 'Sorts alphabetically.' },
        'length': { icon: 'fas fa-ruler-horizontal', description: 'Sorts by length.' },
        'numeric': { icon: 'fas fa-sort-numeric-down', description: 'Sorts numerically.' },
        'date': { icon: 'fas fa-calendar-alt', description: 'Sorts by date.' },
        'frequency': { icon: 'fas fa-chart-bar', description: 'Sorts by frequency of a specified character.' },
        'substring': { icon: 'fas fa-ellipsis-h', description: 'Sorts by position of a substring.' },
        'case': { icon: 'fas fa-text-height', description: 'Sorts by case sensitivity.' },
        'uniqueChars': { icon: 'fas fa-fingerprint', description: 'Sorts by the number of unique characters.' },
        'vowelCount': { icon: 'fas fa-pen-fancy', description: 'Sorts by the number of vowels.' },
        'consonantCount': { icon: 'fas fa-spell-check', description: 'Sorts by the number of consonants.' },
        'wordCount': { icon: 'fas fa-file-word', description: 'Sorts by the number of words.' },
        'asciiSum': { icon: 'fas fa-code', description: 'Sorts by the ASCII sum of characters.' },
        'palindrome': { icon: 'fas fa-exchange-alt', description: 'Sorts by whether the string is a palindrome.' },
        'punctuationCount': { icon: 'fas fa-quote-right', description: 'Sorts by the number of punctuation marks.' },
        'alphanumeric': { icon: 'fas fa-sort-alpha-down', description: 'Sorts alphanumerically.' },
        'prefix': { icon: 'fas fa-level-up-alt', description: 'Sorts by prefix.' },
        'suffix': { icon: 'fas fa-level-down-alt', description: 'Sorts by suffix.' },
        'spaceCount': { icon: 'fas fa-window-minimize', description: 'Sorts by the number of spaces.' },
        'reverseAsciiSum': { icon: 'fas fa-sort', description: 'Sorts by the reverse ASCII sum of characters.' },
        'digitCount': { icon: 'fas fa-sort-numeric-up', description: 'Sorts by the number of digits.' },
        'vowelToConsonantRatio': { icon: 'fas fa-percentage', description: 'Sorts by the ratio of vowels to consonants.' },
        'firstWordLength': { icon: 'fas fa-file-alt', description: 'Sorts by the length of the first word.' },
        'lastWordLength': { icon: 'fas fa-file-alt', description: 'Sorts by the length of the last word.' },
        'upperCaseCount': { icon: 'fas fa-arrow-up', description: 'Sorts by the number of uppercase letters.' },
        'lowerCaseCount': { icon: 'fas fa-arrow-down', description: 'Sorts by the number of lowercase letters.' },
        'lexicographicWords': { icon: 'fas fa-book', description: 'Sorts by lexicographic order of words.' },
        'cumulativeCharPositions': { icon: 'fas fa-plus', description: 'Sorts by cumulative character positions.' },
        'fibonacciLength': { icon: 'fas fa-seedling', description: 'Sorts by whether the length is a Fibonacci number.' }
    };

    const criteriaDropdown = $('#criteriaOptions');
    const criteriaSelectDiv = $('#criteriaDropdown');
    const criteriaContainer = criteriaSelectDiv.parent();

    if (criteriaDropdown.length && criteriaSelectDiv.length && criteriaContainer.length) {
        for (const [criterion, details] of Object.entries(criteriaDetails)) {
            const option = $('<div>').addClass('criteria-option').data('value', criterion).html(`<i class="${details.icon}"></i> ${criterion}`);
            criteriaDropdown.append(option);
        }

        criteriaSelectDiv.on('click', function (event) {
            event.stopPropagation();
            criteriaContainer.toggleClass('open');
        });

        criteriaDropdown.on('click', '.criteria-option', function () {
            const selectedCriteria = $(this).data('value');
            const selectedIcon = $(this).find('i').attr('class');
            const criteriaOption = $('<div>').addClass('selected-criteria-option').html(`<i class="${selectedIcon}"></i> ${selectedCriteria}`);
            criteriaSelectDiv.append(criteriaOption);
            criteriaContainer.removeClass('open');
        });
    }

    // Handle language selection
    const languageDropdown = $('#languageDropdown');
    const languageOptions = $('#languageOptions');
    const languageInput = $('#language');
    const languageDropdownContainer = languageDropdown.parent();

    if (languageDropdown.length && languageOptions.length && languageInput.length && languageDropdownContainer.length) {
        languageDropdown.on('click', function (event) {
            event.stopPropagation();
            languageDropdownContainer.toggleClass('open');
        });

        languageOptions.on('click', '.language-option', function () {
            languageInput.val($(this).data('value'));
            languageDropdown.text($(this).text().trim());
            languageDropdownContainer.removeClass('open');
        });
    }

    // Handle format selection
    const formatDropdown = $('#formatDropdown');
    const formatOptions = $('#formatOptions');
    const formatInput = $('#outputFormatHidden');
    const formatDropdownContainer = formatDropdown.parent();

    if (formatDropdown.length && formatOptions.length && formatInput.length && formatDropdownContainer.length) {
        formatDropdown.on('click', function (event) {
            event.stopPropagation();
            formatDropdownContainer.toggleClass('open');
        });

        formatOptions.on('click', '.format-option', function () {
            formatInput.val($(this).data('value'));
            formatDropdown.text($(this).text().trim());
            formatDropdownContainer.removeClass('open');
        });
    }

    // Handle order selection
    const orderDropdown = $('#orderDropdown');
    const orderOptions = $('#orderOptions');
    const orderInput = $('#orderHidden');
    const orderDropdownContainer = orderDropdown.parent();

    if (orderDropdown.length && orderOptions.length && orderInput.length && orderDropdownContainer.length) {
        orderDropdown.on('click', function (event) {
            event.stopPropagation();
            orderDropdownContainer.toggleClass('open');
        });

        orderOptions.on('click', '.order-option', function () {
            orderInput.val($(this).data('value'));
            orderDropdown.text($(this).text().trim());
            orderDropdownContainer.removeClass('open');
        });
    }

    $(document).on('click', function (event) {
        if (!criteriaContainer.is(event.target) && criteriaContainer.has(event.target).length === 0) {
            criteriaContainer.removeClass('open');
        }
        if (!languageDropdownContainer.is(event.target) && languageDropdownContainer.has(event.target).length === 0) {
            languageDropdownContainer.removeClass('open');
        }
        if (!formatDropdownContainer.is(event.target) && formatDropdownContainer.has(event.target).length === 0) {
            formatDropdownContainer.removeClass('open');
        }
        if (!orderDropdownContainer.is(event.target) && orderDropdownContainer.has(event.target).length === 0) {
            orderDropdownContainer.removeClass('open');
        }
    });

    $('#saveConfig').on('click', function () {
        const config = {
            inputArray: $('#inputArray').val(),
            criteria: $('.selected-criteria-option').map((_, el) => $(el).text().trim()).get(),
            order: $('#orderHidden').val(),
            outputFormat: $('#outputFormatHidden').val(),
            language: $('#language').val()
        };
        localStorage.setItem('sortConfig', JSON.stringify(config));
        alert('Configuration saved!');
    });

    $('#loadConfig').on('click', function () {
        const config = JSON.parse(localStorage.getItem('sortConfig'));
        if (config) {
            $('#inputArray').val(config.inputArray);

            config.criteria.forEach(criterion => {
                const selectedIcon = criteriaDetails[criterion].icon || 'fas fa-question-circle';
                const criteriaOption = $('<div>').addClass('selected-criteria-option').html(`<i class="${selectedIcon}"></i> ${criterion}`);
                $('#criteriaDropdown').append(criteriaOption);
            });

            $('#orderHidden').val(config.order);
            $('#outputFormatHidden').val(config.outputFormat);
            $('#language').val(config.language);

            $('#orderDropdown').text($(`.order-option[data-value="${config.order}"]`).text().trim());
            $('#formatDropdown').text($(`.format-option[data-value="${config.outputFormat}"]`).text().trim());
            $('#languageDropdown').text($(`.language-option[data-value="${config.language}"]`).text().trim());
            alert('Configuration loaded!');
        } else {
            alert('No saved configuration found.');
        }
    });
});
