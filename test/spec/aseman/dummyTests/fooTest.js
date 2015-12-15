'use strict';
angular.module('test.service', [])
    .service('shop', ['costumer',function (costumer) {
        var shop={};
        shop.foo='foo';
        shop.addCostumer=function(){console.log(costumer.create());};
        return shop;
    }])
    .service('costumer',['cash','checkout',function (cash,checkout) {
        var costomer={};
        costomer.bar='bar';

        costomer.create=function(){return 'costumer pays '+cash.pay()+' and checkout: '+checkout.do();}

        return costomer;
    }])
    .service('cash',[function () {
        var cash={};
        cash.pay=function(){return 100;};
        return cash;
    }])
    .service('checkout',[function () {
        var checkout={};
        checkout.do=function(){return true;};
        return checkout;
    }])
;

describe('Dummy tests for testing tests!', function () {
    beforeEach(module('test.service'));
    var shopS,costumerS;
    var spyCash,cashS;
    var mockCash = {
        pay: function () {
            return '10000';
        }
    };
    beforeEach(function () {
        module(function ($provide) {
            $provide.value('cash', mockCash);
            //$provide.value('checkout', function () {
            //   this.do=jasmine.createSpy('do').andFakeCall(function (foo) {
            //       return 'bar';
            //   }) ;
            //});
        });
    });
    beforeEach(inject(function ($injector) {
        shopS=$injector.get('shop');
        costumerS = $injector.get('costumer');
        spyCash = jasmine.createSpyObj('cash',['do']);
        cashS=$injector.get('cash');
    }))
    //beforeEach(inject(function (shop,costumer) {
    //    shopS = shop;
    //    costumerS=costumer;
    //}));

    it('shop foo', function () {
        expect(shopS.foo).toBe('foo');
    });
    it('costumer bar', function () {
        expect(costumerS.bar).toBe('bar');
    });
    it('spy on cash in call to addCostumer', function(){
        spyOn(mockCash,'pay').and.callThrough();
        shopS.addCostumer();
        expect(mockCash.pay).toHaveBeenCalled();
        //expect(shopS.addCostumer()).toHaveBeenCalled();
    });
    it('spy on cash in call to addCostumer change return', function(){
        spyOn(mockCash,'pay').and.returnValue(90);
        shopS.addCostumer();
        expect(mockCash.pay).toHaveBeenCalled();
        //expect(shopS.addCostumer()).toHaveBeenCalled();
    });
    it('test for spying cash', function(){
        //spyOn(spyCash,'do').and.returnValue(false);
        shopS.addCostumer();
        //expect(spyCash.do).toHaveBeenCalled();
    });

});
//describe('mock costumer', function () {
//    beforeEach(module('test.service'));
//    var shopS,costumerS;
//    beforeEach(inject(function (shop) {
//        shopS = shop;
//    }));
//    })
//
//    it('with mock costumer', function(){
//        expect(shopS.addCostumer());
//    });
//});


