<script setup lang="ts">
import Calendar from 'primevue/calendar'
import Checkbox from 'primevue/checkbox'
import Dropdown from 'primevue/dropdown'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import FormElement from './form/form-element.vue'

import { DEFAULT_COOKIE, SAME_SITE_OPTIONS } from '@/lib/constants'
import type { Cookie } from '@/lib/types'
import { reactive } from 'vue'
import CookieResult from './cookie-result.vue'
import CookieToolbar from './cookie-toolbar.vue'

const savedCookie = localStorage.getItem('saved-cookie')

const cookie = reactive<Cookie>(savedCookie ? JSON.parse(savedCookie) : DEFAULT_COOKIE)

function updateCookie(newCookie: Cookie) {
  Object.keys(newCookie).forEach(key => {
    cookie[key as keyof Cookie] = newCookie[key as keyof Cookie]
  })
}
</script>

<template>
  <h1 class="text-3xl font-bold">Cookie Builder</h1>
  <CookieToolbar :cookie @update:cookie="updateCookie" />
  <div class="items-start grid lg:grid-cols-2 gap-4">
    <form
      @submit="(e) => e.preventDefault()"
      v-focus-trap
      class="grid grid-cols-[auto_1fr] items-center justify-items-start gap-4 max-w-screen-s"
    >
      <FormElement
        id="name"
        label="Name"
        tooltip="This attribute specifies the name of the cookie. It's used to identify the cookie when it's sent back to the server."
      >
        <InputText id="name" type="text" v-model="cookie.name" placeholder="Name" required />
      </FormElement>
      <FormElement
        id="value"
        label="Value"
        tooltip="The value attribute holds the actual data associated with the cookie. This data can be a string of characters or any other type of data that needs to be stored."
      >
        <InputText id="value" type="text" v-model="cookie.value" placeholder="Value" required />
      </FormElement>
      <FormElement
        id="path"
        label="Path"
        tooltip="This attribute specifies the URL path for which the cookie is valid. The browser will send the cookie only to requests that match this path or its subpaths."
      >
        <InputText id="path" type="text" v-model="cookie.path" placeholder="Path" />
      </FormElement>
      <FormElement
        id="domain"
        label="Domain"
        tooltip="The domain attribute specifies the domain for which the cookie is valid. The browser will send the cookie only to the specified domain and its subdomains."
      >
        <InputText id="domain" type="text" v-model="cookie.domain" placeholder="Domain" />
      </FormElement>
      <FormElement
        id="expire"
        label="Remove"
        tooltip="This sets the expiration date to start of javascript time (Thu, 01 Jan 1970 00:00:01 GMT), this deletes the cookie."
      >
        <Checkbox id="expire" v-model="cookie.expire" :binary="true" />
      </FormElement>
      <FormElement
        id="expires"
        label="Expires"
        tooltip="The Expires attribute is a date and time value indicating the exact expiration time of the cookie"
      >
        <Calendar
          id="expires"
          v-model="cookie.expires"
          :disabled="Boolean(cookie.maxAge || cookie.expire)"
          showIcon
          dateFormat="yy-mm-dd"
          timeFormat="HH:mm"
          showTime
          hourFormat="24"
          placeholder="Expires"
        />
      </FormElement>
      <FormElement
        id="maxAge"
        label="Max Age"
        tooltip="The Max-Age attribute specifies the maximum age of the cookie in seconds. After either of these conditions is met, the browser will no longer send the cookie to the server"
      >
        <InputNumber
          id="maxAge"
          type="number"
          v-model="cookie.maxAge"
          :disabled="Boolean(cookie.expires || cookie.expire)"
          placeholder="Max Age (in sec)"
        />
      </FormElement>
      <FormElement
        id="secure"
        label="Secure"
        tooltip="When the Secure attribute is set, the browser will only send the cookie over secure connections, such as HTTPS. This helps protect sensitive information from being intercepted by unauthorized parties."
      >
        <Checkbox id="secure" v-model="cookie.secure" :binary="true" />
      </FormElement>
      <FormElement
        id="httpOnly"
        label="Http Only"
        tooltip="When the HttpOnly attribute is set, Javascript cannot access the cookie through the document.cookie API. This helps mitigate certain types of cross-site scripting (XSS) attacks by preventing malicious scripts from accessing sensitive cookie data."
      >
        <Checkbox id="httpOnly" v-model="cookie.httpOnly" :binary="true" />
      </FormElement>
      <FormElement
        id="sameSite"
        label="Same Site"
        tooltip="This attribute controls whether the cookie is sent with cross-origin requests. It can have three possible values: 'Strict', 'Lax', or 'None'. 'Strict' means the cookie is only sent in a first-party context, 'Lax' allows cookies to be sent with safe cross-site requests (e.g., links), and 'None' allows cookies to be sent with all cross-origin requests."
      >
        <Dropdown
          id="sameSite"
          v-model="cookie.sameSite"
          :options="SAME_SITE_OPTIONS"
          placeholder="SameSite"
        />
      </FormElement>
    </form>
    <CookieResult :cookie />
  </div>
</template>
