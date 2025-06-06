/****************************************************************************
 * Barren v1.0
 * Simple Online Event Ticketing System Html Template by Gambolthemes
 * Copyright 2022 | Gambolthemes | https://gambolthemes.net
 * @package Gambolthemes
 ****************************************************************************/
 
/*----------------------------------------------
Index Of Script
------------------------------------------------

:: Tooltip
:: Bookmark Event
:: QTY JS
:: Switch Buttons
:: Payment Method Accordion
:: Add Tags
:: Initialize and add the map
:: Owl Silder
:: Count Time JS
:: Multi Dropdown JS
:: Events by Date JS

------------------------------------------------
Index Of Script
----------------------------------------------*/

/*--- Tooltip Widget ---*/
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})

/*--- Bookmark Event ---*/
$(document).ready(function() {
	$('.bookmark-icon, .bookmark-button').on('click', function(e) {
		e.preventDefault();
		$(this).toggleClass('bookmarked');
		$(this).children('.bookmark-icon').toggleClass('bookmarked');
	});
});

/*--- QTY JS ---*/
function increaseCount(a, b) {
  var input = b.previousElementSibling;
  var value = parseInt(input.value, 10);
  value = isNaN(value) ? 0 : value;
  value++;
  input.value = value;
}

function decreaseCount(a, b) {
  var input = b.nextElementSibling;
  var value = parseInt(input.value, 10);
  if (value > 1) {
    value = isNaN(value) ? 0 : value;
    value--;
    input.value = value;
  }
}

/*--- Switch Buttons ---*/

// Early Bird Discount Switch Button

$(document).ready(function(){
	$("#bird-discount").on("change", function(e) {
  	const isOn = e.currentTarget.checked;
    
    if (isOn) {
    	$(".online-event-discount-wrapper").show();
    } else {
    	$(".online-event-discount-wrapper").hide();
    }
  });
});

// Early Bird Discount Switch Button 2

$(document).ready(function(){
	$("#bird-discount2").on("change", function(e) {
  	const isOn = e.currentTarget.checked;
    
    if (isOn) {
    	$(".online-event-discount-wrapper2").show();
    } else {
    	$(".online-event-discount-wrapper2").hide();
    }
  });
});

// Free Event Ticketing Switch Button

$(document).ready(function(){
	$("#free-event-ticketing").on("change", function(e) {
  	const isOn = e.currentTarget.checked;
    
    if (isOn) {
    	$(".disabled-action").hide();
    } else {
    	$(".disabled-action").show();
    }
  });
});

// Booking Start Time Switch Button

$(document).ready(function(){
	$("#booking-start-time-btn").on("change", function(e) {
  	const isOn = e.currentTarget.checked;
    
    if (isOn) {
    	$(".booking-start-time-holder").hide();
    } else {
    	$(".booking-start-time-holder").show();
    }
  });
});

// Booking End Time Switch Button

$(document).ready(function(){
	$("#booking-end-time-btn").on("change", function(e) {
  	const isOn = e.currentTarget.checked;
    
    if (isOn) {
    	$(".booking-end-time-holder").hide();
    } else {
    	$(".booking-end-time-holder").show();
    }
  });
});

