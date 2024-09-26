// heading & chapter name
async function surah_name() {
    for (let j = 1; j <= 114; j++) {
        const response = await fetch(`https://api.quran.com/api/v4/chapters/${j}`);
        const feed = await response.json();
        if (feed) {
            setTimeout(() => {
                document.getElementById(`heading${j}`).innerText = feed?.chapter?.name_arabic;
                document.getElementById(`spinner${j}`).style.display = 'none';

            }, 1000)
        } else {
            document.getElementById(`spinner${j}`).style.display = 'block';
        }
    }
}
surah_name();


// Audios
async function onlyone() {
    for (let i = 1; i <= 114; i++) {
        const response = await fetch(`https://api.quran.com/api/v4/chapter_recitations/1/${i}`);
        const feed = await response.json();
        document.getElementById(`aud${i}`).setAttribute("src", feed?.audio_file?.audio_url);
    }
}
onlyone();

async function recitor() {
    let surah_recitor = document.getElementById('surah_recitor').value;
    for (let i = 1; i <= 114; i++) {
        const response = await fetch(`https://api.quran.com/api/v4/chapter_recitations/${surah_recitor}/${i}`);
        const feed = await response.json();
        document.getElementById(`aud${i}`).setAttribute("src", feed?.audio_file?.audio_url);
    }
}


// Nav Bar
document.getElementById('menu_bar_open').addEventListener('click', openmenu = () => {
    document.getElementById('nav_items').style.top = "13%";
    document.getElementById('menu_bar_close').style.display = "flex";
    document.getElementById('menu_bar_open').style.display = "none";
})
document.getElementById('menu_bar_close').addEventListener('click', closemenu = () => {
    document.getElementById('nav_items').style.top = "-74%";
    document.getElementById('menu_bar_open').style.display = "flex";
    document.getElementById('menu_bar_close').style.display = "none";
})


// Audio toggles
function toggledown(i) {
    document.getElementById(`audios${i}`).style.display = 'block';
    document.getElementById(`down_arrow${i}`).style.display = 'none';
    document.getElementById(`down_arrow${i}_up`).style.display = 'inline';
}
function toggleUp(i) {
    document.getElementById(`audios${i}`).style.display = 'none';
    document.getElementById(`down_arrow${i}_up`).style.display = 'none';
    document.getElementById(`down_arrow${i}`).style.display = 'inline';
}


// detail of surah
async function surah_details() {
    let input = (document.getElementById("innput").value);
    for (let i = 1; i <= 114; i++) {
        const response = await fetch(`https://api.quran.com/api/v4/chapters/${i}`);
        const feeds = await response.json();
        if ((feeds?.chapter?.name_simple) == input) {
            document.getElementById("wrong").style.display = "none";
            document.getElementById('displayinfo1').innerHTML = (feeds?.chapter?.name_arabic)
            document.getElementById('displayinfo2').innerHTML = (feeds?.chapter?.name_simple)
            document.getElementById('displayinfo3').innerHTML = (feeds?.chapter?.revelation_order)
            document.getElementById('displayinfo4').innerHTML = (feeds?.chapter?.revelation_place)
            document.getElementById('displayinfo5').innerHTML = (feeds?.chapter?.verses_count)
            document.getElementById('displayinfo6').innerHTML = (feeds?.chapter?.translated_name?.name)
        }
    }
    if (input >= 1 && input <= 114) {
        document.getElementById("wrong").style.display = "none";
        const response = await fetch(`https://api.quran.com/api/v4/chapters/${input}`);
        const feed = await response.json();
        document.getElementById('displayinfo1').innerHTML = (feed?.chapter?.name_arabic)
        document.getElementById('displayinfo2').innerHTML = (feed?.chapter?.name_simple)
        document.getElementById('displayinfo3').innerHTML = (feed?.chapter?.revelation_order)
        document.getElementById('displayinfo4').innerHTML = (feed?.chapter?.revelation_place)
        document.getElementById('displayinfo5').innerHTML = (feed?.chapter?.verses_count)
        document.getElementById('displayinfo6').innerHTML = (feed?.chapter?.translated_name?.name)
    }
    else {
        document.getElementById("wrong").innerHTML = "Wrong Input Your Input Must Be From 1 - 114 or write surah name";
        document.getElementById("wrong").style.color = "red";
        innput.value = "";
    }
}


