document.addEventListener('DOMContentLoaded', function() {
    const ticketName = document.getElementById('ticketName');
    const totalTickets = document.getElementById('totalTickets');
    const maxPerOrder = document.getElementById('maxPerOrder');
    const ticketOrder = document.getElementById('ticketOrder');
    const ticketDescription = document.getElementById('ticketDescription');
    const ticketPrice = document.getElementById('ticketPrice');
    const ticketCurrency = document.getElementById('ticketCurrency');
    const ticketDiscountAmount = document.getElementById('ticketDiscountAmount');
    const ticketDiscountLevel = document.getElementById('ticketDiscountLevel');

    const restrictTotalTickets = document.getElementById('is-restrict-total-ticket');
    const restrictTicketsPerUser = document.getElementById('is-restrict-ticket-per-user');
    const freeEventTicketing = document.getElementById('free-event-ticketing');
    const birdDiscountCheckbox = document.getElementById('bird-discount');
    const discountEndDate = document.getElementById('ticketDiscountEndDate');
    const discountEndTime = document.getElementById('ticketDiscountEndTime');

    const saveButton = document.querySelector('#singleTicketModal .main-btn');
    const ticketList = document.querySelector('.ticket-type-item-list');
	
	const cancelButton = document.querySelector('.co-main-btn'); // Bouton Cancel
    const closeButton = document.querySelector('.close-model-btn'); // Bouton Close
    const dropdownMenuButton = document.getElementById('dropdownMenuButton'); // Bouton pour ouvrir le modal

    let currentEditTicket = null;

    saveButton.addEventListener('click', function() {
        if (validateForm()) {
            if (currentEditTicket) {
                updateTicket(currentEditTicket);
            } else {
                addTicket();
            }

            resetForm();
            $('#singleTicketModal').modal('hide');
        } else {
            alert('Veuillez remplir tous les champs requis correctement.');
        }
    });
	
	// Gestionnaires d'événements pour les boutons Cancel, Close, et pour l'ouverture du modal
    cancelButton.addEventListener('click', resetForm);
    closeButton.addEventListener('click', resetForm);
    dropdownMenuButton.addEventListener('click', function() {
        currentEditTicket = null;
        resetForm();
    });

    // Réinitialiser le formulaire lorsque le modal est fermé par n'importe quel moyen
    $('#singleTicketModal').on('hide.bs.modal', function() {
        currentEditTicket = null;
        resetForm();
    });

    function validateForm() {
        if (!validateTicketName() || !validateTicketOrder() || !validateTotalTickets() || !validateMaxPerOrder()) {
            return false;
        }

        if (!freeEventTicketing.checked) {
            if (!validateTicketPrice() || !validateDiscount()) {
                return false;
            }
        }

        return true;
    }

    function validateTicketName() {
        const name = ticketName.value.trim();
        if (name.length < 3 || name.length > 100) {
            alert('Le nom du ticket doit comporter entre 3 et 100 caractères.');
            return false;
        }
        return true;
    }

    function validateTicketPrice() {
        const price = parseFloat(ticketPrice.value);
        if (isNaN(price) || price < 5 || price > 1000000) {
            alert('Le prix du ticket doit être un nombre positif et ne pas dépasser 1 000 000 dans la monnaie choisie.');
            return false;
        }
        return true;
    }

    function validateTicketOrder() {
        const order = parseInt(ticketOrder.value);
        if (isNaN(order) || order < 1) {
            alert('L\'ordre du ticket doit être un nombre entier positif.');
            return false;
        }
        return true;
    }

    function validateTotalTickets() {
        if (!restrictTotalTickets.checked) {
            const total = parseInt(totalTickets.value);
            if (isNaN(total) || total <= 0 || total > 50000) {
                alert('Le nombre total de tickets doit être un nombre entier positif et ne pas dépasser 50 000.');
                return false;
            }
        }
        return true;
    }

    function validateMaxPerOrder() {
        if (!restrictTicketsPerUser.checked) {
            const maxOrder = parseInt(maxPerOrder.value);
            if (isNaN(maxOrder) || maxOrder <= 0 || maxOrder > 15) {
                alert('Le nombre maximum de tickets par utilisateur doit être un nombre entier positif et ne pas dépasser 15.');
                return false;
            }
        }
        return true;
    }

    function validateDiscount() {
        if (birdDiscountCheckbox.checked) {
            const discountAmount = parseFloat(ticketDiscountAmount.value);
            const discountLevel = ticketDiscountLevel.value;
            const endDate = discountEndDate.value;
            const endTime = discountEndTime.value;
            const currency = ticketCurrency.value;
            const originalPrice = parseFloat(ticketPrice.value);

            if (isNaN(discountAmount) || discountAmount <= 0) {
                alert('Le montant de la réduction doit être un nombre positif.');
                return false;
            }

            if (discountLevel === '%') {
                if (discountAmount > 100) {
                    alert('Le pourcentage de réduction ne peut pas dépasser 100%.');
                    return false;
                }
                const discountedPrice = originalPrice - (originalPrice * (discountAmount / 100));
                if (discountedPrice < 5) {
                    alert('Le prix après réduction ne peut pas être inférieur à 5 euros.');
                    return false;
                }
            } else if (discountLevel === 'fixed') {
                if (discountAmount > originalPrice) {
                    alert('La réduction ne peut pas être supérieure au prix initial.');
                    return false;
                }
                const discountedPrice = originalPrice - discountAmount;
                if (discountedPrice < 5) {
                    alert('Le prix après réduction ne peut pas être inférieur à 5 euros.');
                    return false;
                }
            } else {
                alert('Veuillez choisir un niveau de réduction valide.');
                return false;
            }

            if (!endDate || !isValidDate(endDate)) {
                alert('Veuillez fournir une date de fin de réduction valide.');
                return false;
            }

            if (!endTime || !isValidTime(endTime)) {
                alert('Veuillez fournir une heure de fin de réduction valide.');
                return false;
            }
        }
        return true;
    }

    function isValidDate(dateString) {
        const date = new Date(dateString);
        return !isNaN(date.getTime()) && date > new Date();
    }

    function isValidTime(timeString) {
        const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
        return regex.test(timeString);
    }

    function addTicket() {
        const totalTicketsValue = restrictTotalTickets.checked ? 'Unlimited' : totalTickets.value;
        const maxPerOrderValue = restrictTicketsPerUser.checked ? 'Unlimited' : maxPerOrder.value;
        const currency = ticketCurrency.value;
        const discountLevel = ticketDiscountLevel.value === '%' ? '%' : currency; // Utiliser la monnaie sélectionnée si c'est un montant fixe
        const discountText = birdDiscountCheckbox.checked ? `${ticketDiscountAmount.value}${discountLevel}` : 'No discount';

        const ticketItem = document.createElement('div');
        ticketItem.className = 'price-ticket-card mt-4';

        const originalPrice = parseFloat(ticketPrice.value);
        const priceText = freeEventTicketing.checked ? 'Gratuit' : `${originalPrice.toFixed(2)} ${currency}`;
        const discountedPrice = calculateDiscountedPrice(originalPrice, ticketDiscountAmount.value, discountLevel);
        const discountEndText = birdDiscountCheckbox.checked ? `Fin le: ${discountEndDate.value} ${discountEndTime.value}` : '';

        ticketItem.innerHTML = `
            <div class="price-ticket-card-head d-md-flex flex-wrap align-items-start justify-content-between position-relative p-4">
                <div class="d-flex align-items-center top-name">
                    <div class="icon-box">
                        <span class="icon-big rotate-icon icon icon-purple">
                            <i class="fa-solid fa-ticket"></i>
                        </span>
                        <h5 class="fs-16 mb-1 mt-1">
                            ${ticketName.value} - 
                            <span class="original-price">${priceText}</span> 
                            <span class="discounted-price">${!freeEventTicketing.checked && discountedPrice !== originalPrice ? discountedPrice.toFixed(2) + ` ${currency}` : ''}</span>
                            <span class="discount-end-date">${!freeEventTicketing.checked ? discountEndText : ''}</span>
                        </h5>
                        <p class="text-gray-50 m-0"><span class="visitor-date-time">${new Date().toLocaleDateString()}</span></p>
                        <p class="text-gray-50 m-0">Position: <span class="ticket-order">${ticketOrder.value}</span></p>
                    </div>
                </div>
                <div class="d-flex align-items-center">
                    <div class="price-badge">
                        <img src="images/discount.png" alt="">
                    </div>
                    <label class="btn-switch tfs-8 mb-0 me-4 mt-1">
                        <input type="checkbox" value="" class="toggle-discount" ${!freeEventTicketing.checked && discountedPrice !== originalPrice ? 'checked' : ''}>
                        <span class="checkbox-slider"></span>
                    </label>
                    <div class="dropdown dropdown-default dropdown-text dropdown-icon-item">
                        <button class="option-btn-1" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fa-solid fa-ellipsis-vertical"></i>
                        </button>
                        <div class="dropdown-menu dropdown-menu-end">
                            <a href="#" class="dropdown-item edit-ticket"><i class="fa-solid fa-pen me-3"></i>Edit</a>
                            <a href="#" class="dropdown-item delete-ticket"><i class="fa-solid fa-trash-can me-3"></i>Delete</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="price-ticket-card-body border_top p-4">
                <div class="full-width d-flex flex-wrap justify-content-between align-items-center">
                    <div class="icon-box">
                        <div class="icon me-3">
                            <i class="fa-solid fa-ticket"></i>
                        </div>
                        <span class="text-145">Total tickets</span>
                        <h6 class="coupon-status">${totalTicketsValue}</h6>
                    </div>
                    <div class="icon-box">
                        <div class="icon me-3">
                            <i class="fa-solid fa-users"></i>
                        </div>
                        <span class="text-145">Ticket limit per customer</span>
                        <h6 class="coupon-status">${maxPerOrderValue}</h6>
                    </div>
                    <div class="icon-box">
                        <div class="icon me-3">
                            <i class="fa-solid fa-cart-shopping"></i>
                        </div>
                        <span class="text-145">Discount</span>
                        <h6 class="coupon-status">${!freeEventTicketing.checked ? discountText : 'No discount'}</h6>
                    </div>
                </div>
                <p>${ticketDescription.value}</p>
            </div>
        `;
        ticketList.appendChild(ticketItem);

        ticketItem.querySelector('.edit-ticket').addEventListener('click', function() {
            editTicket(ticketItem);
        });
        ticketItem.querySelector('.delete-ticket').addEventListener('click', function() {
            deleteTicket(ticketItem);
        });

        ticketItem.querySelector('.toggle-discount').addEventListener('change', function() {
            toggleDiscountDisplay(ticketItem, this.checked);
        });

        toggleDiscountDisplay(ticketItem, !freeEventTicketing.checked && discountedPrice !== originalPrice);
    }

    function calculateDiscountedPrice(price, discountAmount, discountLevel) {
        let discountedPrice = price;
        if (birdDiscountCheckbox.checked && !freeEventTicketing.checked) {
            if (discountLevel === '%') {
                discountedPrice = price - (price * parseFloat(discountAmount) / 100);
            } else {
                discountedPrice = price - parseFloat(discountAmount);
            }
        }
        return discountedPrice < 0 ? 0 : discountedPrice;
    }

    function toggleDiscountDisplay(ticketItem, isDiscounted) {
        const originalPriceElement = ticketItem.querySelector('.original-price');
        const discountedPriceElement = ticketItem.querySelector('.discounted-price');
        const discountEndDateElement = ticketItem.querySelector('.discount-end-date');

        if (isDiscounted) {
            originalPriceElement.style.textDecoration = 'line-through';
            discountedPriceElement.style.display = 'inline';
            discountEndDateElement.style.display = 'inline';
        } else {
            originalPriceElement.style.textDecoration = 'none';
            discountedPriceElement.style.display = 'none';
            discountEndDateElement.style.display = 'none';
        }
    }

    function editTicket(ticketItem) {
    const priceText = ticketItem.querySelector('.top-name .original-price').textContent;
    const discountText = ticketItem.querySelector('.price-ticket-card-body .icon-box:nth-child(3) .coupon-status').textContent;
    const discountDateText = ticketItem.querySelector('.discount-end-date').textContent;

    ticketName.value = ticketItem.querySelector('.top-name h5').textContent.split(' - ')[0];

    if (priceText.trim() === 'Gratuit') {
        freeEventTicketing.checked = true;
        ticketPrice.value = '';
        $('.disabled-action').hide();
    } else {
        freeEventTicketing.checked = false;
        ticketPrice.value = parseFloat(priceText.replace(/[^0-9.]/g, ''));
        $('.disabled-action').show();
    }

    const totalTicketsValue = ticketItem.querySelector('.price-ticket-card-body .icon-box:nth-child(1) .coupon-status').textContent;
    const maxPerOrderValue = ticketItem.querySelector('.price-ticket-card-body .icon-box:nth-child(2) .coupon-status').textContent;

    if (totalTicketsValue === 'Unlimited') {
        restrictTotalTickets.checked = true;
        totalTickets.value = '';
        $('.total_ticket_per_level').hide();
    } else {
        restrictTotalTickets.checked = false;
        totalTickets.value = totalTicketsValue;
        $('.total_ticket_per_level').show();
    }

    if (maxPerOrderValue === 'Unlimited') {
        restrictTicketsPerUser.checked = true;
        maxPerOrder.value = '';
        $('.total_ticket_per_user').hide();
    } else {
        restrictTicketsPerUser.checked = false;
        maxPerOrder.value = maxPerOrderValue;
        $('.total_ticket_per_user').show();
    }

    if (discountText !== 'No discount') {
        birdDiscountCheckbox.checked = true;

        const discountMatch = discountText.match(/(\d+)([€$%FCFA]+)/);
        const discountAmount = discountMatch ? discountMatch[1] : '';
        const discountSymbol = discountMatch ? discountMatch[2] : '';

        ticketDiscountAmount.value = discountAmount; // Mettre à jour avec le montant de réduction

        if (discountSymbol === '%') {
            ticketDiscountLevel.value = '%';
        } else if (['€', '$', 'FCFA'].includes(discountSymbol)) {
            ticketDiscountLevel.value = 'fixed';
            ticketCurrency.value = discountSymbol; // Mettre à jour la monnaie si montant fixe
        }

        $('.online-event-discount-wrapper').show();

        if (discountDateText.includes('Fin le:')) {
            const dateText = discountDateText.replace('Fin le: ', '').trim().split(' ');
            discountEndDate.value = dateText[0] || '';
            discountEndTime.value = dateText[1] || '';
        }
    } else {
        birdDiscountCheckbox.checked = false;
        ticketDiscountAmount.value = '';
        ticketDiscountLevel.value = '%';
        $('.online-event-discount-wrapper').hide();
    }

    ticketDescription.value = ticketItem.querySelector('.price-ticket-card-body p').textContent.trim();
    ticketOrder.value = ticketItem.querySelector('.ticket-order').textContent || '1';

    currentEditTicket = ticketItem;

    $('#singleTicketModal').modal('show');
}


    function updateTicket(ticketItem) {
        const totalTicketsValue = restrictTotalTickets.checked ? 'Unlimited' : totalTickets.value;
        const maxPerOrderValue = restrictTicketsPerUser.checked ? 'Unlimited' : maxPerOrder.value;
        const currency = ticketCurrency.value;
        const discountLevel = ticketDiscountLevel.value === '%' ? '%' : currency;
        const discountText = birdDiscountCheckbox.checked ? `${ticketDiscountAmount.value}${discountLevel}` : 'No discount';
        const discountDateText = birdDiscountCheckbox.checked ? `Fin le: ${discountEndDate.value} ${discountEndTime.value}` : '';

        const originalPrice = parseFloat(ticketPrice.value);
        const discountedPrice = calculateDiscountedPrice(originalPrice, ticketDiscountAmount.value, discountLevel);

        const priceDisplay = freeEventTicketing.checked ? 'Gratuit' : `${originalPrice.toFixed(2)} ${currency}`;

        ticketItem.querySelector('.top-name h5').innerHTML = `
            ${ticketName.value} - 
            <span class="original-price">${priceDisplay}</span> 
            <span class="discounted-price">${!freeEventTicketing.checked && discountedPrice !== originalPrice ? discountedPrice.toFixed(2) + ' ' + currency : ''}</span>
            <span class="discount-end-date">${!freeEventTicketing.checked ? discountDateText : ''}</span>
        `;
        ticketItem.querySelector('.price-ticket-card-body .icon-box:nth-child(1) .coupon-status').textContent = totalTicketsValue;
        ticketItem.querySelector('.price-ticket-card-body .icon-box:nth-child(2) .coupon-status').textContent = maxPerOrderValue;
        ticketItem.querySelector('.price-ticket-card-body .icon-box:nth-child(3) .coupon-status').textContent = freeEventTicketing.checked ? 'No discount' : discountText;
        ticketItem.querySelector('.price-ticket-card-body p').textContent = ticketDescription.value;

        const toggleDiscountCheckbox = ticketItem.querySelector('.toggle-discount');
        if (!freeEventTicketing.checked && discountedPrice !== originalPrice) {
            toggleDiscountCheckbox.checked = true;
            toggleDiscountDisplay(ticketItem, true);
        } else {
            toggleDiscountCheckbox.checked = false;
            toggleDiscountDisplay(ticketItem, false);
        }

        currentEditTicket = null;

        toggleDiscountDisplay(ticketItem, !freeEventTicketing.checked && discountedPrice !== originalPrice);
    }

    function deleteTicket(ticketItem) {
        ticketList.removeChild(ticketItem);
    }

    function resetForm() {
		// Réinitialiser les champs de texte
		ticketName.value = '';
		totalTickets.value = '';
		maxPerOrder.value = '';
		ticketOrder.value = '1';
		ticketDescription.value = '';
		ticketPrice.value = '';

		// Réinitialiser les sélecteurs
		//ticketCurrency.value = '€'; // Valeur par défaut pour la monnaie
		ticketDiscountAmount.value = '0';
		ticketDiscountLevel.value = '%'; // Valeur par défaut pour le niveau de réduction

		// Réinitialiser les cases à cocher
		restrictTotalTickets.checked = true; // Par défaut, pas de restriction sur le total des tickets
		restrictTicketsPerUser.checked = true; // Par défaut, pas de restriction par utilisateur
		freeEventTicketing.checked = false; // Par défaut, les tickets ne sont pas gratuits
		birdDiscountCheckbox.checked = false; // Par défaut, pas de réduction

		// Masquer ou afficher les sections conditionnelles
		$('.online-event-discount-wrapper').hide(); // Masquer les options de réduction
		$('.total_ticket_per_level').hide(); // Masquer le champ pour le nombre total de tickets
		$('.total_ticket_per_user').hide(); // Masquer le champ pour le nombre maximum par utilisateur
		$('.disabled-action').show(); // Montrer les champs de tarification

		// Réinitialiser les dates et heures de réduction
		discountEndDate.value = '';
		discountEndTime.value = '';

		// Réinitialiser la variable globale
		currentEditTicket = null;

		// Assurez-vous que les éléments sont masqués ou affichés en fonction de la case à cocher du ticket gratuit
		if (freeEventTicketing.checked) {
			$('.disabled-action').hide();
		} else {
			$('.disabled-action').show();
		}
	}

});
