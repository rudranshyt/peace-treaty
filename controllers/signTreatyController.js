const slider = document.getElementById("Sorries");
const sliderValue = document.getElementById("slider-value");
slider.addEventListener("input", (e) => {
  sliderValue.textContent = e.target.value;
});

const dateSpan = document.getElementById("signDate");
const options = { year: "numeric", month: "short", day: "numeric" };
dateSpan.textContent = new Date().toLocaleDateString("en-US", options);

const locationSpan = document.getElementById("signLocation");
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`,
      )
        .then((response) => response.json())
        .then((data) => {
          const address = data.address;
          const placeName =
            address.city ||
            address.town ||
            address.village ||
            address.suburb ||
            "Noida";
          const stateName = address.state || "";
          locationSpan.textContent = `${placeName}, ${stateName} 📍`;
        })
        .catch(() => {
          locationSpan.textContent = `(${lat.toFixed(2)}, ${lon.toFixed(2)})`;
        });
    },
    (error) => {
      locationSpan.textContent = "Noida, India (Default)";
    },
  );
} else {
  locationSpan.textContent = "Not supported";
}

function submitSorries() {
  const count = parseInt(document.getElementById("Sorries").value, 10);
  const container = document.getElementById("sorry-container");
  container.innerHTML = "";

  const variations = [
    "Sorry! 🥺",
    "I'm so sorry! 💕",
    "My bad! 🌸",
    "Forgive me? 💌",
    "Sorry Vanshika! ✨",
  ];

  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const bubble = document.createElement("div");
      bubble.className = "sorry-bubble";

      const randomText =
        variations[Math.floor(Math.random() * variations.length)];
      const randomX = Math.random() * 85 + 5;
      const randomDelay = Math.random() * 0.5;

      bubble.textContent = randomText;
      bubble.style.left = `${randomX}vw`;
      bubble.style.bottom = `-50px`;
      bubble.style.animationDelay = `${randomDelay}s`;

      container.appendChild(bubble);

      setTimeout(() => {
        bubble.remove();
      }, 3000);
    }, i * 40);
  }
}