//surah and ayats
async function verses() {
    let list = document.querySelector("#surahs_here > h2");
    let list2 = document.querySelector("#surahs_here > p")
    list.remove();
    list2.remove();
    const response = await fetch(`https://api.quran.com/api/v4/quran/verses/indopak`);
    const feed = await response.json();
    let str = feed?.verses[0]?.text_indopak;
    let input_surah = document.getElementById('input_surah').value;
    if (input_surah >= 1 && input_surah <= 114) {
        const response = await fetch(`https://api.quran.com/api/v4/chapter_recitations/1/${input_surah}`);
        const movies = await response.json();
        link = movies?.audio_file?.audio_url;
        document.getElementById('myaudios').setAttribute("src", movies?.audio_file?.audio_url);
        for (let i = 0; i <= 6237; i++) {
            if (i >= 0 && i <= 1364) {
                if (input_surah == feed?.verses[i]?.verse_key[0]) {
                    str = str + " " + feed?.verses[i]?.text_indopak;
                    console.log(feed?.verses[i]?.verse_key)
                }
            }
            else if (i >= 1366 && i <= 6147) {
                if (input_surah == feed?.verses[i]?.verse_key[0] + feed?.verses[i]?.verse_key[1]) {
                    str = str + " " + feed?.verses[i]?.text_indopak;
                    console.log(feed?.verses[i]?.verse_key)
                }
            }
            else if (i >= 6148) {
                if (input_surah == feed?.verses[i]?.verse_key[0] + feed?.verses[i]?.verse_key[1] + feed?.verses[i]?.verse_key[2]) {
                    str = str + " " + feed?.verses[i]?.text_indopak;
                    console.log(feed?.verses[i]?.verse_key)
                }
            }
        }
        let element = document.getElementById("surahs_here");
        let para = document.createElement("p");
        let node = document.createTextNode(str)
        para.appendChild(node);
        let heading = document.createElement("h2");
        let node2 = document.createTextNode(`Surah ${input_surah}:`);
        input_surah.value = "";
        heading.appendChild(node2);
        element.appendChild(heading);
        element.appendChild(para);
    }
    else {
        input_surah.value = "";
        let element = document.getElementById("surahs_here");
        let wrong = document.createElement("p");
        let wrong1 = document.createElement("h2");
        let wrongdata = document.createTextNode("The value is Wrong please enter between 1 - 114");
        wrong.appendChild(wrongdata);
        wrong.style.color = "red";
        wrong.style.textAlign = "left";
        wrong.style.fontSize = "18px";
        wrong.style.paddingTop = "11px";
        element.appendChild(wrong);
        element.appendChild(wrong1);
    }
}


// style  & fonts of verses
function MyFonts() {
    let font_style = document.getElementById('font_style').value;
    let font_size = document.getElementById('font_size').value;
    document.querySelector('#surahs_here > p').style.fontSize = font_size;
    document.querySelector('#surahs_here > h2').style.fontSize = font_size;
    document.querySelector('#surahs_here > p').style.fontFamily = font_style;
    document.querySelector('#surahs_here > h2').style.fontFamily = font_style;
}


// Translation
async function tafeer() {
    let translation_input = document.getElementById('Ask_translation').value;
    let ask_surah_no = document.getElementById('ask_surah_no').value;
    let translation_content = document.getElementById('translation_content');
    const response = await fetch(`https://api.quran.com/api/v4/quran/translations/${translation_input}`);
    const feed = await response.json();
    let translation_string = "";

    if (translation_input == "NULL" || ask_surah_no == "NULL") {
        translation_content.innerHTML = "Wrong Input Please select the Name from below";
    }

    else if (ask_surah_no == "ALL") {
        for (let i = 0; i <= 6236; i++) {
            let abc = feed?.translations[i]?.text;
            translation_string = translation_string + abc;
            translation_content.innerHTML = translation_string;
        }
    }

    else {
        if (ask_surah_no == 1) {
            for (let j = 0; j <= 6; j++) {
                let abc = feed?.translations[j]?.text;
                translation_string = translation_string + abc;
                translation_content.innerHTML = translation_string;
            }
        }
        if (ask_surah_no == 2) {
            let translation_string = feed?.translations[0]?.text;
            for (let j = 7; j <= 193; j++) {
                let abc = feed?.translations[j]?.text;
                translation_string = translation_string + abc;
                translation_content.innerHTML = translation_string;
            }
        }
    }
}


// Translation Inputs
async function showtrans() {
    const response = await fetch(`https://api.quran.com/api/v4/resources/translations`);
    const feed = await response.json();
    for (let i = 0; i <= 125; i++) {
        document.getElementById(`opt${i}`).innerHTML = feed?.translations[i]?.author_name + "(" + feed?.translations[i]?.language_name + ")";
        document.getElementById(`opt${i}`).value = feed?.translations[i]?.id;
    }
    for (let j = 1; j <= 114; j++) {
        document.getElementById(`n${j}`).innerHTML = j;
        document.getElementById(`n${j}`).value = j;
    }
}
showtrans();