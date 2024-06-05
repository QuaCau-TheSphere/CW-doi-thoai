import { PageProps } from "$fresh/server.ts";
import Meta, { TÊN_TRANG } from "../components/Meta.tsx";

export default function Error404(props: PageProps<{ đuôiRútGọn: string }>) {
  const đuôiRútGọn = props.data?.đuôiRútGọn;
  return (
    <>
      <Meta title="404 – Không tìm thấy trang" description="404 – Không tìm thấy trang" url="/404" imageUrl="sihouette.jpg" />
      <body class="flex flex-col md:flex-row bg-base-300 items-center max-w-none space-x-10">
        <section class="align-middle justify-center">
          <article class="prose py-10">
            <h1>404 – Không tìm thấy trang</h1>
            <p>
              Đuôi rút gọn <code>{đuôiRútGọn}</code> chưa từng được tạo trên {TÊN_TRANG}.
            </p>
          </article>
          <button class="btn">
            <a href="/">Tạo liên kết khác</a>
          </button>
        </section>
        <section class="align-middle">
          <img src="sihouette.jpg" alt="Bóng của hai nguời đang ngồi dưới đất trò chuyện với nhau" />
        </section>
      </body>
    </>
  );
}
