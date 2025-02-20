// for stater 5 audios
async function HomeSurah() {
    for (let j = 5; j >= 1; j--) {
        const response1 = await fetch(`https://api.quran.com/api/v4/chapters/${j}`);
        const feed1 = await response1.json();
        const response2 = await fetch(`https://api.quran.com/api/v4/chapter_recitations/1/${j}`);
        const feed2 = await response2.json();

        const hd = document.createElement('h2');
        hd.setAttribute('id', 'hd${j}');
        hd.innerText = feed1?.chapter?.name_arabic;

        const ad = document.createElement('audio');
        ad.setAttribute('id', 'ad${j}');
        ad.setAttribute('controls', '');
        ad.setAttribute('src', feed2?.audio_file?.audio_url);
        document.querySelector('#bx1').prepend(ad);
        document.querySelector('#bx1').prepend(hd);
    }
}

{
    let homeURL = location.href;
    let path = homeURL.substring(homeURL.lastIndexOf('/') + 1);
    if (path == 'index.html') {
        document.querySelector('#fst_link').addEventListener('click', (async () => await HomeSurah())());
    }
}

// heading & Audios stater ALL
let count = 0
let surah_recitor;
async function surah_name() {
    try {
        surah_recitor = document.querySelector('#surah_recitor').value
        count++;
        surah_recitor = document.querySelector('#surah_recitor').value;
        for (let j = 1; j <= 114; j++) {
            const response1 = await fetch(`https://api.quran.com/api/v4/chapters/${j}`);
            const feed1 = await response1.json();
            const response2 = await fetch(`https://api.quran.com/api/v4/chapter_recitations/${surah_recitor}/${j}`);
            const feed2 = await response2.json();

            let audiosMain1 = document.querySelector('#audios1');
            let audiosMain2 = document.querySelector('#audios2');
            let audiosMain3 = document.querySelector('#audios3');
            let audiosMain4 = document.querySelector('#audios4');

            const h2 = document.createElement('h2');
            h2.setAttribute('id', 'heading${j}');
            h2.innerText = feed1?.chapter?.name_arabic;

            const audio = document.createElement('audio');
            audio.setAttribute('id', 'aud${j}');
            audio.setAttribute('controls', '');
            audio.setAttribute('src', feed2?.audio_file?.audio_url)

            let img = document.createElement('img');
            img.setAttribute('src', 'images/loader.gif');

            if (j >= 1 && j <= 30) {
                if (audio && h2) {
                    audiosMain1.appendChild(h2);
                    audiosMain1.appendChild(audio);
                }
                else {
                    audiosMain1.appendChild(img);
                }
            }
            else if (j >= 31 && j <= 60) {
                if (audio && h2) {
                    audiosMain2.appendChild(h2);
                    audiosMain2.appendChild(audio);
                }
                else {
                    audiosMain2.appendChild(img);
                }
            }
            else if (j >= 61 && j <= 90) {
                if (audio && h2) {
                    audiosMain3.appendChild(h2);
                    audiosMain3.appendChild(audio);
                }
                else {
                    audiosMain3.appendChild(img);
                }
            }
            else if (j >= 91 && j <= 114) {
                if (audio && h2) {
                    audiosMain4.appendChild(h2);
                    audiosMain4.appendChild(audio);
                }
                else {
                    audiosMain4.appendChild(img);
                }
            }
        }
    }
    catch(e){
        console.log(error);
    }
}


// Nav Bar
document.getElementById('menu_bar_open').addEventListener('click', openmenu = () => {
    document.getElementById('nav_items').style.top = "19%";
    document.getElementById('menu_bar_close').style.display = "flex";
    document.getElementById('menu_bar_open').style.display = "none";
    document.getElementById('nav_items').style.zIndex = "1";
})
document.getElementById('menu_bar_close').addEventListener('click', closemenu = () => {
    document.getElementById('nav_items').style.top = "-60%";
    document.getElementById('menu_bar_open').style.display = "flex";
    document.getElementById('menu_bar_close').style.display = "none";
    document.getElementById('nav_items').style.zIndex = "-1";
})


// Audio toggles

function checkForPointer(a) {
    if (surah_recitor != "null") {
        document.getElementById(`down_arrow${a}`).style.cursor = "pointer !important";
    }
    else {
        document.getElementById(`down_arrow${a}`).style.cursor = "not-allowed !important";
    }
}

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

