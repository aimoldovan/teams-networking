import "./style.css";
import { $, sleep, mask, unmask } from "./utilities";
import { loadTeamsRequest, createTeamRequest, deleteTeamRequest, updateTeamRequest } from "./middleware";
// import { debounce } from "lodash"; //--- not ok - it is importing all functions
import debounce from "lodash/debounce";

const form = "#teamsForm";

let allTeams = [];
let editID;

function getTeamAsHTML(team) {
  // const id = team.id;
  // const url = team.url;
  const { id, url } = team;
  const displayUrl = url.startsWith("https://github.com/") ? url.substring(19) : url;
  return `<tr>
    <td style="text-align:center">
       <input type="checkbox" name="selectAll" value="${id}" />
    </td>
    <td>${team.promotion}</td>
    <td>${team.members}</td>
    <td>${team.name}</td>
    <td>
      <a href="${team.url}" target='_blank'>${displayUrl}</a>
    </td>
    <td>
      <button type="button" title="Edit" data-id="${id}" class="action-btn edit-btn"> &#9998; </button>
      <button type="button" title="Delete" data-id="${id}" class="action-btn delete-btn"> ✖ </button>
    </td>
  </tr>`;
}

function getTeamAsHTMLInputs({ id, promotion, members, name, url }) {
  console.info("inputs", arguments);
  return `<tr>
    <td style="text-align:center">
      <input type="checkbox" name="selectAll" value="${id}" />
    </td>
    <td>
      <input value="${promotion}" type="text" name="promotion" placeholder="Enter Promotion" />
    </td>
    <td>
      <input value="${members}" type="text" name="members" placeholder="Enter Members" />
    </td>
    <td>
      <input value="${name}" type="text" name="name" placeholder="Enter Project Name" />
    </td>
    <td>
      <input value="${url}" type="text" name="url" placeholder="Enter Project URL" />
    </td>
    <td>
      <button type="submit" class="action-btn" title="Save">💾</button>
      <button type="reset" class="action-btn" title="Cancel">❌</button>
    </td>
  </tr>`;
}

let previewTeams = [];

function renderTeams(teams, editID) {
  console.time("check");
  if (!editID && teams === previewTeams) {
    // console.warn("same teams already rendered");
    console.timeEnd("check");

    return;
  }
  if (!editID && teams.length === previewTeams.length) {
    const sameContent = previewTeams.every((team, i) => team === teams[i]);
    if (sameContent) {
      console.info("sameContent");
      console.timeEnd("check");

      return;
    }
  }
  console.timeEnd("check");

  console.time("render");
  previewTeams = teams;

  const htmlTeams = teams.map(team => {
    return team.id === editID ? getTeamAsHTMLInputs(team) : getTeamAsHTML(team);
  });
  //   console.warn(htmlTeams);
  $("#teamsTable tbody").innerHTML = htmlTeams.join("");
  addTitlesToOverflowCells();
  console.timeEnd("render");
}

function addTitlesToOverflowCells() {
  const cells = document.querySelectorAll("#teamsTable td");
  cells.forEach(cell => {
    cell.title = cell.offsetWidth < cell.scrollWidth ? cell.textContent : "";
  });
}

async function loadTeams() {
  mask(form);
  const teams = await loadTeamsRequest();
  allTeams = teams;
  renderTeams(teams);
  unmask(form);
}

function getTeamValues(parent) {
  const promotion = $(`${parent} input[name=promotion]`).value;
  const members = $(`${parent} input[name=members]`).value;
  const name = $(`${parent} input[name=name]`).value;
  const url = $(`${parent} input[name=url]`).value;
  const team = {
    promotion: promotion,
    members: members,
    name,
    url
  };
  return team;
}

async function onSubmit(e) {
  //   console.warn("submit", e);
  e.preventDefault();

  const team = getTeamValues(editID ? "tbody" : "tfoot");

  console.warn("update or create?", editID);

  console.warn(team);

  mask(form);

  if (editID) {
    team.id = editID;
    console.warn("update...", team);

    const { success } = await updateTeamRequest(team);
    if (success) {
      // loadTeams();
      allTeams = allTeams.map(t => {
        console.info(t.id === team.id, t.promotion);
        if (t.id === team.id) {
          return {
            ...t,
            ...team
          };
        }
        return t;
      });
      setInputsDisabled(false);
      editID = "";
    }
  } else {
    const { success, id } = await createTeamRequest(team);
    if (success) {
      // window.location.reload();
      // loadTeams();
      team.id = id;
      allTeams = [...allTeams, team];
      $(form).reset();
    }
  }
  renderTeams(allTeams);
  unmask(form);
}

function startEdit(id) {
  editID = id;
  console.warn("edit... %o", id);
  // const team = allTeams.find(team => team.id === id);
  renderTeams(allTeams, id);
  console.info(allTeams);
  setInputsDisabled(true);
}

function setInputsDisabled(disabled) {
  document.querySelectorAll("tfoot input, tfoot button").forEach(input => {
    input.disabled = disabled;
  });
}

function filterElements(teams, search) {
  search = search.toLowerCase();
  return teams.filter(({ promotion, members, name, url }) => {
    // console.info("search %o in %o", search, team.promotion);
    return (
      promotion.toLowerCase().includes(search) ||
      members.toLowerCase().includes(search) ||
      name.toLowerCase().includes(search) ||
      url.toLowerCase().includes(search)
    );
  });
}

async function removeSelected() {
  mask("#main");
  const selected = document.querySelectorAll("input[name=selectAll]:checked");
  console.info("removeSelected", selected, selected[0].value);
  const ids = [...selected].map(input => input.value);
  const promises = ids.map(id => deleteTeamRequest(id));
  const responses = await Promise.allSettled(promises);
  // console.warn("responses", responses);
  unmask("#main");
  loadTeams();
}

function initEvents() {
  $("#removeSelected").addEventListener("click", removeSelected);

  $("#search").addEventListener(
    "input",
    debounce(e => {
      const search = e.target.value;
      const teams = filterElements(allTeams, search);
      // console.info("search", search, teams, allTeams);
      renderTeams(teams);
    }, 1000)
  );

  $("#selectAll").addEventListener("input", e => {
    console.info("check all boxes");
    document.querySelectorAll("input[name=selectAll]").forEach(input => {
      input.checked = e.target.checked;
    });
  });

  $(form).addEventListener("submit", onSubmit);
  $(form).addEventListener("reset", e => {
    console.info("reset", editID);
    if (editID) {
      // console.warn("cancel edit");
      allTeams = [...allTeams];
      renderTeams(allTeams, -1); // use 1- to force render
      setInputsDisabled(false);
      editID = "";
    }
  });

  $("#teamsTable tbody").addEventListener("click", async e => {
    if (e.target.matches("button.delete-btn")) {
      const id = e.target.dataset.id;
      // console.warn("delete... %o", id);
      mask(form);
      const status = await deleteTeamRequest(id);
      console.info("delete callback %o", status);
      if (status.success) {
        // window.location.reload(); ---v1
        // loadTeams(); ---v2
        allTeams = allTeams.filter(team => team.id !== id);
      }
      renderTeams(allTeams);
      unmask(form);
    } else if (e.target.matches("button.edit-btn")) {
      const id = e.target.dataset.id;
      startEdit(id);
    }
  });
}

initEvents();

loadTeams();

// var p = sleep(5000);
// p.then(() => {
//   console.warn("ready");
// });
// console.info("after sleep", p);

// const p2 = await sleep(3000);
// console.info("after sleep 2", p2);
