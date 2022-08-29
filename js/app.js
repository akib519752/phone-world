const loadPhone = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url)
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}
const displayPhones = (phones, dataLimit) => {
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.textContent = ``;
    const showAll = document.getElementById('show-all');
    if (dataLimit && phones.length > 9) {
        phones = phones.slice(0, 9);

        showAll.classList.remove('d-none');
    }
    else {
        showAll.classList.add('d-none');
    }



    const noPhone = document.getElementById('no-phone-message');
    if (phones.length === 0) {

        noPhone.classList.remove('d-none');
    }
    else {
        noPhone.classList.add('d-none');
    }

    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');

        phoneDiv.classList.add('col')
        phoneDiv.innerHTML = `
        <div class="card p-5">
                        <img src="${phone.image}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${phone.phone_name}</h5>
                            <p class="card-text"></p>
                            <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show details</button>
                
                        </div>
                    </div>
        `;
        phonesContainer.appendChild(phoneDiv);
    });
    toggleSpinner(false);
}

const processSearch = (dataLimit) => {
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText, dataLimit);
}

document.getElementById('btn-search').addEventListener('click', function () {
    processSearch(9);
});

document.getElementById('search-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        processSearch(9);
    }
})

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    }
    else {
        loaderSection.classList.add('d-none');
    }
};

document.getElementById('btn-show-all').addEventListener('click', function () {
    processSearch();
})
const loadPhoneDetails = async id => {
    const url = ` https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}

const displayPhoneDetails = phone => {
    console.log(phone)
    const modalTitle = document.getElementById('phoneDetailModalLabel');
    modalTitle.innerText = phone.name;
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
    <p>Release date: ${phone.releaseDate ? phone.releaseDate : 'No release info available'}</p>
    <p>Storage:${phone.mainFeatures ? phone.mainFeatures.storage : 'no storage info found'}</p>
    <p>Others: ${phone.others ? phone.others.Bluetooth : 'No Bluetooth available'}</p>
    `;
}



// loadPhone()