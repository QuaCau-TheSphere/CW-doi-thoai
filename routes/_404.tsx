import { PageProps } from "$fresh/server.ts";
import Meta, { TÊN_TRANG } from "../components/Meta.tsx";

export default function Error404(props: PageProps<{ đuôiRútGọn: string }>) {
  const đuôiRútGọn = props.data?.đuôiRútGọn;
  return (
    <>
      <Meta title="404 – Không tìm thấy trang" description="404 – Không tìm thấy trang" url="/404" imageUrl="Linh Rab.jpg" />
      <body class="flex flex-col md:flex-row bg-base-300 items-center max-w-none space-x-10 px-10 h-screen">
        <section class="align-middle justify-center">
          <article class="prose py-10">
            <h1>404 – Không tìm thấy trang</h1>
            <p>
              Liên kết rút gọn với đuôi <code>{đuôiRútGọn}</code>{" "}
              chưa từng được tạo hoặc đã bị xoá trên hệ thống. Liên hệ người gửi liên kết cho bạn để được hỗ trợ.
            </p>
          </article>
          <button class="btn">
            <a href="/">Tạo liên kết khác</a>
          </button>
        </section>
        <section class="align-middle">
          <figure class="max-h-screen flex flex-col items-start">
            <img class="flex-1 min-h-0" src="Linh Rab.jpg" alt="Tranh vẽ hai nguời đang tán gẫu với nhau ở quán nước vỉa hè" />
            <figcaption>
              Tranh: <a class="underline" href="https://doi-thoai.deno.dev/TheLinhRab.doi-thoai.1">Linh Rab</a>
            </figcaption>
          </figure>
        </section>
      </body>
    </>
  );
}
