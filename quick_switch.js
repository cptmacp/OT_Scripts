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

Quick Switch Delay 

weapon check logic from @sPeC

https://www.onetap.com/threads/release-specs-legit-semi-rage-master-script-v1-1-fixed-3-20.1800

Recoded and added delay feature  by CaptMac San®

Release Version :- v1.0 alpha

*/


//delay and sleep construct by @Rory , main delay post by @edeen

var delays = []

function Delay(delay, func, times) {
	this.delay = delay;
	this.resume = Globals.Curtime() + delay;
	this.func = func;
	this.times = 0;
	this.max = times || 1;
	delays.push(this);
}

Delay.prototype.run = function () {
	this.func();
	this.times++;
	this.resume += this.delay;
	return this.times >= this.max;
}

function checkDelays() {
	currTime = Globals.Curtime();

	delays.forEach(function (delay, index) {
		currTime >= delay.resume && delay.run() && delays.splice(index, 1);
	})
}

Cheat.RegisterCallback("Draw", "checkDelays");
/*
//////////////////////////// EXAMPLE USAGE ////////////////////////////

function hello() {
    Cheat.Print("Hello ");
}

function world() {
    Cheat.Print("world");
}

new Delay(1, hello);
new Delay(2, world);
new Delay(3, function() { Cheat.Print("!") }, 2); // this works too
 
*/


//swap to slot1
function do_slot1() {
	Cheat.ExecuteCommand("slot1");
}



//swap to slot1
function do_slot2() {
	Cheat.ExecuteCommand("slot2");
}



//swap to slot1
function do_knife() {
	Cheat.ExecuteCommand("use weapon_knife");
}


//fetches  values from script menu
//returns integer 
function getValue(valueName) {

	return UI.GetValue("Misc", "JAVASCRIPT", "Script items", valueName);
}

//fetches values from script menu 
//returns string

function getString(valueName) {

	return UI.GetString("Misc", "JAVASCRIPT", "Script items", valueName);
}

function onweaponfire() {

	//get value from the script menu and convert it into float 
	quickSwitch = getValue("Quick Switch");

	delay_value_start = parseFloat(getString("Delay Pre Shot"));

	delay_value_end_awp = parseFloat(getString("Delay Post Shot AWP"));
	
	delay_value_end_deagle = parseFloat(getString("Delay Post Shot Deagle"));



	//debug 

	//Cheat.Print('in onfire\n');

	//Cheat.Print('getstring '+ delay_value_start +'\n');

	//Cheat.Print('get value '+ delay_value_end +'\n');

	//Cheat.Print('converted  '+ val1 +'\n');

	//Cheat.Print(' '+ quickSwitch +'\n');




	//logic to check weapon using if case and switches 

	if (quickSwitch != 0) {

		localIndex = Entity.GetLocalPlayer();

		localWeapon = Entity.GetWeapon(localIndex);

		weapon_name = Entity.GetName(localWeapon);

		execute_swap = 0;

		if (weapon_name == "awp") {
			present_weapon_awp = 1;
		}
		else {
			present_weapon_awp = 0;
		}


		if (weapon_name == "desert eagle") {
			present_weapon_deserteagle = 1;
		}
		else {
			present_weapon_deserteagle = 0;
		}

		switch (quickSwitch) {

			case 0:

				break;

			case 1:

				if (present_weapon_awp == 1) {
					execute_swap = 1;
				}

				break;

			case 2:

				if (present_weapon_deserteagle == 1) {
					execute_swap = 1;
				}

				break;

			case 3:

				if (present_weapon_awp == 1 || present_weapon_deserteagle == 1) {
					execute_swap = 1;
				}

				break;

			default:

				Cheat.Print("Issue in Switch case\n");

				break;
		}

		if (execute_swap) {
			if (present_weapon_awp == 1) {

				//for debug
				//	Cheat.Print(' '+ delay_value_end +'\n');

				//	Cheat.Print(' '+ delay_value_start +'\n');
				new Delay(delay_value_start, do_knife);

				new Delay(delay_value_end_awp, do_slot1);



			}
			if (present_weapon_deserteagle == 1) {


				new Delay(delay_value_start, do_knife);


				new Delay(delay_value_end_deagle, do_slot2);

			}
		}
	}
}



function main() {


	screenSize = Render.GetScreenSize();

	UI.AddSliderFloat("", 0, 0);
	UI.AddLabel("________ Quick Switch Delay _________");
	UI.AddMultiDropdown("Quick Switch", ["AWP", "Deagle"]);

	UI.AddTextbox("Delay Pre Shot")
	UI.AddTextbox("Delay Post Shot AWP");
	UI.AddTextbox("Delay Post Shot Deagle");
	UI.AddSliderFloat("", 0, 0);
	
	

	//Fancy message 
	Cheat.Print("\n\n");
	Cheat.PrintColor([26, 115, 232, 0], "┌┼───────────────────────────── ⫷〡◆〡⫸ ───────────────────────────────────┼┐");
	Cheat.Print("\n\n");
	Cheat.PrintColor([254, 242, 0, 0], "├┼──────────────── ⫷〡Quick Switch Delay Script v1.0  〡⫸ ───────────────┼┤");
	Cheat.Print("\n");
	Cheat.PrintColor([254, 242, 0, 0], "                            by CaptMac San®                                           ");
	Cheat.Print("\n\n");
	Cheat.PrintColor([26, 115, 232, 0], "└┼───────────────────────────── ⫷〡◆〡⫸ ───────────────────────────────────┼┘");
	Cheat.Print("\n\n");
	Cheat.PrintChat(" \x06Quick Switch Delay Script \x09[ \x06v1.0  \x09] ");
	Cheat.RegisterCallback("client_disconnect", "SetValue");
	Cheat.RegisterCallback("weapon_fire", "onweaponfire");
}

main();



