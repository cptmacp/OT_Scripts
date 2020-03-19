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

Advanced StatTrak kill counter

Original Code and Idea by @signal

https://www.onetap.com/threads/release-stattrak-kill-counter.12964/

Recoded and improved by CaptMac San®

Release Version :- v1.0 alpha

*/

//variables for the method's below with some default initialization 
//I'll try to explain variables and what they are used for 



/*-- variables which are used between method calls below -- */
var kills_reload; 												// store kills after main method is executed 
var kills = 0;													// store kills and used for stattrak display part
var saved_kills; 												// used for getting value from cfg 
var local_kills; 												// used for local kills in other method
var display_kills = 0; 											// used to store current display kills
var kills_diff = 0; 											// stores difference btw kills 
var local; 														// for local player index ( frameStage )

/*-- all debug and flags  variables below -- */
var up_kills = 0;												// debug variable 
var prn; 														// debug variable
var prn2 = 0; 													// debug variable
var count_post = 0; 											// debug variable
var count_get = 0; 												// debug variable
var count_set = 0; 												// debug variable
var count_init = 0; 											// debug variable
var count_draw = 0; 											// debug variable
var count_update = 0; 											// debug variable
var score_kills = -1; 											// debug variable
var kills_diff = 0; 											// debug variable
var reload_flag = -1; 											// debug variable
var check; 														// debug variable
var count_latest_scoreboard_kills = 0; 							// debug variable





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




//for init local user space ( globally )
function init_local() {

	local = Entity.GetLocalPlayer();

}





//checks if in the game , no need usual JS running in background 
function is_alive() {
	var localplayer_index = Entity.GetLocalPlayer();
	var localplayer_alive = Entity.IsAlive(localplayer_index);
	var alive_flag = -1;

	while (localplayer_alive == true) {
		init();
		alive_flag = 1;
	}
	if (alive_flag == 1) {
		Cheat.Print("Local player is alive\n");
	}
	else {
		alive_flag == 0;
		Cheat.Print("Local player is not alive\n");
		return;
	}


}





//for debug and for future advanced case  #1
function get_latest_scoreboard_kills() {

	local = Entity.GetLocalPlayer();
	score_kills = Entity.GetProp(local, "CPlayerResource", "m_iKills");
	count_latest_scoreboard_kills++;
}





//for debug and for future advanced case  #2
function get_latest_kills() {
	if (Cheat.FrameStage() != 2)
		return;
	local = Entity.GetLocalPlayer();

	kills = saved_kills + Entity.GetProp(local, "CPlayerResource", "m_iKills");


}





//main method for displaying stattrak and calculating kills 
//this is the default case when the round is started and there are no kills in the game ( i.e m_iKills == 0 )
function postdataupdate_start() {
	if (Cheat.FrameStage() != 2)
		return;
	local = Entity.GetLocalPlayer();

	kills = saved_kills + Entity.GetProp(local, "CPlayerResource", "m_iKills");

	var weapon = Entity.GetWeapon(local);


	if (UI.GetValue("Reset")) {


		Entity.SetProp(weapon, "CPlayerResource", "m_iKills", 0);
	}


	Entity.SetProp(weapon, "CBaseAttributableItem", "m_iItemIDHigh", -1);
	Entity.SetProp(weapon, "CBaseAttributableItem", "m_nFallbackStatTrak", kills);

	count_post++;



}




//2nd main method for displaying stattrak and calculating kills 
//this is the 2nd case when the round is started and there are some kills in the game ( i.e m_iKills !=0 )
//have to impliment and use this for future updates
//for the instance such as user reloaded script when the kills are not 0 
//thus we cant use the same logic to calculate kills and store it 
function postdataupdate_start_reload() {

	if (Cheat.FrameStage() != 2)
		return;
	local = Entity.GetLocalPlayer();

	kills = saved_kills


	var weapon = Entity.GetWeapon(local);


	Entity.SetProp(weapon, "CBaseAttributableItem", "m_iItemIDHigh", -1);
	Entity.SetProp(weapon, "CBaseAttributableItem", "m_nFallbackStatTrak", kills);


}





