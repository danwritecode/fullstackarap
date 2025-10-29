<template>
  <div>
    <button 
      type="button" 
      @click="sayHello('Dan')"
    >
      Say hello
    </button>
  </div>
</template>

<script setup lang="ts">
import { createGrpcWebTransport } from "@connectrpc/connect-web";
import { createClient } from "@connectrpc/connect";
import { Greeter } from "./gen/helloworld_pb";

const transport = createGrpcWebTransport({
  baseUrl: "http://localhost:50051",
});

const client = createClient(Greeter, transport);

async function sayHello(name: string) {
  const { message } = await client.sayHello({ name: name })

  console.log(message)
}
</script>
