<template>
  <div>
    <div
      v-if="showMessage"
      class="container mx-auto fixed top-5 left-0 right-0 z-50"
    >
      <div class="alert alert-warning shadow-lg">
        <div>
          <span>{{ messageText }}</span>
        </div>
      </div>
    </div>
    <section id="contact" class="bg-primary py-16 text-gray-300">
      <div class="container mx-auto px-4 relative">
        <div class="flex flex-wrap -mx-4 items-center">
          <div class="px-4 w-full order-last lg:w-5/12">
            <div class="container py-24 mx-auto flex">
              <div
                class="bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md"
              >
                <h2 class="text-gray-900 text-lg mb-1 font-medium title-font">
                  Consultas o comentarios
                </h2>
                <p class="leading-relaxed mb-5 text-gray-600">
                  Envíame tus consultas o comentarios
                </p>
                <div class="relative mb-4">
                  <label for="nombre" class="leading-7 text-sm text-gray-600">
                    Nombre
                  </label>
                  <input
                    @input="handleChange"
                    v-model.trim="name"
                    type="nombre"
                    id="nombre"
                    name="nombre"
                    class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
                <div class="relative mb-4">
                  <label for="email" class="leading-7 text-sm text-gray-600">
                    Correo
                  </label>
                  <input
                    @input="handleChange"
                    v-model.trim="email"
                    type="email"
                    id="email"
                    name="email"
                    class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
                <div class="relative mb-4">
                  <label for="message" class="leading-7 text-sm text-gray-600">
                    Mensaje
                  </label>
                  <textarea
                    @input="handleChange"
                    id="message"
                    name="message"
                    v-model.trim="message"
                    class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  ></textarea>
                </div>
                <button
                  @click="submit"
                  class="btn btn-primary text-white"
                  :disabled="!isValid"
                >
                  Enviar
                </button>
                <p class="text-xs text-gray-500 mt-3">Pronto te atenderé</p>
              </div>
            </div>
          </div>
          <div class="px-4 py-16 w-full lg:w-7/12">
            <h3 class="font-bold mb-2 text-4xl text-white">
              En toda visita al médico nos damos cuenta que cuando los pacientes
              están más involucrados obtienen mejores resultados.
            </h3>

            <ul class="my-6 list-disc pl-6">
              <li class="text-xl my-2">Se honesto con el "cómo te sientes"</li>
              <li class="text-xl my-2">Toma nota para no olvidar</li>
              <li class="text-xl my-2">
                Sigue las instrucciones brindadas por el doctor
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const showMessage = ref(false);
const messageText = ref("");
const message = ref("");
const name = ref("");
const email = ref("");
const isValid = ref(false);

const handleChange = () => {
  if (
    message.value.length > 0 &&
    name.value.length > 0 &&
    email.value.length > 0
  ) {
    isValid.value = true;
  } else {
    isValid.value = false;
  }
};

const submit = () => {
  if (isValid.value) {
    sendEmail(name.value, email.value, message.value);
  }
};

const sendEmail = (formName, formEmail, formMessage) => {
  const payload = {
    message:
      `<br>` +
      "Nombre: " +
      formName +
      `<br>` +
      "Correo: " +
      formEmail +
      `<br>` +
      "Mensaje: " +
      formMessage +
      `<br>`,
  };

  fetch("/.netlify/functions/sendmail/sendmail", {
    method: "POST",
    body: JSON.stringify(payload),
  })
    .then(() => {
      name.value = "";
      email.value = "";
      message.value = "";
      messageText.value = "¡Muchas gracias! Pronto te responderé";
      showMessage.value = true;
      window.scrollTo(0, 0);
    })
    .catch((e) => {
      messageText.value =
        "No se pudo enviar en mensaje, por favor intentar de nuevo";
      showMessage.value = true;
      console.log("error:", e);
    });
};

watch(showMessage, (bool) => {
  if (bool) {
    setTimeout(() => {
      messageText.value = "";
      showMessage.value = false;
    }, "3500");
  }
});
</script>
