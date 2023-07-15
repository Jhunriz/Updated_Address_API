document.addEventListener("DOMContentLoaded", function () {
    const provinces = document.getElementById("api_provinces");
    const region = document.getElementById("api_region");
    const municipalityOrCity = document.getElementById(
        "api_municipality_or_city"
    );
    const barangay = document.getElementById("api_barangay_name");

    // Fetch Province data from the API
    fetch("https://psgc.gitlab.io/api/provinces/")
        .then((response) => response.json())
        .then((data) => {
            const selectElement = document.getElementById("api_provinces");
            // Iterate through the data and create options for the select input
            data.forEach((provinces) => {
                const option = document.createElement("option");
                option.value = provinces.code;
                option.text = provinces.name;
                selectElement.appendChild(option);
            });
        })
        .catch((error) => {
            console.error("Error:", error);
        });

    // Fetch Regions data from the API
    fetch("https://psgc.gitlab.io/api/regions/")
        .then((response) => response.json())
        .then((data) => {
            const selectElement = document.getElementById("api_region");
            // Iterate through the data and create options for the select input
            data.forEach((region) => {
                const option = document.createElement("option");
                option.value = region.code;
                option.text = region.name + " - " + region.regionName;
                selectElement.appendChild(option);
            });
        })
        .catch((error) => {
            console.error("Error:", error);
        });

    // Event listener for provinces selection
    region.addEventListener("change", () => {
        const selectedProvinces = region.value;
        // Clear the provinces select input
        provinces.innerHTML =
            "<option disabled selected>Select Provinces</option>";
        // Fetch data for the selected region
        fetch(
            `https://psgc.gitlab.io/api/regions/${selectedProvinces}/provinces/`
        )
            .then((response) => response.json())
            .then((data) => {
                // Populate the provinces select input
                data.forEach((province) => {
                    const option = document.createElement("option");
                    option.value = province.code;
                    option.text = province.name;
                    provinces.appendChild(option);
                });
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    });

    // Event listener for region selection
    region.addEventListener("change", () => {
        const selectedRegion = region.value;
        // Clear the provinces select input
        municipalityOrCity.innerHTML =
            "<option disabled selected>Select Municipality or City</option>";
        // Fetch data for the selected region
        fetch(
            `https://psgc.gitlab.io/api/regions/${selectedRegion}/cities-municipalities/`
        )
            .then((response) => response.json())
            .then((data) => {
                // Populate the provinces select input
                data.forEach((city) => {
                    const option = document.createElement("option");
                    option.value = city.code;
                    option.text = city.name;
                    municipalityOrCity.appendChild(option);
                });
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    });

    // Event listener for city or municipality selection
    municipalityOrCity.addEventListener("change", () => {
        const selectedCity = municipalityOrCity.value;
        // Clear the provinces select input
        barangay.innerHTML =
            "<option disabled selected>Select Barangay</option>";
        // Fetch data for the selected region
        fetch(
            `https://psgc.gitlab.io/api/cities-municipalities/${selectedCity}/barangays/`
        )
            .then((response) => response.json())
            .then((data) => {
                // Populate the provinces select input
                data.forEach((brgy) => {
                    const option = document.createElement("option");
                    option.value = brgy.code;
                    option.text = brgy.name;
                    barangay.appendChild(option);
                });
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    });
});
