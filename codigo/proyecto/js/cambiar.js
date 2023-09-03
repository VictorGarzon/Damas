window.addEventListener("DOMContentLoaded",function (e){
    let obsevarmo = new MutationObserver(function (e){
        document.getElementById('movi').scrollTop=document.getElementById('movi').scrollHeight;
    })
    obsevarmo.observe(document.getElementById('movi'),{
        childList: true,
    });
    document.getElementById('soli').addEventListener('click',function (e){
        document.getElementById('centro').innerHTML="<h1>Solitario</h1><section id=\"tablero\">\n" +
            "                <div id=\"81\" class=\"blanco\" ></div><div id=\"82\" class=\"negro fichaw\"></div><div id=\"83\" class=\"blanco\"></div><div id=\"84\" class=\"negro fichaw\"></div><div id=\"85\" class=\"blanco\"></div><div id=\"86\" class=\"negro fichaw\"></div><div id=\"87\" class=\"blanco\"></div><div id=\"88\" class=\"negro fichaw\"></div>\n" +
            "                <div id=\"71\" class=\"negro fichaw\"></div><div id=\"72\" class=\"blanco\"></div><div id=\"73\" class=\"negro fichaw\"></div><div id=\"74\" class=\"blanco\"></div><div id=\"75\" class=\"negro fichaw\"></div><div id=\"76\" class=\"blanco\"></div><div id=\"77\" class=\"negro fichaw\"></div><div id=\"78\" class=\"blanco\"></div>\n" +
            "                <div id=\"61\" class=\"blanco\"></div><div id=\"62\" class=\"negro fichaw\"></div><div id=\"63\" class=\"blanco\"></div><div id=\"64\" class=\"negro fichaw\"></div><div id=\"65\" class=\"blanco\"></div><div id=\"66\" class=\"negro fichaw\"></div><div id=\"67\" class=\"blanco\"></div><div id=\"68\" class=\"negro fichaw\"></div>\n" +
            "                <div id=\"51\" class=\"negro\"></div><div id=\"52\" class=\"blanco\"></div><div id=\"53\" class=\"negro\"></div><div id=\"54\" class=\"blanco\"></div><div id=\"55\" class=\"negro\"></div><div id=\"56\" class=\"blanco\"></div><div id=\"57\" class=\"negro\"></div><div id=\"58\" class=\"blanco\"></div>\n" +
            "                <div id=\"41\" class=\"blanco\"></div><div id=\"42\" class=\"negro\"></div><div id=\"43\" class=\"blanco\"></div><div id=\"44\" class=\"negro\"></div><div id=\"45\" class=\"blanco\"></div><div id=\"46\" class=\"negro\"></div><div id=\"47\" class=\"blanco\"></div><div id=\"48\" class=\"negro\"></div>\n" +
            "                <div id=\"31\" class=\"negro fichan \"></div><div id=\"32\" class=\"blanco\"></div><div id=\"33\" class=\"negro fichan \"></div><div id=\"34\" class=\"blanco\"></div><div id=\"35\" class=\"negro fichan \"></div><div id=\"36\" class=\"blanco\"></div><div id=\"37\" class=\"negro fichan \"></div><div id=\"38\" class=\"blanco\"></div>\n" +
            "                <div id=\"21\" class=\"blanco\"></div><div id=\"22\" class=\"negro fichan \"></div><div id=\"23\" class=\"blanco\"></div><div id=\"24\" class=\"negro fichan \"></div><div id=\"25\" class=\"blanco\"></div><div id=\"26\" class=\"negro fichan \"></div><div id=\"27\" class=\"blanco\"></div><div id=\"28\" class=\"negro fichan \"></div>\n" +
            "                <div id=\"11\" class=\"negro fichan \"></div><div id=\"12\" class=\"blanco\"></div><div id=\"13\" class=\"negro fichan \"></div><div id=\"14\" class=\"blanco\"></div><div id=\"15\" class=\"negro fichan \"></div><div id=\"16\" class=\"blanco\"></div><div id=\"17\" class=\"negro fichan \"></div><div id=\"18\" class=\"blanco\"></div>\n" +
            "    </section>\n" +
            "    <section id=\"tade\">\n" +
            "        <div id=\"turn\">\n" +
            "            TURNO DE: <p>NEGRAS</p>\n" +
            "            <button id=\"soplar\" >Soplar</button>\n" +
            "        </div>\n" +
            "        <div id=\"movi\">\n" +
            "        </div>\n" +
            "        <div id=\"chat\">\n" +
            "        </div>\n" +
            "    </section>"
        modo=1;
    });
if (document.getElementById('otros')!=null) {
    document.getElementById('otros').addEventListener('click', function (e) {
        document.getElementById('jugar').style.display = "block";
    });
}
});