const selection = doc.getElementById('selection')

// Load draggable
window.addEventListener('load', () => {
  frameworkStartUp();
});

// Switches & Cases
window.addEventListener("message", function(event) {
  switch (event.data.action) {
    case "startUp":
      startDraggable();
      startColorpicker();
      startColors();
      startPositions();
      startSliders();
    break;

    case "show":
      startPhone();
    break;

    // Send Data
    case "hud":
      progressCircle(event.data.health, ".health");
      progressCircle(event.data.armor, ".armor");
      progressCircle(event.data.stamina, ".stamina");
      progressCircle(event.data.oxygen, ".oxygen");
      progressCircle(event.data.players, ".id");
      $("#idnumber").text(event.data.id);
      $("#time").text(event.data.time);
    break;

    case "status":
      progressCircle(event.data.hunger, ".hunger");
      progressCircle(event.data.thirst, ".thirst");
      $("#sv-black").text(event.data.blackMoney);
      $("#sv-job").text(event.data.job);
      $("#sv-money").text(event.data.money);
      $("#sv-bank").text(event.data.bank);
      $("#sv-players").text(event.data.players);
    break;

    case "isPaused":
      cinemaId.style.display = 'none';
      healthCircle.style.display = 'none';
      armorCircle.style.display = 'none';
      staminaCircle.style.display = 'none';
      oxygenCircle.style.display = 'none';
      idCircle.style.display = 'none';
      microphoneCircle.style.display = 'none';
      
      idLogo.style.display = 'none';
      idName.style.display = 'none';
      idBlack.style.display = 'none';
      idJob.style.display = 'none';
      idMoney.style.display = 'none';
      idBank.style.display = 'none';
      idPlayers.style.display = 'none';
      if (Config.useFramework) {
        hungerCircle.style.display = 'none';
        thirstCircle.style.display = 'none';
        if (Config.useStress) {
          stressCircle.style.display = 'none';
        }
      }
    break;

    case "notPaused":
      if (cinematic) {
        cinemaId.style.display = 'block';
      } else {
        setCircles('show');
        cinemaId.style.display = 'none';
      }
    break

    case "microphone":
      progressCircle(event.data.microphone, ".microphone");
    break;
  }
});

document.onkeyup = function(event) {
  if (event.key == 'Escape') {
      $("#phone").fadeOut();
      $.post('https://ev-hud/close');
      setTimeout(function() {
          phone.style.animation = 'none';
      }, 400)
  }
};

// Initialization
const startDraggable = ()=> {
  $('#health').draggable();
  $("#armor").draggable();
  $("#stamina").draggable();
  $("#oxygen").draggable();
  $("#id").draggable();
  $("#microphone").draggable();
  $("#sv-logo").draggable();
  $("#sv-name").draggable();
  $("#sv-players").draggable();
  $("#sv-black").draggable();
  $("#sv-job").draggable();
  $("#sv-money").draggable();
  $("#sv-bank").draggable();
  if (Config.useFramework) {
    $('#hunger').draggable();
    $('#thirst').draggable();
    if (Config.useStress) {
      $('#stress').draggable();
    };
  };
}

const startColors = ()=> {
  $('#health-circle').css('stroke', getStored('healthColor'));
  $('#armor-circle').css('stroke', getStored('armorColor'));
  $('#stamina-circle').css('stroke', getStored('staminaColor'));
  $('#oxygen-circle').css('stroke', getStored('oxygenColor'));
  $('#id-circle').css('stroke', getStored('idColor'));
  $('#microphone-circle').css('stroke', getStored('microphoneColor'));
  $('#sv-name').css('color', getStored('textColor'))
  $('#sv-black').css('color', getStored('textColor'))
  $('#sv-job').css('color', getStored('textColor'))
  $('#sv-money').css('color', getStored('textColor'))
  $('#sv-bank').css('color', getStored('textColor'))
  $('#sv-players').css('color', getStored('textColor'))
  if (Config.useFramework) {
    $('#hunger-circle').css('stroke', getStored('hungerColor'));
    $('#thirst-circle').css('stroke', getStored('thirstColor'));
    if (Config.useStress) {
      $("#stress-circle").css('stroke', getStored('stressColor'));
    };
  };
}

