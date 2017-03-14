(function(window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;
    window.powers = {};
    powers = window.powers;

    function FormHandler(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }
        this.$formElement = $(selector);
        if (this.$formElement.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    }

    function powerUnlocked(email, ach) {
        if (powers['email'] === email) {
            powers['achievement'] = ach;
        } else {
            powers['email'] = email;
            powers['achievement'] = ach;
        }
    }

    $('#emailInput').change(function() {
        if ($('#emailInput').val() === powers['email']) {
            var value = '';
            if (powers.achievement === 'Chocolate Cream') {
                value = 'chocolate-cream';
            }

            if (powers.achievement === 'Caramel Cream') {
                value = 'caramel-cream';
            }

            if (powers.achievement === 'Almond Milk') {
                value = 'almond-milk';
            }
            $('.power-group').append('&nbsp;&nbsp;&nbsp;<input type="checkbox" value=' + value + '>' + powers.achievement + '<br>');
            $('.power-group').css({
                'display': 'block',
            });
        } else {
            $('.power-group').css({
                'display': 'none',
            });
        }
    });

    FormHandler.prototype.addSubmitHandler = function(fn) {
        console.log('Setting submit handler for form');
        this.$formElement.on('submit', function(event) {
            event.preventDefault();

            var data = {};
            var achievement;
            $(this).serializeArray().forEach(function(item) {
                data[item.name] = item.value;
                console.log(item.name + ' is ' + item.value);
            });

            if (data['size'] === 'coffeezilla') {
                if (data['strength'] === '100') {
                    if (data['flavor'] === 'caramel') {
                        achievement = 'Caramel Cream';
                        $('#myModal .modal-title').text('Caramel Cream Unlocked');
                        $('#myModal .modal-body').text('Do you want some Caramel Cream on your coffee?');
                        if (powers['achievement'] != 'Caramel Cream')
                            $('#myModal').modal();
                    }
                    if (data['flavor'] === 'almond') {
                        achievement = 'Almond Milk';
                        $('#myModal .modal-title').text('Almond Milk Unlocked');
                        $('#myModal .modal-body').text('Do you want to add Almond Milk to your coffee?');
                        if (powers['achievement'] != 'Almond Milk')
                            $('#myModal').modal();
                    }
                    if (data['flavor'] === 'mocha') {
                        achievement = 'Chocolate Cream';
                        $('#myModal .modal-title').text('Chocolate Cream Unlocked');
                        $('#myModal .modal-body').text('Do you want some Chocolate Cream on your coffee?');
                        if (powers['achievement'] != 'Chocolate Cream')
                            $('#myModal').modal();
                    }
                }
            }

            $('.btn-yes').click(function() {
                data['power'] = achievement;
                powerUnlocked(data['emailAddress'], achievement);
                //achievement = '';
            });

            console.log(data);
            fn(data);
            this.reset();
            if ($('#emailInput').val() === '') {
                $('.power-group').css({
                    'display': 'none',
                });
            }
            this.elements[0].focus();
        });
    };
    App.FormHandler = FormHandler;
    window.App = App;


    $(document).on({
        change: function() {
            var r, g, b;
            var self = this,
                output = $(self).next(),
                val = parseInt(self.value);
            if (val <= 35) {
                r = Math.floor((255 * (val / 50))),
                    g = 255,
                    b = Math.floor((255 * (val / 50)));
            } else if (val > 35 && val <= 65) {
                r = Math.floor((255 * (val / 50))),
                    g = 255,
                    b = Math.floor(255 - (255 * (val / 50)));
            } else {
                r = 255,
                    g = Math.floor((100 - val) / 50 * 255),
                    b = Math.floor((100 - val) / 50 * 255);
            }
            output.css({
                color: 'rgb(' + r + ',' + g + ',' + b + ')',
            });
        }
    }, 'input[type="range"]');

})(window);