//3nd main method for displaying stattrak and calculating kills 
//this is the 3nd case when the round is started and there are some kills in the game ( i.e m_iKills !=0 )
//but after the postdataupdate_start_reload is executed 
//have to impliment and use this for future updates
//just like the 2nd main method we cant use 1st and 2nd one to calculate kills
//we need a different logic to calculate it .
function postdataupdate_start_reload_prior() {
	if (Cheat.FrameStage() != 2)
		return;
	local = Entity.GetLocalPlayer();

	kills = Entity.GetProp(local, "CPlayerResource", "m_iKills");

	var weapon = Entity.GetWeapon(local);


	Entity.SetProp(weapon, "CBaseAttributableItem", "m_iItemIDHigh", -1);
	Entity.SetProp(weapon, "CBaseAttributableItem", "m_nFallbackStatTrak", kills);

}





//for debug and for future advanced case  #3
//it gets realtime score from score board
function get_realtime_score() {
	if (Cheat.FrameStage() != 2)
		return;
	local = Entity.GetLocalPlayer();

	score_kills = Entity.GetProp(local, "CPlayerResource", "m_iKills");


}






//this method gets the value from the local cfg
//it uses a console variable called "xbox_throttlebias"
function get_val() {
	saved_kills = Convar.GetInt("xbox_throttlebias");
	reload_flag = Convar.GetInt("xbox_autothrottle");
	count_get++;

}





//this method updates kills and is called to store new kills to a local variable
//
function update_kills() {

	display_kills = kills
	count_update++;

}






//this method updates the latest kills from the local variable and writes it 
//basic r/w method implimentation used here 
//since we cant use file operation this was the tricky part to think of
//also using a local variable to execute command just for debug purpose 
function set_val() {

	prn2 = Convar.SetFloat("xbox_throttlebias", display_kills);
	Convar.SetFloat("xbox_throttlebias", display_kills);
	count_set++;


}





//for debug and for future advanced case  #4
function test() {
	Cheat.Print("hi from test functiontest enemy\n");
}






//for debug and for future advanced case  #5
function reload_all() {
	if (Cheat.FrameStage() != 2)
		return;
	local = Entity.GetLocalPlayer();

	if (!Entity.IsAlive(local))
		return;

	kills = saved_kills - Entity.GetProp(local, "CPlayerResource", "m_iKills");

}






//for debug and for future advanced case  #6
//this shows all sort of flags which I have used in all the methods 
//to test and seeing control flow and the local variables values in the method's scope space .
function drawString() {
	//if (Cheat.FrameStage() != 2)
	//  return;


	//Render.String( 1000, 100, 0, "set val kills  "+prn2, [ 255, 255, 255, 255 ] );

	Render.String(100, 100, 0, "Score Kills " + score_kills, [255, 255, 255, 255]);


	Render.String(200, 100, 0, "Current Kills(kills)  " + kills, [255, 255, 255, 255]);
	//UI.SetValue( "Base_Kills", up_kills);

	//prn=Convar.SetFloat("xbox_throttlebias",up_kills);

	Render.String(500, 100, 0, "saved kills(get_val)  " + saved_kills, [255, 255, 255, 255]);


	Render.String(700, 100, 0, "Display kills(set_val)  " + prn2, [255, 255, 255, 255]);

	Render.String(1200, 100, 0, "Display kills( update_kills)  " + display_kills, [255, 255, 255, 255]);







	Render.String(200, 300, 0, "Count get  " + count_get, [255, 255, 255, 255]);
	//UI.SetValue( "Base_Kills", up_kills);

	//prn=Convar.SetFloat("xbox_throttlebias",up_kills);
	//Render.String( 300, 300, 0, "postupdatecount  "+count_post, [ 255, 255, 255, 255 ] );

	Render.String(500, 300, 0, "count set  " + count_set, [255, 255, 255, 255]);


	//Render.String( 700, 300, 0, "count draw  "+count_draw, [ 255, 255, 255, 255 ] );

	Render.String(1200, 300, 0, "count update kills  " + count_update, [255, 255, 255, 255]);

	Render.String(1400, 300, 0, "count init  " + count_init, [255, 255, 255, 255]);


	Render.String(100, 400, 0, "reload flag  " + reload_flag, [255, 255, 255, 255]);

	Render.String(300, 400, 0, "latestscoreboard kills  " + count_latest_scoreboard_kills, [255, 255, 255, 255]);


	//Render.String( 300, 400, 0, "normal flag  "+normal_flag, [ 255, 255, 255, 255 ] );

	//var a=Number.isInteger(score_kills)

	//Render.String( 200, 400, 0, "is int?  "+a, [ 255, 255, 255, 255 ] );

	count_draw++;
}