const startPositions = ()=> {
  $("#health").animate({ top: getStored('dragHealthTop'), left: getStored('dragHealthLeft')});
  $("#armor").animate({ top: getStored('dragArmorTop'), left: getStored('dragArmorLeft')});
  $("#stamina").animate({ top: getStored('dragStaminaTop'), left: getStored('dragStaminaLeft')});
  $("#oxygen").animate({ top: getStored('dragOxygenTop'), left: getStored('dragOxygenLeft')});
  $("#microphone").animate({ top: getStored('dragMicrophoneTop'), left: getStored('dragMicrophoneLeft')});
  $("#id").animate({ top: getStored('dragIdTop'), left: getStored('dragIdLeft')});
  $('#sv-name').animate({top: getStored('svNameTop'), left: getStored('svNameLeft')})
  $('#sv-black').animate({top: getStored('svBlackTop'), left: getStored('svBlackLeft')})
  $('#sv-job').animate({top: getStored('svJobTop'), left: getStored('svJobLeft')})
  $('#sv-money').animate({top: getStored('svMoneyTop'), left: getStored('svMoneyLeft')})
  $('#sv-bank').animate({top: getStored('svBankTop'), left: getStored('svBankLeft')})
  $('#sv-players').animate({top: getStored('svPlayersTop'), left: getStored('svPlayersLeft')})
  $('#sv-logo').animate({top: getStored('svLogoTop'), left: getStored('svLogoLeft')})
  if (Config.useFramework) {
    $("#hunger").animate({ top: getStored('dragHungerTop'), left: getStored('dragHungerLeft')});
    $("#thirst").animate({ top: getStored('dragThirstTop'), left: getStored('dragThirstLeft')});
    if (Config.useStress) {
      $("#stress").animate({ top: getStored('dragStressTop'), left: getStored('dragStressLeft')});
    };
  };
}

const startColorpicker = ()=> {
  colorPicker.value = rgb2hex($('#health-circle').css('stroke'));
  colorPicker.addEventListener("input", updateColorPicker, false);
  colorPicker.select();
}

const startSliders = ()=> {
  setSliders();
  setContainer('sliderHealth', 'check-health', 'health');
  setContainer('sliderArmor', 'check-armor', 'armor');
  setContainer('sliderStamina', 'check-stamina', 'stamina');
  setContainer('sliderOxygen', 'check-oxygen', 'oxygen');
  setContainer('sliderId', 'check-id', 'id');
  setContainer('sliderMicrophone', 'check-microphone', 'microphone');

  setContainer('sliderSvLogo', 'check-logo', 'sv-logo', true);
  setContainer('sliderSvName', 'check-name', 'sv-name', true);
  setContainer('sliderSvBlack', 'check-black', 'sv-black', true);
  setContainer('sliderSvJob', 'check-job', 'sv-job', true);
  setContainer('sliderSvMoney', 'check-money', 'sv-money', true);
  setContainer('sliderSvBank', 'check-bank', 'sv-bank', true);
  setContainer('sliderSvPlayers', 'check-players', 'sv-players', true);
  if (Config.useFramework) {
    setContainer('sliderHunger', 'check-hunger', 'hunger');
    setContainer('sliderThirst', 'check-thirst', 'thirst');
    if (Config.useStress) {
      setContainer('sliderStress', 'check-stress', 'stress');
    };
  };
}

const setSliders = ()=> {
  if (null != getId('sliderHealth')) {
    health = getId('sliderHealth')
  }
  if (null != getId('sliderArmor')) {
    armor = getId('sliderArmor')
  }
  if (null != getId('sliderStamina')) {
    stamina = getId('sliderStamina')
  }
  if (null != getId('sliderOxygen')) {
    oxygen = getId('sliderOxygen')
  }
  if (null != getId('sliderId')) {
    id = getId('sliderId')
  }
  if (null != getId('sliderMicrophone')) {
    microphone = getId('sliderMicrophone')
  }

  // Custom
  if (null != getId('sliderSvLogo')) {
    svLogo = getId('sliderSvLogo')
  }

  if (null != getId('sliderSvBlack')) {
    svBlack = getId('sliderSvBlack')
  }

  if (null != getId('sliderSvJob')) {
    svJob = getId('sliderSvJob')
  }

  if (null != getId('sliderSvMoney')) {
    svMoney = getId('sliderSvMoney')
  }

  if (null != getId('sliderSvBank')) {
    svBank = getId('sliderSvBank')
  }

  if (null != getId('sliderSvPlayers')) {
    svPlayers = getId('sliderSvPlayers')
  }

  if (null != getId('sliderSvName')) {
    svName = getId('sliderSvName')
  }

  if (Config.useFramework) {
    if (null != getId('sliderHunger')) {
      hunger = getId('sliderHunger')
    }
    if (null != getId('sliderThirst')) {
      thirst = getId('sliderThirst')
    }
    if (Config.useStress) {
      if (null != getId('sliderStress')) {
        stress = getId('sliderStress')
      }
    };
  }
}

