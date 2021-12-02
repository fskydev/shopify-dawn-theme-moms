window.addEventListener("load", function() {
    this.document.querySelector(".image-with-text.top-banner .button").addEventListener("click", function(event){
        event.preventDefault();
        let el = document.querySelector(".multicolumn.selling-products");
        el.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    });
});