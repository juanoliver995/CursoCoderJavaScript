$(document).ready(function () {
    const $form = document.getElementById("form")
    var emailreg = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
    $(".botonSubmit").click(function () {
        $(".error").remove();
        if ($(".nombre").val() == "") {
            $(".nombre").focus().after("<span class='error'>Ingrese su nombre</span>");
            return false;
        } else if ($(".correo").val() == "" || !emailreg.test($(".correo").val())) {
            $(".correo").focus().after("<span class='error'>Ingrese un email correcto</span>");
            return false;
        } else if ($(".asunto").val() == "") {
            $(".asunto").focus().after("<span class='error'>Ingrese un asunto</span>");
            return false;
        } else if ($(".mensaje").val() == "") {
            $(".mensaje").focus().after("<span class='error'>Ingrese un mensaje</span>");
            return false;
        }
    });
    $(".nombre, .asunto, .mensaje").keyup(function () {
        if ($(this).val() != "") {
            $(".error").fadeOut();
            return false;
        }
    });
    $(".email").keyup(function () {
        if ($(this).val() != "" && emailreg.test($(this).val())) {
            $(".error").fadeOut();
            return false;
        }
    });
    document.addEventListener("submit", e => {
        e.preventDefault();
        const loader = document.querySelector(".contactoLoader"),
            response = document.querySelector(".contactoRespuesta");

        loader.classList.remove("none");

        fetch("https://formsubmit.co/ajax/juanoliver995@gmail.com", {
            method: "POST",
            body: new FormData(e.target)
        })
            .then(res => res.ok ? res.json() : Promise.reject(res))
            .then(json => {
                console.log(json);
                loader.classList.add("none");
                response.classList.remove("none");
                $form.reset();

            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => setTimeout(() => {
                response.classList.add("none");
                response.innerHTML = "";
            }, 3000));
    }, 3000);

});



