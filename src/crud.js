function addUser(selectNode, name, surname) {
  const lastOption = [...selectNode.querySelectorAll("option")].at(-1);
  const option = document.createElement("option");
  option.textContent = `${surname}, ${name}`;
  option.value = lastOption?.value ? Number(lastOption.value) + 1 : 0;
  selectNode.appendChild(option);
}
function updateUser(selectNode, value, name, surname) {
  const selectedOption = selectNode.querySelector(`option[value='${value}']`);
  selectedOption.textContent = `${surname}, ${name}`;
}
function deleteUser(selectNode, value) {
  const selectedOption = selectNode.querySelector(`option[value='${value}']`);
  selectNode.removeChild(selectedOption);
}

const usersSelect = document.querySelector("#crud-select");
const filterInput = document.querySelector("#crud-filter");
const nameInput = document.querySelector("#crud-name");
const surnameInput = document.querySelector("#crud-surname");
const createButton = document.querySelector("#crud-create");
const updateButton = document.querySelector("#crud-update");
const deleteButton = document.querySelector("#crud-delete");

function setCreateUpdateState(isNameSet, isSurnameSet, isUserSelected) {
  if (isNameSet && isSurnameSet) {
    createButton.removeAttribute("disabled");
    if (isUserSelected) {
      updateButton.removeAttribute("disabled");
    }
    return;
  }
  updateButton.setAttribute("disabled", "true");
  createButton.setAttribute("disabled", "true");
}

nameInput.addEventListener("change", (e) => {
  setCreateUpdateState(
    !!e.target.value,
    !!surnameInput.value,
    !!usersSelect.value
  );
});

surnameInput.addEventListener("change", (e) => {
  setCreateUpdateState(
    !!nameInput.value,
    !!e.target.value,
    !!usersSelect.value
  );
});

filterInput.addEventListener("change", (e) => {
  const options = usersSelect.querySelectorAll("option");
  options.forEach((option) => {
    if (option.textContent.startsWith(e.target.value)) {
      option.removeAttribute("hidden");
    } else {
      option.setAttribute("hidden", "true");
    }
  });
});

usersSelect.addEventListener("change", (e) => {
  const value = e.target.value;
  if (value !== null && value !== undefined) {
    deleteButton.removeAttribute("disabled");
    if (!!nameInput.value && !!surnameInput.value) {
      updateButton.removeAttribute("disabled");
    } else {
      updateButton.setAttribute("disabled", "true");
    }
  } else {
    deleteButton.setAttribute("disabled", "true");
  }
});

createButton.addEventListener("click", () => {
  addUser(usersSelect, nameInput.value, surnameInput.value);
});

updateButton.addEventListener("click", () => {
  updateUser(
    usersSelect,
    usersSelect.value,
    nameInput.value,
    surnameInput.value
  );
});

deleteButton.addEventListener("click", () => {
  deleteUser(usersSelect, usersSelect.value);
  deleteButton.setAttribute("disabled", "true");
});
