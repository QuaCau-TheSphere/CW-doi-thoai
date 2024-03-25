export function script(list) {
  if (window !== undefined) {
    const ul = document.getElementById(list);
    const result = document.getElementById("result");
    let liSelected;
    let index = -1;
    let prevIndex;
    document.addEventListener("keydown", (e) => {
      const len = ul.getElementsByTagName("li").length;

      //down key
      if (e.which === 40) {
        index++;
        prevIndex = index - 1;
        if (index > len - 1) {
          index = 0;
          prevIndex = len - 1;
        }
        ul.getElementsByTagName("li")[index].classList.add("selected");
        if (prevIndex >= 0) {
          ul.getElementsByTagName("li")[prevIndex].classList.remove("selected");
        }
      } //upkey
      else if (e.which === 38) {
        index--;
        prevIndex = index + 1;
        if (index < 0) {
          index = len - 1;
        }
        ul.getElementsByTagName("li")[index].classList.add("selected");
        ul.getElementsByTagName("li")[prevIndex].classList.remove("selected");
      } //Enter key
      else if (e.key === "Enter") {
        for (let i = 0; i < ul.getElementsByTagName("li").length; i++) {
          ul.getElementsByTagName("li")[i].classList.remove("selected");
        }
        ul.getElementsByTagName("li")[index].classList.add("selected");
      }
      result.innerHTML = ul.getElementsByTagName("li")[index].textContent;
    });

    //if user click on list
    ul.addEventListener("click", (e) => {
      for (let i = 0; i < ul.getElementsByTagName("li").length; i++) {
        ul.getElementsByTagName("li")[i].classList.remove("selected");
      }
      e.target.classList.add("selected");
      result.innerHTML = e.target.textContent;
    });
  }
}
