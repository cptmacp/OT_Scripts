/*
 
MIT License

Copyright (c) 2020 CaptMac San®

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/


/*

Display FOV for Legit BOT


@Rory (dropdowns, silent angles)
@inhonia (scaleable fov) 
@realapril (help w/ some functions
@Ultranite main code

https://www.onetap.com/threads/semi-ragebot-yes-with-fov.14818/

Recoded and added DOV for legit BOT and fixed color picker issue  by CaptMac San®

Release Version :- v1.0 

*/




//global variables
var value;
var radius;



//weapon type method to detect which weapon is being used
function weaponType() {
    var local = Entity.GetLocalPlayer();
    var weapon = Entity.GetName(Entity.GetWeapon(local));
    var weapons = {
        "usp s": "PISTOL",
        "glock 18": "PISTOL",
        "p2000": "PISTOL",
        "dual berettas": "PISTOL",
        "r8 revolver": "PISTOL",
        "desert eagle": "PISTOL",
        "p250": "PISTOL",
        "tec 9": "PISTOL",
        "five seven": "PISTOL",
        "mp9": "SMG",
        "mac 10": "SMG",
        "ump 45": "SMG",
        "ak 47": "RIFLE",
        "sg 553": "RIFLE",
        "aug": "RIFLE",
        "m4a1 s": "RIFLE",
        "m4a4": "RIFLE",
        "galil": "RIFLE",
        "ssg 08": "SNIPER",
        "awp": "SNIPER",
        "g3sg1": "SNIPER",
        "scar 20": "SNIPER",
        "nova": "GENERAL",
        "xm1014": "GENERAL",
        "mag 7": "GENERAL",
        "m249": "GENERAL",
        "negev": "GENERAL"
    };


    //FOV vales from legit bot tabs
    Pistol = UI.GetValue("Legit", "PISTOL", "Fov");
    Rifle = UI.GetValue("Legit", "RIFLE", "Fov");
    Sniper = UI.GetValue("Legit", "SNIPER", "Fov");
    Smg = UI.GetValue("Legit", "SMG", "Fov");
    General = UI.GetValue("Legit", "GENERAL", "Fov");

    //Cheat.Print( weapons[weapon] + "\n");
    if (weapons[weapon] == undefined)
        return "";
    return weapons[weapon];
}




//convets radian to degree
function rad2deg(rad) {
    return rad * 180 / Math.PI;
}





//convets degree to radian
function deg2Rad(angle) {
    return angle * Math.PI / 180;
}





//logic to adjust FOV depending on user
function resizeFOV() {
    //pr1 = UI.GetValue( "Legit",  weapon ,"Fov" );
    //Cheat.Print( "at resize"+ pr1 + "\n");
    width = Render.GetScreenSize()[0];
    height = Render.GetScreenSize()[1];
    mon_fov = (width / height / (4.0 / 3.0));
    fov_real = rad2deg(2 * Math.atan(mon_fov * Math.tan(deg2Rad(UI.GetValue("Visual", "WORLD", "View", "Field of view")) / 2)));
    radius = Math.tan(deg2Rad(UI.GetValue("Legit", weapon, "Fov") / 2) / Math.tan(deg2Rad(fov_real) / 2)) * width;

    return radius;
}



//draws FOV
function drawFOV() {
    weapon = weaponType();
    //value = UI.GetValue( "Legit", "PISTOL","Fov" );
    //Cheat.Print( radius + "\n");
    radius = resizeFOV();
    color = UI.GetColor("Script items", "FOV Color");
    Render.Circle(width / 2, height / 2, radius, color);

}



//main method
function main() {
    screenSize = Render.GetScreenSize();

    UI.AddSliderFloat("", 0, 0);
    UI.AddLabel("________ Draw FOV LegitBot _________");
    UI.AddColorPicker("FOV Color");
    UI.SetColor("Misc", "JAVASCRIPT", "Script items", "FOV Color", [231, 252, 0, 255]);
    UI.AddSliderFloat("", 0, 0);


    //UI.SetEnabled("FOV Color", enabled);
    //Render.Circle(width / 2, height / 2, radius, [255, 255, 255, 255 ]);


    //Fancy message 	
    Cheat.Print("\n\n");
    Cheat.PrintColor([26, 115, 232, 0], "┌┼───────────────────────────── ⫷〡◆〡⫸ ───────────────────────────────────┼┐");
    Cheat.Print("\n\n");
    Cheat.PrintColor([254, 242, 0, 0], "├┼──────────────── ⫷〡Display FOV Legit Bot Script v1.0  〡⫸ ───────────────┼┤");
    Cheat.Print("\n");
    Cheat.PrintColor([254, 242, 0, 0], "                            by CaptMac San®                                           ");
    Cheat.Print("\n\n");
    Cheat.PrintColor([26, 115, 232, 0], "└┼───────────────────────────── ⫷〡◆〡⫸ ───────────────────────────────────┼┘");
    Cheat.Print("\n\n");
    Cheat.PrintChat(" \x06Display FOV Legit Bot Script \x09[ \x06v1.0  \x09] ");


}
main();


Cheat.RegisterCallback("Draw", "drawFOV");
