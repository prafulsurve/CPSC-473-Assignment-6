(function(window) {
    'use strict';
    var App = window.App;
    var DataStore = App.DataStore;
    var ds = new DataStore();

    var Truck = App.Truck;
    var myTruck = new Truck('ncc-1701', new DataStore());
    window.myTruck = myTruck;

    QUnit.test('Get All the DataStores', function(assert) {
        assert.propEqual(ds.add('m@bond.com', 'tea'), undefined, 'Passed');
        assert.propEqual(ds.add('james@bond.com', 'eshpressho'), undefined, 'Passed');
        assert.propEqual(ds.getAll(), {
            'm@bond.com': 'tea',
            'james@bond.com': 'eshpressho'
        }, 'Passed');
        ds.remove('james@bond.com');
        assert.propEqual(ds.getAll(), {
            'm@bond.com': 'tea'
        }, 'Passed');
        assert.propEqual(ds.get('m@bond.com'), 'tea', 'Passed');
        assert.propEqual(ds.get('james@bond.com'), undefined, 'Passed');
    });

    QUnit.test('One busy coffee truck', function(assert) {
        assert.propEqual(myTruck.createOrderTest({
            emailAddress: 'me@goldfinger.com',
            coffee: 'double mocha'
        }), {
            'me@goldfinger.com': {
                emailAddress: 'me@goldfinger.com',
                coffee: 'double mocha'
            }
        }, 'Passed');
        assert.propEqual(myTruck.createOrderTest({
            emailAddress: 'dr@no.com',
            coffee: 'decaf'
        }), {
            'dr@no.com': {
                emailAddress: 'dr@no.com',
                coffee: 'decaf'
            },
            'me@goldfinger.com': {
                emailAddress: 'me@goldfinger.com',
                coffee: 'double moch a'
            }
        }, 'Passed');
        assert.propEqual(myTruck.createOrder({
            emailAddress: 'm@bond.com',
            coffee: 'earl grey'
        }), undefined, 'Passed');

        assert.propEqual(myTruck.printOrders(), undefined, 'Passed');
        assert.propEqual(myTruck.deliverOrder('dr@no.com'), undefined, 'Passed');
        assert.propEqual(myTruck.deliverOrder('m@bond.com'), undefined, 'Passed');
        assert.propEqual(myTruck.printOrders(), undefined, 'Passed');
    });


})(window);