// Refund Policies Holder Switch Button
$(document).ready(function(){
    $("#refund-policies-btn").on("change", function(e) {
        const isOn = e.currentTarget.checked;

        if (isOn) {
            $(".refund-policies-holder").hide();
        } else {
            $(".refund-policies-holder").show();
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const refundabilityCheckbox = document.getElementById('refund-policies-btn');
    const refundRadioButtons = document.getElementsByName('refund_policy_id');
    const refundDelayManual = document.querySelector('input[name="refundDelay-manual"]');
    const refundDelayAuto = document.querySelector('input[name="refundDelay-automatic"]'); // Nom corrigé
    const refundPercentage = document.querySelector('input[name="refundPercentage"]');

    // Fonction pour réinitialiser les paramètres de remboursement
    function resetRefundFields() {
        refundRadioButtons.forEach(radio => {
            radio.checked = false; // Décocher tous les boutons radios
        });
        refundDelayManual.value = ''; // Réinitialiser le délai manuel
        refundDelayAuto.value = ''; // Réinitialiser le délai automatique
        refundPercentage.value = ''; // Réinitialiser le pourcentage de remboursement
    }

    // Gestion du changement d'état de refundabilitySet
    refundabilityCheckbox.addEventListener('change', function () {
        if (this.checked) {
            resetRefundFields(); // Réinitialiser les valeurs de remboursement si la checkbox est cochée
        }
    });
});



// Ticket Instructions Switch Button

$(document).ready(function(){
	$("#ticket-instructions-btn").on("change", function(e) {
  	const isOn = e.currentTarget.checked;
    
    if (isOn) {
    	$(".ticket-instructions-holder").hide();
    } else {
    	$(".ticket-instructions-holder").show();
    }
  });
});

// Tags Switch Button

$(document).ready(function(){
	$("#tags-btn").on("change", function(e) {
  	const isOn = e.currentTarget.checked;
    
    if (isOn) {
    	$(".tags-holder").hide();
    } else {
    	$(".tags-holder").show();
    }
  });
});

// Single Ticket Per Level Switch Button

$(document).ready(function(){
	$("#is-restrict-total-ticket").on("change", function(e) {
  	const isOn = e.currentTarget.checked;
    
    if (isOn) {
    	$(".total_ticket_per_level").hide();
    } else {
    	$(".total_ticket_per_level").show();
    }
  });
});

// Single Ticket Per User Switch Button

$(document).ready(function(){
	$("#is-restrict-ticket-per-user").on("change", function(e) {
  	const isOn = e.currentTarget.checked;
    
    if (isOn) {
    	$(".total_ticket_per_user").hide();
    } else {
    	$(".total_ticket_per_user").show();
    }
  });
});

// Group Ticket Per Level2 Switch Button

$(document).ready(function(){
	$("#is-restrict-total-ticket2").on("change", function(e) {
  	const isOn = e.currentTarget.checked;
    
    if (isOn) {
    	$(".total_ticket_per_level2").hide();
    } else {
    	$(".total_ticket_per_level2").show();
    }
  });
});

// Group Ticket Per User2 Switch Button

$(document).ready(function(){
	$("#is-restrict-ticket-per-user2").on("change", function(e) {
  	const isOn = e.currentTarget.checked;
    
    if (isOn) {
    	$(".total_ticket_per_user2").hide();
    } else {
    	$(".total_ticket_per_user2").show();
    }
  });
});

/*--- Payment Method Accordion ---*/
$('input[name="refund_policy_id"]').on('click', function () {
	var $value = $(this).attr('value');
	$('.refund-input-content').slideUp();
	$('[data-method="' + $value + '"]').slideDown();
});

/*--- Add tags ---*/
$(".tags-container").each(function() {

	var keywordInput = $(this).find(".tags-input");
	var keywordsList = $(this).find(".tags-list");

	// adding tags
	function addKeyword() {
		var $newKeyword = $("<span class='tag'><span class='tag-remove'></span><span class='tag-text'>"+ keywordInput.val() +"</span></span>");
		keywordsList.append($newKeyword).trigger('resizeContainer');
		keywordInput.val("");
	}

	// add via enter key
	keywordInput.on('keyup', function(e){
		if((e.keyCode == 13) && (keywordInput.val()!=="")){
			addKeyword();
		}
	});

	// removing tags
	$(document).on("click",".tag-remove", function(){
		$(this).parent().addClass('tag-removed');

		function removeFromMarkup(){
		  $(".tag-removed").remove();
		}
		setTimeout(removeFromMarkup, 500);
		keywordsList.css({'height':'auto'}).height();
	});


	// animating container height
	keywordsList.on('resizeContainer', function(){
		var heightnow = $(this).height();
		var heightfull = $(this).css({'max-height':'auto', 'height':'auto'}).height();

		$(this).css({ 'height' : heightnow }).animate({ 'height': heightfull }, 200);
	});

	$(window).on('resize', function() {
		keywordsList.css({'height':'auto'}).height();
	});

	// Auto Height for tags that are pre-added
	$(window).on('load', function() {
		var keywordCount = $('.tags-list').children("span").length;

		// Enables scrollbar if more than 3 items
		if (keywordCount > 0) {
			keywordsList.css({'height':'auto'}).height();
	
		} 
	});

});
	
/*--- Initialize and add the map ---*/
// The following example creates a marker in Stockholm, Sweden using a DROP
// animation. Clicking on the marker will toggle the animation between a BOUNCE
// animation and no animation.
let marker;

function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 13,
    center: { lat: 59.325, lng: 18.07 },
  });

  marker = new google.maps.Marker({
    map,
    draggable: true,
    animation: google.maps.Animation.DROP,
    position: { lat: 59.327, lng: 18.067 },
  });
  marker.addListener("click", toggleBounce);
}

