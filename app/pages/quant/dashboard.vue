<template>
  <div class="container py-10 space-y-6">
    <div class="space-y-2">
      <h1 class="text-3xl font-bold tracking-tight">实时数据面板</h1>
      <p class="text-muted-foreground">
        预留面板位：行情、因子、信号、告警。后续接入 WebSocket/HTTP 数据源即可逐步填充。
      </p>
    </div>

    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div class="rounded-lg border p-6">
        <div class="text-sm text-muted-foreground">行情</div>
        <div class="mt-2 text-2xl font-semibold">--</div>
      </div>
      <div class="rounded-lg border p-6">
        <div class="text-sm text-muted-foreground">因子</div>
        <div class="mt-2 text-2xl font-semibold">--</div>
      </div>
      <div class="rounded-lg border p-6">
        <div class="text-sm text-muted-foreground">信号</div>
        <div class="mt-2 text-2xl font-semibold">--</div>
      </div>
    </div>
  </div>
</template>

