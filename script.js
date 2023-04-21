let input = document.querySelector('input') 

//Function for xml downloading
function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/xml;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

//Function for soting an array and removing duplicates
function uniq(a) {
    return a.sort().filter(function(item, pos, ary) {
        return !pos || item != ary[pos - 1];
    });
}

function revrit(match) {
    replacer = {
        "Q":"/", "W":"'"  , "E":"ק" , "R":"ר" , "T":"א", "Y":"ט", "U":"ו", "I":"ן", "O":"ם", "P":"פ" , "[":"]" , "]":"[",
        "A":"ש", "S":"ד", "D":"ג" , "F":"כ"  , "G":"ע" , "H":"י" , "J":"ח", "K":"ל", "L":"ך", ";":"ף" , "'":",",
        "Z":"ז", "X":"ס", "C":"ב", "V":"ה", "B":"נ", "N":"מ" , "M":"צ"  , ",":"ת" , ".":"ץ" , "/":"."
    };
    shortcuts = match.replace('Shortcuts=','').replace(/"/g,'').split('#'); //
    newshortcuts = []
    for(i=0; i < shortcuts.length; i++){
        if ( !shortcuts[i].includes("Ctrl") && !shortcuts[i].includes("Shift") && !shortcuts[i].includes("Alt") && !shortcuts[i].includes("Fn") ) {
            newshortcuts.push(shortcuts[i].replace(/[A-Z]/g, m => replacer[m]));
            newshortcuts.push(newshortcuts[newshortcuts.length-1].toUpperCase())
        }
    }
    return 'Shortcuts="'+uniq(shortcuts.concat(newshortcuts)).join('#') + '"'; 
}


// If a file is chosen, the following runs
input.addEventListener('change', () => {
    let files = input.files; 
    if (files.length == 0) return; 
    const file = files[0]; 
    let reader = new FileReader(); 
    reader.onload = (e) => { 
        const file = e.target.result; 
        const lines = file.split(/\r\n|\n/); 
        RevitShortcutsHebrew = lines.join('\n').replace(/Shortcuts="[^"]*"/g, revrit)
        download("RevitShortcutsHebrew.xml",RevitShortcutsHebrew);
    }; 
    reader.onerror = (e) => alert(e.target.error.name); 
    reader.readAsText(file); 
}); 