function toggleBounce() {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}

window.initMap = initMap;
	

/*--- Owl Sliders ---*/

// Engaging Online and Venue Events Slider
$('.engaging-slider').owlCarousel({
	items:5,
	loop:true,
	margin:20,
	nav:true,
	dots:true,
	navText: ["<i class='uil uil-angle-left'></i>", "<i class='uil uil-angle-right'></i>"],
	smartSpeed:800,
	autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
	responsive:{
		0:{
			items:1
		},
		600:{
			items:1
		},
		1000:{
			items:2
		},
		1200:{
			items:3
		},
		1400:{
			items:3
		}
	}
})

// Testimonial Slider
$('.testimonial-slider').owlCarousel({
	items:10,
	loop:true,
	margin:20,
	nav:false,
	dots:true,
	smartSpeed:800,
	autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
	responsive:{
		0:{
			items:1
		},
		600:{
			items:1
		},
		1000:{
			items:2
		},
		1200:{
			items:2
		},
		1400:{
			items:2
		}
	}
})

// Organisations Slider
$('.organisations-slider').owlCarousel({
	items:7,
	loop:true,
	margin:20,
	nav:false,
	dots:false,
	smartSpeed:800,
	autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
	responsive:{
		0:{
			items:2
		},
		600:{
			items:2
		},
		1000:{
			items:3
		},
		1200:{
			items:4
		},
		1400:{
			items:5
		}
	}
})

// More Events Slider
$('.moreEvents-slider').owlCarousel({
	items:7,
	loop:true,
	margin:20,
	nav:true,
	dots:false,
	navText: ["<i class='uil uil-angle-left'></i>", "<i class='uil uil-angle-right'></i>"],
	responsive:{
		0:{
			items:1
		},
		600:{
			items:2
		},
		800:{
			items:2
		},
		1000:{
			items:3
		},
		1200:{
			items:4
		},
		1400:{
			items:4
		}
	}
})

// More Events Slider
$('.moreEvents-slider').owlCarousel({
	items:7,
	loop:true,
	margin:20,
	nav:true,
	dots:false,
	navText: ["<i class='uil uil-angle-left'></i>", "<i class='uil uil-angle-right'></i>"],
	responsive:{
		0:{
			items:1
		},
		600:{
			items:2
		},
		800:{
			items:2
		},
		1000:{
			items:3
		},
		1200:{
			items:4
		},
		1400:{
			items:4
		}
	}
})

// Most Posts Slider
$('.most-posts-slider').owlCarousel({
	items:1,
	loop:true,
	margin:20,
	nav:false,
	dots:true,
	smartSpeed:800,
	autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
	responsive:{
		0:{
			items:1
		},
		600:{
			items:1
		},
		800:{
			items:1
		},
		1000:{
			items:1
		},
		1200:{
			items:1
		},
		1400:{
			items:1
		}
	}
})

