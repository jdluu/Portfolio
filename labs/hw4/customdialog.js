export function init() {
  const myDialog = document.getElementById('myDialog');
  const outputBox = document.querySelector('output');

  const alertBtn = document.getElementById('alertBtn');

  const confirmBtn = document.getElementById('confirmBtn');
  
  const promptBtn = document.getElementById('promptBtn');
  
  alertBtn.addEventListener('click', () => {
    myDialog.innerHTML = `
    <p> Alert was pressed! </p>
    <button id="okBtn">OK</button>
    `; 
    myDialog.showModal();

    let okBtn = document.getElementById('okBtn');

    okBtn.addEventListener('click', () => {
      myDialog.close();
    });
  });

  confirmBtn.addEventListener('click', () => {
    myDialog.innerHTML = `
    <form method="dialog">
      <p>Do you confirm this?</p>
      <menu>
        <button id="yesBtn" value="true">Yes</button>
        <button id="noBtn" value="false">No</button>
      </menu>
    </form>
    `;
    myDialog.showModal();

    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');

    yesBtn.addEventListener('click', () => {
      outputBox.textContent = `Confirm result: ${yesBtn.value}`;
      myDialog.close();
    });

    noBtn.addEventListener('click', () => {
      outputBox.textContent = `Confirm result: ${noBtn.value}`;
      myDialog.close();
    });

  });

  promptBtn.addEventListener('click', () => {
    myDialog.innerHTML = `
    <form method="dialog">
      <p>What is your name?</p>
      <input type="text" id="nameInput">
      <menu>
        <button id="okBtn" value="ok">OK</button>
        <button id="cancelBtn" value="User cancelled the prompt!">Cancel</button>
      </menu>
    </form>
    `;
    myDialog.showModal();

    let okBtn = document.getElementById('okBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const nameInput = document.getElementById('nameInput');

    okBtn.addEventListener('click', () => {
      if (nameInput.value === '') {
        nameInput.value = 'User didn\'t enter a name';
        outputBox.textContent = `${nameInput.value}!`;
      }
      else {
        // Dom Purify the input
        const clean = DOMPurify.sanitize(nameInput.value);
        outputBox.textContent = `Hi, ${clean}!`;
      }
      myDialog.close();
      
    });

    cancelBtn.addEventListener('click', () => {
      outputBox.textContent = `${cancelBtn.value}`;
      myDialog.close();
    });

  });

  return myDialog;
}


