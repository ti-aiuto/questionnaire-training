<template>
  <div>
    <ul>
      <li>
        <router-link to="/form" v-slot="{ href }">
          <a :href="href">回答画面</a>
        </router-link>
      </li>

      <li>
        <router-link to="/result" v-slot="{ href }">
          <a :href="href">結果画面</a>
        </router-link>
      </li>

      <li>
        <router-link to="/builder" v-slot="{ href }">
          <a :href="href">編集画面</a>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({});
</script>
