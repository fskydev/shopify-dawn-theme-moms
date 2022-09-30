class ClassWatcher {
  constructor(targetNode, classToWatch, classAddedCallback, classRemovedCallback) {
      this.targetNode = targetNode
      this.classToWatch = classToWatch
      this.classAddedCallback = classAddedCallback
      this.classRemovedCallback = classRemovedCallback
      this.observer = null
      this.lastClassState = targetNode.classList.contains(this.classToWatch)

      this.init()
  }

  init() {
      this.observer = new MutationObserver(this.mutationCallback)
      this.observe()
  }

  observe() {
      this.observer.observe(this.targetNode, { attributes: true })
  }

  disconnect() {
      this.observer.disconnect()
  }

  mutationCallback = mutationsList => {
      for(let mutation of mutationsList) {
          if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
              let currentClassState = mutation.target.classList.contains(this.classToWatch)
              if(this.lastClassState !== currentClassState) {
                  this.lastClassState = currentClassState
                  if(currentClassState) {
                      this.classAddedCallback()
                  }
                  else {
                      this.classRemovedCallback()
                  }
              }
          }
      }
  }
}

const workOnClassAddToSealsubsTarget = () => {
  showButtonSwitch();
}

const workOnClassRemovalSealsubsTarget = () => {
  hideButtonSwitch();
}

document.addEventListener("DOMContentLoaded", () => {
  let elSealsubsTarget = document.querySelector(".sealsubs-target-element");
  
  if(elSealsubsTarget.classList.contains("sealsubs-full")) showButtonSwitch();
  let classWatcher = new ClassWatcher(elSealsubsTarget, 'sealsubs-full', workOnClassAddToSealsubsTarget, workOnClassRemovalSealsubsTarget);
});

const showButtonSwitch = () => {
  let switchButtonWrapper = document.querySelector(".switch-button");
  switchButtonWrapper.style.display = "block";

  let elPriceRegular = switchButtonWrapper.parentNode.querySelector(".price__regular");
  let elSlsSellingPlanGroupPrice = switchButtonWrapper.parentNode.querySelector(".sls-selling-plan-group-price"); //
  let cbSwitchButton = document.querySelector(".switch-button-checkbox");
  

  cbSwitchButton.addEventListener('change', (event) => {
    if (event.target.checked) {
      let rdSubscription = document.querySelector('[type="radio"][data-type="subscription"].sls-option');
      rdSubscription.click();

      let elPrice = elSlsSellingPlanGroupPrice.querySelector(".sls-price");
      let elOriginalPrice = elSlsSellingPlanGroupPrice.querySelector(".sls-original-price");

      elPriceRegular.querySelector(".price-item").innerHTML = "<span class='original-price'>" + elOriginalPrice.querySelector("span").innerText + "</span>"+ elPrice.querySelector("span").innerText;
    } else {
      let rdOnetime = document.querySelector('[type="radio"][data-type="one_time"].sls-option');
      rdOnetime.click();

      let elOriginalPrice = elSlsSellingPlanGroupPrice.querySelector(".sls-original-price");
      elPriceRegular.querySelector(".price-item").innerText = elOriginalPrice.querySelector("span").innerText;    
    }
  });
}

const hideButtonSwitch = () => {
  let switchButtonWrapper = document.querySelector(".switch-button");
  switchButtonWrapper.style.display = "none";
}