// https://stackoverflow.com/a/3627747
const rgb2hex = (rgb) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`

// Color picker function
window.addEventListener('load', ()=> {
  selection.addEventListener('change', ()=> {
    switch (selection.value) {
      case "health-option":
        colorPicker.value = rgb2hex($('#health-circle').css('stroke'))
      break;
  
      case "armor-option":
        colorPicker.value = rgb2hex($('#armor-circle').css('stroke'))
      break;
  
      case "stamina-option":
        colorPicker.value = rgb2hex($('#stamina-circle').css('stroke'))
      break;
  
      case "hunger-option":
        colorPicker.value = rgb2hex($('#hunger-circle').css('stroke'))
      break;
  
      case "thirst-option":
        colorPicker.value = rgb2hex($('#thirst-circle').css('stroke'))
      break;
  
      case "stress-option":
        colorPicker.value = rgb2hex($('#stress-circle').css('stroke'))
      break;
  
      case "oxygen-option":
        colorPicker.value = rgb2hex($('#oxygen-circle').css('stroke'))
      break;
  
      case "microphone-option":
        colorPicker.value = rgb2hex($('#microphone-circle').css('stroke'))
      break;
  
      case "id-option":
        colorPicker.value = rgb2hex($('#id-circle').css('stroke'))
      break;

      case "text-option":
        colorPicker.value = rgb2hex($('#sv-job').css('color'))
      break;
    };
  $('#selection').blur();
  });
});

let updateColorPicker = (event)=> {
  let color = event.target.value;
  switch (selection.value) {
    case "health-option":
      $('#health-circle').css('stroke', color);
      saveId('healthColor', color);
    break;

    case "armor-option":
      $('#armor-circle').css('stroke', color);
      saveId('armorColor', color);
    break;

    case "stamina-option":
      $('#stamina-circle').css('stroke', color);
      saveId('staminaColor', color);
    break;

    case "oxygen-option":
      $('#oxygen-circle').css('stroke', color);
      saveId('oxygenColor', color);
    break;

    case "microphone-option":
      $('#microphone-circle').css('stroke', color);
      saveId('microphoneColor', color);
    break;

    case "id-option":
      $('#id-circle').css('stroke', color);
      saveId('idColor', color);
    break;

    case "text-option":
      $('#sv-name').css('color', color);
      $('#sv-job').css('color', color);
      $('#sv-black').css('color', color);
      $('#sv-bank').css('color', color);
      $('#sv-money').css('color', color);
      $('#sv-players').css('color', color);
      saveId('textColor', color);
    break;

    case "hunger-option":
      $('#hunger-circle').css('stroke', color);
      saveId('hungerColor', color);
    break;

    case "thirst-option":
      $('#thirst-circle').css('stroke', color);
      saveId('thirstColor', color);
    break;

    case "stress-option":
      $('#stress-circle').css('stroke', color);
      saveId('stressColor', color);
    break;
  };
}

// Circumference
let progressCircle = (percent, element) => {
  const circle = document.querySelector(element);
  const radius = circle.r.baseVal.value;
  const circumference = radius * 2 * Math.PI;
  const html = $(element).parent().parent().find("span");

  circle.style.strokeDasharray = `${circumference} ${circumference}`;
  circle.style.strokeDashoffset = `${circumference}`;

  const offset = circumference - ((-percent * 100) / 100 / 100) * circumference;
  circle.style.strokeDashoffset = -offset;

  html.text(Math.round(percent));
}

// Container
function setContainer(slider, check, container, flex) {
  if (getId(slider) == null) {
    doc.getElementById(check).checked = true;
    return
  } else {
    doc.getElementById(check).checked = getId(slider)
    if (getId(slider)) {
      if (flex) {
        doc.getElementById(container).style.display = 'flex';
      } else {
        doc.getElementById(container).style.display = 'inline-block';
      }
    } else {
      doc.getElementById(container).style.display = 'none';
    }
  }
}
