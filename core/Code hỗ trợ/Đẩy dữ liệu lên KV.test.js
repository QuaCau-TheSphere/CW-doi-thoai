import { basename, extname, join } from "$std/path/mod.ts";
import { parse } from "$std/yaml/mod.ts";
async function readDirRecurse(thưMục) {
  for await (const dirEntry of Deno.readDir(thưMục)) {
    const subItem = join(thưMục, dirEntry.name);
    console.log(dirEntry.name);
    if (dirEntry.isFile) {
      console.log("is file");
      array.push(subItem);
    } else if (dirEntry.isDirectory) {
      console.log("is folder");
      readDirRecurse(subItem);
    } else {
      console.log("none");
    }
  }
}

const array = [];
await readDirRecurse("./core/A. Cấu hình/Nơi đăng");
console.log("🚀 ~ result:", array);

// import { walk } from "https://deno.land/std@0.170.0/fs/walk.ts";

// for await (const walkEntry of walk(Deno.cwd())) {
//   const type = walkEntry.isSymlink
//     ? "symlink"
//     : walkEntry.isFile
//     ? "file"
//     : "directory";

//   console.log(type, walkEntry.path);
// }
