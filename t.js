function longestCommonSubstring(s1, s2) {
  const substringMatrix = Array(s2.length + 1).fill(null).map(() => {
    return Array(s1.length + 1).fill(null);
  });

  for (let columnIndex = 0; columnIndex <= s1.length; columnIndex += 1) {
    substringMatrix[0][columnIndex] = 0;
  }

  for (let rowIndex = 0; rowIndex <= s2.length; rowIndex += 1) {
    substringMatrix[rowIndex][0] = 0;
  }

  let longestSubstringLength = 0;
  let longestSubstringColumn = 0;
  let longestSubstringRow = 0;

  for (let rowIndex = 1; rowIndex <= s2.length; rowIndex += 1) {
    for (let columnIndex = 1; columnIndex <= s1.length; columnIndex += 1) {
      if (s1[columnIndex - 1] === s2[rowIndex - 1]) {
        substringMatrix[rowIndex][columnIndex] = substringMatrix[rowIndex - 1][columnIndex - 1] + 1;
      } else {
        substringMatrix[rowIndex][columnIndex] = 0;
      }

      if (substringMatrix[rowIndex][columnIndex] > longestSubstringLength) {
        longestSubstringLength = substringMatrix[rowIndex][columnIndex];
        longestSubstringColumn = columnIndex;
        longestSubstringRow = rowIndex;
      }
    }
  }

  if (longestSubstringLength === 0) {
    return '';
  }
  let longestSubstring = '';

  while (substringMatrix[longestSubstringRow][longestSubstringColumn] > 0) {
    longestSubstring = s1[longestSubstringColumn - 1] + longestSubstring;
    longestSubstringRow -= 1;
    longestSubstringColumn -= 1;
  }

  return longestSubstring;
}

function p(e, n, t) {
    let o = void 0 != window.screenLeft ? window.screenLeft : window.screenX,
        i = void 0 != window.screenTop ? window.screenTop : window.screenY,
        c = (window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width) / 2 - n / 2 + o,
        d = (window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height) / 2 - t / 2 + i,
        w = window.open(e, '', 'scrollbars=yes, width=' + n + ', height=' + t + ', top=' + d + ', left=' + c);
    window.focus && w.focus()
    return w
}

function addInput(el, name, value) {
    let i = document.createElement('input');
    i.type = 'hidden';
    i.name = name;
    i.value = value;
    form.appendChild(i);
}

(function() {
    let m = longestCommonSubstring(document.title.toLocaleLowerCase(), document.body.innerText.toLocaleLowerCase()).trim();
    let title = (document.title.length - m.length > 40) ? document.title : document.body.innerText.substr(document.body.innerText.toLocaleLowerCase().indexOf(m), m.length)
    
	let imgs = [];
    [].slice.call(document.getElementsByTagName('img')).filter(
            function(img) {
                return img.naturalWidth > 150 && img.naturalHeight > 150
            }
        ).sort(function(a, b) {
            return (b.naturalWidth * b.naturalHeight) - (a.naturalWidth * a.naturalHeight)
        }).forEach(function(img) {
            imgs.push(img.src)
        })

	let f = document.createElement('form');
	f.method = 'post';
	f.action = "http://www.elinbosgitme.com/urun-ekle/";
	addInput(f, 'name', title);
	addInput(f, 'url', document.location.href);
	addInput(f, 'images', JSON.stringify(imgs));

	let win = p('about:blank', '680', '460');
	win.document.body.appendChild(f);
	f.submit();
	
})();
