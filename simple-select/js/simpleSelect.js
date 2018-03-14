var SimpleSelect = {
    init: function (options) {
        if (typeof options.select === 'string')
            options.select = $(options.select);

        var optionsDefault = {
            notFoundMessage: 'Não encontrado.',
            defaultSelected: 'Selecionar...'
        }

        this.options = $.extend(true, optionsDefault, options);

        this._build();
    },
    _build: function () {
        var template = '<div class="simple-select">\
                                    <div class="selected">'+ this.options.defaultSelected + '</div>\
                                    <div class="simple-select-modal">\
                                        <input type="text"/>\
                                        <div class="simple-select-result"></div>\
                                    </div>\
                                </div>';

        this.$container = $(template);
        this.$container.insertAfter(this.options.select);
        this.$container.prepend(this.options.select);

        this._buildSelect(this.options.terms);
        this._triggers();
    },
    _buildSelect(terms) {
        // Controi o <select> com os <option>
        var selectOptions = '<option>' + this.options.defaultSelected + '</option>';
        for (var i = 0; i < terms.length; i++) {
            selectOptions += '<option value="' + terms[i] + '">' + terms[i] + '</option>';
        }
        this.$container.find('select').html(selectOptions);
    },
    _triggers() {
        var self = this;
        var $inputSearch = this.$container.find('.simple-select-modal input');

        $inputSearch.on('keyup', function (e) {
            self._renderResults(self._searchTerm(e.target.value));
        });

        this.$container.find('.selected').on('click', function (e) {
            $inputSearch.val('');
            self.$container.addClass('modal-open');
            $inputSearch.focus();
        });

        $inputSearch.on('focus', function (e) {
            self._renderResults(self._searchTerm(e.target.value));
        });

        $inputSearch.on('focusout', function (e) {
            setTimeout(function () {
                self.$container.removeClass('modal-open');
            }, 150);
        });

        $(document).on('click', '.simple-select .option-found', function () {
            self._select($(this).text());
        });
    },
    _renderResults: function (termsFound) {
        var $resultContainer = this.$container.find('.simple-select-modal .simple-select-result');
        var template = '';
        if (!termsFound.length) {
            $resultContainer.html('<span class="not-found">' + this.options.notFoundMessage + '</span>');
            return false;
        }

        for (var i = 0; i < termsFound.length; i++) {
            template += '<span class="option-found">' + termsFound[i] + '</span>';
        }

        $resultContainer.html(template);
    },
    _searchTerm: function (q) {
        var terms = this.options.terms;
        var termsFound = [],
            regex = new RegExp(q.toUpperCase());

        for (var i = 0; i < terms.length; i++) {
            if (regex.test(terms[i].toUpperCase()))
                termsFound.push(terms[i]);
        }

        return termsFound;
    },
    _select: function (term) {
        var $options = this.$container.find('select option');

        for (var i = 0; i < $options.length; i++) {
            if ($options[i].value === term) {
                $($options[i]).prop('selected', true);
                this.$container.find('.selected').text(term);
                break;
            }
        }
    }
}