let homeURL2 = location.href;
let path2 = homeURL2.substring(homeURL2.lastIndexOf('/') + 1);
if (path2 == 'Details.html') {
    showSurahName();
}
async function showSurahName() {
    for (let i = 1; i <= 114; i++) {
        const response = await fetch(`https://api.quran.com/api/v4/chapters/${i}`);
        const feeds = await response.json();
        let opt = document.createElement('option');
        opt.value = feeds?.chapter?.id;
        opt.innerText = `${feeds?.chapter?.name_simple} (${feeds?.chapter?.name_arabic})`;
        document.getElementById('innput').appendChild(opt);
    }
}

async function surah_details() {

    let input = (document.getElementById("innput").value);
    const response = await fetch(`https://api.quran.com/api/v4/chapters/${input}`);
    const feeds = await response.json();
    let obj = feeds?.chapter;
    document.getElementById("wrong").style.display = "none";
    document.getElementById('displayinfo1').innerHTML = (feeds?.chapter?.name_arabic)
    document.getElementById('displayinfo2').innerHTML = (feeds?.chapter?.name_simple)
    document.getElementById('displayinfo3').innerHTML = (feeds?.chapter?.revelation_order)
    document.getElementById('displayinfo4').innerHTML = (feeds?.chapter?.revelation_place)
    document.getElementById('displayinfo5').innerHTML = (feeds?.chapter?.verses_count)
    document.getElementById('displayinfo6').innerHTML = (feeds?.chapter?.translated_name?.name)
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
    const nameSurah = await fetch(`https://api.quran.com/api/v4/chapters/${input_surah}`);
    const nameSurahResponse = await nameSurah.json();
    if (input_surah >= 1 && input_surah <= 114) {
        const response = await fetch(`https://api.quran.com/api/v4/chapter_recitations/1/${input_surah}`);
        const movies = await response.json();
        link = movies?.audio_file?.audio_url;
        document.getElementById('myaudios').setAttribute("src", movies?.audio_file?.audio_url);
        for (let i = 0; i <= 6237; i++) {
            if (i >= 0 && i <= 1364) {
                if (input_surah == feed?.verses[i]?.verse_key[0]) {
                    str = str + " " + feed?.verses[i]?.text_indopak;
                }
            }
            else if (i >= 1366 && i <= 6147) {
                if (input_surah == feed?.verses[i]?.verse_key[0] + feed?.verses[i]?.verse_key[1]) {
                    str = str + " " + feed?.verses[i]?.text_indopak;
                }
            }
            else if (i >= 6148) {
                if (input_surah == feed?.verses[i]?.verse_key[0] + feed?.verses[i]?.verse_key[1] + feed?.verses[i]?.verse_key[2]) {
                    str = str + " " + feed?.verses[i]?.text_indopak;
                }
            }
        }
        let element = document.getElementById("surahs_here");
        let para = document.createElement("p");
        let node = document.createTextNode(str)
        para.appendChild(node);
        let heading = document.createElement("h2");
        let node2 = document.createTextNode(`سُورَة ${nameSurahResponse?.chapter?.name_arabic}`);
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
    let translation_content = document.getElementById('translation_content');
    const response = await fetch(`https://api.quran.com/api/v4/quran/translations/${translation_input}`);
    const feed = await response.json();
    let translation_string = "";
    let arr = feed?.translations;

    if (translation_input == "NULL") {
        translation_content.innerHTML = "Wrong Input Please select the Name from below";
    }

    for (let i = 0; i <= arr.length; i++) {
        let abc = feed?.translations[i]?.text;
        if (!abc) {
            console.log("loader");
            translation_content.innerHTML = `<img src="images/loader.gif" alt="">`;
        }
        else {
            translation_string = translation_string + "\n" + abc;
        }
        translation_content.innerHTML = `<img src="images/loader.gif" alt="">`;
        setTimeout(() => {
            translation_content.innerText = translation_string;
        }, 2000);
    }
}


// Translation Inputs
async function showtrans() {
    const response = await fetch(`https://api.quran.com/api/v4/resources/translations`);
    const feed = await response.json();
    let arr = feed?.translations;
    let itr = 0;
    let homeURL2 = location.href;
    let path2 = homeURL2.substring(homeURL2.lastIndexOf('/') + 1);
    if (path2 == 'translation.html') {
        arr.forEach((obj) => {
            let opt = document.createElement('option');
            opt.value = obj?.id;
            opt.innerHTML = obj?.author_name + "(" + obj?.language_name + ")";
            document.getElementById('Ask_translation').appendChild(opt);
        })
        arr.forEach((obj) => {
            let opt = document.createElement('option');
            opt.value = obj?.id;
            opt.innerHTML = obj?.author_name + "(" + obj?.language_name + ")";
            document.getElementById('Ask_translation').appendChild(opt);
        })
    }
}
showtrans();