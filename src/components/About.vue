<template>
  <section id="about" class="py-24 text-center text-gray-500 bg-white">
    <div class="container mx-auto px-4 relative">
      <div class="-mx-4 flex flex-wrap items-center mb-12">
        <div class="mx-auto px-4 w-full md:w-10/12 lg:w-8/12 xl:w-7/12">
          <h2 class="font-medium mb-2 text-lg text-primary">
            Servicios Especializados
          </h2>
          <h3 class="font-bold mb-2 text-4xl text-gray-800">
            Se atiende todo tipo de fracturas tanto del miembro superior como el
            miembro inferior
          </h3>
        </div>
      </div>
      <div class="flex flex-wrap -mx-4 items-center">
        <div class="mx-auto px-4 w-full lg:w-11/12 xl:w-8/12">
          <div ref="target" class="-mx-2 flex flex-wrap">
            <div class="p-2 w-full sm:w-4/12">
              <div>
                <h2 class="font-bold mb-3 text-5xl text-primary xl:text-6xl">
                  {{ tweened.experience.toFixed(0) }}+
                </h2>
                <h3 class="fs-6 mb-0">Con más de 10 años de experiencia</h3>
              </div>
            </div>
            <div class="p-2 w-full sm:w-4/12">
              <div>
                <h2 class="font-bold mb-3 text-5xl text-primary xl:text-6xl">
                  {{ tweened.patients.toFixed(0) }}+
                </h2>
                <h3 class="fs-6 mb-0">
                  Un creciente número de pacientes consultados
                </h3>
              </div>
            </div>
            <div class="p-2 w-full sm:w-4/12">
              <div>
                <h2 class="font-bold mb-3 text-5xl text-primary xl:text-6xl">
                  {{ tweened.operations.toFixed(0) }}+
                </h2>
                <h3 class="fs-6 mb-0">Operaciones exitosas</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, watch } from "vue";
import gsap from "gsap";
import { useElementVisibility } from "@vueuse/core";

const target = ref(null);
const targetIsVisible = useElementVisibility(target);
const experienceNum = ref(10);
const patientsNum = ref(120);
const operationsNum = ref(60);

const tweened = reactive({
  experience: 0,
  patients: 0,
  operations: 0,
});

watch(targetIsVisible, () => {
  if (targetIsVisible.value === true) {
    gsap.to(tweened, {
      duration: 1,
      experience: experienceNum.value || 0,
      patients: patientsNum.value || 0,
      operations: operationsNum.value || 0,
    });
  } else {
    gsap.to(tweened, {
      duration: 1,
      experience: 0,
      patients: 0,
      operations: 0,
    });
  }
});
</script>
