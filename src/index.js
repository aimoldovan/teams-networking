import "./style.css";

let allTeams = [];
let editID;

function $(selector) {
  return document.querySelector(selector);
}

function createTeamRequest(team) {
  return fetch("http://localhost:3000/teams-json/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(team)
  }).then(r => r.json());
}

function deleteTeamRequest(id, callback) {
  return fetch("http://localhost:3000/teams-json/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ id })
  })
    .then(r => r.json())
    .then(status => {
      // console.info("delete status", status, typeof callback);
      if (typeof callback === "function") {
        callback(status);
      }
      return status;
    });
}

function updateTeamRequest(team) {
  return fetch("http://localhost:3000/teams-json/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(team)
  }).then(r => r.json());
}

function getTeamAsHTML(team) {
  // const id = team.id;
  // const url = team.url;
  const { id, url } = team;
  const displayUrl = url.startsWith("https://github.com/") ? url.substring(19) : url;
  return `<tr>
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

function getTeamAsHTMLInputs({ promotion, members, name, url }) {
  console.info("inputs", arguments);
  return `<tr>
    <td>
      <input value="${promotion}" type="text" name="promotion" placeholder="Enter Promotion" />
    </td
    <td
      <input value="${members}" type="text" name="members" placeholder="Enter Members" />
    </td
    <td
      <input value="${name}" type="text" name="name" placeholder="Enter Project Name" />
    </td
    <td
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
      // console.info("sameContent");
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

function loadTeams() {
  let url = "http://localhost:3000/teams-json";
  if (window.location.host === "aimoldovan.github.io") {
    url = "data/teams.json";
    console.info("displaying mock data %o", url);
  }
  fetch(url)
    .then(r => r.json())
    .then(teams => {
      allTeams = teams;
      renderTeams(teams);
    });
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

function onSubmit(e) {
  //   console.warn("submit", e);
  e.preventDefault();

  const team = getTeamValues(editID ? "tbody" : "tfoot");

  console.warn("update or create?", editID);

  console.warn(team);

  if (editID) {
    team.id = editID;
    console.warn("update...", team);
    updateTeamRequest(team).then(({ success }) => {
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
        renderTeams(allTeams);
        setInputsDisabled(false);
        editID = "";
      }
    });
  } else {
    createTeamRequest(team).then(({ success, id }) => {
      if (success) {
        // window.location.reload();
        // loadTeams();
        team.id = id;
        allTeams = [...allTeams, team];
        renderTeams(allTeams);
        $("#teamsForm").reset();
      }
    });
  }
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
  document.querySelectorAll("tfoot input").forEach(input => {
    input.disabled = disabled;
  });
}

function filterElements(teams, search) {
  search = search.toLowerCase();
  return teams.filter((promotion, members, name, url) => {
    // console.info("search %o in %o", search, team.promotion);
    return (
      promotion.toLowerCase().includes(search) ||
      members.toLowerCase().includes(search) ||
      name.toLowerCase().includes(search) ||
      url.toLowerCase().includes(search)
    );
  });
}

function initEvents() {
  $("#search").addEventListener("input", e => {
    const search = e.target.value;
    const teams = filterElements(allTeams, search);
    // console.info("search", search, teams, allTeams);
    renderTeams(teams);
  });

  $("#teamsForm").addEventListener("submit", onSubmit);
  $("#teamsForm").addEventListener("reset", e => {
    console.info("reset", editID);
    if (editID) {
      // console.warn("cancel edit");
      allTeams = [...allTeams];
      renderTeams(allTeams);
      setInputsDisabled(false);
      editID = "";
    }
  });

  $("#teamsTable tbody").addEventListener("click", e => {
    if (e.target.matches("button.delete-btn")) {
      const id = e.target.dataset.id;
      // console.warn("delete... %o", id);
      deleteTeamRequest(id, status => {
        console.info("delete callback %o", status);
        if (status.success) {
          // window.location.reload();
          loadTeams();
        }
      });
    } else if (e.target.matches("button.edit-btn")) {
      const id = e.target.dataset.id;
      startEdit(id);
    }
  });
}

loadTeams();
initEvents();

function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

$("#teamsForm").classList.add("loading-mask");
sleep(5000).then(() => {
  console.warn("ready");
  $("#teamsForm").classList.remove("loading-mask");
});
// const s = sleep(4000);
// console.info("s", s);
