FROM denoland/deno:1.46.3 AS builder

WORKDIR /app
COPY deno.json ./
COPY . .

RUN deno cache dev.ts
RUN deno task build
EXPOSE 8000

# Không dùng deno task start được vì nó sẽ build lại cái mới chứ không dùng build đã có. Và cái mới này không chạy được.
CMD ["deno", "task", "preview"]