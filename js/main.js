let month = new Date().getMonth() +1;
let day = new Date().getDate();

// Check if it is my birthday
if (month === 1 && day === 14) {
    console.log("day");
    document.getElementById("navbar-title").insertAdjacentHTML('afterend', '<i class="bi bi-cake2 fs-3"></i>');
}

// Calculate my experience years
document.getElementById("experience-years").innerHTML = new Date().getFullYear() - 2017;

const instagramToastDelay = 15000;
setTimeout(() => {
    const instagramToast = document.getElementById('instagramToast');
    bootstrap.Toast.getOrCreateInstance(instagramToast).show();

    setTimeout(() => {
        const ivanWeatherToast = document.getElementById('ivanWeatherToast');
        bootstrap.Toast.getOrCreateInstance(ivanWeatherToast).show();
    }, instagramToastDelay + 5000);
}, 3000);