// Related Posts Slider
$('.related-posts-slider').owlCarousel({
	items:4,
	loop:true,
	margin:20,
	nav:true,
	dots:false,
	navText: ["<i class='uil uil-angle-left'></i>", "<i class='uil uil-angle-right'></i>"],
	responsive:{
		0:{
			items:1
		},
		600:{
			items:2
		},
		800:{
			items:2
		},
		1000:{
			items:3
		},
		1200:{
			items:3
		},
		1400:{
			items:4
		}
	}
})

// Role Slider
$('.role-slider').owlCarousel({
	items:4,
	loop:false,
	margin:20,
	nav:true,
	dots:false,
	navText: ["<i class='uil uil-angle-left'></i>", "<i class='uil uil-angle-right'></i>"],
	responsive:{
		0:{
			items:1
		},
		600:{
			items:2
		},
		800:{
			items:2
		},
		1000:{
			items:3
		},
		1200:{
			items:3
		},
		1400:{
			items:4
		}
	}
})



/*--- Count Time JS ---*/ 

function makeTimer() {
var endTime = new Date("december  30, 2022 17:00:00 PDT");			
var endTime = (Date.parse(endTime)) / 1000;
var now = new Date();
var now = (Date.parse(now) / 1000);
var timeLeft = endTime - now;
var days = Math.floor(timeLeft / 86400); 
var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600 )) / 60);
var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));
if (hours < "10") { hours = "0" + hours; }
if (minutes < "10") { minutes = "0" + minutes; }
if (seconds < "10") { seconds = "0" + seconds; }
$("#days").html(days + "<span>Days</span>");
$("#hours").html(hours + "<span>Hours</span>");
$("#minutes").html(minutes + "<span>Minutes</span>");
$("#seconds").html(seconds + "<span>Seconds</span>");
}
setInterval(function() { makeTimer(); }, 300);


/*--- Multi Dropdown JS ---*/ 

$(document).ready(function(){
  $('.dropdown-submenu a.submenu-item').on("click", function(e){
    $(this).next('ul').toggle();
    e.stopPropagation();
    e.preventDefault();
  });
});


