window.addEventListener("load", function() {
    let elProductDetailsText = document.querySelector(".image-with-text.product-details .image-with-text__text .metafield-multi_line_text_field");
    let htmlProductDetailsText = elProductDetailsText.innerHTML;
    let arrStrProductDetailsText = htmlProductDetailsText.split("<br>")
    .map(str => str.replace('\n', '')
    );

    htmlProductDetailsText = "";
    for (const [i, str] of arrStrProductDetailsText.entries()) {
        if(i % 2 == 0) {
            htmlProductDetailsText += "<b>" + str + "</b>";
        } else {
            htmlProductDetailsText += "<span>" + str + "</span>";
        }
    }
    elProductDetailsText.innerHTML = htmlProductDetailsText;

    this.document.querySelector(".image-with-text.supplements-facts .button").addEventListener("click", function(event){
        event.preventDefault();
        let dataPdfUrl = event.target.dataset.pdfUrl;
        window.open(dataPdfUrl);
    });

    let elsCustomRatingCount = document.getElementsByClassName("custom-rating_count");
    if(elsCustomRatingCount.length > 0) {
        let spanCustomRatingCount = elsCustomRatingCount[0];
        let cntReviews = spanCustomRatingCount.innerText;
        if(cntReviews != '') {
            let elSprStarrating = document.querySelector(".spr-starrating.spr-summary-starrating");

            let elSprStarsSvg = elSprStarrating.querySelector(".spr-stars");
            let badgeText = "reviews";
            if(cntReviews == "1") {
                badgeText = "review";
            }

            elSprStarrating.innerHTML = elSprStarsSvg.innerHTML + "<span>" + cntReviews + " "+ badgeText +"</span>";
        }
    }
});
