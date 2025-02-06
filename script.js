$(document).ready(function () {
  const API_URL = "/api/city";
  const cityForm = $("#cityForm");
  const searchBtn = $("#searchBtn");
  const cityInput = $("#city");
  const btnText = $("#btnText");
  const btnSpinner = $("#btnSpinner");
  const loadingIndicator = $("#loadingIndicator");
  const cityDetails = $("#cityDetails");
  const noDataMessage = $("#noDataMessage");
  const noLoadMessage = $("#noLoadMessage");

  cityForm.submit(function (event) {
    event.preventDefault();

    if (cityInput.val().trim() === "") {
      cityInput.addClass("is-invalid");
      return;
    } else {
      cityInput.removeClass("is-invalid");
    }

    $(this).addClass("was-validated");
    fetchCityData(cityInput.val().trim());
  });

  function fetchCityData(city) {
    searchBtn.prop("disabled", true);
    btnText.addClass("d-none");
    btnSpinner.removeClass("d-none");

    loadingIndicator.removeClass("d-none");
    cityDetails.hide();
    noDataMessage.addClass("d-none");
    noLoadMessage.addClass("d-none");

    $.ajax({
      url: API_URL,
      type: "GET",
      data: { name: city },
      success: function (response) {
        if (response) {
          updateCityDetails(response);
        } else {
          noDataMessage.removeClass("d-none");
        }
      },
      error: function () {
        noDataMessage
          .text("Error occurs in fetching data.")
          .removeClass("d-none");
      },
      complete: function () {
        searchBtn.prop("disabled", false);
        btnText.removeClass("d-none");
        btnSpinner.addClass("d-none");

        loadingIndicator.addClass("d-none");
      },
    });
  }

  function updateCityDetails(cityData) {
    $("#name").text(cityData.name || "N/A");
    $("#country").text(cityData.country || "N/A");
    $("#region").text(cityData.region || "N/A");
    $("#population").text(cityData.population.toLocaleString() || "N/A");
    $("#latitude").text(cityData.latitude || "N/A");
    $("#longitude").text(cityData.longitude || "N/A");
    $("#is_capital").text(`${cityData.is_capital}` || "N/A");

    cityDetails.fadeIn(500);
  }
});
