var focusProperties = document.getElementsByName("focus_properties");
var mceFocus = document.getElementById("mce-FOCUS");
focusProperties.forEach((el) => {
  el.addEventListener('change', () => {
    var value = "";
    for (var i = 0; i < focusProperties.length; i++) {
        if (focusProperties[i].checked) {
          if(value == "")
            value = focusProperties[i].value;
          else
            value += ", " + focusProperties[i].value;
        }
    }
    mceFocus.value = value;
  })
});

var interestProperties = document.getElementsByName("interest_properties");
var mceInterest = document.getElementById("mce-INTEREST");

interestProperties.forEach((el) => {
  el.addEventListener('change', () => {
    var value = "";
    for (var i = 0; i < interestProperties.length; i++) {
        if (interestProperties[i].checked) {
          if(value == "")
            value = interestProperties[i].value;
          else
            value += ", " + interestProperties[i].value;
        }
    }
    mceInterest.value = value;
  })
});

const validateSignupFrom = () => {
  let email = document.getElementById("mce-EMAIL").value;
  
  if(email.length == 0)  return false;
  else {
    let submitBtn = document.getElementById("mc-embedded-subscribe");
    submitBtn.disabled = true;
    submitBtn.querySelector(".loading-overlay__spinner").classList.remove("hidden");
    return true;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  let contactEmail = sessionStorage.getItem("contactEmail");
  if(contactEmail !== null && typeof contactEmail !== 'undefined') {
    let emailInput = document.getElementById("mce-EMAIL");
    emailInput.value = contactEmail;
  }
});