//this method calls update_kills and set_val
//using a delay function to that 'update_kills' local variables values are updates 
//so that set_val values are latest one and updated by 'update_kills'
function do_exec() {
	new Delay(4, update_kills);
	new Delay(6, set_val);


}





//main function
function main() {

	/*---------------------------------Debug case starts ----------------------*/
	/*
	UI.AddSliderInt("Base_Kills", 0, 1000);

	UI.AddCheckbox( "Reset" );
	

	var localplayer_index = Entity.GetLocalPlayer();
	var localplayer_alive = Entity.IsAlive(localplayer_index);
	

	if (!localplayer_alive) {
		Cheat.Print("Local player is alive\n");
		return;
	}	

	Cheat.RegisterCallback("FrameStageNotify", "get_realtime_score");
	
	//Cheat.RegisterCallback("FrameStageNotify", "get_val");

	init_local();
	
	
	get_val();
	get_latest_scoreboard_kills();
	
	get_realtime_score();
		

		
	Cheat.RegisterCallback("FrameStageNotify", "postdataupdate_start");
	Cheat.RegisterCallback("weapon_reload", "update_kills");

	
	Cheat.RegisterCallback("weapon_reload", "set_val");
	//Cheat.ExecuteCommand("xbox_autothrottle 1");
	
	
	if (score_kills == 0 && count_set == 0 && count_update == 0 && reload_flag!=1) {
		// game start condition , normal case
		
		Cheat.RegisterCallback("FrameStageNotify", "postdataupdate_start");
		Cheat.RegisterCallback("weapon_reload", "update_kills");

		Cheat.RegisterCallback("weapon_reload", "set_val");
		Cheat.ExecuteCommand("xbox_autothrottle 1");

	
	}
	else if (score_kills != 0 && reload_flag == 1 ) {
		//if kills are there then reload 
		
		Cheat.RegisterCallback("FrameStageNotify", "postdataupdate_start_reload");
		Cheat.RegisterCallback("weapon_reload", "update_kills");
;
		Cheat.RegisterCallback("weapon_reload", "set_val");
		Cheat.ExecuteCommand("xbox_autothrottle 3");

	}
	else {
		//after reload case is executed 
		reload_flag = 4;
		Cheat.RegisterCallback("FrameStageNotify", "postdataupdate_start_reload_prior");
		Cheat.RegisterCallback("weapon_reload", "update_kills");

		Cheat.RegisterCallback("weapon_reload", "set_val");
		Cheat.ExecuteCommand("xbox_autothrottle 0");

	}

	*/
	/*---------------------------------Debug case ends ----------------------*/
	count_init++;


	//initialization of local_player
	init_local();


	//gets value from config  

	get_val();

	Cheat.RegisterCallback("round_start", "get_val");


	//call main method 1 for displaying stattrak kills

	Cheat.RegisterCallback("FrameStageNotify", "postdataupdate_start");


	//do_exec method being called in various game events ( do_exec calls update_kills and set_val )
	Cheat.RegisterCallback("weapon_reload", "do_exec");
	Cheat.RegisterCallback("inspect_weapon", "do_exec");
	Cheat.RegisterCallback("round_end", "do_exec");
	Cheat.RegisterCallback("player_death", "do_exec");


	//for debug uncomment 
	//Cheat.RegisterCallback("Draw", "drawString");

	//Fancy message 
	Cheat.Print("\n\n");
	Cheat.PrintColor([26, 115, 232, 0], "┌┼───────────────────────────────── ⫷〡◆〡⫸ ───────────────────────────────────────┼┐");
	Cheat.Print("\n\n");
	Cheat.PrintColor([254, 242, 0, 0], "├┼──────────────── ⫷〡Advanced StatTrak Kill Counter v1.0 alpha 〡⫸ ───────────────┼┤");
	Cheat.Print("\n");
	Cheat.PrintColor([254, 242, 0, 0], "                                by CaptMac San®                                           ");
	Cheat.Print("\n\n");
	Cheat.PrintColor([26, 115, 232, 0], "└┼───────────────────────────────── ⫷〡◆〡⫸ ───────────────────────────────────────┼┘");
	Cheat.Print("\n\n");
	Cheat.PrintChat(" \x06Advanced StatTrak Kill Counter \x09[ \x06v1.0 alpha \x09] ");

}

//execution main method 
main();
