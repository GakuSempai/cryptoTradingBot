document.addEventListener('DOMContentLoaded', function() {
    const ticketName = document.getElementById('ticketName');
    const totalTickets = document.getElementById('totalTickets');
    const maxPerOrder = document.getElementById('maxPerOrder');
    const ticketOrder = document.getElementById('ticketOrder');
    const ticketDescription = document.getElementById('ticketDescription');
    const ticketPrice = document.getElementById('ticketPrice');
    const ticketDiscountAmount = document.getElementById('ticketDiscountAmount');
    const ticketDiscountLevel = document.getElementById('ticketDiscountLevel');

    const restrictTotalTickets = document.getElementById('is-restrict-total-ticket');
    const restrictTicketsPerUser = document.getElementById('is-restrict-ticket-per-user');
    const birdDiscountCheckbox = document.getElementById('bird-discount');
    const discountEndDate = document.getElementById('ticketDiscountEndDate');
    const discountEndTime = document.getElementById('ticketDiscountEndTime');

    const saveButton = document.querySelector('#singleTicketModal .main-btn');
    const ticketList = document.querySelector('.ticket-type-item-list');

    // Variable pour stocker le ticket en cours de modification
    let currentEditTicket = null;

    saveButton.addEventListener('click', function() {
        if (validateForm()) {
            if (currentEditTicket) {
                // Modifier un ticket existant
                updateTicket(currentEditTicket);
            } else {
                // Ajouter un nouveau ticket
                addTicket();
            }

            // Réinitialiser le formulaire et fermer le modal
            resetForm();
            $('#singleTicketModal').modal('hide');
        } else {
            alert('Veuillez remplir tous les champs requis correctement.');
        }
    });

    function validateForm() {
        if (!validateTicketName() || !validateTicketPrice() || !validateTicketOrder() || !validateTotalTickets() || !validateMaxPerOrder() || !validateDiscount()) {
            return false;
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
        if (isNaN(price) || price <= 0 || price > 10000) {
            alert('Le prix du ticket doit être un nombre positif et ne pas dépasser 10 000 euros.');
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

            if (isNaN(discountAmount) || discountAmount <= 0) {
                alert('Le montant de la réduction doit être un nombre positif.');
                return false;
            }

            if (discountLevel === 'Percentage' || discountLevel === '%') {
                if (discountAmount > 100) {
                    alert('Le pourcentage de réduction ne peut pas dépasser 100%.');
                    return false;
                }
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
        const discountText = birdDiscountCheckbox.checked ? `${ticketDiscountAmount.value}${ticketDiscountLevel.value}` : 'No discount';

        const ticketItem = document.createElement('div');
        ticketItem.className = 'price-ticket-card mt-4';

        const originalPrice = parseFloat(ticketPrice.value);
        const discountedPrice = calculateDiscountedPrice(originalPrice, ticketDiscountAmount.value, ticketDiscountLevel.value);

        ticketItem.innerHTML = `
            <div class="price-ticket-card-head d-md-flex flex-wrap align-items-start justify-content-between position-relative p-4">
                <div class="d-flex align-items-center top-name">
                    <div class="icon-box">
                        <span class="icon-big rotate-icon icon icon-purple">
                            <i class="fa-solid fa-ticket"></i>
                        </span>
                        <h5 class="fs-16 mb-1 mt-1">${ticketName.value} - <span class="original-price">${originalPrice.toFixed(2)}€</span> <span class="discounted-price">${discountedPrice !== originalPrice ? discountedPrice.toFixed(2) + '€' : ''}</span></h5>
                        <p class="text-gray-50 m-0"><span class="visitor-date-time">${new Date().toLocaleDateString()}</span></p>
                        <p class="text-gray-50 m-0">Position: <span class="ticket-order">${ticketOrder.value}</span></p> <!-- Ajout de l'ordre ici -->
                    </div>
                </div>
                <div class="d-flex align-items-center">
                    <div class="price-badge">
                        <img src="images/discount.png" alt="">
                    </div>
                    <label class="btn-switch tfs-8 mb-0 me-4 mt-1">
                        <input type="checkbox" value="" class="toggle-discount" ${discountedPrice !== originalPrice ? 'checked' : ''}>
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
                        <h6 class="coupon-status">${discountText}</h6>
                    </div>
                </div>
                <p>${ticketDescription.value}</p>
                <p class="discount-info">${birdDiscountCheckbox.checked ? `${discountEndDate.value} ${discountEndTime.value}` : ''}</p>
            </div>
        `;
        ticketList.appendChild(ticketItem);

        // Ajouter les gestionnaires de clic pour modifier et supprimer
        ticketItem.querySelector('.edit-ticket').addEventListener('click', function() {
            editTicket(ticketItem);
        });
        ticketItem.querySelector('.delete-ticket').addEventListener('click', function() {
            deleteTicket(ticketItem);
        });

        // Ajouter le gestionnaire de clic pour le toggle discount
        ticketItem.querySelector('.toggle-discount').addEventListener('change', function() {
            toggleDiscountDisplay(ticketItem, this.checked);
        });

        // Initialiser l'affichage du discount
        toggleDiscountDisplay(ticketItem, discountedPrice !== originalPrice);
    }

    function calculateDiscountedPrice(price, discountAmount, discountLevel) {
        let discountedPrice = price;
        if (birdDiscountCheckbox.checked) {
            if (discountLevel === 'Percentage' || discountLevel === '%') {
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

        if (isDiscounted) {
            originalPriceElement.style.textDecoration = 'line-through';
            discountedPriceElement.style.display = 'inline';
        } else {
            originalPriceElement.style.textDecoration = 'none';
            discountedPriceElement.style.display = 'none';
        }
    }

    function editTicket(ticketItem) {
    // Récupérer les informations du ticket
    const priceText = ticketItem.querySelector('.top-name .original-price').textContent;
    const discountText = ticketItem.querySelector('.price-ticket-card-body .icon-box:nth-child(3) .coupon-status').textContent;

    ticketName.value = ticketItem.querySelector('.top-name h5').textContent.split(' - ')[0];
    ticketPrice.value = parseFloat(priceText.replace('€', '').trim());

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

    // Gérer l'état de la réduction
    if (discountText !== 'No discount') {
        birdDiscountCheckbox.checked = true; // Coche la checkbox si une réduction est appliquée
        const discountAmount = discountText.match(/(\d+)([€%])/);
        ticketDiscountAmount.value = discountAmount ? discountAmount[1] : '';
        ticketDiscountLevel.value = discountAmount ? discountAmount[2] : '%';
        $('.online-event-discount-wrapper').show();
    } else {
        birdDiscountCheckbox.checked = false; // Décoche la checkbox si aucune réduction n'est appliquée
        ticketDiscountAmount.value = '';
        ticketDiscountLevel.value = '%';
        $('.online-event-discount-wrapper').hide();
    }

    discountEndDate.value = ticketItem.querySelector('.discount-info').textContent.split(' ')[0] || '';
    discountEndTime.value = ticketItem.querySelector('.discount-info').textContent.split(' ')[1] || '';

    ticketDescription.value = ticketItem.querySelector('.price-ticket-card-body p').textContent.trim();
    
    // Récupérer et définir l'ordre du ticket
    ticketOrder.value = ticketItem.querySelector('.ticket-order').textContent || '1';

    // Définir le ticket actuel en cours de modification
    currentEditTicket = ticketItem;

    // Ouvrir le modal
    $('#singleTicketModal').modal('show');
}


    function updateTicket(ticketItem) {
    const totalTicketsValue = restrictTotalTickets.checked ? 'Unlimited' : totalTickets.value;
    const maxPerOrderValue = restrictTicketsPerUser.checked ? 'Unlimited' : maxPerOrder.value;
    const discountText = birdDiscountCheckbox.checked ? `${ticketDiscountAmount.value}${ticketDiscountLevel.value}` : 'No discount';

    const originalPrice = parseFloat(ticketPrice.value);
    const discountedPrice = calculateDiscountedPrice(originalPrice, ticketDiscountAmount.value, ticketDiscountLevel.value);

    ticketItem.querySelector('.top-name h5').innerHTML = `${ticketName.value} - <span class="original-price">${originalPrice.toFixed(2)}€</span> <span class="discounted-price">${discountedPrice !== originalPrice ? discountedPrice.toFixed(2) + '€' : ''}</span>`;
    ticketItem.querySelector('.price-ticket-card-body .icon-box:nth-child(1) .coupon-status').textContent = totalTicketsValue;
    ticketItem.querySelector('.price-ticket-card-body .icon-box:nth-child(2) .coupon-status').textContent = maxPerOrderValue;
    ticketItem.querySelector('.price-ticket-card-body .icon-box:nth-child(3) .coupon-status').textContent = discountText;
    ticketItem.querySelector('.price-ticket-card-body .discount-info').textContent = birdDiscountCheckbox.checked ? `${discountEndDate.value} ${discountEndTime.value}` : '';
    ticketItem.querySelector('.price-ticket-card-body p').textContent = ticketDescription.value;

    // Synchroniser l'état de la checkbox de réduction (checkbox 2)
    const toggleDiscountCheckbox = ticketItem.querySelector('.toggle-discount');
    if (discountedPrice !== originalPrice) {
        toggleDiscountCheckbox.checked = true;
        toggleDiscountDisplay(ticketItem, true);
    } else {
        toggleDiscountCheckbox.checked = false;
        toggleDiscountDisplay(ticketItem, false);
    }

    // Réinitialiser le ticket actuel
    currentEditTicket = null;

    // Mettre à jour l'affichage du discount
    toggleDiscountDisplay(ticketItem, discountedPrice !== originalPrice);
}


    function deleteTicket(ticketItem) {
        ticketList.removeChild(ticketItem);
    }

    function resetForm() {
        ticketName.value = '';
        totalTickets.value = '';
        maxPerOrder.value = '';
        ticketOrder.value = '1';
        ticketDescription.value = '';
        ticketPrice.value = '';
        ticketDiscountAmount.value = '0';
        restrictTotalTickets.checked = true;
        restrictTicketsPerUser.checked = true;
        birdDiscountCheckbox.checked = false;
        $('.online-event-discount-wrapper').hide();
        $('.total_ticket_per_level').hide();
        $('.total_ticket_per_user').hide();
        discountEndDate.value = '';
        discountEndTime.value = '';
    }
});