/*--- Multi Dropdown JS ---*/ 
$(document).ready(function(){
    $('input[type="radio"]').click(function(){
        var inputValue = $(this).attr("value");
        var targetBox = $("." + inputValue);
        $(".event-box").not(targetBox).hide();
        $(targetBox).show();
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Sélection des éléments de formulaire pour la section "Setting"
    const bookingStartCheckbox = document.getElementById('booking-start-time-btn');
    const bookingStartDate = document.querySelector('input[name="bookingStartDate"]');
    const bookingStartHour = document.querySelector('select[name="bookingStartHour"]');

    const bookingEndCheckbox = document.getElementById('booking-end-time-btn');
    const bookingEndingDate = document.querySelector('input[name="bookingEndingDate"]');
    const bookingEndingHour = document.querySelector('select[name="bookingEndingHour"]');

    const refundabilityCheckbox = document.getElementById('refund-policies-btn');
    const refundRadioButtons = document.getElementsByName('refund_policy_id');
    const refundDelayManual = document.querySelector('input[name="refundDelay-manual"]');
    const refundDelayAuto = document.querySelector('input[name="refundDelay-automatic"]');
    const refundPercentage = document.querySelector('input[name="refundPercentage"]');

    // Limites des valeurs pour chaque champ
    const limits = {
        refundDelay: { min: 0, max: 100, errorMsg: "Le délai doit être compris entre 0 et 100 jours." },
        refundPercentage: { min: 1, max: 100, errorMsg: "Le pourcentage de remboursement doit être entre 1% et 100%." },
        // Ajoutez d’autres limites spécifiques ici si nécessaire
    };

    // Fonction de réinitialisation pour les paramètres de remboursement
    function resetRefundFields() {
        refundRadioButtons.forEach(radio => {
            radio.checked = false; // Décocher tous les boutons radios
        });
        refundDelayManual.value = ''; // Réinitialiser le délai manuel
        refundDelayAuto.value = ''; // Réinitialiser le délai automatique
        refundPercentage.value = ''; // Réinitialiser le pourcentage de remboursement
    }

    // Fonction de réinitialisation pour les champs de date et heure de réservation
    function resetBookingFields() {
        bookingStartDate.value = '';
        bookingStartHour.value = '00:00'; // Option par défaut pour l’heure de début

        bookingEndingDate.value = '';
        bookingEndingHour.value = '00:00'; // Option par défaut pour l’heure de fin
    }

    // Contrôles de saisie pour chaque champ spécifique
    function validateInput(inputField, limit) {
        const value = parseInt(inputField.value, 10);
        if (isNaN(value) || value < limit.min || value > limit.max) {
            inputField.value = '';  // Efface la valeur incorrecte
            showError(inputField, limit.errorMsg);
        } else {
            hideError(inputField);
        }
    }

    // Affiche un message d’erreur
    function showError(inputField, message) {
        let errorDiv = inputField.nextElementSibling;
        if (!errorDiv || !errorDiv.classList.contains('error-message')) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            inputField.after(errorDiv);
        }
        errorDiv.textContent = message;
        errorDiv.style.color = 'red';
    }

    // Cache le message d’erreur
    function hideError(inputField) {
        const errorDiv = inputField.nextElementSibling;
        if (errorDiv && errorDiv.classList.contains('error-message')) {
            errorDiv.remove();
        }
    }

    // Événements pour chaque champ à valider
    refundDelayManual.addEventListener('input', () => validateInput(refundDelayManual, limits.refundDelay));
    refundDelayAuto.addEventListener('input', () => validateInput(refundDelayAuto, limits.refundDelay));
    refundPercentage.addEventListener('input', () => validateInput(refundPercentage, limits.refundPercentage));

    // Gestion du changement d’état des checkboxes
    bookingStartCheckbox.addEventListener('change', function () {
        if (this.checked) {
            resetBookingFields(); // Réinitialiser les champs si la checkbox est cochée
        }
    });

    bookingEndCheckbox.addEventListener('change', function () {
        if (this.checked) {
            resetBookingFields(); // Réinitialiser les champs si la checkbox est cochée
        }
    });

    refundabilityCheckbox.addEventListener('change', function () {
        if (this.checked) {
            resetRefundFields(); // Réinitialiser les champs de remboursement si la checkbox est cochée
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Sélection des champs
    const eventName = document.querySelector('input[name="eventName"]');
    const eventType = document.querySelector('select[name="type"]');
    const eventStartDate = document.querySelector('input[name="eventStartDate"]');
    const eventStartTime = document.querySelector('select[name="eventStartTime"]');
    const duration = document.querySelector('select[name="duration"]');
    const flyerfile = document.querySelector('input[name="flyerfile"]');
    const description = document.getElementById('pd_editor');
    const placeName = document.querySelector('input[name="placeName"]');
    const addressLine1 = document.querySelector('input[name="addressLine1"]');
    const addressLine2 = document.querySelector('input[name="addressline2"]');
    const country = document.querySelector('select[name="country"]');
    const city = document.querySelector('input[name="city"]');
    const zipCode = document.querySelector('input[name="zipCode"]');

    // Fonctions de validation
    function validateTextInput(input, minLength, maxLength, errorMsg) {
        const value = input.value.trim();
        if (value.length < minLength || value.length > maxLength) {
            showError(input, errorMsg);
            return false;
        }
        hideError(input);
        return true;
    }

    function validateDateInput(input, errorMsg) {
        const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
        if (!datePattern.test(input.value)) {
            showError(input, errorMsg);
            return false;
        }
        hideError(input);
        return true;
    }

    function validateFileInput(input, maxSize, allowedTypes, errorMsg) {
        for (const file of input.files) {
            if (file.size > maxSize || !allowedTypes.includes(file.type)) {
                showError(input, errorMsg);
                return false;
            }
        }
        hideError(input);
        return true;
    }

    function validateSelect(input, errorMsg) {
        if (input.selectedIndex === -1) {
            showError(input, errorMsg);
            return false;
        }
        hideError(input);
        return true;
    }

    function validateZipCode(input, errorMsg) {
        const zipPattern = /^\d{4,10}$/;
        if (!zipPattern.test(input.value)) {
            showError(input, errorMsg);
            return false;
        }
        hideError(input);
        return true;
    }

    // Messages d'erreur
    function showError(input, message) {
        let errorDiv = input.nextElementSibling;
        if (!errorDiv || !errorDiv.classList.contains('error-message')) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            input.after(errorDiv);
        }
        errorDiv.textContent = message;
        errorDiv.style.color = 'red';
    }

    function hideError(input) {
        const errorDiv = input.nextElementSibling;
        if (errorDiv && errorDiv.classList.contains('error-message')) {
            errorDiv.remove();
        }
    }

    // Écouteurs d'événements pour la validation
    eventName.addEventListener('input', () => validateTextInput(eventName, 5, 100, "Le nom de l'événement doit comporter entre 5 et 100 caractères."));
    eventStartDate.addEventListener('blur', () => validateDateInput(eventStartDate, "Veuillez entrer une date au format MM/JJ/AAAA."));
    flyerfile.addEventListener('change', () => validateFileInput(flyerfile, 5 * 1024 * 1024, ['image/jpeg', 'image/png'], "L'image doit être de type JPEG ou PNG et ne pas dépasser 5 Mo."));
    zipCode.addEventListener('input', () => validateZipCode(zipCode, "Le code postal doit comporter entre 4 et 10 chiffres."));
    placeName.addEventListener('input', () => validateTextInput(placeName, 3, 70, "Le nom du lieu doit comporter entre 3 et 50 caractères."));
    addressLine1.addEventListener('input', () => validateTextInput(addressLine1, 5, 100, "L'adresse ligne 1 doit comporter entre 5 et 100 caractères."));
    addressLine2.addEventListener('input', () => validateTextInput(addressLine2, 0, 100, "L'adresse ligne 2 ne doit pas dépasser 100 caractères."));
    city.addEventListener('input', () => validateTextInput(city, 2, 50, "La ville doit comporter entre 2 et 50 caractères."));
	country.addEventListener('change', () => validateSelect(country, "Veuillez sélectionner un pays."));


    // Final: vérifier tout avant soumission
    document.querySelector('form').addEventListener('submit', function (e) {
        let isValid = true;
        isValid &= validateTextInput(eventName, 5, 100, "Le nom de l'événement doit comporter entre 5 et 100 caractères.");
        isValid &= validateDateInput(eventStartDate, "Veuillez entrer une date valide.");
        isValid &= validateFileInput(flyerfile, 5 * 1024 * 1024, ['image/jpeg', 'image/png'], "Image JPEG/PNG max 5 Mo.");
        isValid &= validateZipCode(zipCode, "Le code postal doit comporter entre 4 et 10 chiffres.");
        isValid &= validateTextInput(placeName, 3, 70, "Le nom du lieu doit comporter entre 3 et 50 caractères.");
        isValid &= validateTextInput(addressLine1, 5, 100, "L'adresse ligne 1 doit comporter entre 5 et 100 caractères.");
        isValid &= validateTextInput(city, 2, 50, "La ville doit comporter entre 2 et 50 caractères.");
		isValid &= validateSelect(country, "Veuillez sélectionner un pays.");

        if (!isValid) e.preventDefault(); // Bloquer la soumission si validation échoue
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const quill = window.quill || null;

    document.querySelector('form').addEventListener('submit', function () {
        if (quill) {
            const hiddenDescription = document.getElementById('hidden-description');
            hiddenDescription.value = quill.root.innerHTML;
        }
    });
});
