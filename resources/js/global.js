(function(){
    var watchNamePlaceholder = document.getElementById('watch-model');
    var watchBrandPlaceholder = document.getElementById('watch-brand');
    var watchDescriptionPlaceholder = document.getElementById('watch-description');
    var watchImagePlaceholder = document.getElementById('watch-image');
    var caseSizePlaceholder = document.getElementById('case-size');
    var caseShapePlaceholder = document.getElementById('case-shape');
    var caseMaterialPlaceholder = document.getElementById('case-material');
    var dialColorPlaceholder = document.getElementById('dial-color');
    var amazonLinkPlaceholder = document.getElementById('amazon-link');
    var pdfLinkPlaceholder = document.getElementById('pdf-link');
    var brandPageLink = document.getElementById('brand-page-link');
    var searchTitlePlaceholder = document.getElementById('search-title');

    var brandList =  document.getElementById('brand-list');
    var categoryList =  document.getElementById('category-list');

    var watchPage = document.getElementById('watch-page');
    var searchPage = document.getElementById('search-page');

    var allWatches = [];
    var allBrands = [];
    var allCategories = [];
    var brandsNoDuplicates = [];
    var categoriesNoDuplicates = [];


    function getAllWatches() {
        
        for (var watch in watchData) {
            allWatches.push(watch);
        }
        console.log(allWatches);
    }

    function getAllBrands() {
        for (i = 0; i < allWatches.length; i++) {
            allBrands.push(watchData[allWatches[i]].brand);
        }

        brandsNoDuplicates = Array.from(new Set(allBrands));
        console.log(brandsNoDuplicates);
    }

    function getAllCategories() {
        for (i = 0; i < allWatches.length; i++) {
            allCategories.push(watchData[allWatches[i]].category);
        }

        categoriesNoDuplicates = Array.from(new Set(allCategories));
        console.log(categoriesNoDuplicates);
    }

    window.onload = function(){
        
        populateWatchSearch();
        getAllWatches();
        getAllBrands();
        getAllCategories();
        populateBrandPage();
        populateCategoryPage();
        pageSwitcher();

        $('.menu-item').on("click", function(){
            choosePage(this);
        });
        $('.watch-thumb').on("click", function(){
            displayWatchPage(this);
        });
        $('.brand-link').on("click", function(){
            searchByBrand(this);
        });
        $('.category-link').on("click", function(){
            searchByCategory(this);
        });
    }

    function displayWatchPage(obj) {
        $('.menu-item').removeClass("active");
        var selection = obj.getAttribute("data-name");
        $('.page').hide();

        watchNamePlaceholder.innerHTML = watchData[selection].model;
        watchBrandPlaceholder.innerHTML = watchData[selection].brand;
        watchDescriptionPlaceholder.innerHTML = watchData[selection].description;
        caseSizePlaceholder.innerHTML = watchData[selection].specifications.caseSize;
        caseShapePlaceholder.innerHTML = watchData[selection].specifications.caseShape;
        caseMaterialPlaceholder.innerHTML = watchData[selection].specifications.caseMaterial;
        dialColorPlaceholder.innerHTML = watchData[selection].specifications.dialColor;

        pdfLinkPlaceholder.href = watchData[selection].pdfLink;
        amazonLinkPlaceholder.href = watchData[selection].amazonLink;

        watchImagePlaceholder.src = watchData[selection].image;
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        $('#watch-page').fadeIn(350);
    }



    function populateWatchSearch() {
        for (var watch in watchData) {
            var container = document.createElement("DIV");
            var label = document.createElement("p")
            var img = document.createElement("IMG");

            container.classList.add("watch-thumb");
            container.setAttribute('data-brand', watchData[watch].brand);
            container.setAttribute('data-category', watchData[watch].category);
            container.setAttribute('data-name', watch)
            container.classList.add("centered");
            
            label.innerHTML = watch;
            
            img.src = watchData[watch].image;

            container.appendChild(img);
            container.appendChild(label);

           searchPage.appendChild(container);
        }
    }

    $("#search-form").on("submit",function(e) {
        e.preventDefault();
        searchByKeyword();
    });

    function searchByKeyword() {
        
        $('.menu-item').removeClass("active");
        input = document.getElementById("watch-search-input");
        filter = input.value.toUpperCase(); // converts user search into all uppercase

        allResults = document.getElementById("search-page");
        searchArray = allResults.getElementsByTagName("div");  // Create array to search through
        
        searchTitlePlaceholder.innerHTML = "Search Results for: " + input.value;

        for (i = 0; i < searchArray.length; i++) {
            currentOption = searchArray[i].innerHTML;

            if (filter == "") {
                searchArray[i].style.display = "none"; 
                $(searchPage).hide();
                location.hash = 'about-page';
                return;     
            } else if (currentOption.toUpperCase().indexOf(filter) > -1) { // If the current option searchArray[i] contains the search keyword, show and enable the option
                searchArray[i].style.display = "";
            } else { 
                searchArray[i].style.display = "none";
            }
        }
        input.value = "";
        $('.page').hide();;
        $(searchPage).show();
    }

    function searchByBrand(obj){
        $('.brand-link').removeClass("active");
        $(obj).addClass("active");
        brand = obj.innerHTML;
        searchTitlePlaceholder.innerHTML = brand;
        allResults = document.getElementById("search-page");
        searchArray = allResults.getElementsByTagName("div");  // Create array to search through
        
        for (i = 0; i < searchArray.length; i++) {
            currentOption = searchArray[i];

            if (currentOption.getAttribute('data-brand') == brand) { // If the current option searchArray[i] contains the search keyword, show and enable the option
                searchArray[i].style.display = "";
            } else { 
                searchArray[i].style.display = "none";
            }
        }
        location.hash = 'search-page';
    }

    function searchByCategory(obj) {
        $('.category-link').removeClass("active");
        $(obj).addClass("active");
        category = obj.innerHTML;
        searchTitlePlaceholder.innerHTML = category;
        allResults = document.getElementById("search-page");
        searchArray = allResults.getElementsByTagName("div");  // Create array to search through
        
        for (i = 0; i < searchArray.length; i++) {
            currentOption = searchArray[i];

            if (currentOption.getAttribute('data-category') == category) { // If the current option searchArray[i] contains the search keyword, show and enable the option
                searchArray[i].style.display = "";
            } else { 
                searchArray[i].style.display = "none";
            }
        }
        location.hash = 'search-page';
    }

    window.onhashchange = function(){
        pageSwitcher();
    }

    function choosePage(obj) {
        location.hash = obj.getAttribute("data-link");
        $('.menu-item').removeClass("active");
        obj.classList.add("active");
        console.log(obj);
    }

    function pageSwitcher(){
        page = location.hash || '#about-page';
        $('.page').hide();
        $('.category-link').removeClass("active");
        $('.brand-link').removeClass("active");
        $('.menu-item').removeClass("active");
        $(page+"-link").addClass("active");
        $(page).fadeIn(350);
        console.log(page);
    }

    function populateBrandPage() {
        var sortedBrands = brandsNoDuplicates.sort();
        for (i = 0; i < sortedBrands.length; i++) {
            var brandLink = document.createElement("LI");
            brandLink.innerHTML = sortedBrands[i];
            brandLink.classList.add("brand-link");
            // brandLink.classList.add("menu-item");
            brandList.appendChild(brandLink);
        }
    }

    function populateCategoryPage() {
        var sortedCategories = categoriesNoDuplicates.sort();

        for (i = 0; i < sortedCategories.length; i++) {         
            var categoryLink = document.createElement("LI");
            categoryLink.innerHTML = sortedCategories[i];
            categoryLink.classList.add("category-link");
            // categoryLink.classList.add("menu-item");
            categoryList.appendChild(categoryLink);
        }
    }

})()