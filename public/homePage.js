function loadPage(){
    const onButton = document.getElementById("audioOn");
      onButton.addEventListener("click", function () {
        AudioCommands();
      });

      const offButton = document.getElementById("audioOff");
      offButton.addEventListener("click", function () {
        turnOffLibrary();
      });
    
}

function AudioCommands() {
    if (annyang) {
      const commands = {
        "change the color to :color": function (color) {
          document.body.style.background = color;
        },
        "navigate to :page": function (page) {
          window.location.href = page + "Page.html";
        },
      };
  
      annyang.addCommands(commands);
  
      annyang.start();
    }
}

function turnOffLibrary() {
    if (annyang) {
      annyang.abort();
    }
}


window.onload = loadPage();
