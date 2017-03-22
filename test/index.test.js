import chai from 'chai';
import fetchMock from 'fetch-mock';
import sinon from 'sinon';

import AdClientLibrary from '../src/index.js';

let { assert, expect } = chai;

describe('AdClientLibrary', () => {
  it('should create a single ad instance', () => {
    let testAd1 = new AdClientLibrary({'containerId': 'topBanner', 'updateInterval': 2});
    
    assert.equal(testAd1.containerId, 'topBanner');
    assert.equal(testAd1.updateInterval, 2);
  });
  
  it('should create multiple ad instance with separate scope', () => {
    let testAd2 = new AdClientLibrary({'containerId': 'rightBanner', 'updateInterval': 4});
    let testAd3 = new AdClientLibrary({'containerId': 'bottomBanner', 'updateInterval': 6});
    let testAd4 = new AdClientLibrary({'containerId': 'leftBanner', 'updateInterval': 8});
    
    assert.equal(testAd4.containerId, 'leftBanner');
    assert.equal(testAd3.containerId, 'bottomBanner');
    assert.equal(testAd2.containerId, 'rightBanner');
    assert.equal(testAd2.updateInterval, 4);
    assert.equal(testAd3.updateInterval, 6);
    assert.equal(testAd4.updateInterval, 8);
  });
  
  it('should update interval on set', () => {
    let testAd5 = new AdClientLibrary({'containerId': 'testBanner1', 'updateInterval': 10});
    
    assert.equal(testAd5.updateInterval, 10);
    
    testAd5.setUpdateInterval(20);
    
    assert.equal(testAd5.updateInterval, 20);
  });
  
  it('should fetch the ad on prefetchAd', () => {
    let testAd6 = new AdClientLibrary({'containerId': 'testBanner2', 'updateInterval': 25});
    assert.equal(testAd6.ads, '');
    
    let ads = {ad: "<a href=\"WS_DYN_INS_LINKURL\"><img src=\"http://resource.widespace.com/widespace/ads/testads/takeOver300x300.jpg\"style=\"border:0\"/></a>"};
    
    sinon.stub(testAd6, 'prefetchAd').returns(ads);
    
    assert.notEqual(testAd6.prefetchAd(), '');
    assert.equal(testAd6.prefetchAd(), ads);
  });
  
  it('should trigger appendAds when calling runAd', () => {
    let testAd6 = new AdClientLibrary({'containerId': 'testBanner2', 'updateInterval': 25});
    let spy = sinon.spy(testAd6, "appendAds");
  
    let ads = {ad: "<a href=\"WS_DYN_INS_LINKURL\"><img src=\"http://resource.widespace.com/widespace/ads/testads/takeOver300x300.jpg\"style=\"border:0\"/></a>"};
    
    fetchMock.get('*', ads)
    testAd6.runAd();
    assert(spy.calledOnce);
  });
});
