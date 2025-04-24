import { ethers } from "./ethers.min.js";
import { contractAbi, mainContractAddress } from "./constants.js";
import {
  handleConnectClick,
  liveChainChangeCheck,
  validateNetwork,
  TARGET_NETWORK,
} from "./switchNetworkHelper.js";

initializeApplication();

const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();
const contract = new ethers.Contract(mainContractAddress, contractAbi, signer);
const allClicks = await contract.totalClicks();

const domElements = {
  get connectButton() {
    return document.getElementById("connectButton");
  },
  get clickButton() {
    return document.getElementById("clickButton");
  },
  get totalClicks() {
    return document.getElementById("totalClicks");
  },
  get userList() {
    return document.getElementById("userList");
  },
  get positionInfo() {
    return document.getElementById("positionInfo");
  },
  get userPosition() {
    return document.getElementById("userPosition");
  },
  get jumpToPosition() {
    return document.getElementById("jumpToPosition");
  },
};

domElements.totalClicks.textContent = allClicks;

domElements.userList.innerHTML = "";

const sortedUsers = await getSortedUsers();
sortedUsers.forEach((user, index) => {
  const li = document.createElement("li");
  li.className = "user-item";
  li.dataset.address = user.address.toLowerCase();
  let rankDisplay = "";
  if (index === 0) rankDisplay = "🥇";
  else if (index === 1) rankDisplay = "🥈";
  else if (index === 2) rankDisplay = "🥉";
  else rankDisplay = "👤";
  li.textContent = `
  <span class="user-rank">${rankDisplay} #${index + 1}</span>
  ${user.address.slice(0, 5)}...${user.address.slice(38, 42)} 
  <span class="click-count">${user.clicks} clicks</span>
`;
  userList.appendChild(li);
});

updateUI();

export async function initializeApplication() {
  // Checks chain changes and updates UI accordingly
  liveChainChangeCheck();
  domElements.connectButton.addEventListener("click", async () => {
    if (!(await validateNetwork())) {
      await handleConnectClick();
    }
  });
}

async function handleClick() {
  try {
    domElements.clickButton.disabled = true;
    const tx = await contract.click();
    await tx.wait();

    const allClicks = await contract.totalClicks();
    domElements.userList.innerHTML = "";
    domElements.totalClicks.textContent = allClicks;

    const sortedUsers = await getSortedUsers();
    sortedUsers.forEach((user) => {
      const li = document.createElement("li");
      li.className = "user-item";
      li.dataset.address = user.address.toLowerCase();
      li.textContent = `${user.address.slice(0, 5)}...${user.address.slice(
        38,
        42
      )} ${user.clicks} clicks`;
      userList.appendChild(li);
      updateUI();
    });
  } catch (error) {
    if (error.code === 4001 || error.message.includes("user rejected")) {
      displayTransactionMessage("Transaction rejected by user");
    } else {
      displayTransactionMessage(
        `Transaction failed: ${error.shortMessage || error.message}`
      );
    }
  } finally {
    domElements.clickButton.disabled = false;
  }
}

async function getSortedUsers() {
  try {
    const userStats = await contract.getSortedUsers();
    return userStats.map((user) => ({
      address: user.user.toLowerCase(),
      clicks: user.clicks.toString(),
    }));
  } catch (error) {
    console.error("Error fetching sorted users:", error);
    return [];
  }
}

domElements.clickButton.addEventListener("click", handleClick);

export function displayTransactionMessage(message, isError = true) {
  const alertDiv = document.createElement("div");
  alertDiv.className = `transaction-alert ${isError ? "error" : "success"}`;
  alertDiv.textContent = message;

  document.body.appendChild(alertDiv);

  // Trigger animation
  setTimeout(() => alertDiv.classList.add("visible"), 10);

  // Auto-remove after 3 seconds
  setTimeout(() => {
    alertDiv.classList.remove("visible");
    setTimeout(() => alertDiv.remove(), 300);
  }, 3000);
}

async function updateUI() {
  try {
    const [clicks, users] = await Promise.all([
      contract.totalClicks(),
      getSortedUsers(),
    ]);

    domElements.totalClicks.textContent = clicks.toString();
    domElements.userList.innerHTML = "";
    users.forEach((user, index) => {
      const li = document.createElement("li");
      li.className = "user-item";
      li.dataset.address = user.address.toLowerCase();
      let rankDisplay = "";
      if (index === 0) rankDisplay = "🥇";
      else if (index === 1) rankDisplay = "🥈";
      else if (index === 2) rankDisplay = "🥉";
      else if (index >= 3 && index < 10) rankDisplay = "👤";

      li.innerHTML = `
        <div class="user-rank">
        <span class="rank-number">#${index + 1}</span>
        <span class="rank-emoji">${rankDisplay || ""}</span>
        </div>
        ${user.address.slice(0, 5)}...${user.address.slice(38, 42)} 
        <span class="click-count">${user.clicks} clicks</span>
      `;

      domElements.userList.appendChild(li);
    });
    // Update user position
    const currentAddress = await signer.getAddress();
    const position =
      users.findIndex(
        (u) => u.address.toLowerCase() === currentAddress.toLowerCase()
      ) + 1;

    if (position > 0) {
      domElements.positionInfo.style.display = "flex";
      domElements.userPosition.textContent = `#${position}`;
    } else {
      domElements.positionInfo.style.display = "none";
    }
  } catch (error) {
    console.error("UI update error:", error);
  }
}

// Add jump to position handler
domElements.jumpToPosition.addEventListener("click", async () => {
  try {
    const currentAddress = await signer.getAddress();

    const userItems = document.querySelectorAll(".user-item");
    let found = false;
    userItems.forEach((item) => {
      if (!item.dataset.address) return;
      item.classList.remove("highlight-user");

      if (item.dataset.address !== currentAddress.toLowerCase()) {
        return;
      }
      item.scrollIntoView({ behavior: "smooth", block: "center" });
      item.classList.add("highlight-user");
      found = true;
    });
    if (!found) {
      displayTransactionMessage("Your position is not in the current top list");
    }
  } catch (error) {
    console.error("Jump error:", error);
    displayTransactionMessage("Please connect your wallet first");
  }
});
