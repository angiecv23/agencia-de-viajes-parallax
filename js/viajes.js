const parallax = document.querySelector(".parallax");
const sun = document.querySelector("#sun");
const mountainBlue = document.querySelector("#mountain-blue");
const mountainRed = document.querySelector("#mountain-red");
// const man = document.querySelector("#man");
const girl = document.querySelector("#girl");
const plants = document.querySelector("#plants");
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  let scroll = window.scrollY;

  if (scroll > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  let intensidad = Math.min(scroll / 500, 1);
  parallax.style.background = `
    linear-gradient(
      to bottom,
      rgb(${135 - intensidad * 55}, ${206 - intensidad * 156}, ${235 - intensidad * 125}), /* Superior: Púrpura/Rojizo (80, 50, 110) */
      rgb(${255}, ${230 - intensidad * 110}, ${180 - intensidad * 130})                  /* Inferior: Naranja/Dorado vivo (255, 120, 50) */
    )
  `;

  sun.style.top = 80 + scroll * 2.7 + "px";
  mountainBlue.style.transform = `translateX(${scroll * 0.6}px)`;
  mountainRed.style.transform = `translateX(${scroll * 0.3}px)`;
  girl.style.transform = `translateX(${-scroll * 0.8}px)`;
  plants.style.transform = `translateX(${-scroll * 1.5}px)`;
});

$(document).ready(function () {
  $(".menu a").on("click", function (event) {
    const targetSelector = $(this).attr("href");

    if (targetSelector === "#") {
      event.preventDefault();
      $("html, body").animate({ scrollTop: 0 }, 800);
    } else if ($(targetSelector).length) {
      event.preventDefault();
      $("html, body").animate(
        {
          scrollTop: $(targetSelector).offset().top - 70,
        },
        800,
      );
    }
  });

  $(".promo-card").hover(
    function () {
      $(this).css({
        transform: "translateY(-5px)",
        "border-color": "#ff5e62",
        "box-shadow": "0 12px 30px rgba(0, 0, 0, 0.08)",
        transition: "all 0.3s ease",
      });
    },
    function () {
      $(this).css({
        transform: "translateY(0)",
        "border-color": "#e2e8f0",
        "box-shadow": "0 10px 25px rgba(0, 0, 0, 0.03)",
      });
    },
  );

  $(".btn-submit").on("click", function (event) {
    const formulario = document.getElementById("contactForm");
    if (!formulario.checkValidity()) {
      return;
    }

    event.preventDefault();
    const nombreUsuario = $("#nombre").val();
    const celularUsuario = $("#celular").val();

    Swal.fire({
      title: "Enviando tu mensaje...",
      text: "Estamos registrando tu número de contacto.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    setTimeout(() => {
      Swal.fire({
        icon: "success",
        title: `¡Excelente, ${nombreUsuario}!`,
        text: `Tu mensaje ha sido enviado correctamente. Un asesor experto te escribirá por WhatsApp o te llamará al número ${celularUsuario} en breve.`,
        confirmButtonColor: "#ff5e62",
        confirmButtonText: "Entendido",
      });

      formulario.reset();
    }, 1500);
  });
});
