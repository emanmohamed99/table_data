import axios from "axios";
const perPage = 5;
let currentPage = 1;
document.querySelector("thead")!.classList.add("mystyle");
document.getElementById("submit")!.onclick = function (event) {
  event.preventDefault();
  document.querySelector("thead")!.classList.remove("mystyle");
  const formdata = new FormData(
    document.querySelector("form") as HTMLFormElement | undefined
  );
  let keyword = formdata.get("keyword");
  axios
    .get(`https://api.github.com/search/users?q=${keyword}`)
    .then((res) => {
      const data = res.data.items;

      const totalRows = data.length;
      const totalPages = Math.ceil(totalRows / perPage);
      function renderTableRows() {
        const tableBody = document.getElementById("tableBody");
        tableBody!.innerHTML = "";

        const start = (currentPage - 1) * perPage;
        const end = start + perPage;

        for (let i = start; i < end; i++) {
          if (data[i]) {
            const row = document.createElement("tr");
            row.innerHTML = `
                  <td>${data[i].avatar_url}</td>
                  <td>${data[i].login}</td>
                  <td>${data[i].type}</td>
                `;
            tableBody!.appendChild(row);
          }
        }
      }

      // Render pagination buttons
      function renderPagination() {
        const pagination = document.getElementById("pagination");
        pagination!.innerHTML = "";
        for (let i = 1; i <= totalPages; i++) {
          let button: any = document.createElement("button");

          button.innerText = i;
          button.addEventListener("click", () => {
            currentPage = i;

            renderTableRows();
          });

          pagination!.appendChild(button);
        }
      }
      renderTableRows();
      renderPagination();
    })
    .catch((error) => {
      console.log(error);
    });
};
