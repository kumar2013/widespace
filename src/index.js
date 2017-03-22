"use-strict";

class AdClientLibrary {  
  constructor(props) {
    this.containerId = props.containerId;
    this.updateInterval = props.updateInterval;
    this.ads = new Array();
  }
  
  appendAds() {
    let index = 0;
    
    setInterval(() => {
      const element = document.createElement('div');
      let node = document.getElementById(this.containerId);
      
      element.innerHTML = this.ads[index++];
      
      if (node.hasChildNodes()) {
        node.removeChild(node.firstChild);
      }
      
      node.appendChild(element);
      
      if (index == this.ads.length) {
        index = 0;
      }
    }, this.updateInterval*1000);
  }
  
  runAd() {
    if (this.ads.length) {
      this.appendAds();
    } else {
      this.prefetchAd();
      this.appendAds();
    }
  }
  
  prefetchAd() {
    const url = 'https://5xhlcfzk8c.execute-api.eu-west-1.amazonaws.com/prod/mock-engine';
    
    fetch(url, {
      method: 'get', 
      mode: 'cors'
    })
    .then((res) => res.json())
    .then((json) => {
      this.ads.push(json.ad);
    });
  }
  
  setUpdateInterval(timeInMins) {
    this.updateInterval = timeInMins;
  }
}

module.exports = AdClientLibrary;