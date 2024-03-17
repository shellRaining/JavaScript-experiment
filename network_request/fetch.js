(async function () {
  const response = await fetch(
    "https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits",
  );

  if (response.ok) {
    const json = await response.json();
    console.log(json);
  } else {
    console.log(response.status);
  }
})();
