<template>
  <div class="p-20">
    <button 
      type="button" 
      class="p-2 border border-gray-900"
      @click="sayHello('Dan')"
    >
      Say hello
    </button>

    <div class="bg-red-500/50">
      {{ message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { createGrpcWebTransport } from "@connectrpc/connect-web";
import { createClient } from "@connectrpc/connect";
import { Greeter } from "./gen/helloworld_pb";

const transport = createGrpcWebTransport({
  baseUrl: "/rpc",
});

const client = createClient(Greeter, transport);
const message = ref("");

async function sayHello(name: string) {
  const res = await client.sayHello({ name: name, message: "Hello from grpc-web" });

  message.value = res.message
}

</script>
