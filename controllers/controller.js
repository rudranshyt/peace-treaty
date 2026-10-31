function signTreaty() {
  const confirmed = confirm(
    "Are you sure you want to sign the treaty? This action cannot be undone.",
  );
  if (confirmed) {
    window.location.href = "templates/signTreaty.html";
  }
}
