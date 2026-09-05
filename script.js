(() => {
  const range = document.getElementById("compareRange");
  const compare = document.getElementById("compare");
  const update = () => {
    compare.style.setProperty("--position", range.value + "%");
    range.setAttribute("aria-valuetext", range.value + "% después");
  };
  range.addEventListener("input", update);
  update();
  document.getElementById("quoteForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const fields = ["name", "location", "service", "details"];
    for (const key of fields) {
      const control = form.elements.namedItem(key);
      control.setCustomValidity(
        String(data.get(key)).trim() ? "" : "Completá este campo.",
      );
      if (!control.reportValidity()) {
        control.addEventListener("input", () => control.setCustomValidity(""), {
          once: true,
        });
        return;
      }
    }
    const message = [
      "Hola GESOL, quisiera pedir un presupuesto.",
      "",
      "Nombre: " + data.get("name").trim(),
      "Localidad: " + data.get("location").trim(),
      "Servicio: " + data.get("service"),
      "Detalles: " + data.get("details").trim(),
    ].join("\n");
    window.open(
      "https://wa.me/59898847983?text=" + encodeURIComponent(message),
      "_blank",
      "noopener,noreferrer",
    );
  });
})();
