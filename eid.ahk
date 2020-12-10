f2::Suspend

;dash front
;u::
	Send {Ctrl Down}
	Send {Space}
	Send {Ctrl Up}
Return    

      
;dash back

;i::
	Send {Ctrl Down}
	Send {S Down}
	Send {Space}
	Send {S Up}
	Send {Ctrl Up}
Return      

*CapsLock::
	;Send {Ctrl Down}
	Sleep 50   ;delay for Space to register
	Send {Space}	
	Sleep 100   ;delay for S key to register
	Send {S Down}
	Sleep 120   ; seconds he will stay on head 
	Send {Space}
	Sleep 20  ; holding back S key duration 
	Send {S Up}
	;Send {Ctrl Up}
Return 


;use at your own risk
;Usage
;while in void mode , single tap  caps lock and it will dash back and forth 
;press f2 to disable / suspend the script 
;do not press spacebar or S or W while tapping caps lock 
;preview link :
;by captmac san
